# Product Requirements Document (PRD)
## Sistem Informasi Manajemen Rumah Sakit (SIMRS) RS Mahardika Cirebon

---

### Meta Information
* **Nama Produk:** Sistem Informasi Manajemen Rumah Sakit (SIMRS) RS Mahardika Cirebon
* **Tipe Platform:** Web Application (Dashboard Admin/Dokter/Super Admin & Kiosk/TV Display Antrian) + Web/Mobile App (Pasien)
* **Versi Dokumen:** v1.2 (Final Draft)
* **Tanggal Dokumen:** 11 November 2026
* **Target Launch:** Q3 2026
* **Otoritas Dokumen:** Divisi Teknologi & Sistem Informasi RS Mahardika Cirebon

---

## 1. Ringkasan Eksekutif (Executive Summary)

SIMRS RS Mahardika Cirebon adalah platform digital terintegrasi yang merampingkan operasional rumah sakit mulai dari autentikasi pengguna, verifikasi kepesertaan penjamin biaya (Pasien Umum, BPJS Kesehatan, dan Asuransi Swasta), reservasi dokter, pemanggilan antrian berbasis suara synthesizer (*Text-to-Speech*), hingga peresepan obat digital. Platform ini dirancang untuk mengatasi penumpukan antrian fisik, menjamin keamanan data medis sesuai regulasi nasional, serta meningkatkan kepuasan layanan pasien di RS Mahardika Cirebon.

---

## 2. Tujuan & Metrik Keberhasilan (Objectives & KPIs)

### 2.1 Tujuan Utama
1. **Fleksibilitas Penjaminan:** Memfasilitasi alur pendaftaran mandiri pasien berdasarkan 3 jenis penjamin biaya (Umum, BPJS Kesehatan, Asuransi Swasta).
2. **Autentikasi Terenkripsi:** Menjamin keamanan akses data medis dan privasi pasien melalui gerbang masuk terpadu (*Multi-Role Authentication & MFA*).
3. **Efisiensi Antrian:** Mengotomatiskan proses pemanggilan antrian di ruang tunggu poliklinik menggunakan audio *synthesizer* berbahasa Indonesia.

### 2.2 Metrik Keberhasilan (KPIs)
* **Waktu Tunggu Layanan:** Rata-rata durasi pendaftaran hingga pemanggilan dokter kurang dari 15 menit.
* **Kecepatan Autentikasi & Verifikasi:** Selesainya proses *login* dan validasi kepesertaan (BPJS/Asuransi) dalam waktu $< 30$ detik.
* **Adopsi Digital:** Minimal 90% reservasi antrian dilakukan secara mandiri via aplikasi/web.
* **Akurasi Penjaminan & Resep:** 0% kegagalan sinkronisasi status penjamin dengan sistem billing, farmasi, dan resep digital.

---

## 3. Matriks Peran Pengguna (User Roles & Personas)

| Peran | Pengguna Target | Fokus Utama & Tanggung Jawab | Hak Akses Utama |
|---|---|---|---|
| **Pasien Umum** | Masyarakat umum (Self-pay) | Login mandiri, pilih poli/dokter, konfirmasi bayar mandiri, cetak tiket antrian | Portal Pasien (Web/Mobile), Kiosk Mandiri |
| **Pasien BPJS** | Peserta BPJS Kesehatan | Login NIK/No. BPJS, integrasi rujukan Faskes 1, penerbitan SEP, cetak tiket antrian | Portal Pasien, Kiosk Mandiri |
| **Pasien Asuransi** | Pemegang Asuransi Swasta | Login akun, klaim *pre-authorization*, unggah kartu asuransi, reservasi poli | Portal Pasien, Kiosk Mandiri |
| **Dokter** | Dokter Spesialis & Umum | Login terverifikasi (NIP+MFA), kelola jadwal/kuota, lihat status penjamin pasien, input resep digital | Dashboard Dokter, Electronic Prescription Panel |
| **Admin RS** | Staf Pendaftaran & Farmasi | Verifikasi berkas BPJS/Asuransi, kontrol panggil antrian suara, kelola resep farmasi | Dashboard Admin RS, Control Room Antrian |
| **Super Admin** | Tim IT RS Mahardika Cirebon | Pengelolaan kredensial (RBAC), audit log keamanan, pemeliharaan server & database | Konsol Super Admin, Audit Trail, Backup Engine |

---

## 4. Kebutuhan Fungsional (Functional Requirements)

### 4.1 Modul Autentikasi & Keamanan Akses (Fitur Login)
* **Gerbang Login Terpadu (Single Entry Point):** Halaman masuk terpusat berbasis *Role-Based Access Control* (RBAC).
* **Autentikasi Pasien:**
  * Login menggunakan **NIK (Nomor Induk Kependudukan)**, **Nomor WhatsApp**, atau **Email** + Password.
  * Opsi **Login Cepat via OTP** (One-Time Password) ke WhatsApp / SMS terdaftar.
* **Autentikasi Dokter & Staf (Admin/Super Admin):**
  * Login menggunakan **NIP / ID Pegawai** + Password.
  * **Multi-Factor Authentication (MFA / 2FA):** Verifikasi kode keamanan tambahan via Google Authenticator (TOTP) atau WhatsApp OTP.
* **Manajemen Sesi & Proteksi:**
  * Fitur *Reset Password* via tautan terenkripsi ke Email / OTP WhatsApp.
  * *Auto-Logout* setelah sesi inaktif selama 15 menit pada layar internal.
  * Manajemen token berbasis JWT (JSON Web Token) dengan mekanisme *Refresh Token*.
  * Proteksi *Brute-Force Rate Limiting* (maksimal 5 kali percobaan login gagal sebelum akun terkunci sementara).

### 4.2 Modul Pilihan Jenis Pasien (Penjamin Biaya)
Sistem mewajibkan pemilihan kategori penjamin biaya pada saat reservasi antrian:
1. **Pasien Umum (Self-Pay):**
   * Input data identitas diri dasar.
   * Langsung memperoleh nomor antrian dan estimasi biaya konsultasi awal.
2. **Pasien BPJS Kesehatan:**
   * Input Nomor Kartu BPJS Kesehatan / NIK.
   * Input Nomor Surat Rujukan dari Faskes 1 (Puskesmas/Klinik).
   * Validasi otomatis Surat Elegibilitas Peserta (SEP) untuk penerbitan tiket antrian Poli BPJS.
3. **Pasien Asuransi Swasta:**
   * Pemilihan penyedia Asuransi Swasta mitra RS Mahardika Cirebon (misal: Prudential, Allianz, Manulife, BRI Life, dll.).
   * Input Nomor Polis & unggah berkas/scan Kartu Asuransi.
   * Integrasi *pre-authorization request* ke Admin RS untuk verifikasi batas pertanggungan.

### 4.3 Modul Pasien (Reservasi & Antrian)
* **Pilih Dokter & Jadwal:** Filter pencarian dokter berdasarkan poliklinik, spesialisasi, hari, dan kuota penjamin.
* **Cetak Tiket Antrian:** Penerbitan tiket digital / cetak struk fisik yang memuat kode QR, nomor antrian, indikator jenis pasien (UMUM / BPJS / ASURANSI), dan estimasi jam periksa.
* **Unduh Resep Obat Digital:** Pengunduhan resep medis (format PDF) yang telah diverifikasi oleh dokter.

### 4.4 Modul Dokter
* **Manajemen Jadwal & Kuota:** Pengaturan jam buka poli serta alokasi kuota pasien per jenis penjamin (contoh: 15 BPJS, 10 Umum, 5 Asuransi Swasta per hari).
* **Dashboard Kunjungan:** Tampilan daftar antrian aktif beserta indikator warna status penjamin pasien:
  * **Hijau:** Pasien Umum
  * **Biru:** Pasien BPJS Kesehatan
  * **Oranye:** Pasien Asuransi Swasta
* **Peresepan Digital:** Menginput rincian obat, dosis, frekuensi minum, dan catatan medis yang tersinkronisasi otomatis ke Depo Farmasi dan Akun Pasien.

### 4.5 Modul Antrian & Pemanggilan Suara (Audio Engine)
* **Panel Kontrol Panggil:** Tombol *Panggil*, *Panggil Ulang (Recall)*, dan *Selesai*.
* **Automated Voice Synthesizer (TTS Engine):** Pemanggilan suara otomatis berbahasa Indonesia di ruang tunggu:
  > *"Nomor antrian B-015, Pasien BPJS, silakan menuju Poliklinik Penyakit Dalam RS Mahardika Cirebon, Ruang Poli 2."*
* **Display Antrian Lobi (Kiosk/TV Monitor):** Tampilan real-time nomor antrian berjalan, nama poli, nama dokter, serta status panggilan.

### 4.6 Modul Admin RS & Farmasi
* **Verifikasi Berkas Penjamin:** Validasi fisik/digital rujukan BPJS dan polis Asuransi Swasta sebelum pasien dipanggil dokter.
* **Manajemen Master Data:** Pengelolaan data dokter, pasien, jenis layanan, dan daftar asuransi mitra.
* **Loket Farmasi:** Menerima resep medis digital dari dokter untuk pemrosesan obat.

### 4.7 Modul Super Admin
* **Role-Based Access Control (RBAC):** Penetapan dan pencabutan hak akses staf internal.
* **Security & Audit Trail:** Pencatatan alamat IP, histori waktu login, percobaan gagal, dan Log aktivitas perubahan data resep.

---

## 5. Alur Pengguna (User Flow Diagram)

```
                         [Halaman Utama / Portal RS]
                                     │
                                     ▼
                      [Halaman Login / Autentikasi]
                                     │
       ┌─────────────────────────────┼─────────────────────────────┐
       ▼                             ▼                             ▼
[Pasien: NIK/WA + OTP/Password] [Dokter: NIP + Pass + MFA]   [Admin: NIP + Pass + MFA]
       │                             │                             │
       ▼                             ▼                             ▼
[Pilih Jenis Pasien]         [Dashboard Dokter]            [Dashboard Admin]
 ├── 1. Pasien Umum           (Lihat Status Penjamin        (Verifikasi Berkas BPJS/
 ├── 2. Pasien BPJS            & Input Resep Digital)        Asuransi & Panggil Antrian)
 └── 3. Pasien Asuransi              │                             │
       │                             ▼                             ▼
       ▼                   [Sinkronisasi Farmasi]       [Trigger Audio TTS & TV Display]
[Pilih Poli & Dokter]                                              │
       │                                                           ▼
       ▼                                                 [Pasien Dipanggil & Unduh Resep]
[Terbit Tiket Antrian (QR)]
```

---

## 6. Kebutuhan Non-Fungsional (Non-Functional Requirements)

* **Keamanan Data & Privasi:**
  * Enkripsi kata sandi menggunakan algoritma **Argon2id** / **bcrypt**.
  * Transmisi data terenkripsi HTTPS (TLS 1.3) dan *SameSite Secure Cookies*.
  * Kepatuhan terhadap regulasi privasi data medis (Permenkes Rekam Medis Elektronik).
* **Performa & Latensi:**
  * Latensi autentikasi & penerbitan token JWT $< 500 \text{ ms}$.
  * Respons panggil suara TTS pada TV Display $< 1 \text{ detik}$ setelah tombol dipanggil.
  * Mampu menangani hingga 1.000 *concurrent users* tanpa degradasi performa.
* **Keandalan & Aksesibilitas:**
  * Target *uptime* sistem minimal 99.9%.
  * Layout responsif di desktop, tablet, smartphone, dan Kiosk Monitor.

---

## 7. Panduan Desain & UX (User Experience)

* **Skema Warna Utama:**
  * Biru RS Mahardika (`#0A66C2` / `#1E88E5`) - Kesan profesional & higienis.
  * Abu-abu Latar (`#F8F9FA`) - Kebersihan antarmuka.
* **Skema Warna Status Penjamin:**
  * **Pasien Umum:** Biru Medis (`#0A66C2`)
  * **Pasien BPJS:** Hijau BPJS (`#2E7D32`)
  * **Pasien Asuransi Swasta:** Oranye Aksesibilitas (`#E65100`)
* **TV Display Antrian:** Tipografi ukuran ekstra besar ($> 36\text{pt}$) dengan kontras tinggi agar terbaca jelas dari jarak $5 - 10 \text{ meter}$.

---

## 8. Rekomendasi Kebutuhan Teknologi (Tech Stack)

| Komponen Arsitektur | Teknologi Terpilih | Catatan Implementasi |
|---|---|---|
| **Frontend Web** | Next.js / React.js (TypeScript) | Server-Side Rendering (SSR) & PWA Ready |
| **Mobile App (Pasien)** | React Native / Flutter | Android & iOS Single Codebase |
| **Backend API Service** | Node.js (NestJS) / Go (Golang) | Performa Microservices & High Concurrency |
| **Autentikasi & Security** | JWT, OAuth 2.0, Express Rate Limit, bcrypt | Enkripsi kredensial & proteksi brute-force |
| **Database Utama** | PostgreSQL | Penyimpanan data relasional pasien, resep, & penjamin |
| **Caching & Session Store** | Redis | Pengelolaan sesi login, token rate-limiting, & state antrian |
| **Integrasi Pihak Ke-3** | BPJS VClaim API & WA Gateway | Validasi SEP & pengiriman OTP / reminder antrian |
| **Real-time & Audio Engine**| WebSockets (Socket.io) + Web Speech API (TTS) | Sinkronisasi instant display & pemanggilan suara |
| **Infrastruktur & Cloud** | Docker, Nginx Reverse Proxy, Cloudflare | Kontainerisasi & perlindungan SSL/DDoS |

---
*Dokumen ini merupakan spesifikasi resmi pengembangan SIMRS RS Mahardika Cirebon.*