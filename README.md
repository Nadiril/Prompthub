# PromptHub

PromptHub adalah website pustaka prompt AI berbasis komunitas. Aplikasi ini dibuat untuk membantu pengguna menemukan, menjelajahi, menyalin, dan mengirim prompt AI berdasarkan kategori seperti Coding, Writing, Marketing, Design, Research, Business, dan Education.

Project ini menggunakan **Next.js App Router**, **React**, **Tailwind CSS**, **Framer Motion**, dan **Supabase** untuk autentikasi serta penyimpanan data prompt.

---

## ✨ Fitur utama

- **Landing page modern** dengan hero section, search bar, CTA, animasi, dan daftar prompt unggulan.
- **Browse prompt** dengan fitur pencarian berdasarkan judul, deskripsi, tag, serta filter kategori.
- **Submit prompt** untuk pengguna yang sudah login.
- **Login dan register** menggunakan Supabase Auth.
- **Integrasi Supabase** untuk menyimpan prompt ke tabel `prompts`.
- **Multi-language support**: English dan Bahasa Indonesia.
- **UI responsif** dengan tema dark, gradient violet, dan animasi Framer Motion.
- **Data dummy prompt** sebagai konten awal aplikasi.

---

## 🛠️ Tech stack

| Bagian | Teknologi |
|---|---|
| Framework | Next.js 16 |
| UI Library | React 19 |
| Styling | Tailwind CSS 4 |
| Animasi | Framer Motion |
| Backend-as-a-Service | Supabase |
| Auth | Supabase Auth |
| Linting | ESLint |

---

## 📁 Struktur folder penting

```bash
Prompthub/
├── app/
│   ├── page.jsx              # Halaman utama / landing page
│   ├── browse/page.jsx       # Halaman jelajah prompt
│   ├── submit/page.jsx       # Halaman submit prompt
│   ├── login/page.jsx        # Halaman login
│   └── register/page.jsx     # Halaman register
├── components/               # Komponen UI reusable
├── data/
│   └── prompts.js            # Data dummy prompt, kategori, stats, dan fitur
├── lib/
│   ├── supabase.js           # Konfigurasi Supabase client
│   ├── auth-context.js       # Auth context untuk login, register, logout
│   ├── i18n.js               # Terjemahan English dan Indonesia
│   └── queries/              # Query helper untuk Supabase
├── public/                   # Asset gambar dan file statis
├── package.json
└── README.md
```

---

## 🚀 Cara menjalankan project

### 1. Clone repository

```bash
git clone https://github.com/Nadiril/Prompthub.git
cd Prompthub
```

### 2. Install dependencies

```bash
npm install
```

### 3. Buat file environment

Buat file `.env.local` di root project:

```env
NEXT_PUBLIC_SUPABASE_URL=isi_url_supabase_kamu
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=isi_anon_or_publishable_key_supabase_kamu
```

> Catatan: nama variabel harus sama seperti di atas karena project membaca `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.

### 4. Jalankan development server

```bash
npm run dev
```

Buka browser ke:

```bash
http://localhost:3000
```

---

## 🧩 Script yang tersedia

| Script | Fungsi |
|---|---|
| `npm run dev` | Menjalankan project di mode development |
| `npm run build` | Membuat production build |
| `npm run start` | Menjalankan hasil build production |
| `npm run lint` | Menjalankan ESLint |

---

## 🔐 Konfigurasi Supabase

Project ini menggunakan Supabase untuk:

- autentikasi user,
- membaca profile user,
- menyimpan prompt baru dari halaman submit.

Minimal, pastikan Supabase Auth sudah aktif dan project memiliki tabel berikut.

### Tabel `prompts`

Contoh struktur sederhana:

```sql
create table prompts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  content text not null,
  ai_tool text,
  user_id uuid references auth.users(id),
  tags text[] default '{}',
  created_at timestamp with time zone default now()
);
```

### Tabel `profiles`

Contoh struktur sederhana:

```sql
create table profiles (
  id uuid primary key references auth.users(id),
  username text,
  avatar_url text,
  bio text,
  created_at timestamp with time zone default now()
);
```

Jika memakai Row Level Security, pastikan policy Supabase disesuaikan agar user yang login bisa membaca profile dan mengirim prompt.

---

## 🧭 Alur penggunaan aplikasi

1. Pengguna membuka halaman utama.
2. Pengguna mencari prompt melalui search bar atau masuk ke halaman Browse.
3. Di halaman Browse, pengguna bisa memilih kategori dan mencari prompt berdasarkan kata kunci.
4. Pengguna bisa login atau register menggunakan email dan password.
5. Setelah login, pengguna bisa mengirim prompt melalui halaman Submit.
6. Data prompt akan dikirim ke tabel `prompts` di Supabase.

---

## 🌐 Halaman aplikasi

| Route | Keterangan |
|---|---|
| `/` | Landing page PromptHub |
| `/browse` | Daftar prompt dan filter kategori |
| `/submit` | Form submit prompt, membutuhkan login |
| `/login` | Login user |
| `/register` | Register user |

---

## 🎨 UI/UX

PromptHub memakai gaya visual dark modern dengan:

- background gelap,
- aksen violet/purple,
- card transparan,
- border halus,
- rounded corner,
- animasi masuk menggunakan Framer Motion,
- layout responsif untuk desktop dan mobile.

---

## 📌 Status project

Project masih dalam tahap pengembangan. Beberapa fitur yang bisa dikembangkan berikutnya:

- detail page untuk setiap prompt,
- fitur like/save prompt,
- profile page user,
- dashboard admin untuk review prompt,
- integrasi data prompt penuh dari Supabase,
- pagination atau infinite scroll,
- fitur copy prompt yang lebih lengkap,
- validasi dan moderation prompt.

---

## 👨‍💻 Author

**Muhammad Nadiril Khoir**  
GitHub: [@Nadiril](https://github.com/Nadiril)

---

## 📄 License

Belum ditentukan. Tambahkan file `LICENSE` jika project ingin dibuat open-source dengan lisensi tertentu.
