require('dotenv').config({ path: '.env' }); // rename your _env file to .env locally
const express  = require('express');
const cors     = require('cors');
const { createClient } = require('@supabase/supabase-js');

// ── Supabase ───────────────────────────────────────────────────────────────
// Make sure SUPABASE_URL and SUPABASE_ANON_KEY are set:
//   • Locally  : in a file named ".env" (rename _env → .env)
//   • Vercel   : Settings → Environment Variables in the dashboard
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve all static HTML/CSS/JS files from the project root
// (lets you open the site at http://localhost:3000 locally)
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
      img:      row.image_url   || '',
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
// Returns all published posts joined with the author's profile.
// The client converts these into the same shape renderThreadPost() expects.
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
      time:      row.created_at,   // client formats this with sbTimeAgo()
      text:      row.text          || '',
      images:    Array.isArray(row.images) ? row.images : [],
      likes:     row.likes_count   || 0,
      comments:  row.comments_count || 0,
      saves:     0,
      productId: row.product_id    || null,
      cat:       row.category      || 'opinion'
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