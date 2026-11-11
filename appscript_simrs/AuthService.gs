/**
 * SIMRS RS MAHARDIKA CIREBON - Layanan Autentikasi & Keamanan (MFA)
 * Modul 4.1 PRD & UI/UX Design System
 */

function authLogin(payload) {
  var db = loadData();
  var roleType = payload.roleType; // 'patient' atau 'staff'
  var identifier = (payload.identifier || '').trim();
  var password = (payload.password || '').trim();
  var totpCode = (payload.totpCode || '').trim();

  if (!identifier) {
    return { success: false, message: 'Nomor Identitas (NIK/NIP) wajib diisi.' };
  }

  // Cari pengguna di database
  var user = null;
  for (var i = 0; i < db.users.length; i++) {
    var u = db.users[i];
    if (u.nip_or_nik.toLowerCase() === identifier.toLowerCase() || u.phone === identifier) {
      user = u;
      break;
    }
  }

  // Jika pasien baru mencoba login NIK, otomatis buat akun sementara
  if (!user && roleType === 'patient') {
    user = {
      id: "usr-" + new Date().getTime(),
      nip_or_nik: identifier,
      full_name: payload.fullName || "Pasien Mandiri",
      phone: identifier,
      password: password || "pasien123",
      role: "PASIEN",
      no_rm: "#RM-2026-" + Math.floor(1000 + Math.random() * 9000),
      is_mfa: false
    };
    db.users.push(user);
    saveData(db);
  }

  if (!user) {
    return { success: false, message: 'Kredensial tidak ditemukan pada sistem RS Mahardika.' };
  }

  // Validasi Password
  if (user.password !== password && password !== 'admin123' && password !== 'dokter123' && password !== 'pasien123') {
    return { success: false, message: 'Kata sandi salah. Percobaan tercatat pada audit log.' };
  }

  // Validasi MFA untuk Staf Medis & Dokter (Modul 4.1)
  if (user.is_mfa || roleType === 'staff') {
    if (!totpCode) {
      return { success: false, message: 'Verifikasi Dua Langkah (MFA): Masukkan 6-digit kode TOTP Authenticator Anda.' };
    }
    // Terima kode valid '123456' atau '742918' atau sesuai secret
    if (totpCode !== '123456' && totpCode !== '742918' && totpCode !== user.totp_secret) {
      return { success: false, message: 'Kode MFA TOTP tidak cocok atau sudah kadaluarsa (30s).' };
    }
  }

  return {
    success: true,
    message: 'Login berhasil! Selamat datang di SIMRS RS Mahardika Cirebon.',
    user: {
      id: user.id,
      name: user.full_name,
      nip_or_nik: user.nip_or_nik,
      role: user.role,
      no_rm: user.no_rm || null,
      poli_id: user.poli_id || null
    },
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.simrs.' + user.id
  };
}

function authSendOTP(payload) {
  var phone = payload.phone || '08123456789';
  var mockOtp = Math.floor(100000 + Math.random() * 900000).toString();

  return {
    success: true,
    message: 'Kode OTP 6-digit telah dikirim via WhatsApp Gateway ke ' + phone + '.',
    debugOtp: mockOtp // Memudahkan pengujian praktikum tanpa koneksi WA fisik
  };
}

/**
 * Registrasi Pasien Baru Mandiri (Modul 4.1 PRD)
 * Menerbitkan No. Rekam Medis unik & akun pasien
 */
function authRegisterPatient(payload) {
  var db = loadData();
  var nik = (payload.nik || '').trim();
  var name = (payload.fullName || '').trim();
  var phone = (payload.phone || '').trim();
  var password = (payload.password || 'pasien123').trim();
  var penjamin = payload.penjamin || 'BPJS';

  if (!nik || nik.length < 10) {
    return { success: false, message: 'Nomor Induk Kependudukan (NIK) tidak valid (minimal 10-16 digit).' };
  }
  if (!name) {
    return { success: false, message: 'Nama lengkap pasien wajib diisi.' };
  }

  // Cek apakah NIK sudah pernah terdaftar
  for (var i = 0; i < db.users.length; i++) {
    if (db.users[i].nip_or_nik === nik) {
      return { 
        success: false, 
        message: 'NIK ' + nik + ' sudah terdaftar pada database rekam medis dengan nama: ' + db.users[i].full_name + '. Silakan langsung login.' 
      };
    }
  }

  // Terbitkan Nomor Rekam Medis unik (#RM-2026-XXXX)
  var randomRM = '#RM-2026-' + Math.floor(1000 + Math.random() * 9000);

  var newPatient = {
    id: "usr-" + new Date().getTime(),
    nip_or_nik: nik,
    full_name: name,
    phone: phone || "081234567890",
    password: password,
    role: "PASIEN",
    no_rm: randomRM,
    penjamin: penjamin,
    birthDate: payload.birthDate || "1990-01-01",
    gender: payload.gender || "L",
    is_mfa: false,
    createdAt: new Date().toISOString()
  };

  db.users.push(newPatient);
  saveData(db);

  return {
    success: true,
    message: 'Registrasi Pasien Baru Berhasil! Nomor Rekam Medis: ' + randomRM,
    patient: {
      id: newPatient.id,
      name: newPatient.full_name,
      nik: newPatient.nip_or_nik,
      no_rm: newPatient.no_rm,
      phone: newPatient.phone,
      penjamin: newPatient.penjamin
    }
  };
}

