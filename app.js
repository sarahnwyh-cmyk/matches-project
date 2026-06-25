// =============================================
// KONEKSI & INISIALISASI SUPABASE
// =============================================
const SUPABASE_URL = 'https://clgftgpxbllskvbywyyb.supabase.co'; 
const SUPABASE_ANON_KEY = 'sb_publishable_yKPowwmZWHaoJhevzH008g_5RayYnSv'; 

// Menggunakan inisialisasi yang benar sesuai library CDN v2
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// State data global aplikasi Matches
let PRODUCTS = []; 
const REVIEWS_BY_PRODUCT = {};

// Backup data lokal asli jika database Supabase kosong atau gagal loading
const LOCAL_BACKUP_PRODUCTS = [
  {id:'skintint-rose',brand:'Somethinc',name:'Skintint Rose All Day',category:'Base',img:'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80',
   desc:'A lightweight skin tint with SPF 30 that provides buildable coverage and a natural, dewy finish. The Rose All Day edition features a subtle rosy warmth.',
   shades:[
     {name:'01 Porcelain',color:'#f9e2d0',undertone:'Cool Pink',coverage:'Sheer',summary:'Ideal for fair skin with pink undertones. NC10–NC15. Comparable to Wardah Lightening 01.'},
     {name:'02 Ivory Rose',color:'#f4d1b8',undertone:'Warm Neutral',coverage:'Light',summary:'Most popular shade. NC15–NC20. Fans compare this to YOU Cloud Touch N1.'},
     {name:'03 Petal',color:'#e8bc9a',undertone:'Warm',coverage:'Light-Medium',summary:'Buildable warm coverage. NC20–NC25.'},
     {name:'04 Bloom',color:'#d4b195',undertone:'Neutral',coverage:'Medium',summary:'Deep neutral beige. Fits skin tone NC25–NC30.'}
   ]},
  {id:'cushion-esqa',brand:'Esqa',name:'Flawless Cushion Foundation',category:'Base',img:'https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?w=600&q=80',
   desc:'A high-coverage cushion foundation that blurs imperfections and leaves a flawless, satin matte finish. Long-wearing and non-comedogenic.',
   shades:[
     {name:'Vanilla',color:'#f7dfc6',undertone:'Cool',coverage:'Full',summary:'Fair with pink undertones. Match for Make Over 01.'},
     {name:'Custard',color:'#edd0ac',undertone:'Warm Yellow',coverage:'Full',summary:'Light medium with warm undertones. Very safe for Indonesian skin.'},
     {name:'Granola',color:'#e2bd93',undertone:'Neutral',coverage:'Full',summary:'Medium beige with neutral hue. NC30–NC35.'}
   ]},
  {id:'liptint-rollover',brand:'Rollover Reaction',name:'Dewdrop Lip and Cheek Tint',category:'Lips',img:'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&q=80',
   desc:'A multi-use hydrating gel-tint that melts into lips and cheeks for a healthy, fresh juicy look. Infused with 8 botanical extracts.',
   shades:[
     {name:'Sour Cherry',color:'#902534',undertone:'Cool Berry',coverage:'Sheer-to-Bold',summary:'Deep cherry red. Looks stunning on cool undertones or deep lips.'},
     {name:'Ginger Ale',color:'#c27c62',undertone:'Warm Nude',coverage:'Sheer',summary:'Nude beige brown. Perfect base for an ombre lip look.'}
   ]}
];

// =============================================
// AMBIL DATA DARI DATABASE SUPABASE
// =============================================
async function fetchProductsFromSupabase() {
  try {
    // Meminta data ke tabel bernama 'products' di Supabase kamu
    const { data, error } = await supabase.from('products').select('*');

    if (error) throw error;

    if (data && data.length > 0) {
      // Jika kolom shades di database berupa teks JSON string, parse otomatis menjadi array JS
      PRODUCTS = data.map(product => {
        if (typeof product.shades === 'string') {
          try {
            product.shades = JSON.parse(product.shades);
          } catch (e) {
            console.error("Gagal melakukan parse kolom shades untuk ID: " + product.id, e);
          }
        }
        return product;
      });
      console.log('Berhasil memuat data dari Supabase:', PRODUCTS);
    } else {
      console.log('Tabel database kosong atau tidak ditemukan data, memuat data lokal cadangan.');
      PRODUCTS = LOCAL_BACKUP_PRODUCTS;
    }
  } catch (err) {
    console.error('Koneksi database gagal, beralih ke cadangan lokal:', err.message);
    PRODUCTS = LOCAL_BACKUP_PRODUCTS;
  }
}

// =============================================
// GLOBAL STATE & APP LOGIC
// =============================================
let SHADE_BAG = [];
let COMMUNITY_REVIEWS = [];
let currentUser = null;

let currentView = 'discover'; 
let filterCategory = 'All';
let filterSearch = '';

let userSkinTone = 'Fair';
let userUndertone = 'Neutral';

let currentViewedProductId = null;

// =============================================
// NAVIGATION & PAGE VIEW ACTIONS
// =============================================
function switchView(viewName) {
  currentView = viewName;
  
  document.querySelectorAll('.nav a').forEach(a => a.classList.remove('active'));
  const activeNav = document.getElementById('nav-' + viewName);
  if(activeNav) activeNav.classList.add('active');

  document.getElementById('view-discover').style.display = 'none';
  document.getElementById('view-matcher').style.display = 'none';
  document.getElementById('view-feed').style.display = 'none';
  document.getElementById('view-profile').style.display = 'none';
  document.getElementById('view-detail').style.display = 'none';

  if (viewName === 'discover') {
    document.getElementById('view-discover').style.display = '';
    renderDiscover();
  } else if (viewName === 'matcher') {
    document.getElementById('view-matcher').style.display = '';
    renderMatcher();
  } else if (viewName === 'feed') {
    document.getElementById('view-feed').style.display = '';
    renderFeed();
  } else if (viewName === 'profile') {
    document.getElementById('view-profile').style.display = '';
    renderProfile();
  }
  
  window.scrollTo({top:0, behavior:'smooth'});
}

function scrollToTop(){
  window.scrollTo({top:0, behavior:'smooth'});
}

function viewProduct(id) {
  currentViewedProductId = id;
  currentView = 'detail';
  
  document.querySelectorAll('.nav a').forEach(a => a.classList.remove('active'));
  
  document.getElementById('view-discover').style.display = 'none';
  document.getElementById('view-matcher').style.display = 'none';
  document.getElementById('view-feed').style.display = 'none';
  document.getElementById('view-profile').style.display = 'none';
  
  document.getElementById('view-detail').style.display = '';
  renderDetail(id);
  window.scrollTo({top:0, behavior:'smooth'});
}

function backToPrevious() {
  switchView('discover');
}

// =============================================
// COMPONENT RENDERING
// =============================================
function selectCategory(catName, btnElement) {
  filterCategory = catName;
  document.querySelectorAll('.cat-pills button').forEach(b => b.classList.remove('active'));
  if(btnElement) btnElement.classList.add('active');
  renderDiscover();
}

// Diperbaiki agar onSearchInput dideklarasikan secara global dengan benar
window.onSearchInput = function(val) {
  filterSearch = val.toLowerCase();
  renderDiscover();
}

function renderDiscover() {
  const container = document.getElementById('discover-grid');
  if(!container) return;

  let filtered = PRODUCTS;
  if(filterCategory !== 'All') {
    filtered = filtered.filter(p => p.category.toLowerCase() === filterCategory.toLowerCase());
  }
  if(filterSearch) {
    filtered = filtered.filter(p => p.brand.toLowerCase().includes(filterSearch) || p.name.toLowerCase().includes(filterSearch));
  }

  if(filtered.length === 0) {
    container.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted);">Tidak ada produk yang cocok dengan pencarian Anda.</div>`;
    return;
  }

  container.innerHTML = filtered.map(p => `
    <div class="product-card" onclick="viewProduct('${p.id}')">
      <div class="p-img"><img src="${p.img}" alt="${p.name}" loading="lazy"/></div>
      <div class="p-info">
        <div class="p-brand">${escapeHtml(p.brand)}</div>
        <div class="p-name">${escapeHtml(p.name)}</div>
        <div class="p-meta">${p.shades ? p.shades.length : 0} Shades &middot; ${escapeHtml(p.category)}</div>
      </div>
    </div>
  `).join('');
}

function selectTone(tone) {
  userSkinTone = tone;
  document.querySelectorAll('#tone-group button').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
}

function selectUndertone(under) {
  userUndertone = under;
  document.querySelectorAll('#under-group button').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
}

function runMatcher() {
  const resultsContainer = document.getElementById('matcher-results');
  resultsContainer.style.display = 'block';

  let html = `<h3 style="font-family:var(--font-serif);font-size:1.4rem;margin-bottom:16px;">Rekomendasi Shade Anda:</h3>`;
  let matchesFound = 0;

  PRODUCTS.forEach(p => {
    if(!p.shades) return;
    const matchShade = p.shades.find(s => 
      s.undertone.toLowerCase().includes(userUndertone.toLowerCase()) || 
      s.summary.toLowerCase().includes(userSkinTone.toLowerCase())
    ) || p.shades[0];

    if(matchShade) {
      matchesFound++;
      html += `
        <div class="match-item" onclick="viewProduct('${p.id}')">
          <img src="${p.img}" alt="" />
          <div class="match-info">
            <div class="match-p-name"><b>${escapeHtml(p.brand)}</b> &middot; ${escapeHtml(p.name)}</div>
            <div class="match-shade-pill">
              <span class="match-color-dot" style="background:${matchShade.color}"></span>
              ${escapeHtml(matchShade.name)} (${escapeHtml(matchShade.undertone)})
            </div>
            <p class="match-summary">${escapeHtml(matchShade.summary)}</p>
          </div>
        </div>
      `;
    }
  });

  resultsContainer.innerHTML = html;
  resultsContainer.scrollIntoView({behavior:'smooth'});
}

function renderMatcher() {
  document.getElementById('matcher-results').style.display = 'none';
}

function renderDetail(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if(!p) return;

  document.getElementById('det-brand').textContent = p.brand;
  document.getElementById('det-name').textContent = p.name;
  document.getElementById('det-cat').textContent = p.category;
  document.getElementById('det-img').src = p.img;
  document.getElementById('det-desc').textContent = p.desc;

  const shadeList = document.getElementById('det-shades-list');
  if(p.shades && p.shades.length > 0) {
    shadeList.innerHTML = p.shades.map(s => {
      const isInBag = SHADE_BAG.some(b => b.productId === id && b.shadeName === s.name);
      return `
        <div class="shade-row">
          <div class="shade-swatch" style="background:${s.color}"></div>
          <div class="shade-details">
            <div class="shade-title">${escapeHtml(s.name)} <span style="font-size:0.8rem;color:var(--text-muted);font-weight:400;margin-left:8px;">${escapeHtml(s.undertone)} &middot; ${escapeHtml(s.coverage)} Coverage</span></div>
            <div class="shade-desc">${escapeHtml(s.summary)}</div>
          </div>
          <button class="action-btn ${isInBag?'accent':''}" onclick="toggleBag('${id}','${escapeHtml(s.name)}')">
            ${isInBag ? 'Saved' : 'Save'}
          </button>
        </div>
      `;
    }).join('');
  } else {
    shadeList.innerHTML = `<p style="color:var(--text-muted)">Tidak ada data variasi warna.</p>`;
  }

  renderProductReviews(id);
}

function toggleBag(productId, shadeName) {
  const index = SHADE_BAG.findIndex(b => b.productId === productId && b.shadeName === shadeName);
  if(index > -1) {
    SHADE_BAG.splice(index, 1);
  } else {
    SHADE_BAG.push({productId, shadeName, addedAt: new Date().toLocaleDateString('id-ID')});
  }
  saveSession();
  renderDetail(productId);
}

function renderProductReviews(productId) {
  const container = document.getElementById('det-reviews-container');
  const localList = REVIEWS_BY_PRODUCT[productId] || [];
  const globalList = COMMUNITY_REVIEWS.filter(r => r.productId === productId);
  const combined = [...localList, ...globalList];

  if(combined.length === 0) {
    container.innerHTML = `<p style="color:var(--text-muted);font-style:italic;font-size:0.95rem;">Belum ada ulasan untuk produk ini.</p>`;
    return;
  }

  container.innerHTML = combined.map(r => `
    <div class="review-card">
      <div class="review-header">
        <div class="review-av">${r.img ? `<img src="${r.img}" alt=""/>` : r.av}</div>
        <div>
          <div class="review-name">${escapeHtml(r.user)}</div>
          <div class="review-meta">${r.time}</div>
        </div>
      </div>
      <div class="review-text">${escapeHtml(r.text)}</div>
    </div>
  `).join('');
}

function openAddReviewModal() {
  if(!currentUser) {
    openModal('loginOverlay');
    return;
  }
  openModal('reviewOverlay');
}

function submitReview() {
  const text = document.getElementById('reviewInputText').value.trim();
  if(!text || !currentViewedProductId) return;

  const newReview = {
    productId: currentViewedProductId,
    user: currentUser.displayName,
    av: currentUser.avatarLetters || currentUser.displayName.slice(0,2).toUpperCase(),
    img: currentUser.avatar || '',
    time: 'Baru saja',
    text: text
  };

  if(!REVIEWS_BY_PRODUCT[currentViewedProductId]) {
    REVIEWS_BY_PRODUCT[currentViewedProductId] = [];
  }
  REVIEWS_BY_PRODUCT[currentViewedProductId].unshift(newReview);
  COMMUNITY_REVIEWS.unshift(newReview);

  document.getElementById('reviewInputText').value = '';
  closeModal('reviewOverlay');
  renderDetail(currentViewedProductId);
}

function renderFeed() {
  const container = document.getElementById('global-feed-container');
  let baseFeed = [];
  PRODUCTS.forEach(p => {
    if(p.id === 'skintint-rose') {
      baseFeed.push({productId: p.id, user:'Sara H.', av:'SH', time:'2 hari lalu', text:'Suka banget sama teksturnya yang ringan! Nggak bikin cakey seharian.'});
    }
  });

  const combinedFeed = [...COMMUNITY_REVIEWS, ...baseFeed];

  if(combinedFeed.length === 0) {
    container.innerHTML = `<p style="text-align:center;color:var(--text-muted);padding:24px;">Belum ada ulasan di komunitas.</p>`;
    return;
  }

  container.innerHTML = combinedFeed.map(r => {
    const p = PRODUCTS.find(x => x.id === r.productId);
    return `
      <div class="review-card" onclick="viewProduct('${r.productId}')" style="cursor:pointer">
        <div class="recap-target" style="margin-bottom:8px">Produk: <b>${p ? p.brand + ' &middot; ' + p.name : 'Kosmetik'}</b></div>
        <div class="review-header">
          <div class="review-av">${r.img ? `<img src="${r.img}" alt=""/>` : r.av}</div>
          <div>
            <div class="review-name">${escapeHtml(r.user)}</div>
            <div class="review-meta">${r.time}</div>
          </div>
        </div>
        <div class="review-text">${escapeHtml(r.text)}</div>
      </div>
    `;
  }).join('');
}

function renderProfile() {
  if(!currentUser) {
    document.getElementById('profile-logged-in').style.display = 'none';
    document.getElementById('profile-logged-out').style.display = 'block';
  } else {
    document.getElementById('profile-logged-out').style.display = 'none';
    document.getElementById('profile-logged-in').style.display = 'block';
    
    document.getElementById('prof-name').textContent = currentUser.displayName;
    document.getElementById('prof-meta').textContent = currentUser.email || currentUser.phone || '@username';
    
    const avBox = document.getElementById('prof-avatar-box');
    if(currentUser.avatar) {
      avBox.innerHTML = `<img src="${currentUser.avatar}" alt="" style="width:100%;height:100%;object-fit:cover;"/>`;
    } else {
      avBox.textContent = currentUser.avatarLetters || currentUser.displayName.slice(0,2).toUpperCase();
    }

    const c = document.getElementById('saved-shades-container');
    if(SHADE_BAG.length === 0) {
      c.innerHTML = `<p style="color:var(--text-muted);font-style:italic;font-size:0.95rem;padding:12px 0;">Kamu belum menyimpan shade kosmetik apa pun.</p>`;
      return;
    }
    c.innerHTML = `<div class="review-list feed-grid">${SHADE_BAG.map(r => {
      const p = PRODUCTS.find(x => x.id === r.productId);
      return `
        <div class="review-card" onclick="viewProduct('${r.productId}')" style="cursor:pointer">
          <div class="recap-target" style="margin-bottom:8px">Dari <b>${p ? p.brand + ' &middot; ' + p.name : 'produk'}</b></div>
          <div class="review-header">
            <div class="review-name" style="font-size:1.05rem;color:var(--text-main);">Shade: ${escapeHtml(r.shadeName)}</div>
          </div>
          <div class="review-meta" style="margin-top:4px;">Disimpan pada: ${r.addedAt}</div>
        </div>
      `;
    }).join('')}</div>`;
  }
}

// =============================================
// MODALS & AUTHENTICATION
// =============================================
function openModal(id) {
  document.getElementById(id).style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
  document.body.style.overflow = '';
}

function handleSignupSubmit() {
  const name = document.getElementById('signupName').value.trim();
  const identity = document.getElementById('signupIdentity').value.trim();
  if(!name || !identity) return;

  currentUser = { displayName: name, avatarLetters: name.slice(0,2).toUpperCase(), avatar: null };
  if(identity.includes('@')) currentUser.email = identity;
  else currentUser.phone = identity;

  onLoggedIn();
}

function handleLoginSubmit() {
  currentUser = { displayName: 'Alya Putri', avatarLetters: 'AP', avatar: null, email: 'alya@matches.com' };
  onLoggedIn();
}

function handleLogout() {
  currentUser = null;
  SHADE_BAG = [];
  localStorage.removeItem('matches_session');
  document.getElementById('loginBtn').style.display = '';
  document.getElementById('userAvatarBtn').style.display = 'none';
  switchView('discover');
}

function onLoggedIn() {
  closeModal('loginOverlay'); 
  closeModal('signupOverlay');
  document.getElementById('loginBtn').style.display = 'none';
  document.getElementById('userAvatarBtn').style.display = '';
  updateTopAvatar();
  saveSession();
  if(currentView === 'profile') renderProfile();
}

function updateTopAvatar() {
  if(!currentUser) return;
  const el = document.getElementById('topAvatarDisplay');
  if(currentUser.avatar) {
    el.innerHTML = `<img src="${currentUser.avatar}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:50%"/>`;
  } else {
    el.textContent = currentUser.avatarLetters || currentUser.displayName.slice(0,2).toUpperCase();
  }
}

function loginSegSwitch(btn, tab) {
  btn.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('on')); 
  btn.classList.add('on');
  document.getElementById('loginFieldEmail').style.display = tab === 'email' ? '' : 'none';
  document.getElementById('loginFieldPhone').style.display = tab === 'phone' ? '' : 'none';
}

function saveSession() {
  const session = { user: currentUser, bag: SHADE_BAG };
  localStorage.setItem('matches_session', JSON.stringify(session));
}

function loadSession() {
  const saved = localStorage.getItem('matches_session');
  if(saved) {
    try {
      const parsed = JSON.parse(saved);
      if(parsed.user) {
        currentUser = parsed.user;
        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('userAvatarBtn').style.display = '';
        updateTopAvatar();
      }
      if(parsed.bag) SHADE_BAG = parsed.bag;
    } catch(e) {
      console.error(e);
    }
  }
}

// =============================================
// APP INITIALIZATION (AMAN KONEKSI)
// =============================================
function init() {
  loadSession();
  
  // Melakukan fetch data ke database Supabase, lalu memaksa render setelah datanya siap (.then)
  fetchProductsFromSupabase().then(() => {
    renderDiscover();
  }).catch(err => {
    console.error("Gagal melakukan inisialisasi aplikasi:", err);
    renderDiscover(); // Tetap render cadangan jika koneksi gagal
  });
}

// Menjalankan aplikasi
init();

// =============================================
// HELPERS
// =============================================
function formatN(n) { return n >= 1000 ? (n/1000).toFixed(1) + 'k' : n; }
function escapeHtml(s) { 
  if(!s) return '';
  return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); 
}