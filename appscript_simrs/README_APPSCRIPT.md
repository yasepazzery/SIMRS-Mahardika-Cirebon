# Panduan Lengkap Instalasi & Deployment Google Apps Script (Fullstack)
## SIMRS RS Mahardika Cirebon

* **Mata Kuliah:** Analisis dan Perancangan Sistem (Praktikum Semester 5)
* **Kepatuhan Desain:** PRD v1.2 & UI/UX `DESIGN.md` (Mahardika Clinical Core)
* **Arsitektur:** Google Apps Script Web App Engine (`HtmlService` Modular Best Practices)

---

## 1. Struktur File Proyek Google Apps Script

Berdasarkan acuan *Google Apps Script Best Practice*, proyek ini tidak dijadikan satu file raksasa `Code.gs` saja, melainkan dipecah secara modular menjadi **7 file Script (`.gs`)** di sisi server dan **6 file HTML (`.html`)** di sisi klien:

```
appscript_simrs/
│
├── [SERVER-SIDE .GS FILES]
│   ├── Code.gs                --> Entry point doGet(e), include() helper, & API Dispatcher
│   ├── Database.gs            --> Persistence layer (Script Properties) & Master Seed Data
│   ├── AuthService.gs         --> Login Pasien vs Staf Medis (NIP + TOTP MFA 6-Digit)
│   ├── QueueService.gs        --> Triage 3 Penjamin, SEP VClaim otomatis, & TTS Generator
│   ├── DoctorService.gs       --> Kuota Poli, Antrian Color-Coded, & E-Prescription Form
│   ├── PharmacyService.gs     --> Dispensing Obat di Depo Farmasi & Status Racik
│   └── AdminService.gs        --> Verifikasi Berkas Klaim Pre-Auth Asuransi Swasta
│
└── [CLIENT-SIDE .HTML FILES]
    ├── Index.html             --> Master Layout Shell & Top Role Navigation Bar
    ├── Stylesheet.html        --> Tailwind CDN, Google Fonts, & Design System Tokens
    ├── Javascript.html        --> Client Bridge (google.script.run), TTS Speech Engine & Router
    ├── ViewAuth.html          --> Layar 1: Portal Login & MFA TOTP
    ├── ViewKiosk.html         --> Layar 2: Kiosk Mandiri Lobi (Triage 3 Penjamin & Tiket QR)
    ├── ViewTVDisplay.html     --> Layar 3: TV Display Lobi & Panggilan Suara (TTS Bahasa Indonesia)
    ├── ViewDoctor.html        --> Layar 4: Dashboard Dokter Spesialis & Resep Digital
    ├── ViewAdminPharmacy.html --> Layar 5: Admin Pendaftaran & Depo Farmasi
    └── ViewPatientPortal.html --> Layar 6: Portal Pasien Reservasi & Riwayat Resep PDF
```

---

## 2. Langkah-Langkah Copy-Paste ke Google Apps Script (Hanya 3 Menit)

### Langkah 1: Buka Google Apps Script Editor
1. Buka browser dan kunjungi: **[script.google.com](https://script.google.com)**
2. Klik tombol **"+ Proyek baru"** (New Project).
3. Beri nama proyek di kiri atas: `SIMRS RS Mahardika Cirebon`.

---

### Langkah 2: Buat & Salin Berkas Server (`.gs`)
Dalam editor Apps Script, secara default sudah ada file `Code.gs`.
1. **Buka `Code.gs` bawaan**, hapus isinya, lalu salin seluruh isi dari file:
   * 📄 [`Code.gs`](file:///d:/MAHARDIKA/MATA%20KULIAH/SMT%205/ANALISIS%20DAN%20PERANCANGAN%20SISTEM/praktikum/SIMRS%20Mahardika/appscript_simrs/Code.gs)
2. Klik tombol **"+"** di sebelah tulisan *Files* / *Berkas* -> Pilih **"Script"**:
   * Beri nama: `Database` -> Salin isi dari: [`Database.gs`](file:///d:/MAHARDIKA/MATA%20KULIAH/SMT%205/ANALISIS%20DAN%20PERANCANGAN%20SISTEM/praktikum/SIMRS%20Mahardika/appscript_simrs/Database.gs)
   * Beri nama: `AuthService` -> Salin isi dari: [`AuthService.gs`](file:///d:/MAHARDIKA/MATA%20KULIAH/SMT%205/ANALISIS%20DAN%20PERANCANGAN%20SISTEM/praktikum/SIMRS%20Mahardika/appscript_simrs/AuthService.gs)
   * Beri nama: `QueueService` -> Salin isi dari: [`QueueService.gs`](file:///d:/MAHARDIKA/MATA%20KULIAH/SMT%205/ANALISIS%20DAN%20PERANCANGAN%20SISTEM/praktikum/SIMRS%20Mahardika/appscript_simrs/QueueService.gs)
   * Beri nama: `DoctorService` -> Salin isi dari: [`DoctorService.gs`](file:///d:/MAHARDIKA/MATA%20KULIAH/SMT%205/ANALISIS%20DAN%20PERANCANGAN%20SISTEM/praktikum/SIMRS%20Mahardika/appscript_simrs/DoctorService.gs)
   * Beri nama: `PharmacyService` -> Salin isi dari: [`PharmacyService.gs`](file:///d:/MAHARDIKA/MATA%20KULIAH/SMT%205/ANALISIS%20DAN%20PERANCANGAN%20SISTEM/praktikum/SIMRS%20Mahardika/appscript_simrs/PharmacyService.gs)
   * Beri nama: `AdminService` -> Salin isi dari: [`AdminService.gs`](file:///d:/MAHARDIKA/MATA%20KULIAH/SMT%205/ANALISIS%20DAN%20PERANCANGAN%20SISTEM/praktikum/SIMRS%20Mahardika/appscript_simrs/AdminService.gs)

*(Catatan: Anda tidak perlu mengetikkan `.gs`, Apps Script otomatis menambahkan ekstensi).*

---

### Langkah 3: Buat & Salin Berkas HTML (`.html`)
Klik tombol **"+"** di sebelah tulisan *Files* / *Berkas* -> Pilih **"HTML"**:
1. Beri nama: `Index` -> Salin isi dari: [`Index.html`](file:///d:/MAHARDIKA/MATA%20KULIAH/SMT%205/ANALISIS%20DAN%20PERANCANGAN%20SISTEM/praktikum/SIMRS%20Mahardika/appscript_simrs/Index.html)
2. Beri nama: `Stylesheet` -> Salin isi dari: [`Stylesheet.html`](file:///d:/MAHARDIKA/MATA%20KULIAH/SMT%205/ANALISIS%20DAN%20PERANCANGAN%20SISTEM/praktikum/SIMRS%20Mahardika/appscript_simrs/Stylesheet.html)
3. Beri nama: `Javascript` -> Salin isi dari: [`Javascript.html`](file:///d:/MAHARDIKA/MATA%20KULIAH/SMT%205/ANALISIS%20DAN%20PERANCANGAN%20SISTEM/praktikum/SIMRS%20Mahardika/appscript_simrs/Javascript.html)
4. Beri nama: `ViewAuth` -> Salin isi dari: [`ViewAuth.html`](file:///d:/MAHARDIKA/MATA%20KULIAH/SMT%205/ANALISIS%20DAN%20PERANCANGAN%20SISTEM/praktikum/SIMRS%20Mahardika/appscript_simrs/ViewAuth.html)
5. Beri nama: `ViewKiosk` -> Salin isi dari: [`ViewKiosk.html`](file:///d:/MAHARDIKA/MATA%20KULIAH/SMT%205/ANALISIS%20DAN%20PERANCANGAN%20SISTEM/praktikum/SIMRS%20Mahardika/appscript_simrs/ViewKiosk.html)
6. Beri nama: `ViewTVDisplay` -> Salin isi dari: [`ViewTVDisplay.html`](file:///d:/MAHARDIKA/MATA%20KULIAH/SMT%205/ANALISIS%20DAN%20PERANCANGAN%20SISTEM/praktikum/SIMRS%20Mahardika/appscript_simrs/ViewTVDisplay.html)
7. Beri nama: `ViewDoctor` -> Salin isi dari: [`ViewDoctor.html`](file:///d:/MAHARDIKA/MATA%20KULIAH/SMT%205/ANALISIS%20DAN%20PERANCANGAN%20SISTEM/praktikum/SIMRS%20Mahardika/appscript_simrs/ViewDoctor.html)
8. Beri nama: `ViewAdminPharmacy` -> Salin isi dari: [`ViewAdminPharmacy.html`](file:///d:/MAHARDIKA/MATA%20KULIAH/SMT%205/ANALISIS%20DAN%20PERANCANGAN%20SISTEM/praktikum/SIMRS%20Mahardika/appscript_simrs/ViewAdminPharmacy.html)
9. Beri nama: `ViewPatientPortal` -> Salin isi dari: [`ViewPatientPortal.html`](file:///d:/MAHARDIKA/MATA%20KULIAH/SMT%205/ANALISIS%20DAN%20PERANCANGAN%20SISTEM/praktikum/SIMRS%20Mahardika/appscript_simrs/ViewPatientPortal.html)

*(Catatan: Anda tidak perlu mengetikkan `.html`, Apps Script otomatis menambahkan ekstensi).*

---

### Langkah 4: Simpan & Deploy sebagai Web App
1. Klik ikon **Simpan Proyek** (Disket / `Ctrl + S`).
2. Di pojok kanan atas, klik tombol biru **"Deploy"** (Terapkan) -> Pilih **"New deployment"** (Penerapan baru).
3. Klik ikon gerigi ⚙️ di sebelah *Select type* -> Pilih **"Web app"**.
4. Isi formulir konfigurasi berikut:
   * **Description:** `SIMRS Mahardika v1.2 Final`
   * **Execute as (Jalankan sebagai):** `Me (email Anda)`
   * **Who has access (Siapa yang memiliki akses):** `Anyone (Siapa saja)` *(Penting agar dosen/penguji dapat membuka tanpa login Google)*
5. Klik **"Deploy"**.
6. Klik **"Authorize access"** (jika diminta izin akses pertama kali) -> Pilih akun Google Anda -> Klik *Advanced* (Lanjutan) -> Klik *Go to SIMRS RS Mahardika Cirebon (unsafe)* -> Klik *Allow*.
7. Salin **Web App URL** yang muncul (contoh: `https://script.google.com/macros/s/.../exec`).
8. Buka tautan tersebut di browser: Sistem SIMRS RS Mahardika Cirebon Anda telah **ONLINE & AKTIF!**

---

## 3. Data Kredensial untuk Pengujian Demo

| Peran Pengguna | ID / NIK / NIP | Kata Sandi | Kode MFA (TOTP) |
|---|---|---|---|
| **Pasien (Umum/BPJS)** | `3274012803890002` | `pasien123` | - (Bisa via OTP WA) |
| **Dokter Spesialis** | `DOK-1988-004` | `dokter123` | `123456` atau `742918` |
| **Admin & Farmasi** | `ADM-012` | `admin123` | `123456` atau `742918` |

---

## 4. Fitur-Fitur Siap Diuji pada Web App

1. **Top Navigation Bar:** Di bagian atas halaman terdapat tombol navigasi cepat untuk beralih instan antara Kiosk Lobi, TV Display, Dokter, Admin/Farmasi, Portal Pasien, dan Login.
2. **Kiosk Touchscreen & Triage Penjamin:**
   * Coba klik kartu **BPJS Kesehatan**: Sistem otomatis memvalidasi ke API VClaim mock dan menerbitkan nomor SEP instan serta tiket `B-015`.
   * Coba klik kartu **Asuransi Swasta**: Otomatis membuat tiket pre-authorization dan mengirimkan berkas ke Admin Pendaftaran.
   * Cetak tiket thermal fisik langsung via tombol *Cetak*.
3. **Panggilan Suara Real (Text-to-Speech):**
   * Di dashboard Dokter, klik **"📢 Panggil Suara (TTS)"** atau di TV Display klik **"Uji Panggil Suara"**: Browser Anda akan menyuarakan panggilan antrian otomatis dalam bahasa Indonesia!
4. **Resep Digital (E-Prescription):**
   * Di dashboard Dokter, tulis obat lalu klik **"Terbitkan & Kirim ke Farmasi"**. Buka menu **Admin & Farmasi**: Resep otomatis masuk secara real-time dan siap diracik!

