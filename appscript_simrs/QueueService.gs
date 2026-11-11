/**
 * SIMRS RS MAHARDIKA CIREBON - Layanan Antrian & Kiosk Triage Penjamin
 * Modul 4.2, 4.3 & 4.5 PRD & UI/UX Design System
 */

function queueGetState() {
  var db = loadData();
  return {
    success: true,
    activeCall: db.activeCall,
    otherClinics: db.otherClinics,
    queues: db.queues,
    doctors: db.doctors,
    serverTime: new Date().toLocaleTimeString('id-ID') + ' WIB'
  };
}

function queueTakeTicket(payload) {
  var db = loadData();
  var penjamin = payload.penjamin; // 'UMUM', 'BPJS', 'ASURANSI_SWASTA'
  var patientName = payload.patientName || 'Pasien Mandiri';
  var noRm = payload.noRm || ('#RM-2026-' + Math.floor(1000 + Math.random() * 9000));
  var poliId = payload.poliId || 'poli-int';
  var doctorId = payload.doctorId || 'doc-001';

  // 1. Tentukan Prefix Nomor Antrian & Generate
  var prefix = 'U-';
  var sepNumber = null;
  var preAuthCode = null;
  var penjaminLabel = 'PASIEN UMUM';

  if (penjamin === 'BPJS') {
    prefix = 'B-';
    penjaminLabel = 'PASIEN BPJS KESEHATAN';
    // Integrasi Mock VClaim API: SEP terbit otomatis
    var sepRand = Math.floor(100000 + Math.random() * 900000);
    sepNumber = '0115R0021126V' + sepRand;
  } else if (penjamin === 'ASURANSI_SWASTA') {
    prefix = 'A-';
    var company = payload.insuranceCompany || 'PRUDENTIAL';
    penjaminLabel = 'ASURANSI (' + company + ')';
    preAuthCode = 'AUTH-' + Math.floor(10000 + Math.random() * 90000);

    // Otomatis masukkan ke antrian verifikasi Admin
    db.verifications.unshift({
      id: "ver-" + new Date().getTime(),
      patientName: patientName,
      penjamin: "ASURANSI_SWASTA",
      insuranceCompany: company,
      policyNumber: payload.policyNumber || "PRU-882910",
      documentType: "Upload Kartu Asuransi & Pengantar Dokter",
      status: "PENDING",
      submittedAt: "Baru saja"
    });
  }

  // Hitung nomor urut berikutnya
  var count = 1;
  for (var i = 0; i < db.queues.length; i++) {
    if (db.queues[i].ticketNumber.indexOf(prefix) === 0) {
      count++;
    }
  }
  var ticketNumber = prefix + (count < 10 ? '00' : (count < 100 ? '0' : '')) + count;

  // 2. Alokasi Kuota Dokter
  var targetDoctor = null;
  for (var d = 0; d < db.doctors.length; d++) {
    if (db.doctors[d].id === doctorId) {
      targetDoctor = db.doctors[d];
      break;
    }
  }

  if (targetDoctor && targetDoctor.quotas) {
    if (penjamin === 'BPJS' && targetDoctor.quotas.bpjs.current < targetDoctor.quotas.bpjs.max) {
      targetDoctor.quotas.bpjs.current++;
    } else if (penjamin === 'UMUM' && targetDoctor.quotas.umum.current < targetDoctor.quotas.umum.max) {
      targetDoctor.quotas.umum.current++;
    } else if (penjamin === 'ASURANSI_SWASTA' && targetDoctor.quotas.asuransi.current < targetDoctor.quotas.asuransi.max) {
      targetDoctor.quotas.asuransi.current++;
    }
  }

  // 3. Buat Record Antrian
  var now = new Date();
  var hours = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
  var minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();

  var newQueue = {
    id: "q-" + new Date().getTime(),
    ticketNumber: ticketNumber,
    penjamin: penjamin,
    insuranceName: payload.insuranceCompany || null,
    patientName: patientName,
    age: payload.age || 35,
    no_rm: noRm,
    poli_id: poliId,
    doctorId: doctorId,
    status: 'MENUNGGU',
    sepNumber: sepNumber,
    preAuthCode: preAuthCode,
    time: hours + ':' + minutes,
    qrCodeHash: 'MAHARDIKA-QUEUE-' + ticketNumber + '-' + now.getTime()
  };

  db.queues.push(newQueue);
  saveData(db);

  return {
    success: true,
    message: 'Nomor antrian berhasil diterbitkan!',
    ticket: newQueue,
    penjaminLabel: penjaminLabel,
    doctorName: targetDoctor ? targetDoctor.name : "dr. Handoko, Sp.PD",
    room: targetDoctor ? targetDoctor.room : "Ruang Poli 2",
    poliName: "POLIKLINIK PENYAKIT DALAM"
  };
}

function queueCallTicket(payload) {
  var db = loadData();
  var ticketNumber = payload.ticketNumber;
  var targetQueue = null;

  for (var i = 0; i < db.queues.length; i++) {
    if (db.queues[i].ticketNumber === ticketNumber) {
      targetQueue = db.queues[i];
      targetQueue.status = 'SEDANG_DIPERIKSA';
      break;
    }
  }

  if (!targetQueue) {
    return { success: false, message: 'Nomor antrian ' + ticketNumber + ' tidak ditemukan.' };
  }

  var poliName = "POLIKLINIK PENYAKIT DALAM";
  var roomName = "Ruang Poli 2 (Lantai 1)";
  var doctorName = "dr. Handoko, Sp.PD";
  var penjaminLabel = targetQueue.penjamin === 'BPJS' ? 'Pasien BPJS' : (targetQueue.penjamin === 'ASURANSI_SWASTA' ? 'Pasien Asuransi Swasta' : 'Pasien Umum');

  // Format Standar Suara Voice Synthesizer Bahasa Indonesia (PRD Modul 4.5)
  var ttsSentence = "Nomor antrian " + ticketNumber + ", " + penjaminLabel + ", silakan menuju " + poliName + " RS Mahardika Cirebon, " + roomName + ".";

  var now = new Date();
  var hours = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
  var minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
  var seconds = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();

  db.activeCall = {
    ticketNumber: ticketNumber,
    patientName: targetQueue.patientName,
    penjamin: targetQueue.penjamin,
    penjaminLabel: penjaminLabel.toUpperCase(),
    poliName: poliName,
    room: roomName,
    doctorName: doctorName,
    callTime: hours + ':' + minutes + ':' + seconds,
    ttsText: ttsSentence
  };

  saveData(db);

  return {
    success: true,
    message: 'Antrian ' + ticketNumber + ' dipanggil ke layar TV dan audio sound system.',
    activeCall: db.activeCall
  };
}

function queueCompleteTicket(payload) {
  var db = loadData();
  var ticketNumber = payload.ticketNumber;

  for (var i = 0; i < db.queues.length; i++) {
    if (db.queues[i].ticketNumber === ticketNumber) {
      db.queues[i].status = 'SELESAI';
      break;
    }
  }

  saveData(db);
  return { success: true, message: 'Pemeriksaan antrian ' + ticketNumber + ' selesai.' };
}

