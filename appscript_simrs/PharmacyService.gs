/**
 * SIMRS RS MAHARDIKA CIREBON - Layanan Depo Farmasi & Dispensing Obat
 * Modul 4.6 PRD & UI/UX Design System
 */

function pharmacyGetOrders() {
  var db = loadData();
  return {
    success: true,
    prescriptions: db.prescriptions,
    totalActive: db.prescriptions.filter(function(r) { return r.status !== 'DISPENSED'; }).length
  };
}

function pharmacyUpdateStatus(payload) {
  var db = loadData();
  var rxId = payload.prescriptionId;
  var newStatus = payload.newStatus; // 'SEDANG_DIRACIK', 'SIAP_DISERAHKAN', 'DISPENSED'

  var found = false;
  for (var i = 0; i < db.prescriptions.length; i++) {
    if (db.prescriptions[i].id === rxId || db.prescriptions[i].prescriptionNumber === rxId) {
      db.prescriptions[i].status = newStatus;
      found = true;
      break;
    }
  }

  if (!found) {
    return { success: false, message: 'Resep tidak ditemukan.' };
  }

  saveData(db);
  return {
    success: true,
    message: 'Status resep berhasil diperbarui menjadi: ' + newStatus,
    prescriptions: db.prescriptions
  };
}

