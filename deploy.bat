@echo off
echo [1/3] Menandai semua perubahan file baru...
git add .

echo [2/3] Membuat catatan otomatis...
git commit -m "Auto update: %date% %time%"

echo [3/3] Mengirim kode ke GitHub dan Vercel...
git push origin main

echo --- SELESAI! GitHub terupdate dan Vercel sedang membangun ulang websitemu ---
pause