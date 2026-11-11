/**
 * SIMRS RS MAHARDIKA CIREBON - Layanan Admin Pendaftaran & Verifikasi Klaim
 * Modul 4.6 & 4.7 PRD & UI/UX Design System
 */

function adminGetVerificationList() {
  var db = loadData();
  return {
    success: true,
    verifications: db.verifications,
    pendingCount: db.verifications.filter(function(v) { return v.status === 'PENDING'; }).length
  };
}

function adminVerifyClaim(payload) {
  var db = loadData();
  var verId = payload.verificationId;
  var status = payload.status; // 'TERVERIFIKASI' atau 'DITOLAK'

  var found = false;
  for (var i = 0; i < db.verifications.length; i++) {
    if (db.verifications[i].id === verId) {
      db.verifications[i].status = status;
      found = true;
      break;
    }
  }

  if (!found) {
    return { success: false, message: 'Data klaim verifikasi tidak ditemukan.' };
  }

  saveData(db);
  return {
    success: true,
    message: 'Klaim pasien berhasil diubah statusnya menjadi: ' + status,
    verifications: db.verifications
  };
}

/**
 * Mengambil Master Data Dokter & Tenaga Medis
 */
function adminGetDoctorList() {
  var db = loadData();
  return {
    success: true,
    doctors: db.doctors || [],
    polyclinics: db.polyclinics || []
  };
}

/**
 * Tambah Dokter Baru ke Master Data SIMRS (Modul 4.6 PRD)
 * Mendaftarkan akun login, SIP, alokasi kuota, & ruangan poliklinik
 */
function adminAddDoctor(payload) {
  var db = loadData();
  var nip = (payload.nip || '').trim();
  var name = (payload.name || '').trim();
  var sip = (payload.sip || '').trim();
  var poliId = payload.poliId || 'poli-int';
  var room = (payload.room || 'Ruang Poli').trim();
  var quotaUmum = parseInt(payload.quotaUmum) || 10;
  var quotaBpjs = parseInt(payload.quotaBpjs) || 15;
  var quotaAsuransi = parseInt(payload.quotaAsuransi) || 5;

  if (!nip) {
    return { success: false, message: 'NIP Dokter wajib diisi.' };
  }
  if (!name) {
    return { success: false, message: 'Nama dokter dan gelar spesialis wajib diisi.' };
  }

  // Cek duplikasi NIP
  for (var i = 0; i < db.users.length; i++) {
    if (db.users[i].nip_or_nik.toLowerCase() === nip.toLowerCase()) {
      return { success: false, message: 'NIP ' + nip + ' sudah digunakan oleh pegawai lain.' };
    }
  }

  var docId = "doc-" + new Date().getTime();

  // 1. Buat User Medis untuk Autentikasi dengan MFA TOTP
  var newDoctorUser = {
    id: "usr-" + docId,
    nip_or_nik: nip,
    full_name: name,
    phone: payload.phone || "081234567890",
    password: payload.password || "dokter123",
    role: "DOKTER",
    poli_id: poliId,
    totp_secret: "123456", // Default demo TOTP
    is_mfa: true,
    createdAt: new Date().toISOString()
  };
  db.users.push(newDoctorUser);

  // 2. Buat Record Master Dokter & Kuota
  var newDoctor = {
    id: docId,
    name: name,
    sip: sip || ("SIP.440/" + Math.floor(100 + Math.random() * 900) + "-Dinkes/2026"),
    poli_id: poliId,
    room: room,
    status: "Poli Buka",
    quotas: {
      umum: { current: 0, max: quotaUmum },
      bpjs: { current: 0, max: quotaBpjs },
      asuransi: { current: 0, max: quotaAsuransi }
    }
  };
  db.doctors.push(newDoctor);

  saveData(db);

  return {
    success: true,
    message: 'Dokter baru ' + name + ' berhasil ditambahkan ke SIMRS Mahardika!',
    doctor: newDoctor
  };
}

