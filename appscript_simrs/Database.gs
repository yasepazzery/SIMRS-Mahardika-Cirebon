/**
 * SIMRS RS MAHARDIKA CIREBON - Basis Data & Persistence Layer
 * Menggunakan Script Properties Google Apps Script dengan in-memory auto-recovery
 */

var SCRIPT_PROP_KEY = 'SIMRS_MAHARDIKA_DB_V1';

/**
 * Inisialisasi Database dengan Master Seed Data
 */
function initDatabase() {
  var props = PropertiesService.getScriptProperties();
  var existing = props.getProperty(SCRIPT_PROP_KEY);
  if (!existing) {
    resetDatabase();
  }
}

/**
 * Reset dan generate ulang sampel data medis realistis
 */
function resetDatabase() {
  var seedData = {
    settings: {
      hospitalName: "RS Mahardika Cirebon",
      hospitalAddress: "Jl. Brigjen Dharsono No. 45, Cirebon",
      phone: "(0231) 884-9911",
      lastUpdated: new Date().toISOString()
    },
    users: [
      {
        id: "usr-001",
        nip_or_nik: "3274012803890002",
        full_name: "Ny. Siti Rahmawati",
        phone: "081234567890",
        password: "pasien123",
        role: "PASIEN",
        no_rm: "#RM-2026-8812",
        is_mfa: false
      },
      {
        id: "usr-002",
        nip_or_nik: "DOK-1988-004",
        full_name: "dr. Handoko, Sp.PD",
        phone: "081122334455",
        password: "dokter123",
        role: "DOKTER",
        poli_id: "poli-int",
        totp_secret: "123456",
        is_mfa: true
      },
      {
        id: "usr-003",
        nip_or_nik: "ADM-012",
        full_name: "Siti Nurhaliza, S.Farm",
        phone: "085566778899",
        password: "admin123",
        role: "ADMIN_FARMASI",
        totp_secret: "123456",
        is_mfa: true
      }
    ],
    polyclinics: [
      { id: "poli-int", name: "Poliklinik Penyakit Dalam", code: "INT", room: "Ruang Poli 2", floor: "Lantai 1" },
      { id: "poli-ped", name: "Poli Anak & Tumbuh Kembang", code: "PED", room: "Ruang Poli 1", floor: "Lantai 1" },
      { id: "poli-car", name: "Poli Jantung & Pembuluh Darah", code: "CAR", room: "Ruang Poli 3", floor: "Lantai 1" },
      { id: "poli-den", name: "Poli Gigi & Mulut", code: "DEN", room: "Ruang Poli 4", floor: "Lantai 1" }
    ],
    doctors: [
      {
        id: "doc-001",
        name: "dr. Handoko, Sp.PD",
        sip: "SIP.440/129-Dinkes/2022",
        poli_id: "poli-int",
        room: "Ruang Poli 2",
        status: "Poli Buka",
        quotas: {
          umum: { current: 8, max: 10 },
          bpjs: { current: 14, max: 15 },
          asuransi: { current: 3, max: 5 }
        }
      },
      {
        id: "doc-002",
        name: "dr. Anita Lestari, Sp.A",
        sip: "SIP.440/088-Dinkes/2021",
        poli_id: "poli-ped",
        room: "Ruang Poli 1",
        status: "Poli Buka",
        quotas: { umum: { current: 5, max: 10 }, bpjs: { current: 12, max: 15 }, asuransi: { current: 2, max: 5 } }
      }
    ],
    activeCall: {
      ticketNumber: "B-015",
      patientName: "Ny. Siti Rahmawati",
      penjamin: "BPJS",
      penjaminLabel: "PASIEN BPJS KESEHATAN",
      poliName: "POLIKLINIK PENYAKIT DALAM",
      room: "Ruang Poli 2 (Lantai 1)",
      doctorName: "dr. Handoko, Sp.PD",
      callTime: "09:14:32",
      ttsText: "Nomor antrian B-015, Pasien BPJS, silakan menuju Poliklinik Penyakit Dalam RS Mahardika Cirebon, Ruang Poli 2."
    },
    otherClinics: [
      { poli: "Poli Anak & Tumbuh Kembang", doctor: "dr. Anita Lestari, Sp.A (Ruang 1)", currentTicket: "A-008", penjamin: "UMUM" },
      { poli: "Poli Jantung & Pembuluh Darah", doctor: "dr. Budi Santoso, Sp.JP (Ruang 3)", currentTicket: "C-004", penjamin: "ASURANSI" },
      { poli: "Poli Gigi & Mulut", doctor: "drg. Citra Dewi (Ruang 4)", currentTicket: "B-011", penjamin: "BPJS" },
      { poli: "Loket Depo Farmasi", doctor: "Penyerahan Resep Obat", currentTicket: "F-029", penjamin: "FARMASI" }
    ],
    queues: [
      {
        id: "q-01",
        ticketNumber: "B-015",
        penjamin: "BPJS",
        patientName: "Ny. Siti Rahmawati",
        age: 46,
        no_rm: "#RM-2026-8812",
        poli_id: "poli-int",
        doctorId: "doc-001",
        status: "SEDANG_DIPERIKSA",
        sepNumber: "0115R0021126V000142",
        time: "09:10"
      },
      {
        id: "q-02",
        ticketNumber: "U-009",
        penjamin: "UMUM",
        patientName: "Tn. Bambang Wijaya",
        age: 38,
        no_rm: "#RM-2026-9041",
        poli_id: "poli-int",
        doctorId: "doc-001",
        status: "MENUNGGU",
        sepNumber: null,
        time: "09:20"
      },
      {
        id: "q-03",
        ticketNumber: "A-004",
        penjamin: "ASURANSI_SWASTA",
        insuranceName: "PRUDENTIAL",
        patientName: "Ny. Jessica Melina",
        age: 29,
        no_rm: "#RM-2026-9118",
        poli_id: "poli-int",
        doctorId: "doc-001",
        status: "MENUNGGU",
        policyNumber: "PRU-9921820",
        time: "09:35"
      }
    ],
    prescriptions: [
      {
        id: "rx-008",
        prescriptionNumber: "#RX-20261111-008",
        patientName: "Ny. Siti Rahmawati",
        no_rm: "#RM-2026-8812",
        doctorName: "dr. Handoko, Sp.PD",
        penjamin: "BPJS",
        diagnosis: "E11.9 - Type 2 diabetes mellitus without complications",
        notes: "Cek gula darah puasa berkala 1 bulan lagi. Hindari makanan manis berlebih.",
        items: [
          { name: "Metformin HCl 500 mg Tablet", category: "Fornas BPJS", dosage: "3 x 1 Hari (Sesudah Makan)", qty: 60 },
          { name: "Glimepiride 2 mg Tablet", category: "Fornas BPJS", dosage: "1 x 1 Hari (Pagi Hari)", qty: 30 }
        ],
        status: "SEDANG_DIRACIK",
        createdAt: "09:22 WIB"
      },
      {
        id: "rx-007",
        prescriptionNumber: "#RX-20261111-007",
        patientName: "Tn. Dedi Kusnadi",
        no_rm: "#RM-2026-7840",
        doctorName: "dr. Anita Lestari, Sp.A",
        penjamin: "UMUM",
        diagnosis: "J06.9 - Acute upper respiratory infection, unspecified",
        notes: "Banyak minum air hangat dan istirahat cukup.",
        items: [
          { name: "Amoxicillin Sirup 125mg/5ml", category: "Umum", dosage: "3 x 1 Cth (Sesudah Makan)", qty: 1 }
        ],
        status: "SIAP_DISERAHKAN",
        createdAt: "09:05 WIB"
      }
    ],
    verifications: [
      {
        id: "ver-01",
        patientName: "Ny. Jessica Melina",
        penjamin: "ASURANSI_SWASTA",
        insuranceCompany: "Prudential Life Assurance",
        policyNumber: "PRU-9921820",
        documentType: "Scan Kartu Asuransi + Surat Rujukan",
        status: "PENDING",
        submittedAt: "10 menit lalu"
      },
      {
        id: "ver-02",
        patientName: "Ny. Siti Rahmawati",
        penjamin: "BPJS",
        insuranceCompany: "BPJS Kesehatan",
        policyNumber: "0001892837461",
        documentType: "Rujukan Faskes 1 (Puskesmas Kesambi)",
        status: "TERVERIFIKASI",
        submittedAt: "25 menit lalu"
      }
    ]
  };

  saveData(seedData);
  return { success: true, message: 'Database SIMRS Mahardika berhasil diinisialisasi!' };
}

/**
 * Membaca data state dari Script Properties
 */
function loadData() {
  var props = PropertiesService.getScriptProperties();
  var raw = props.getProperty(SCRIPT_PROP_KEY);
  if (!raw) {
    initDatabase();
    raw = props.getProperty(SCRIPT_PROP_KEY);
  }
  return JSON.parse(raw);
}

/**
 * Menyimpan data state ke Script Properties
 */
function saveData(data) {
  var props = PropertiesService.getScriptProperties();
  props.setProperty(SCRIPT_PROP_KEY, JSON.stringify(data));
}

