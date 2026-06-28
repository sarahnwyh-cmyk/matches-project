require('dotenv').config({ path: '.env' });
const express  = require('express');
const cors     = require('cors');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// ── /api/products ──────────────────────────────────────────────────────────
app.get('/api/products', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('Product')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;

    const mapped = data.map(row => ({
      id:       row.id,
      brand:    row.brand,
      name:     row.name,
      category: row.category,
      // BUG FIX: image_url adalah text[] (array). Ambil elemen pertama.
      img:      (Array.isArray(row.image_url) ? row.image_url[0] : row.image_url) || '',
      desc:     row.description || '',
      shades:   Array.isArray(row.shades)  ? row.shades  : [],
      matches:  Array.isArray(row.matches) ? row.matches : []
    }));

    res.json(mapped);
  } catch (err) {
    console.error('/api/products error:', err.message);
    res.status(500).json({ error: 'Gagal mengambil data produk.' });
  }
});

// ── /api/posts ─────────────────────────────────────────────────────────────
app.get('/api/posts', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*, profiles(display_name, username, avatar_url)')
      .order('created_at', { ascending: false })
      .limit(60);

    if (error) throw error;

    const mapped = data.map(row => ({
      id:        row.id,
      user:      row.profiles?.username     || '@user',
      name:      row.profiles?.display_name || 'User',
      av:        (row.profiles?.display_name || 'U').slice(0, 2).toUpperCase(),
      img:       row.profiles?.avatar_url   || '',
      time:      row.created_at,         // client formats ini dengan sbTimeAgo()
      text:      row.text                || '',
      // BUG FIX: Nama kolom di tabel adalah `image` (singular), bukan `images`
      images:    Array.isArray(row.image) ? row.image : [],
      likes:     row.likes_count         || 0,
      // BUG FIX: Nama kolom di tabel adalah `comment_count` (singular), bukan `comments_count`
      comments:  row.comment_count       || 0,
      saves:     0,
      productId: row.product_id          || null,
      cat:       row.category            || 'opinion'
    }));

    res.json(mapped);
  } catch (err) {
    console.error('/api/posts error:', err.message);
    res.status(500).json({ error: 'Gagal mengambil data posts.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});