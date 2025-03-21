# Project Name

## Getting Started

Ikuti langkah-langkah berikut untuk menjalankan proyek setelah di-clone.

### Prerequisites

Pastikan Anda telah menginstal:

- [Node.js](https://nodejs.org/) (versi terbaru disarankan)
- [Yarn](https://yarnpkg.com/) atau [npm](https://www.npmjs.com/)

### Instalasi

1. Clone repository ini:
   ```sh
   git clone https://github.com/hariirawan/go-finance
   ```
2. Masuk ke direktori proyek:
   ```sh
   cd go-finance
   ```
3. Install dependencies:
   ```sh
   yarn install
   ```
   atau jika menggunakan npm:
   ```sh
   npm install
   ```
   atau jika menggunakan bun:
   ```sh
   bun install
   ```

### Menjalankan Proyek

Jalankan proyek dengan perintah berikut:

```sh
yarn dev
```

atau dengan npm:

```sh
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000` secara default.

## Struktur Folder

Berikut adalah struktur folder proyek dan penjelasan fungsinya:

```
project-name/
│── src/                   # Folder utama source code
│   │── app/               # Konfigurasi utama aplikasi
│   │── components/        # Komponen UI reusable
│   │── constants/         # Konstanta global (misal: keys, enums)
│   │── hooks/             # Custom hooks untuk state management dan fetching data
│   │── lib/               # Modul atau utilitas tambahan
│   │── providers/         # Konteks atau penyedia layanan aplikasi
│   │── types/             # Definisi tipe TypeScript
│   │── middleware.ts      # Middleware untuk menangani request atau authentication
│── .env.example           # Contoh file environment variables
│── package.json           # Konfigurasi dependencies proyek
│── README.md              # Dokumentasi proyek
│── tsconfig.json          # Konfigurasi TypeScript
```

## Teknologi yang Digunakan

- **Axios**: Untuk fetching API
- **Cookies**: Untuk menyimpan token autentikasi
- **TanStack**: Untuk state management

## Konfigurasi Environment

Buat file `.env` di root proyek berdasarkan `.env.example` dan isi dengan konfigurasi API yang sesuai.

```env
NEXT_PUBLIC_API_URL=https://reqres.in/api
```

## Lisensi

Proyek ini menggunakan lisensi [MIT](LICENSE).
