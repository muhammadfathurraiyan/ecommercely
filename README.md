## Installasi secara lokal
- download source code
- navigasi ke directory lalu buka prompt
- jalankan npm install
- buat file env, buat 1 variabel dengan key POSTGRES_PRISMA_URL, dan valuenya disesuaikan dengan database masing masing
- jalankan npx prisma init di prompt
- jalankan npx prisma migrate dev --name init
- jalankan npm run dev
