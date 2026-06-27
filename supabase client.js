// =============================================================================
// SUPABASE CLIENT — shared by index.html, profile.html, and app.js (bookmarks.html)
// Loaded after the supabase-js CDN script, before each page's own logic.
// =============================================================================
const SUPABASE_URL     = 'https://cxzrrrcksrzdpfhlheld.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_yKPowwmZWHaoJhevzH008g_5RayYnSv';

// Guard: if the CDN failed to load, 'supabase' is undefined.
// We create a stub 'sb' so nothing crashes at module load time.
// Every function that uses sb checks SB_READY first and shows a clear error.
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

// Fetches the profile row for a user, creating it on first login if it
// doesn't exist yet (covers the "confirm e-mail" signup flow, where the
// profile can't be written until the person is actually authenticated).
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
// POSTS (only real posts the user publishes — the algorithmic demo feed
// content in PRODUCTS/FEED_POSTS stays exactly as-is, client-side)
// -----------------------------------------------------------------------------
async function sbCreatePost({userId, text, images, productId, category}){
  if(!SB_READY) return null;
  const { data, error } = await sb.from('posts').insert({
    user_id:userId, text, images:images||[], product_id:productId||null, category:category||'opinion'
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

// Converts a posts-table row into the same shape renderThreadPost() already expects.
// `user` is the same currentUser-shaped object used everywhere else in the app
// (displayName / username / avatar), not a raw profiles-table row.
function sbPostRowToUIPost(row, user){
  return {
    id: row.id,
    user: user.username,
    name: user.displayName,
    av: (user.displayName||'U').slice(0,2).toUpperCase(),
    img: user.avatar||'',
    time: sbTimeAgo(row.created_at),
    text: row.text||'',
    images: row.images||[],
    likes: row.likes_count||0,
    comments: row.comments_count||0,
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
// Maps a Supabase auth user + profile row into the same `currentUser` shape
// the existing UI code already expects (displayName, username, bio, avatar,
// banner, avatarLetters, followers, following, posts).
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

// KODE BARU MENGGUNAKAN JALUR HYBRID (NODE.JS):
async function sbFetchProducts() {
  try {
    // Memanggil server Node.js lokal yang berjalan di port 3000
    const response = await fetch('http://localhost:3000/api/products');
    
    if (!response.ok) {
      throw new Error('Respon dari server backend hibrida tidak OK');
    }
    
    // Server Node.js sudah melakukan mapping, jadi kita tinggal mengambil hasilnya
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Gagal mengambil data produk via Node.js Hybrid:', error);
    return null;
  }
}