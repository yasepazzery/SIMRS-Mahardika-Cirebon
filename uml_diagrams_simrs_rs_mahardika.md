# Dokumen Pemodelan UML (Unified Modeling Language)
## Sistem Informasi Manajemen Rumah Sakit (SIMRS) RS Mahardika Cirebon

* **Mata Kuliah:** Analisis dan Perancangan Sistem (Praktikum Semester 5)
* **Dokumen Acuan:** PRD v1.2 (`prd_simrs_rs_mahardika_cirebon (gemini).md`)
* **Versi Dokumen:** v1.0
* **Tanggal:** 11 November 2026

---

## 1. Identifikasi Aktor & Peran Sistem

Berdasarkan matriks pengguna pada PRD, aktor yang berinteraksi dengan SIMRS RS Mahardika Cirebon diklasifikasikan sebagai berikut:

| Simbol Aktor | Nama Aktor | Deskripsi Peran & Tanggung Jawab |
|---|---|---|
| 👤 | **Pasien Umum** | Mendaftar mandiri via Kiosk/Portal Pasien dengan skema pembayaran tunai/mandiri (*Self-Pay*). |
| 🏥 | **Pasien BPJS** | Mendaftar menggunakan NIK/No. Kartu BPJS dan rujukan Faskes 1 untuk verifikasi SEP otomatis. |
| 🛡️ | **Pasien Asuransi** | Mendaftar menggunakan kartu asuransi swasta mitra dan mengajukan *pre-authorization*. |
| 🩺 | **Dokter Spesialis/Umum** | Mengelola jadwal/kuota penjamin, memanggil antrian, dan menginput resep digital (*E-Prescription*). |
| 📋 | **Admin Pendaftaran & Farmasi** | Memverifikasi fisik/digital berkas klaim, mengontrol antrian, dan meracik/menyerahkan obat. |
| 🔐 | **Super Admin (IT)** | Mengelola hak akses berbasis peran (*RBAC*), memantau *audit trail*, dan integritas database. |
| ⚙️ | **Sistem Eksternal BPJS VClaim** | Web service eksternal BPJS Kesehatan untuk validasi kepesertaan, nomor rujukan, dan penerbitan SEP. |
| 💬 | **Gateway WhatsApp & SMS** | Layanan eksternal penyedia pengiriman OTP verifikasi login dan reminder antrian. |
| 🔊 | **Audio Synthesizer (TTS)** | Layanan *Web Speech API* untuk pemanggilan nomor antrian suara otomatis berbahasa Indonesia. |

---

## 2. Use Case Diagram

### 2.1 Visualisasi Use Case Diagram

```mermaid
flowchart LR
    %% Actors
    subgraph Aktor_Pasien ["Kelompok Pasien"]
        P_Umum["Pasien Umum"]
        P_BPJS["Pasien BPJS"]
        P_Asuransi["Pasien Asuransi Swasta"]
    end

    subgraph Aktor_Internal ["Pengguna Internal RS"]
        Dokter["Dokter Poliklinik"]
        Admin["Admin Pendaftaran & Farmasi"]
        SuperAdmin["Super Admin (IT)"]
    end

    subgraph Sistem_Eksternal ["Sistem Eksternal"]
        BPJS_API["API BPJS VClaim"]
        WA_Gateway["WhatsApp OTP Gateway"]
        TTS_Engine["Audio TTS Engine"]
    end

    %% Use Cases
    subgraph Boundary_SIMRS ["SISTEM INFORMASI MANAJEMEN RUMAH SAKIT (SIMRS)"]
        UC01(["UC-01: Autentikasi & Login Single Entry"])
        UC01_MFA(["UC-01a: Verifikasi MFA TOTP"])
        UC02(["UC-02: Registrasi Antrian Mandiri"])
        UC03(["UC-03: Validasi Rujukan & Terbit SEP"])
        UC04(["UC-04: Pengajuan Pre-Authorization Asuransi"])
        UC05(["UC-05: Penerbitan & Cetak Tiket QR"])
        UC06(["UC-06: Manajemen Kuota & Jadwal Poli"])
        UC07(["UC-07: Pemanggilan Antrian Suara & TV Display"])
        UC08(["UC-08: Pemeriksaan & Input Resep Digital"])
        UC09(["UC-09: Verifikasi Berkas Klaim Penjamin"])
        UC10(["UC-10: Dispensing & Penyerahan Obat"])
        UC11(["UC-11: Manajemen RBAC & Audit Trail"])
    end

    %% Pasien Relations
    P_Umum --> UC01
    P_Umum --> UC02
    P_BPJS --> UC01
    P_BPJS --> UC02
    P_Asuransi --> UC01
    P_Asuransi --> UC02

    %% Relationship UC
    UC01 -.->|"<<extend>>"| UC01_MFA
    UC02 -.->|"<<include>>"| UC05
    UC02 -.->|"<<extend jika BPJS>>"| UC03
    UC02 -.->|"<<extend jika Asuransi>>"| UC04

    %% External Systems Links
    UC01 -.-> WA_Gateway
    UC03 -.-> BPJS_API
    UC07 -.-> TTS_Engine

    %% Staff Internal Relations
    Dokter --> UC01
    Dokter --> UC06
    Dokter --> UC07
    Dokter --> UC08

    Admin --> UC01
    Admin --> UC07
    Admin --> UC09
    Admin --> UC10

    SuperAdmin --> UC01
    SuperAdmin --> UC11

    %% Connection Resep to Farmasi
    UC08 -.->|"<<include sinkronisasi>>"| UC10
```

---

### 2.2 Skenario Use Case Spesifik (Use Case Specifications)

#### Skenario 1: UC-02 & UC-03 (Registrasi Antrian Mandiri Pasien BPJS)
* **Use Case ID:** UC-02 / UC-03
* **Aktor Utama:** Pasien BPJS
* **Aktor Sekunder:** API BPJS VClaim
* **Pre-Condition:** Pasien memiliki Kartu BPJS aktif dan surat rujukan Faskes 1 (Puskesmas/Klinik) yang masih berlaku (maks. 90 hari).
* **Main Success Scenario (Alur Utama):**
  1. Pasien memilih opsi **"BPJS Kesehatan"** di Kiosk Pendaftaran Mandiri.
  2. Sistem menampilkan form input Nomor Kartu BPJS / NIK dan Nomor Surat Rujukan.
  3. Pasien menginput nomor rujukan (atau memindai barcode rujukan).
  4. Sistem mengirim request validasi kepesertaan dan rujukan ke API BPJS VClaim.
  5. API BPJS VClaim merespons status data valid dan mengembalikan nomor SEP (*Surat Elegibilitas Peserta*).
  6. Sistem menampilkan daftar poliklinik dan dokter spesialis sesuai rujukan.
  7. Pasien memilih dokter spesialis dan jam kunjungan.
  8. Sistem memeriksa kuota harian BPJS untuk dokter tersebut (tersedia).
  9. Sistem menerbitkan tiket antrian berawalan huruf "B" (contoh: `B-015`) beserta QR Code.
  10. Kiosk mencetak tiket fisik thermal dan menyimpan state antrian ke database.
* **Alternative Scenario (Alur Alternatif - Kuota Penuh):**
  * 8a. Kuota dokter untuk pasien BPJS telah penuh (misal: 15/15 kuota telah habis).
  * 8b. Sistem menampilkan pemberitahuan kuota penuh dan merekomendasikan pilihan dokter spesialis lain atau jadwal hari berikutnya.
* **Post-Condition:** Data antrian tercatat di sistem dengan status penjamin *BPJS Kesehatan* dan tiket fisik diterima pasien.

---

#### Skenario 2: UC-07 (Pemanggilan Antrian Suara & TV Display)
* **Use Case ID:** UC-07
* **Aktor Utama:** Dokter Poliklinik / Perawat
* **Aktor Sekunder:** TV Display Lobi, Audio TTS Engine
* **Pre-Condition:** Terdapat antrian pasien yang berstatus *Menunggu* pada poliklinik aktif.
* **Main Success Scenario (Alur Utama):**
  1. Dokter membuka dashboard poliklinik dan melihat daftar pasien menunggu.
  2. Dokter menekan tombol **"Panggil Suara"** pada nomor antrian teratas (misal: `B-015`).
  3. Sistem mengubah status antrian menjadi *Sedang Diperiksa* dan memancarkan event WebSocket ke server.
  4. Server WebSocket menyiarkan pesan ke seluruh TV Display ruang tunggu lobi.
  5. TV Display memperbarui nomor aktif di layar menjadi `B-015`, nama poli, dan nama dokter.
  6. TV Display memicu *Web Speech API Synthesizer* berbahasa Indonesia untuk menyuarakan:
     > *"Nomor antrian B-015, Pasien BPJS, silakan menuju Poliklinik Penyakit Dalam RS Mahardika Cirebon, Ruang Poli 2."*
  7. Pasien di ruang tunggu mendengar panggilan dan masuk ke ruangan poli yang dituju.
* **Alternative Scenario (Pasien Tidak Hadir / Panggil Ulang):**
  * 6a. Pasien belum masuk setelah 3 menit.
  * 6b. Dokter menekan tombol **"Panggil Ulang (Recall)"**.
  * 6c. Sistem memicu kembali pemanggilan audio suara ke speaker lobi.
* **Post-Condition:** Pasien masuk ke ruang poli dan status antrian tercatat di audit trail.

---

#### Skenario 3: UC-08 & UC-10 (Peresepan Obat Digital & Sinkronisasi Farmasi)
* **Use Case ID:** UC-08 / UC-10
* **Aktor Utama:** Dokter Poliklinik
* **Aktor Sekunder:** Admin/Apoteker Depo Farmasi
* **Pre-Condition:** Pasien sedang dalam sesi pemeriksaan medis aktif oleh dokter.
* **Main Success Scenario (Alur Utama):**
  1. Dokter menyelesaikan diagnosa dan membuka panel **E-Prescription**.
  2. Sistem menampilkan daftar formularium obat (tersaring otomatis sesuai kriteria Fornas BPJS untuk pasien BPJS).
  3. Dokter memilih obat, menentukan dosis, jumlah, aturan pakai, dan catatan khusus.
  4. Dokter menekan tombol **"Terbitkan & Kirim ke Farmasi"**.
  5. Sistem memvalidasi resep, mengunci draf resep, dan menerbitkan nomor resep digital (contoh: `#RX-20261111-008`).
  6. Melalui koneksi real-time, order resep langsung muncul di layar Depo Farmasi dengan status *Resep Masuk*.
  7. Apoteker farmasi menerima resep, menyiapkan/meracik obat, dan mengubah status menjadi *Siap Diserahkan*.
  8. Sistem mengirim notifikasi nomor antrian pengambilan obat ke TV Display Farmasi dan akun pasien.
  9. Pasien menyerahkan tiket/QR code di loket obat dan menerima obat beserta konseling apoteker.
* **Post-Condition:** Resep terselesaikan (*Dispensed*), stok obat berkurang otomatis, dan data resep tersimpan di rekam medis elektronik.

---

## 3. Activity Diagram

### 3.1 Activity Diagram 1: Alur Triage Penjamin Biaya pada Kiosk Pendaftaran

```mermaid
flowchart TD
    Start([Mulai: Pasien di Depan Kiosk]) --> Step1[Sentuh Layar & Tampilkan 3 Pilihan Penjamin]
    Step1 --> Choice{Pilih Kategori Penjamin}

    %% Cabang 1: Umum
    Choice -->|Pasien Umum| U1[Input NIK / Scan KTP]
    U1 --> U2[Input Identitas Dasar Pasien]
    U2 --> U3[Tampilkan Estimasi Biaya Konsultasi]
    U3 --> SelectDoctor[Pilih Poliklinik & Dokter]

    %% Cabang 2: BPJS
    Choice -->|BPJS Kesehatan| B1[Input No. Kartu BPJS & No. Rujukan]
    B1 --> B2[Kirim Request Validasi ke API VClaim BPJS]
    B2 --> B3{Validasi Sukses?}
    B3 -->|Tidak| B_Err[Tampilkan Alasan Gagal / Hubungi Petugas] --> End([Selesai])
    B3 -->|Ya| B4[Sistem Terbitkan SEP Otomatis]
    B4 --> SelectDoctor

    %% Cabang 3: Asuransi Swasta
    Choice -->|Asuransi Swasta| A1[Pilih Mitra Asuransi & No. Polis]
    A1 --> A2[Scan / Unggah Kartu Asuransi di Kiosk]
    A2 --> A3[Kirim Tiket Pre-Authorization ke Admin RS]
    A3 --> SelectDoctor

    %% Pemilihan Kuota Dokter
    SelectDoctor --> CheckQuota{Cek Kuota Penjamin Dokter Tersedia?}
    CheckQuota -->|Penuh| QuotaFull[Tampilkan Peringatan Kuota Habis & Tawarkan Jadwal Lain] --> End
    CheckQuota -->|Tersedia| GenTicket[Kurangi Kuota & Buat Nomor Antrian]
    GenTicket --> PrintTicket[Cetak Tiket Thermal Fisik dengan QR Code]
    PrintTicket --> End
```

---

### 3.2 Activity Diagram 2: Alur Pemanggilan Antrian Suara (TTS) & TV Display

```mermaid
flowchart TD
    Start([Dokter Membuka Dashboard Poli]) --> D1[Lihat Daftar Antrian Pasien Menunggu]
    D1 --> D2[Klik Tombol Panggil Suara]
    D2 --> D3[Update Status Antrian: 'DIPANGGIL' di Database]
    D3 --> D4[Emit Event 'call-patient' via WebSocket]
    
    D4 --> TV1[TV Display Terima Event 'call-patient']
    TV1 --> TV2[Perbarui UI Layar: Nomor Antrian, Nama Pasien, Poli, Dokter]
    TV2 --> TV3[Bentuk Kalimat Suara Bahasa Indonesia]
    TV3 --> TV4[Audio Synthesizer Mainkan Suara ke Speaker Lobi]
    
    TV4 --> Wait[Pasien Mendengar & Menuju Ruangan Poli]
    Wait --> D5{Pasien Hadir?}
    D5 -->|Tidak Hadir| Recall[Klik Tombol Recall / Lewati] --> D2
    D5 -->|Hadir| D6[Dokter Mulai Pemeriksaan Medis] --> End([Selesai])
```

---

### 3.3 Activity Diagram 3: Alur Peresepan Digital (E-Prescription) & Farmasi

```mermaid
flowchart TD
    Start([Dokter Selesai Pemeriksaan Medis]) --> E1[Buka Formulir Peresepan Digital E-Prescription]
    E1 --> E2[Sistem Filter Obat Sesuai Jenis Penjamin: Fornas / Non-Fornas]
    E2 --> E3[Dokter Input Item Obat, Dosis, Jumlah, & Signatura]
    E3 --> E4[Klik Tombol 'Terbitkan & Kirim ke Farmasi']
    E4 --> E5[Sistem Kunci Resep & Beri Nomor Resep RX]
    
    E5 --> Sync[Broadcast Real-time ke Depo Farmasi]
    Sync --> F1[Apoteker Melihat Resep Baru di Dashboard Farmasi]
    F1 --> F2[Apoteker Telaah Resep & Cek Interaksi Obat]
    F2 --> F3[Ubah Status Resep: 'SEDANG DIRACIK']
    F3 --> F4[Peracikan Obat & Pengemasan Etiket]
    F4 --> F5[Ubah Status: 'SIAP DISERAHKAN']
    F5 --> F6[Panggil Nomor Antrian Pasien ke Loket Obat]
    F6 --> F7[Penyerahan Obat, Edukasi, & Verifikasi QR Tiket]
    F7 --> End([Selesai: Status Resep 'DISPENSED'])
```

---

## 4. Sequence Diagram

### 4.1 Sequence Diagram 1: Autentikasi Pengguna Medis dengan MFA (TOTP)

```mermaid
sequenceDiagram
    autonumber
    actor Dokter as 🩺 Dokter / Staf
    participant Browser as 💻 Web Browser
    participant AuthController as ⚙️ Auth Controller
    participant AuthService as 🧠 Auth Service
    participant MFAService as 🛡️ TOTP MFA Engine
    participant DB as 🗄️ PostgreSQL

    Dokter->>Browser: Input NIP & Password
    Dokter->>Browser: Input 6-Digit Kode TOTP (Authenticator)
    Browser->>AuthController: POST /api/v1/auth/staff-login {nip, password, totpCode}
    
    AuthController->>AuthService: validateStaffCredential(nip, password)
    AuthService->>DB: SELECT * FROM users WHERE nip = ? AND is_active = true
    DB-->>AuthService: Data User (Password Hash Argon2id, TOTP Secret)
    
    alt Password Salah
        AuthService->>DB: UPDATE users SET failed_attempts = failed_attempts + 1
        AuthService-->>AuthController: Error 401: Kredensial Salah
        AuthController-->>Browser: Tampilkan Alert Gagal (Sisa Percobaan)
    else Password Benar
        AuthService->>MFAService: verifyTOTP(totpCode, totpSecret)
        alt Kode TOTP Tidak Cocok / Expired
            MFAService-->>AuthService: false
            AuthService-->>AuthController: Error 403: Kode MFA Tidak Valid
            AuthController-->>Browser: Tampilkan Alert Kode MFA Salah
        else Kode TOTP Valid
            MFAService-->>AuthService: true
            AuthService->>AuthService: generateJWTKeyPair(userId, role, nip)
            AuthService->>DB: INSERT INTO audit_logs (event='LOGIN_SUCCESS', nip)
            AuthService-->>AuthController: Return Access Token & Set-Cookie Refresh Token
            AuthController-->>Browser: HTTP 200 OK (Redirect ke Dashboard Dokter)
            Browser-->>Dokter: Tampilkan Dashboard Poli & Sesi Aktif
        end
    end
```

---

### 4.2 Sequence Diagram 2: Pendaftaran Pasien BPJS & Validasi VClaim SEP

```mermaid
sequenceDiagram
    autonumber
    actor Pasien as 🏥 Pasien BPJS
    participant Kiosk as 🖥️ Kiosk Mandiri
    participant QueueController as ⚙️ Queue Controller
    participant BPJSService as 🌐 BPJS Integration Service
    participant BPJS_API as 🏛️ BPJS VClaim API
    participant DB as 🗄️ PostgreSQL

    Pasien->>Kiosk: Pilih "BPJS Kesehatan"
    Pasien->>Kiosk: Masukkan No. BPJS & No. Rujukan Faskes 1
    Kiosk->>QueueController: POST /api/v1/queue/validate-bpjs {noBpjs, noRujukan}
    
    QueueController->>BPJSService: checkRujukanPeserta(noBpjs, noRujukan)
    BPJSService->>BPJS_API: GET /Rujukan/Peserta/{noBpjs} (Bearer Token)
    BPJS_API-->>BPJSService: Response Data Rujukan (Poli Tujuan, Diagnosa, Status Aktif)
    
    QueueController->>BPJSService: createSEP(noBpjs, noRujukan, poliCode)
    BPJSService->>BPJS_API: POST /SEP/2.0/insert (Payload Data SEP)
    BPJS_API-->>BPJSService: 200 OK (Nomor SEP: 0115R0021126V000142)
    
    QueueController->>DB: Check Doctor Quota WHERE doctor_id = ? AND penjamin = 'BPJS'
    DB-->>QueueController: Quota Tersedia (14/15 terisi)
    
    QueueController->>DB: INSERT INTO antrian (nomor='B-015', penjamin='BPJS', sep_number, qr_code)
    DB-->>QueueController: Record Created
    QueueController-->>Kiosk: Return Detail Antrian & Data Cetak Tiket
    Kiosk->>Kiosk: Cetak Tiket Thermal Fisik dengan QR Code
    Kiosk-->>Pasien: Keluarkan Tiket B-015 & SEP
```

---

### 4.3 Sequence Diagram 3: Pemanggilan Antrian Real-Time & Text-to-Speech

```mermaid
sequenceDiagram
    autonumber
    actor Dokter as 🩺 Dokter
    participant DocDash as 💻 Dashboard Dokter
    participant WSServer as 🔄 Socket.io / WebSocket Server
    participant TVDisplay as 📺 TV Display Lobi
    participant TTS as 🔊 Web Speech API
    participant DB as 🗄️ PostgreSQL

    Dokter->>DocDash: Klik Tombol "Panggil Suara" (Antrian B-015)
    DocDash->>DB: PATCH /api/v1/queue/B-015/status {status: 'CALLING'}
    DB-->>DocDash: Update Success
    
    DocDash->>WSServer: emit('call_queue', {ticket: 'B-015', poli: 'Penyakit Dalam', room: 'Poli 2', type: 'BPJS'})
    WSServer->>TVDisplay: broadcast('queue_update', payload)
    
    TVDisplay->>TVDisplay: Render Nomor 'B-015' Berkedip di Layar Utama
    TVDisplay->>TTS: speechSynthesis.speak("Nomor antrian B-015, Pasien BPJS, silakan menuju...")
    TTS-->>TVDisplay: Audio Suara Terdengar di Speaker Ruang Tunggu
    TVDisplay-->>Dokter: Status Terpanggil (Terkonfirmasi)
```

---

## 5. Class Diagram (Struktur Kelas & Domain Model)

```mermaid
classDiagram
    %% Entities
    class User {
        +UUID id
        +String nip_or_nik
        +String full_name
        +String email
        +String phone_number
        +String password_hash
        +RoleEnum role
        +String totp_secret
        +Boolean is_mfa_enabled
        +Int failed_login_count
        +DateTime locked_until
        +DateTime created_at
        +validatePassword(String plainPassword) Boolean
        +verifyTOTP(String token) Boolean
        +resetFailedCount() void
    }

    class Pasien {
        +UUID id
        +UUID user_id
        +String no_rekam_medis
        +String nik
        +DateTime tanggal_lahir
        +String jenis_kelamin
        +String alamat
        +String golongan_darah
        +getRiwayatKunjungan() List
    }

    class PenjaminPasien {
        +UUID id
        +UUID pasien_id
        +JenisPenjaminEnum jenis_penjamin
        +String no_kartu
        +String nama_asuransi
        +String no_polis
        +String foto_kartu_url
        +StatusVerifikasiEnum status_verifikasi
        +verifyCoverage() Boolean
    }

    class Dokter {
        +UUID id
        +UUID user_id
        +String sip_number
        +String spesialisasi
        +String nomor_ruangan
        +Boolean is_active
        +getJadwalHariIni() JadwalPoli
    }

    class Poliklinik {
        +UUID id
        +String kode_poli
        +String nama_poli
        +String lokasi_lantai
    }

    class JadwalPoli {
        +UUID id
        +UUID dokter_id
        +UUID poliklinik_id
        +Int hari_minggu
        +Time jam_buka
        +Time jam_tutup
        +Int kuota_umum
        +Int kuota_bpjs
        +Int kuota_asuransi
        +isQuotaAvailable(JenisPenjaminEnum penjamin) Boolean
        +incrementQuota(JenisPenjaminEnum penjamin) void
    }

    class Antrian {
        +UUID id
        +String nomor_antrian
        +UUID jadwal_poli_id
        +UUID pasien_id
        +JenisPenjaminEnum jenis_penjamin
        +String nomor_sep
        +String pre_auth_code
        +StatusAntrianEnum status
        +DateTime waktu_daftar
        +DateTime waktu_panggil
        +DateTime waktu_selesai
        +String qr_code_hash
        +call() void
        +complete() void
    }

    class RekamMedis {
        +UUID id
        +UUID antrian_id
        +UUID dokter_id
        +UUID pasien_id
        +String anamnesa
        +String diagnosa_icd10
        +String tindakan
        +DateTime tanggal_pemeriksaan
    }

    class ResepDigital {
        +UUID id
        +String nomor_resep
        +UUID rekam_medis_id
        +StatusResepEnum status
        +String catatan_dokter
        +DateTime created_at
        +sendToFarmasi() void
        +updateStatus(StatusResepEnum newStatus) void
    }

    class ItemResep {
        +UUID id
        +UUID resep_id
        +UUID obat_id
        +Int jumlah
        +String dosis
        +String aturan_pakai
        +String instruksi_khusus
    }

    class Obat {
        +UUID id
        +String kode_obat
        +String nama_obat
        +String bentuk_sediaan
        +String kekuatan
        +Boolean is_fornas_bpjs
        +Int stok_tersedia
        +Decimal harga_satuan
        +kurangiStok(Int qty) void
    }

    class AuditLog {
        +UUID id
        +UUID user_id
        +String ip_address
        +String action_event
        +String details_json
        +DateTime timestamp
    }

    %% Relationships
    User "1" <|-- "0..1" Pasien : Generalisasi
    User "1" <|-- "0..1" Dokter : Generalisasi
    Pasien "1" *-- "1..*" PenjaminPasien : Memiliki
    Dokter "1" --> "1..*" JadwalPoli : Mengelola
    Poliklinik "1" --> "1..*" JadwalPoli : Menampung
    JadwalPoli "1" --> "0..*" Antrian : Menghasilkan
    Pasien "1" --> "0..*" Antrian : Mendaftar
    Antrian "1" --> "0..1" RekamMedis : Menghasilkan
    RekamMedis "1" *-- "0..1" ResepDigital : Berisi
    ResepDigital "1" *-- "1..*" ItemResep : Terdiri dari
    Obat "1" --> "0..*" ItemResep : Dirujuk oleh
    User "1" --> "0..*" AuditLog : Dicatat pada
```

---

Dokumen pemodelan UML di atas telah memenuhi spesifikasi analisis sistem untuk implementasi basis data dan arsitektur kode program SIMRS RS Mahardika Cirebon.

