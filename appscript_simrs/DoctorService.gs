/**
 * SIMRS RS MAHARDIKA CIREBON - Layanan Dashboard Dokter & E-Prescription
 * Modul 4.4 PRD & UI/UX Design System
 */

function doctorGetData(payload) {
  var db = loadData();
  var doctorId = payload.doctorId || 'doc-001';

  var doctor = null;
  for (var i = 0; i < db.doctors.length; i++) {
    if (db.doctors[i].id === doctorId) {
      doctor = db.doctors[i];
      break;
    }
  }

  // Ambil antrian khusus poliklinik dokter ini
  var clinicQueues = [];
  var activePatient = null;

  for (var q = 0; q < db.queues.length; q++) {
    var item = db.queues[q];
    if (item.doctorId === doctorId) {
      if (item.status === 'SEDANG_DIPERIKSA' && !activePatient) {
        activePatient = item;
      } else if (item.status === 'MENUNGGU') {
        clinicQueues.push(item);
      }
    }
  }

  return {
    success: true,
    doctor: doctor,
    activePatient: activePatient,
    waitingList: clinicQueues,
    quotas: doctor ? doctor.quotas : null
  };
}

function doctorSubmitPrescription(payload) {
  var db = loadData();
  var now = new Date();
  var dateStr = now.getFullYear().toString() + ((now.getMonth() + 1) < 10 ? '0' : '') + (now.getMonth() + 1) + (now.getDate() < 10 ? '0' : '') + now.getDate();
  var rxCount = db.prescriptions.length + 1;
  var rxNumber = "#RX-" + dateStr + "-" + (rxCount < 10 ? '00' : (rxCount < 100 ? '0' : '')) + rxCount;

  var newRx = {
    id: "rx-" + now.getTime(),
    prescriptionNumber: rxNumber,
    patientName: payload.patientName || "Ny. Siti Rahmawati",
    no_rm: payload.noRm || "#RM-2026-8812",
    doctorName: payload.doctorName || "dr. Handoko, Sp.PD",
    penjamin: payload.penjamin || "BPJS",
    diagnosis: payload.diagnosis || "E11.9 - Type 2 diabetes mellitus without complications",
    notes: payload.notes || "Gunakan obat sesuai instruksi dokter dan kontrol 1 bulan lagi.",
    items: payload.items && payload.items.length > 0 ? payload.items : [
      { name: "Metformin HCl 500 mg Tablet", category: "Fornas BPJS", dosage: "3 x 1 Hari (Sesudah Makan)", qty: 60 },
      { name: "Glimepiride 2 mg Tablet", category: "Fornas BPJS", dosage: "1 x 1 Hari (Pagi Hari)", qty: 30 }
    ],
    status: "SEDANG_DIRACIK",
    createdAt: (now.getHours() < 10 ? '0' : '') + now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes() + ' WIB'
  };

  db.prescriptions.unshift(newRx);
  saveData(db);

  return {
    success: true,
    message: 'Resep digital ' + rxNumber + ' berhasil diterbitkan dan dikirim ke Depo Farmasi!',
    prescription: newRx
  };
}

