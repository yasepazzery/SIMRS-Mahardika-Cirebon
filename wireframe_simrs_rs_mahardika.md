# Dokumen Perancangan Antarmuka & Wireframe
## Sistem Informasi Manajemen Rumah Sakit (SIMRS) RS Mahardika Cirebon

* **Mata Kuliah:** Analisis dan Perancangan Sistem (Praktikum Semester 5)
* **Dokumen Acuan:** PRD v1.2 (`prd_simrs_rs_mahardika_cirebon (gemini).md`)
* **Tanggal:** 11 November 2026
* **Status:** Final Wireframe Design & UI Specifications

---

## 1. Arsitektur Informasi & Peta Situs (Site Map)

Sistem SIMRS RS Mahardika Cirebon dirancang dengan pemisahan antarmuka pengguna berbasis peran (*Role-Based Access Control* / RBAC):

```
                                  [Portal SIMRS Mahardika]
                                             │
                      ┌──────────────────────┴──────────────────────┐
                      ▼                                             ▼
            [Layanan Publik & Pasien]                     [Layanan Internal Medis]
                      │                                             │
         ┌────────────┴────────────┐                   ┌────────────┴────────────┐
         ▼                         ▼                   ▼                         ▼
   [Portal Pasien]         [Kiosk Mandiri]     [Dashboard Dokter]       [Dashboard Admin & Farmasi]
   (Web & Mobile)          (Touchscreen Lobi)  - Antrian Color-Coded    - Verifikasi Berkas
   - Login NIK / OTP       - Triage Penjamin   - Kontrol Panggil Suara  - Validasi SEP BPJS
   - Reservasi Dokter        (Umum/BPJS/Asur)  - E-Prescribing          - Pre-Auth Asuransi
   - Unduh Resep PDF       - Cetak Tiket QR                             - Dispensing Obat
                                   │
                                   ▼
                         [TV Display Antrian]
                         - Big Screen Monitor
                         - Audio TTS Suara ID
```

---

## 2. Wireframe 1: Layar Autentikasi Terpadu & MFA (Modul 4.1)

### 2.1 Deskripsi Antarmuka
Halaman *Single Entry Point* yang mendeteksi dan memisahkan alur masuk Pasien (kemudahan akses) dengan Tenaga Medis/Staf Internal (keamanan tinggi dengan TOTP MFA).

### 2.2 Skema Layout (ASCII Wireframe)

```
+-----------------------------------------------------------------------------+
|                                RS MAHARDIKA CIREBON                         |
|                           Portal Masuk Terpadu SIMRS                        |
+-----------------------------------------------------------------------------+
|                                                                             |
|                       +-------------------------------+                     |
|                       |  [+] RS MAHARDIKA CIREBON     |                     |
|                       |                               |                     |
|                       |  [ Tab: Pasien ] [ Tab: Staf ]|                     |
|                       |  -----------------------------|                     |
|                       |                               |                     |
|                       |  [ALUR DOKTER & STAF INTERNAL]|                     |
|                       |                               |                     |
|                       |  NIP / ID Karyawan:           |                     |
|                       |  [ DOK-1988-004             ] |                     |
|                       |                               |                     |
|                       |  Kata Sandi Petugas:          |                     |
|                       |  [ ••••••••••••••••         ] |                     |
|                       |                               |                     |
|                       |  +-- [🛡️ MFA / 2FA Mandatory] +|                     |
|                       |  | Masukkan 6 Digit Kode TOTP:|                     |
|                       |  | [ 7 ] [ 4 ] [ 2 ] - [_][_][_] |                   |
|                       |  +----------------------------+|                     |
|                       |                               |                     |
|                       |  [  VERIFIKASI & MASUK SISTEM ]|                     |
|                       |                               |                     |
|                       |  * Auto-logout inaktif 15 mnt |                     |
|                       |  * Maksimal 5x gagal login    |                     |
|                       +-------------------------------+                     |
|                                                                             |
+-----------------------------------------------------------------------------+
```

### 2.3 Komponen Utama & Interaksi
1. **Role Switcher Tab:** Beralih cepat antara form Pasien (NIK/No WA + OTP) dan Form Dokter/Admin (NIP + Password + MFA).
2. **MFA 6-Digit Slot:** Komponen input 6 digit angka untuk sinkronisasi token TOTP (Google Authenticator) sesuai spesifikasi Modul 4.1 PRD.
3. **Peringatan Keamanan:** Notifikasi proteksi *rate-limiting* (akun terkunci setelah 5 kesalahan berturut-turut).

---

## 3. Wireframe 2: Kiosk Pendaftaran Mandiri & Triage Penjamin Biaya (Modul 4.2 & 4.3)

### 3.1 Deskripsi Antarmuka
Layar sentuh anjungan pendaftaran mandiri di lobi utama rumah sakit untuk pendaftaran langsung tanpa antri di loket manual.

### 3.2 Skema Layout (ASCII Wireframe)

```
+-----------------------------------------------------------------------------+
| [M] KIOSK ANJUNGAN PENDAFTARAN MANDIRI               Rabu, 11 Nov 2026 08:45|
| RS Mahardika Cirebon - Sentuh Layar untuk Memilih                           |
+-----------------------------------------------------------------------------+
|  (1) PILIH PENJAMIN  ==>  (2) VALIDASI BERKAS  ==>  (3) POLI  ==>  (4) TIKET |
+-----------------------------------------------------------------------------+
|                                                                             |
|                SILAKAN PILIH KATEGORI PENJAMIN BIAYA ANDA:                  |
|                                                                             |
|   +-------------------+  +-------------------+  +-------------------+        |
|   |       [ 💵 ]      |  |       [ 🏥 ]      |  |       [ 🛡️ ]      |        |
|   |    PASIEN UMUM    |  |  BPJS KESEHATAN   |  |  ASURANSI SWASTA  |        |
|   |     (Self-Pay)    |  |  (VClaim / SEP)   |  | (Mitra Cashless)  |        |
|   |                   |  |                   |  |                   |        |
|   | Bayar mandiri via |  | Masukkan No BPJS  |  | Prudential,       |        |
|   | Tunai, QRIS, Card |  | & No Rujukan Fask |  | Allianz, Astra    |        |
|   +-------------------+  +-------------------+  +-------------------+        |
|                                                                             |
| +-------------------------------------------------------------------------+ |
| | [FORM DETAIL BPJS TERPILIH]                                             | |
| | No. Kartu BPJS / NIK: [ 0001892837461                                 ] | |
| | No. Rujukan Faskes 1: [ 0115R0021126P000089                           ] | |
| |                                                                         | |
| | [✓] SEP TERBIT OTOMATIS: 0115R0021126V000142 | Status: AKTIF           | |
| |     Pasien: Ny. Siti Rahmawati | Poli Tujuan: Penyakit Dalam            | |
| +-------------------------------------------------------------------------+ |
|                                                                             |
|   [ < BATAL / KEMBALI ]                      [ LANJUT & CETAK TIKET > ]     |
+-----------------------------------------------------------------------------+
```

### 3.3 Tiket Antrian Fisik (Cetak Thermal Kiosk)
```
+-----------------------------------+
|        RS MAHARDIKA CIREBON       |
|  Jl. Brigjen Dharsono 45 Cirebon  |
|-----------------------------------|
|        NOMOR ANTRIAN POLI         |
|                                   |
|              B-015                |
|                                   |
|     [ PASIEN BPJS KESEHATAN ]     |
|-----------------------------------|
| Poli Tujuan : Penyakit Dalam      |
| Dokter      : dr. Handoko, Sp.PD  |
| Ruang       : Poli 2 (Lantai 1)   |
| Jam Est.    : 09:15 WIB           |
|                                   |
|             [QR CODE]             |
|          *SCAN DI POLI*           |
+-----------------------------------+
```

---

## 4. Wireframe 3: Layar TV Display Antrian Lobi & Audio TTS (Modul 4.5)

### 4.1 Deskripsi Antarmuka
Tampilan layar TV monitor ruang tunggu berukuran 43–65 inch dengan tipografi kontras tinggi yang dapat terbaca jelas dari jarak 5–10 meter, terintegrasi dengan pemanggilan audio suara otomatis.

### 4.2 Skema Layout (ASCII Wireframe)

```
+-----------------------------------------------------------------------------+
| [+] RS MAHARDIKA CIREBON                                       09:14:32 WIB |
|     Sistem Antrian Poliklinik Terpadu               Rabu, 11 November 2026  |
+-----------------------------------------------------------------------------+
|                                                                             |
| +------------------------------------+  +---------------------------------+ |
| | [🔴 SEDANG DIPANGGIL]              |  | STATUS POLIKLINIK LAINNYA       | |
| |                                    |  |                                 | |
| |           NOMOR ANTRIAN            |  | Poli Anak & Tumbuh Kembang      | |
| |                                    |  | dr. Anita Lestari, Sp.A         | |
| |               B-015                |  | [ A-008 ]   (UMUM)              | |
| |                                    |  |---------------------------------| |
| |      [ PASIEN BPJS KESEHATAN ]     |  | Poli Jantung & Pembuluh Darah   | |
| |                                    |  | dr. Budi Santoso, Sp.JP         | |
| |------------------------------------|  | [ C-004 ]   (ASURANSI SWASTA)   | |
| | POLI TUJUAN : POLI PENYAKIT DALAM  |  |---------------------------------| |
| | DOKTER      : dr. Handoko, Sp.PD   |  | Loket Depo Farmasi              | |
| | LOKASI      : Ruang Poli 2 (Lt. 1) |  | [ F-029 ]   (PENGAMBILAN OBAT)  | |
| +------------------------------------+  +---------------------------------+ |
|                                                                             |
| +-------------------------------------------------------------------------+ |
| | [INFO RS]: Selamat datang di RS Mahardika Cirebon. Pasien BPJS wajib    | |
| | membawa surat rujukan asli. Jaga ketertiban dan ketenangan ruang tunggu.| |
+-------------------------------------------------------------------------+
```

### 4.3 Spesifikasi Suara Text-to-Speech (TTS Engine)
* **Format Kalimat Panggilan:**
  > *"Nomor antrian B-015, Pasien BPJS, silakan menuju Poliklinik Penyakit Dalam RS Mahardika Cirebon, Ruang Poli 2."*
* **Trigger:** Dijalankan ketika dokter atau perawat menekan tombol "Panggil / Call" pada Dashboard Poli.

---

## 5. Wireframe 4: Dashboard Dokter & E-Prescription (Modul 4.4)

### 5.1 Deskripsi Antarmuka
Workspace terpadu untuk dokter spesialis: memonitor antrian pasien dengan indikator penjamin warna-warni, memicu audio panggil antrian, dan menginput resep digital langsung ke farmasi.

### 5.2 Skema Layout (ASCII Wireframe)

```
+-----------------------------------------------------------------------------+
| SIMRS Mahardika | Dashboard Dokter: dr. Handoko, Sp.PD (Poli Penyakit Dalam) |
+-----------------------------------------------------------------------------+
| KUOTA HARI INI: [Umum: 8/10] | [BPJS: 14/15] | [Asuransi Swasta: 3/5]       |
+-----------------------------------------------------------------------------+
| [DAFTAR ANTRIAN PASIEN]           | [FORM PERESEPAN OBAT DIGITAL (E-RX)]    |
|                                   |                                         |
| Kontrol: [📢 Panggil] [Selesai]   | Pasien: Ny. Siti Rahmawati (BPJS)       |
|                                   | No. Rekam Medis: #RM-2026-8812          |
| * B-015 (BPJS) [Di Poli]          | Diagnosis ICD-10: E11.9 (DM Tipe 2)     |
|   Ny. Siti Rahmawati (46 th)      | Riwayat Alergi  : NKDA (Tidak Ada)      |
|                                   |                                         |
| * U-009 (UMUM) [Menunggu]         | DAFTAR OBAT RESEP DIGITAL:              |
|   Tn. Bambang Wijaya (38 th)      | +-------------------------------------+ |
|                                   | | 1. Metformin HCl 500 mg Tablet      | |
| * A-004 (PRUDENTIAL) [Menunggu]   | |    Dosis: 3 x 1 Hari (Sesudah Makan)| |
|   Ny. Jessica Melina (29 th)      | |    Jumlah: 60 Tablet  [Fornas BPJS] | |
|                                   | |-------------------------------------| |
|                                   | | 2. Glimepiride 2 mg Tablet          | |
|                                   | |    Dosis: 1 x 1 Hari (Pagi Hari)    | |
|                                   | |    Jumlah: 30 Tablet  [Fornas BPJS] | |
|                                   | +-------------------------------------+ |
|                                   | [ + Tambah Obat dari Master Katalog ]   |
|                                   |                                         |
|                                   | Catatan Khusus Apoteker & Pasien:       |
|                                   | [ Cek Gula Darah Puasa 1 bulan lagi.  ] |
|                                   |                                         |
|                                   | [ Pratinjau PDF ] [🚀 KIRIM KE FARMASI] |
+-----------------------------------------------------------------------------+
```

### 5.3 Sistem Warna Status Penjamin (Color-Coded Badging)
* **Biru Medis (`#0A66C2`):** Pasien Umum (Self-Pay)
* **Hijau BPJS (`#2E7D32`):** Pasien BPJS Kesehatan
* **Oranye Aksesibilitas (`#E65100`):** Pasien Asuransi Swasta

---

## 6. Wireframe 5: Dashboard Admin RS & Loket Farmasi (Modul 4.6 & 4.7)

### 6.1 Deskripsi Antarmuka
Panel kontrol staf pendaftaran untuk verifikasi berkas rujukan/asuransi dan loket apoteker untuk meracik resep yang dikirim dokter secara instan.

### 6.2 Skema Layout (ASCII Wireframe)

```
+-----------------------------------------------------------------------------+
| SIMRS Mahardika | Panel Administrasi Pendaftaran & Depo Farmasi             |
+-----------------------------------------------------------------------------+
| [PANEL VERIFIKASI BERKAS PENJAMIN]   | [ANTRIAN DISPENSING FARMASI]         |
| 3 Pasien Menunggu Validasi           | 4 Resep Digital Masuk                |
|                                      |                                      |
| * Ny. Jessica Melina (PRUDENTIAL)    | * Resep: #RX-20261111-008 (BPJS)     |
|   Dokumen: Scan Polis & ID           |   Pasien: Ny. Siti Rahmawati         |
|   Status: Pre-Auth Perlu Validasi    |   Dokter: dr. Handoko, Sp.PD         |
|   [Lihat Berkas] [✓ Setujui] [✕]     |   Obat  : Metformin & Glimepiride    |
|                                      |   Status: [ SEDANG DIRACIK ]         |
| * Ny. Siti Rahmawati (BPJS)          |   [ 🔔 Panggil Pasien ke Loket Obat ]|
|   SEP: Terbit Otomatis via VClaim    |                                      |
|   Faskes: Puskesmas Kesambi          | * Resep: #RX-20261111-007 (UMUM)     |
|   Status: [✓ Berkas Lengkap]         |   Pasien: Tn. Dedi Kusnadi           |
|                                      |   Status: [ SIAP DISERAHKAN ]        |
|                                      |   [ Serahkan Obat & Selesai ]        |
+-----------------------------------------------------------------------------+
```

---

## 7. Akses Prototipe Interaktif HTML

Prototipe interaktif lengkap dengan navigasi antar-halaman, simulasi seleksi triage penjamin, serta **pengujian pemanggilan suara (Text-to-Speech) Bahasa Indonesia langsung di browser** telah dibuat pada berkas:

* **File Prototipe HTML:** [`wireframe_simrs.html`](file:///C:/Users/User/.gemini/antigravity/brain/62d2616f-b6bf-4037-b265-8a732c3772a2/wireframe_simrs.html)

*(Dapat dibuka langsung di browser Google Chrome / Edge untuk menguji interaksi klik dan suara panggilan antrian).*

