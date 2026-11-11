/**
 * SIMRS RS MAHARDIKA CIREBON - Google Apps Script Backend Entrypoint
 * Mata Kuliah: Analisis dan Perancangan Sistem (Praktikum SMT 5)
 * Berdasarkan PRD v1.2 & UI/UX Design System (DESIGN.md)
 */

/**
 * HTTP GET Entry Point for Google Apps Script Web App
 * Menangani rendering view dan routing parameter (?view=kiosk, ?view=tv, dll)
 */
function doGet(e) {
  // Inisialisasi basis data jika belum ada
  initDatabase();

  var template = HtmlService.createTemplateFromFile('Index');
  
  // Mengirim parameter view jika ada di URL
  template.initialView = (e && e.parameter && e.parameter.view) ? e.parameter.view : 'kiosk';

  return template.evaluate()
    .setTitle('SIMRS RS Mahardika Cirebon')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Helper function wajib untuk modularisasi file HTML di Google Apps Script
 * Sesuai acuan best practice Apps Script HtmlService
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Universal API Dispatcher untuk RPC google.script.run
 */
function apiDispatcher(action, payload) {
  try {
    switch (action) {
      // Auth
      case 'login':
        return authLogin(payload);
      case 'sendOTP':
        return authSendOTP(payload);
      case 'registerPatient':
        return authRegisterPatient(payload);
        
      // Queue & Kiosk
      case 'getQueueState':
        return queueGetState();
      case 'takeTicket':
        return queueTakeTicket(payload);
      case 'callTicket':
        return queueCallTicket(payload);
      case 'completeTicket':
        return queueCompleteTicket(payload);
        
      // Doctor
      case 'getDoctorData':
        return doctorGetData(payload);
      case 'submitPrescription':
        return doctorSubmitPrescription(payload);
        
      // Pharmacy
      case 'getPharmacyOrders':
        return pharmacyGetOrders();
      case 'updatePrescriptionStatus':
        return pharmacyUpdateStatus(payload);
        
      // Admin
      case 'getVerificationList':
        return adminGetVerificationList();
      case 'verifyClaim':
        return adminVerifyClaim(payload);
      case 'addDoctor':
        return adminAddDoctor(payload);
      case 'getDoctorList':
        return adminGetDoctorList();
        
      // Reset DB
      case 'resetDatabase':
        return resetDatabase();

      default:
        return { success: false, message: 'Aksi API tidak dikenali: ' + action };
    }
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

