require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

// Agar file HTML lokal Anda diizinkan mengakses data dari server ini
app.use(cors());

// Inisialisasi Supabase di sisi Backend
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Endpoint khusus untuk mengambil data produk
app.get('/api/products', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('Product')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;

    // Mapping data agar strukturnya pas dengan properti (img, desc) di app.js Anda
    const mappedProducts = data.map(row => ({
      id:        row.id,
      brand:     row.brand,
      name:      row.name,
      category:  row.category,
      img:       row.image_url  || '',
      desc:      row.description || '',
      shades:    Array.isArray(row.shades)  ? row.shades  : [],
      matches:   Array.isArray(row.matches) ? row.matches : []
    }));

    res.json(mappedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal mengambil data produk dari database.' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend hibrida berjalan di http://localhost:${PORT}`);
});