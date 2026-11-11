# 🏥 SIMRS RS Mahardika Cirebon
### Sistem Informasi Manajemen Rumah Sakit Terpadu (BPJS VClaim, Kiosk Mandiri, TTS Audio & E-Prescription)

> **Mata Kuliah:** Analisis dan Perancangan Sistem (Praktikum Semester 5)  
> **Dokumen Spesifikasi:** PRD v1.2 (`prd_simrs_rs_mahardika_cirebon (gemini).md`)  
> **Desain Antarmuka:** Google Stitch UI/UX (`DESIGN.md` - Mahardika Clinical Core)  
> **Target Deployment:** Vercel (Static Web App) & Google Apps Script (Cloud Fullstack)

---

## 🌟 Fitur Unggulan Sistem

1. **🔐 Gerbang Autentikasi Terpadu & MFA:**
   * Alur login terpisah: Pasien (NIK / No. WhatsApp OTP) vs Dokter & Staf Medis (NIP + Password + **MFA 6-Digit TOTP Google Authenticator**).
   * Fitur pendaftaran mandiri pasien baru dengan penerbitan Nomor Rekam Medis elektronik instan (`#RM-2026-XXXX`).

2. **🖥️ Kiosk Pendaftaran Mandiri (Triage 3 Penjamin Biaya):**
   * **Pasien Umum:** Pembayaran mandiri (Self-Pay) dengan estimasi biaya otomatis.
   * **BPJS Kesehatan:** Integrasi mock API VClaim, validasi rujukan Faskes 1, dan penerbitan nomor SEP instan.
   * **Asuransi Swasta:** Pengajuan *Pre-Authorization* mitra (Prudential, Allianz, Manulife, Astra Life) ke staf pendaftaran.
   * Cetak tiket thermal fisik ber-QR Code dengan nomor antrian ber-prefix (`B-015`, `U-009`, `A-004`).

3. **📺 TV Display Lobi & Audio Synthesizer (TTS Bahasa Indonesia):**
   * Antarmuka monitor 16:9 kontras tinggi (keterbacaan jarak 5–10 meter).
   * **Automated Voice Synthesizer:** Menggunakan *Web Speech API* yang bersuara otomatis memanggil pasien dalam Bahasa Indonesia melalui speaker:
     > *"Nomor antrian B-015, Pasien BPJS, silakan menuju Poliklinik Penyakit Dalam RS Mahardika Cirebon, Ruang Poli 2."*
   * Monitor status antrian berjalan poliklinik lain & loket farmasi secara real-time.

4. **🩺 Dashboard Dokter Spesialis & E-Prescription:**
   * Tracking kuota harian dokter berdasarkan penjamin (Umum, BPJS, Asuransi).
   * Antrian pasien dengan badge berkode warna (Biru: Umum, Hijau: BPJS, Oranye: Asuransi).
   * Formulir peresepan obat digital (*E-Prescription*) terintegrasi diagnosa ICD-10 dan formularium obat.

5. **🏥 Admin Pendaftaran & Depo Farmasi:**
   * Verifikasi berkas klaim asuransi swasta (*Pre-Auth Approval*).
   * Antrian penyiapan dan peracikan obat apoteker hingga siap diserahkan ke pasien.
   * Manajemen Master Data Dokter baru beserta pengaturan jadwal dan kuota poliklinik.

6. **👤 Portal Pasien:**
   * Pantau nomor antrian berjalan hari ini secara digital dari smartphone.
   * Riwayat resep obat medis digital dan tombol unduh PDF resep.

---

## 📂 Struktur Repositori

```
├── index.html                           --> Entry point utama produksi untuk Vercel
├── vercel.json                          --> Konfigurasi routing & security headers Vercel
├── package.json                         --> Metadata proyek Vercel & npm
├── preview_simrs_app.html               --> File pratinjau mandiri lokal
│
├── appscript_simrs/                     --> Berkas backend Google Apps Script (.gs & .html)
│   ├── Code.gs                          --> doGet(e), include() helper, & API Dispatcher
│   ├── Database.gs                      --> Persistence layer (Script Properties) & Seed Data
│   ├── AuthService.gs                   --> Login NIK & NIP TOTP MFA
│   ├── QueueService.gs                  --> Engine Triage Penjamin & Audio Voice TTS
│   ├── DoctorService.gs                 --> Kuota Poli & E-Prescription
│   ├── PharmacyService.gs               --> Dispensing Obat di Depo Farmasi
│   ├── AdminService.gs                  --> Verifikasi Klaim Asuransi & Master Dokter
│   ├── Index.html                       --> Master Template Apps Script
│   ├── Stylesheet.html                  --> Tailwind CDN & Clinical Core Theme
│   ├── Javascript.html                  --> Client Bridge & Web Speech API TTS
│   └── View*.html                       --> 6 Layar modular (Auth, Kiosk, TV, Dokter, Admin, Portal)
│
├── prd_simrs_rs_mahardika_cirebon.md    --> PRD v1.2 Final Draft
├── wireframe_simrs_rs_mahardika.md       --> Dokumen Spesifikasi Wireframe & Layout ASCII
├── uml_diagrams_simrs_rs_mahardika.md    --> Diagram UML Lengkap (Use Case, Activity, Sequence, Class)
├── erd_database_simrs_rs_mahardika.md   --> ERD & Skrip DDL Basis Data PostgreSQL
└── README.md                            --> Dokumentasi Repositori
```

---

## 🚀 Panduan Deploy ke GitHub & Vercel

### Langkah 1: Push Repositori ke GitHub

1. Buka terminal (PowerShell / Command Prompt) di folder proyek ini:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit SIMRS RS Mahardika Cirebon fullstack"
   git branch -M main
   ```
2. Buat repositori baru di GitHub Anda:
   * Kunjungi [github.com/new](https://github.com/new)
   * Beri nama repository: `simrs-rs-mahardika-cirebon`
   * Pilih **Public** -> Klik **Create repository**.
3. Hubungkan repositori lokal ke GitHub dan lakukan push:
   ```bash
   git remote add origin https://github.com/USERNAME-ANDA/simrs-rs-mahardika-cirebon.git
   git push -u origin main
   ```

---

### Langkah 2: Deploy Otomatis ke Vercel (1-Click)

1. Buka [vercel.com](https://vercel.com) dan login menggunakan akun GitHub Anda.
2. Di dashboard Vercel, klik tombol **"Add New..."** -> Pilih **"Project"**.
3. Di daftar repositori, cari `simrs-rs-mahardika-cirebon` -> Klik **"Import"**.
4. Di halaman konfigurasi Vercel:
   * **Framework Preset:** Pilih `Other` (Vercel otomatis mendeteksi file `index.html` dan `vercel.json`).
   * **Root Directory:** `./`
5. Klik tombol biru **"Deploy"**.
6. Dalam waktu $< 30$ detik, aplikasi Anda selesai di-deploy dan aktif dengan domain publik:
   `https://simrs-rs-mahardika-cirebon.vercel.app`!

---

## 🔑 Kredensial Pengujian Demo

| Peran | ID / NIK / NIP | Kata Sandi | Kode MFA (TOTP) |
|---|---|---|---|
| **Pasien Mandiri** | `3274012803890002` | `pasien123` | - (Bisa via tombol WhatsApp OTP) |
| **Dokter Spesialis** | `DOK-1988-004` | `dokter123` | `123456` |
| **Admin & Farmasi** | `ADM-012` | `admin123` | `123456` |

---
*Dikembangkan untuk Praktikum Analisis dan Perancangan Sistem (APSI) Semester 5.*

