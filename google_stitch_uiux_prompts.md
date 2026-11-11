# Panduan & Master Prompt UI/UX Google Stitch
## Sistem Informasi Manajemen Rumah Sakit (SIMRS) RS Mahardika Cirebon

* **Mata Kuliah:** Analisis dan Perancangan Sistem (Praktikum Semester 5)
* **Dokumen Acuan:** PRD v1.2 & Wireframe Spesifikasi
* **Target Platform:** [Google Stitch (stitch.withgoogle.com)](https://stitch.withgoogle.com)
* **Tanggal:** 11 November 2026

---

## 1. Panduan Desain Global & Token Sistem (Design System Tokens)

Sebelum memasukkan prompt per layar, salin dan gunakan **System Context / Style Guide** berikut ke dalam Google Stitch agar menghasilkan desain medis modern yang konsisten:

### 1.1 Color Tokens & Semantik
* **Primary Medical Blue:** `#0A66C2` (Warna identitas RS Mahardika Cirebon - profesional, steril, terpercaya)
* **Primary Deep Navy:** `#0F172A` (Latar belakang gelap monitor TV Lobi & Kiosk)
* **Surface Background:** `#F8F9FA` (Antarmuka bersih, terang, ramah pengguna)
* **Penjamin Umum (Self-Pay):** `#0A66C2` (Aksen Biru Medis)
* **Penjamin BPJS Kesehatan:** `#2E7D32` (Aksen Hijau BPJS Kesehatan)
* **Penjamin Asuransi Swasta:** `#E65100` (Aksen Oranye Aksesibilitas)
* **Text Primary:** `#1E293B` | **Text Secondary:** `#64748B` | **Border:** `#E2E8F0`

### 1.2 Tipografi & Layout
* **Font Family:** Inter / Plus Jakarta Sans / Roboto (Clean Medical Sans)
* **Kiosk & TV Display:** Ukuran heading ekstra besar ($>36\text{pt}$), kontras tinggi (WCAG AAA), jarak baca 5–10 meter.
* **Component Elevation:** Rounded corners `rounded-2xl` (16px), subtle shadows `shadow-sm` hingga `shadow-xl`.

---

## 2. Master Prompts untuk Google Stitch (Siap Salin & Tempel)

Google Stitch membutuhkan prompt yang spesifik, terstruktur per komponen (*component-driven*), dan berorientasi pada konteks medis agar tidak menghasilkan UI generik. 

Berikut adalah **5 Master Prompt** yang dirancang khusus untuk masing-masing layar:

---

### PROMPT 1: Layar Autentikasi Terpadu & MFA (Portal Pasien & Staf)

```text
Design a modern, high-fidelity medical portal login screen for "SIMRS RS Mahardika Cirebon". 

Theme & Aesthetic:
- Clean, professional healthcare web application (light mode surface #F8F9FA with deep blue #0A66C2 accents).
- Centered elevated card container with subtle shadow and rounded-2xl borders.

Header & Branding:
- Hospital logo with a clean blue cross (+) icon and text "SIMRS RS Mahardika Cirebon" with subtitle "Pintu Masuk Terpadu Layanan Rumah Sakit".

Interactive Segmented Control:
- A pill-shaped two-tab toggle at the top:
  1. "👤 Portal Pasien" (Active state: white background, blue text with soft shadow).
  2. "🩺 Dokter & Staf Medis" (Inactive state: slate-500 text).

Tab 1: Patient Login Form
- Input field: "NIK (KTP) / No. WhatsApp / Email" with an icon placeholder.
- Input field: "Kata Sandi" with "Lupa Kata Sandi?" right-aligned link.
- Checkbox: "Ingat saya di perangkat ini".
- Primary button: Solid vibrant blue (#0A66C2) with text "Masuk ke Portal Pasien".
- Divider with text: "atau login cepat".
- Secondary button: Clean border with WhatsApp green badge "💬 Kirim Kode OTP via WhatsApp".
- Footer link: "Belum pernah berobat? Daftar Pasien Baru".

Tab 2: Medical Staff Login Form (MFA Integrated)
- Input field: "Nomor Induk Pegawai (NIP / ID Karyawan)" (example: DOK-1988-004).
- Input field: "Kata Sandi Petugas".
- MFA Section: Warning box with amber shield icon titled "Verifikasi Dua Langkah (MFA Mandatory)".
- Six individual square digit input boxes for TOTP Authenticator code: [7] [4] [2] - [ ] [ ] [ ].
- Security notice in small text: "Akun otomatis terkunci 15 menit setelah 5 kali gagal login."
- Primary Staff button: Dark slate-900 button "Verifikasi & Masuk Dashboard Internal".
```

---

### PROMPT 2: Layar Kiosk Mandiri & Triage Penjamin (Touchscreen Lobi)

```text
Design a futuristic, high-contrast touchscreen Kiosk interface for hospital self-registration at "RS Mahardika Cirebon".

Theme & Resolution:
- Optimized for a 32-inch vertical or widescreen touch monitor.
- Dark mode slate-900 background with glowing border accents and tactile, large touch targets.

Kiosk Header:
- Top bar showing Hospital Logo "RS Mahardika Cirebon", title "ANJUNGAN PENDAFTARAN MANDIRI (KIOSK)", and real-time clock widget "11 Nov 2026 | 08:45 WIB".

Step Progress Indicator:
- Horizontal 4-step stepper at the top:
  Step 1: "Pilih Penjamin" (Highlighted active in blue).
  Step 2: "Validasi Berkas".
  Step 3: "Pilih Dokter & Poli".
  Step 4: "Cetak Tiket QR".

Main Triage Financial Selection (3 Massive Interactive Cards):
Center area displaying 3 large touchable cards with clear visual hierarchy:
1. Card "PASIEN UMUM (Self-Pay)":
   - Blue accent (#0A66C2). Cash/Wallet icon.
   - Tag: "Bayar Mandiri". Subtitle: "Tunai, Debit, Kartu Kredit, QRIS".
2. Card "BPJS KESEHATAN (VClaim / SEP)":
   - Green accent (#2E7D32). Hospital badge icon.
   - Tag: "Integrasi VClaim". Subtitle: "Wajib bawa No. Kartu BPJS & Rujukan Faskes 1".
   - Active selected state with glowing emerald border.
3. Card "ASURANSI SWASTA (Mitra Cashless)":
   - Amber accent (#E65100). Shield icon.
   - Tag: "Pre-Authorization". Subtitle: "Prudential, Allianz, Manulife, Astra Life".

Selected Detail Panel (BPJS View):
- Form inputs with extra-large touchable fields:
  - "Nomor Kartu BPJS / NIK Pasien" (pre-filled: 0001892837461).
  - "Nomor Surat Rujukan Faskes 1" (pre-filled: 0115R0021126P000089).
- Success notification badge: "✓ SEP Otomatis Diterbitkan: 0115R0021126V000142 | Status: AKTIF | Ny. Siti Rahmawati".

Side Panel: Physical Ticket Simulator
- A realistic thermal paper receipt preview showing:
  - Hospital header: "RS MAHARDIKA CIREBON".
  - Large bold queue number: "B-015".
  - Green badge: "PASIEN BPJS KESEHATAN".
  - Destination: "Poli Penyakit Dalam - dr. Handoko, Sp.PD (Ruang Poli 2)".
  - High-contrast printed QR Code with label "SCAN DI POLI".
  - Estimated time: "09:15 WIB (Sisa 3 Pasien Lagi)".
- Bottom buttons: Big touchable "← Batal" and "Cetak Tiket & Lanjut ➔".
```

---

### PROMPT 3: Layar TV Display Antrian Lobi & Audio Synthesizer (Big Screen Monitor)

```text
Design a widescreen 16:9 ultra-readable TV Display monitor interface for hospital waiting lounge at "RS Mahardika Cirebon".

Theme & Readability:
- Deep dark navy/black background (#050B14) with neon-like high-contrast accents designed to be legible from 5 to 10 meters distance.
- Typography: Extra large, bold, sans-serif (>40pt for queue numbers).

Top Banner:
- Left: Hospital Logo + "RS MAHARDIKA CIREBON" + Subtitle "SISTEM ANTRIAN POLIKLINIK TERPADU".
- Right: Large digital clock "09:14:32 WIB" with date "Rabu, 11 November 2026".

Audio Synthesizer Status Bar (Top Sub-header):
- Indigo glowing bar with a pulsing green active signal.
- Text: "🔊 Audio Voice Synthesizer Aktif: 'Nomor antrian B-015, Pasien BPJS, silakan menuju Poliklinik Penyakit Dalam...'".
- Animated audio wave visualizer bars.

Main Screen Split Layout:
Left Side (Hero Active Callout - 60% width):
- Enclosed in a glowing cyan/blue border.
- Header tag: Flashing red pill "SEDANG DIPANGGIL".
- Massive display of queue number: "B-015" in bright golden yellow (#FACC15) with font size ~80pt.
- Color badge below number: Emerald green pill "PASIEN BPJS KESEHATAN".
- Poliklinik Box:
  - Destination: "POLIKLINIK PENYAKIT DALAM (Ruang Poli 2 - Lantai 1)".
  - Doctor Name: "dr. Handoko, Sp.PD".
  - Status indicator: "Siap Melayani".

Right Side (Other Polyclinics Live Queue - 40% width):
- Stack of 4 neat cards showing current numbers in other clinics:
  1. Poli Anak: "dr. Anita Lestari, Sp.A" -> Number: "A-008" (Tag: UMUM / Blue).
  2. Poli Jantung: "dr. Budi Santoso, Sp.JP" -> Number: "C-004" (Tag: ASURANSI / Orange).
  3. Poli Gigi: "drg. Citra Dewi" -> Number: "B-011" (Tag: BPJS / Green).
  4. Depo Farmasi: "Pengambilan Obat Loket 1" -> Number: "F-029" (Purple accent).

Bottom Footer:
- Ticker running text in dark slate bar:
  "INFO RS: Selamat datang di RS Mahardika Cirebon. Pasien BPJS wajib membawa KTP dan surat rujukan. Mohon menjaga ketenangan di ruang tunggu."
```

---

### PROMPT 4: Dashboard Dokter & E-Prescription (Panel Pemeriksaan Medis)

```text
Design a clean, clinical, desktop medical dashboard for an internal medicine specialist (Dokter Spesialis) at "RS Mahardika Cirebon".

Theme & Layout:
- Soft clinical gray background (#F8FAFC) with pure white cards, crisp borders, and blue/emerald accents.
- Responsive two-column layout: Left (Patient Queue List), Right (E-Prescription & Consultation Workspace).

Header Bar:
- Doctor Profile: "dr. Handoko, Sp.PD" with badge "Poli Penyakit Dalam - Ruang 2".
- Clinic Status: Green pill "Poli Buka".
- Quota Counter Badges (separated by guarantor type):
  - "UMUM: 8 / 10" (Blue badge)
  - "BPJS: 14 / 15" (Green badge)
  - "ASURANSI: 3 / 5" (Orange badge)

Left Column: Patient Queue Panel
- Action Buttons at top:
  - Primary Blue Button: "📢 Panggil Suara (TTS)"
  - Secondary Gray: "Panggil Ulang"
  - Green: "Selesai Periksa"
- Patient List with clear color-coded badges:
  - Active Item: "B-015" (Green badge "BPJS"), Patient: "Ny. Siti Rahmawati (46 th)", Status: "Di Ruang Poli", Diagnosa: "DM Tipe 2 Kontrol".
  - Waiting Item 1: "U-009" (Blue badge "UMUM"), Patient: "Tn. Bambang Wijaya (38 th)".
  - Waiting Item 2: "A-004" (Orange badge "PRUDENTIAL"), Patient: "Ny. Jessica Melina (29 th)".

Right Column: E-Prescription (Resep Digital) Workspace
- Header: "Formulir Peresepan Obat Digital" with Prescription ID "#RX-20261111-008".
- Diagnosis Input (ICD-10): Pre-filled "E11.9 - Type 2 diabetes mellitus without complications".
- Drug Allergy Tag: Green badge "Tidak Ada Alergi (NKDA)".
- Prescribed Medication Items List:
  1. Card: "Metformin HCl 500 mg Tablet" | Fornas BPJS | Dose: 3x1 hari sesudah makan | Qty: 60 Tab.
  2. Card: "Glimepiride 2 mg Tablet" | Fornas BPJS | Dose: 1x1 hari pagi hari | Qty: 30 Tab.
- Button: Dashed border "+ Tambah Obat dari Master Formularium BPJS/Umum".
- Doctor's Notes Textarea: "Cek gula darah puasa berkala 1 bulan lagi. Hindari makanan manis berlebih."
- Bottom Action Buttons:
  - Left: "Pratinjau PDF Resep".
  - Right: Blue Solid Button "🚀 Terbitkan & Kirim ke Farmasi".
```

---

### PROMPT 5: Dashboard Admin Pendaftaran & Depo Farmasi (Verifikasi & Dispensing)

```text
Design a modern medical administrative and pharmacy operations dashboard for "RS Mahardika Cirebon".

Theme & Structure:
- Professional light-mode split operations dashboard with dual tabs or side-by-side management cards.
- Clean borders, status pills, and clear chronological queues.

Header:
- "SIMRS Mahardika | Panel Administrasi Pendaftaran & Depo Farmasi".
- Active duty info: "Petugas: Farmasi & Pendaftaran Lt. 1".

Left Panel: Guarantor Document Verification (Admin Pendaftaran)
- Header: "Verifikasi Berkas Pasien Masuk" with badge "3 Perlu Verifikasi".
- Queue Item 1 (Private Insurance):
  - Badge: "PRUDENTIAL (Swasta)" in orange.
  - Patient: "Ny. Jessica Melina" | Polis: "PRU-9921820".
  - Attached files: "Scan Kartu Asuransi.jpg" and "Surat Rujukan.pdf".
  - Actions: Buttons "👁️ Lihat Berkas", "✓ Setujui Pre-Auth", and "✕ Tolak".
- Queue Item 2 (BPJS):
  - Badge: "BPJS KESEHATAN" in green.
  - Patient: "Ny. Siti Rahmawati" | No. BPJS: "0001892837461".
  - Status: "✓ SEP Otomatis Terverifikasi via API VClaim".

Right Panel: Pharmacy Dispensing Queue (Depo Farmasi)
- Header: "Antrian Dispensing Obat Digital" with badge "4 Resep Aktif".
- Prescription Item 1:
  - Orange border: Status "SEDANG DIRACIK".
  - ID: "#RX-20261111-008 (BPJS)" | Patient: "Ny. Siti Rahmawati".
  - Prescribing Doctor: "dr. Handoko, Sp.PD".
  - Medicines summary: "Metformin 500mg (60 tab), Glimepiride 2mg (30 tab)".
  - Action Button: Purple button "🔔 Panggil Pasien ke Loket Obat".
- Prescription Item 2:
  - Green border: Status "SIAP DISERAHKAN".
  - ID: "#RX-20261111-007 (UMUM)" | Patient: "Tn. Dedi Kusnadi".
  - Action Button: Dark slate button "Serahkan Obat & Selesai".
```

---

## 3. Langkah-Langkah Eksekusi di Google Stitch

1. **Buka Platform:** Kunjungi [stitch.withgoogle.com](https://stitch.withgoogle.com) menggunakan akun Google Anda.
2. **Buat Project Baru:** Klik tombol **"New Project"** dan beri nama `SIMRS RS Mahardika Cirebon`.
3. **Set Project Vibe & Context:** Pada kotak chat / prompt kanvas awal, tempelkan **Token Desain** dari Bagian 1 dokumen ini.
4. **Generate Layar Bertahap:** Salin masing-masing **PROMPT 1 sampai 5** di atas satu per satu ke dalam Stitch.
5. **Gunakan Perintah Suara / Vibe Adjustment:** Jika ada komponen yang ingin diperbesar atau disesuaikan warnanya, gunakan perintah kontekstual pada Stitch seperti:
   * *"Make the queue number B-015 bigger and more prominent with high contrast."*
   * *"Ensure the BPJS badge uses emerald green #2E7D32."*
6. **Ekspor Aset:** Setelah desain final terbentuk di Google Stitch, Anda dapat mengunduh tangkapan layar UI beresolusi tinggi atau mengekspor kode frontend (React/HTML/Tailwind) untuk laporan praktikum APSI Anda!

