// =============================================================================
// SUPABASE CLIENT — shared by index.html, profile.html, and app.js (bookmarks.html)
// Loaded after the supabase-js CDN script, before each page's own logic.
// =============================================================================

// BUG FIX #1: URL tidak boleh punya suffix /rest/v1/
// createClient() sudah menambahkan path secara internal.
// URL yang salah menyebabkan semua request ke endpoint yang tidak ada.
const SUPABASE_URL     = 'https://cxzrrrcksrzdpfhlheld.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_yKPowwmZWHaoJhevzH008g_5RayYnSv';

// Guard: if the CDN failed to load, 'supabase' is undefined.
const SB_READY = (typeof supabase !== 'undefined');
const sb = SB_READY
  ? supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

if(!SB_READY){
  console.error('[matches] Supabase CDN failed to load — auth & database features unavailable.');
}

// -----------------------------------------------------------------------------
// AUTH
// -----------------------------------------------------------------------------
async function sbGetSession(){
  if(!SB_READY) return null;
  const { data, error } = await sb.auth.getSession();
  if(error){ console.error('sbGetSession', error); return null; }
  return data.session;
}

async function sbSignUp({displayName, username, email, password}){
  if(!SB_READY) throw new Error('Koneksi database gagal. Pastikan kamu terhubung ke internet, lalu refresh halaman.');
  const handle = username.startsWith('@') ? username : '@'+username;
  const { data, error } = await sb.auth.signUp({
    email, password,
    options:{ data:{ display_name:displayName, username:handle } }
  });
  if(error) throw error;
  return data;
}

async function sbSignIn({email, password}){
  if(!SB_READY) throw new Error('Koneksi database gagal. Pastikan kamu terhubung ke internet, lalu refresh halaman.');
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if(error) throw error;
  return data;
}

async function sbSignInWithProvider(provider){
  if(!SB_READY) throw new Error('Koneksi database gagal. Pastikan kamu terhubung ke internet, lalu refresh halaman.');
  const { error } = await sb.auth.signInWithOAuth({ provider, options:{ redirectTo: location.href } });
  if(error) throw error;
}

async function sbSignOut(){
  if(!SB_READY) return;
  await sb.auth.signOut();
}

async function sbEnsureProfile(user){
  if(!SB_READY) return null;
  if(!SB_READY || !user) return null;
  const { data: existing, error: fetchErr } = await sb.from('profiles').select('*').eq('id', user.id).maybeSingle();
  if(fetchErr){ console.error('sbEnsureProfile fetch', fetchErr); }
  if(existing) return existing;

  const meta = user.user_metadata||{};
  const { data, error } = await sb.from('profiles').insert({
    id: user.id,
    username: meta.username || ('@user'+user.id.slice(0,8)),
    display_name: meta.display_name || 'New User',
    bio: 'New to Matches!'
  }).select().single();
  if(error){ console.error('sbEnsureProfile insert', error); return null; }
  return data;
}

async function sbUpdateProfile(userId, fields){
  if(!SB_READY) return null;
  const { error } = await sb.from('profiles').update(fields).eq('id', userId);
  if(error) throw error;
}

// -----------------------------------------------------------------------------
// POSTS
// -----------------------------------------------------------------------------

// BUG FIX #2: Kolom images di tabel posts bernama `image` (singular), bukan `images`.
// Menulis ke kolom yang tidak ada menyebabkan data gambar hilang diam-diam.
async function sbCreatePost({userId, text, images, productId, category}){
  if(!SB_READY) return null;
  const { data, error } = await sb.from('posts').insert({
    user_id:  userId,
    text,
    image:    images||[],       // FIX: nama kolom adalah `image`, bukan `images`
    product_id: productId||null,
    category: category||'opinion'
  }).select().single();
  if(error) throw error;
  return data;
}

async function sbFetchMyPosts(userId){
  if(!SB_READY) return null;
  const { data, error } = await sb.from('posts').select('*').eq('user_id', userId).order('created_at',{ascending:false});
  if(error){ console.error('sbFetchMyPosts', error); return []; }
  return data;
}

function sbPostRowToUIPost(row, user){
  return {
    id: row.id,
    user: user.username,
    name: user.displayName,
    av: (user.displayName||'U').slice(0,2).toUpperCase(),
    img: user.avatar||'',
    time: sbTimeAgo(row.created_at),
    text: row.text||'',
    // BUG FIX #3: Kolom adalah `image` (singular)
    images: Array.isArray(row.image) ? row.image : [],
    likes: row.likes_count||0,
    // BUG FIX #4: Kolom adalah `comment_count` (singular), bukan `comments_count`
    comments: row.comment_count||0,
    saves: 0,
    productId: row.product_id||null,
    cat: row.category||'opinion'
  };
}

function sbTimeAgo(iso){
  const diff = (Date.now() - new Date(iso).getTime())/1000;
  if(diff < 60) return 'baru saja';
  if(diff < 3600) return Math.floor(diff/60)+' menit lalu';
  if(diff < 86400) return Math.floor(diff/3600)+' jam lalu';
  if(diff < 604800) return Math.floor(diff/86400)+' hari lalu';
  return Math.floor(diff/604800)+' minggu lalu';
}

// -----------------------------------------------------------------------------
// FOLLOWS
// -----------------------------------------------------------------------------
async function sbFetchFollowing(userId){
  if(!SB_READY) return null;
  const { data, error } = await sb.from('follows').select('following_handle').eq('follower_id', userId);
  if(error){ console.error('sbFetchFollowing', error); return []; }
  return data.map(r=>r.following_handle);
}

async function sbToggleFollow(userId, handle, currentlyFollowing){
  if(!SB_READY) return null;
  if(currentlyFollowing){
    const { error } = await sb.from('follows').delete().eq('follower_id', userId).eq('following_handle', handle);
    if(error) throw error;
  } else {
    const { error } = await sb.from('follows').insert({ follower_id:userId, following_handle:handle });
    if(error) throw error;
  }
}

// -----------------------------------------------------------------------------
// SAVED POSTS / SAVED REVIEWS (bookmarks)
// -----------------------------------------------------------------------------
async function sbFetchSavedPostIds(userId){
  if(!SB_READY) return null;
  const { data, error } = await sb.from('saved_posts').select('post_id').eq('user_id', userId);
  if(error){ console.error('sbFetchSavedPostIds', error); return []; }
  return data.map(r=>r.post_id);
}
async function sbToggleSavePost(userId, postId, currentlySaved){
  if(!SB_READY) return null;
  if(currentlySaved){
    const { error } = await sb.from('saved_posts').delete().eq('user_id', userId).eq('post_id', postId);
    if(error) throw error;
  } else {
    const { error } = await sb.from('saved_posts').insert({ user_id:userId, post_id:postId });
    if(error) throw error;
  }
}

async function sbFetchSavedReviewIds(userId){
  if(!SB_READY) return null;
  const { data, error } = await sb.from('saved_reviews').select('review_id').eq('user_id', userId);
  if(error){ console.error('sbFetchSavedReviewIds', error); return []; }
  return data.map(r=>r.review_id);
}
async function sbToggleSaveReview(userId, reviewId, currentlySaved){
  if(!SB_READY) return null;
  if(currentlySaved){
    const { error } = await sb.from('saved_reviews').delete().eq('user_id', userId).eq('review_id', reviewId);
    if(error) throw error;
  } else {
    const { error } = await sb.from('saved_reviews').insert({ user_id:userId, review_id:reviewId });
    if(error) throw error;
  }
}

// -----------------------------------------------------------------------------
// LIKES
// -----------------------------------------------------------------------------
async function sbFetchLikedPostIds(userId){
  if(!SB_READY) return null;
  const { data, error } = await sb.from('post_likes').select('post_id').eq('user_id', userId);
  if(error){ console.error('sbFetchLikedPostIds', error); return []; }
  return data.map(r=>r.post_id);
}
async function sbToggleLikePost(userId, postId, currentlyLiked){
  if(!SB_READY) return null;
  if(currentlyLiked){
    const { error } = await sb.from('post_likes').delete().eq('user_id', userId).eq('post_id', postId);
    if(error) throw error;
  } else {
    const { error } = await sb.from('post_likes').insert({ user_id:userId, post_id:postId });
    if(error) throw error;
  }
}

// -----------------------------------------------------------------------------
// Build currentUser shape from profile row
// -----------------------------------------------------------------------------
function sbBuildCurrentUser(profile, followingCount, postsCount){
  return {
    id: profile.id,
    displayName: profile.display_name,
    username: profile.username,
    bio: profile.bio||'',
    avatar: profile.avatar_url||'',
    banner: profile.banner_url||'',
    avatarLetters: (profile.display_name||'U').slice(0,2).toUpperCase(),
    followers: '0',
    following: followingCount||0,
    posts: postsCount||0
  };
}

function sbFriendlyError(error){
  if(!error) return 'Terjadi kesalahan.';
  const msg = error.message||String(error);
  if(msg.includes('duplicate key value') && msg.includes('username')) return 'Username sudah dipakai, coba username lain.';
  if(msg.includes('Invalid login credentials')) return 'Email atau password salah.';
  if(msg.includes('User already registered')) return 'Email ini sudah terdaftar. Coba sign in.';
  if(msg.includes('Email not confirmed')) return 'Email belum dikonfirmasi. Cek inbox kamu untuk link konfirmasi.';
  if(msg.includes('Password should be at least')) return 'Password minimal 6 karakter.';
  return msg;
}

// Deteksi environment: lokal vs production
const API_BASE = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ? 'http://localhost:3000'
  : '';

// ── Products ──────────────────────────────────────────────────────────────
async function sbFetchProducts() {
  try {
    const response = await fetch(`${API_BASE}/api/products`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (err) {
    console.warn('sbFetchProducts via API gagal, fallback ke Supabase langsung:', err.message);
    if (!SB_READY) return null;
    const { data, error } = await sb.from('Product').select('*').order('created_at', { ascending: true });
    if (error) { console.error('sbFetchProducts direct:', error); return null; }
    return data.map(row => ({
      id:       row.id,
      brand:    row.brand,
      name:     row.name,
      category: row.category,
      // BUG FIX #5: image_url adalah text[] (array). Ambil elemen pertama sebagai string.
      img:      (Array.isArray(row.image_url) ? row.image_url[0] : row.image_url) || '',
      desc:     row.description || '',
      shades:   Array.isArray(row.shades)  ? row.shades  : [],
      matches:  Array.isArray(row.matches) ? row.matches : []
    }));
  }
}

// ── Posts ─────────────────────────────────────────────────────────────────
async function sbFetchPosts() {
  try {
    const response = await fetch(`${API_BASE}/api/posts`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const rows = await response.json();
    return rows.map(r => ({ ...r, time: sbTimeAgo(r.time) }));
  } catch (err) {
    console.warn('sbFetchPosts via API gagal, fallback ke Supabase langsung:', err.message);
    if (!SB_READY) return [];
    const { data, error } = await sb
      .from('posts')
      .select('*, profiles(display_name, username, avatar_url)')
      .order('created_at', { ascending: false })
      .limit(60);
    if (error) { console.error('sbFetchPosts direct:', error); return []; }
    return data.map(row => ({
      id:    row.id,
      user:  row.profiles?.username     || '@user',
      name:  row.profiles?.display_name || 'User',
      av:    (row.profiles?.display_name || 'U').slice(0, 2).toUpperCase(),
      img:   row.profiles?.avatar_url   || '',
      time:  sbTimeAgo(row.created_at),
      text:  row.text   || '',
      // BUG FIX #3 (fallback): kolom adalah `image` (singular)
      images: Array.isArray(row.image) ? row.image : [],
      likes:    row.likes_count    || 0,
      // BUG FIX #4 (fallback): kolom adalah `comment_count` (singular)
      comments: row.comment_count  || 0,
      saves: 0,
      productId: row.product_id || null,
      cat: row.category || 'opinion'
    }));
  }
}