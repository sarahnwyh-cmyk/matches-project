// =============================================
// PRODUCTS
// =============================================
let PRODUCTS = [
  {id:'skintint-rose',brand:'Somethinc',name:'Skintint Rose All Day',category:'Base',img:'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80',
   desc:'A lightweight skin tint with SPF 30 that provides buildable coverage and a natural, dewy finish. The Rose All Day edition features a subtle rosy warmth.',
   shades:[
     {name:'01 Porcelain',color:'#f9e2d0',undertone:'Cool Pink',coverage:'Sheer',summary:'Ideal for fair skin with pink undertones. NC10–NC15. Comparable to Wardah Lightening 01.'},
     {name:'02 Ivory Rose',color:'#f4d1b8',undertone:'Warm Neutral',coverage:'Light',summary:'Most popular shade. NC15–NC20. Fans compare this to YOU Cloud Touch N1.'},
     {name:'03 Petal',color:'#e8bc9a',undertone:'Warm',coverage:'Light-Medium',summary:'Buildable warm coverage. NC20–NC25.'},
     {name:'04 Bloom',color:'#d4a07a',undertone:'Neutral Warm',coverage:'Medium',summary:'NC25–NC30. Very natural, oxidizes half-shade warmer.'},
     {name:'05 Dusk',color:'#b87d52',undertone:'Warm Deep',coverage:'Medium',summary:'NC35–NC40. Deep warm tone, long wear up to 8 hrs.'},
   ],
   matches:[
     {name:'N1 Sand Glow',brand:'YOU · Cloud Touch',color:'#e8b882',pct:94},
     {name:'02 Natural Rose',brand:'Make Over · Powerstay',color:'#e6b87c',pct:91},
     {name:'W20 True Beige',brand:'Maybelline · Fit Me',color:'#e2b474',pct:88},
     {name:'Light Beige',brand:'Wardah · Lightening',color:'#ddb070',pct:85},
   ]},
  {id:'cushion-somethinc',brand:'Somethinc',name:'Skin Paradise Cushion',category:'Base',img:'https://images.unsplash.com/photo-1583241800698-e8ab01830a66?w=600&q=80',
   desc:'Dewy finish cushion compact with skin-care infused formula. SPF 50+ PA++++. Refillable case design.',
   shades:[
     {name:'01 Ivory',color:'#f4d9bf',undertone:'Neutral',coverage:'Light',summary:'Sheer-light coverage. NC10–NC15.'},
     {name:'02 Beige',color:'#e8c19c',undertone:'Warm Neutral',coverage:'Light-Med',summary:'Community favorite. NC20–NC25. Closest match: Maybelline Fit Me 220.'},
     {name:'03 Sand',color:'#d4a279',undertone:'Warm',coverage:'Medium',summary:'NC25–NC30. Great for warmth & natural coverage.'},
     {name:'04 Honey',color:'#b88359',undertone:'Deep Warm',coverage:'Medium',summary:'NC30–NC35. Long wear, deep cushion.'},
     {name:'05 Caramel',color:'#8d5d3a',undertone:'Rich Warm',coverage:'Medium-Full',summary:'NC40+. Hard to find dupes at this depth locally.'},
   ],
   matches:[
     {name:'220 Natural Beige',brand:'Maybelline · Fit Me',color:'#e6bf99',pct:96},
     {name:'03 Bone',brand:'Make Over · Powerstay',color:'#e3bd97',pct:93},
     {name:'N2 Sand',brand:'YOU · Cloud Touch',color:'#dfb78f',pct:91},
     {name:'Light Beige',brand:'Wardah · Lightening',color:'#d9b189',pct:87},
   ]},
  {id:'wardah-lightening',brand:'Wardah',name:'Lightening BB Cream',category:'Base',img:'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=600&q=80',
   desc:'Brightening BB cream with SPF 30 and vitamin C complex. Lightweight, evens skin tone.',
   shades:[
     {name:'Light Beige',color:'#f2cfa3',undertone:'Neutral',coverage:'Light',summary:'Most popular Wardah shade. NC15–NC20.'},
     {name:'Natural',color:'#e4b88a',undertone:'Neutral Warm',coverage:'Light-Med',summary:'NC22–NC27. Pulls warm on oily skin.'},
     {name:'Beige',color:'#d4a070',undertone:'Warm',coverage:'Med',summary:'NC28–NC33.'},
   ],
   matches:[
     {name:'02 Beige',brand:'Somethinc · Skin Paradise',color:'#e8c19c',pct:92},
     {name:'N2 Sand',brand:'YOU · Cloud Touch',color:'#dfb78f',pct:89},
     {name:'03 Petal',brand:'Somethinc · Skintint Rose',color:'#e8bc9a',pct:86},
   ]},
  {id:'maybelline-fitme',brand:'Maybelline',name:'Fit Me Cushion',category:'Base',img:'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80',
   desc:'Globally loved cushion in Indonesian-friendly shades. Buildable coverage, oil-control, SPF 50.',
   shades:[
     {name:'110 Porcelain',color:'#f8e0cc',undertone:'Cool',coverage:'Light',summary:'NC10–NC12. Cool undertone. Rare locally.'},
     {name:'220 Natural Beige',color:'#e6bf99',undertone:'Warm Neutral',coverage:'Light-Med',summary:'Best seller. NC20–NC25.'},
     {name:'310 Sun Beige',color:'#d0a278',undertone:'Warm',coverage:'Med',summary:'NC28–NC33.'},
     {name:'330 Toffee',color:'#b8845a',undertone:'Warm Deep',coverage:'Med',summary:'NC35–NC40.'},
   ],
   matches:[
     {name:'02 Beige',brand:'Somethinc · Skin Paradise',color:'#e8c19c',pct:95},
     {name:'03 Petal',brand:'Somethinc · Skintint Rose',color:'#e8bc9a',pct:91},
     {name:'03 Bone',brand:'Make Over · Powerstay',color:'#e3bd97',pct:89},
   ]},
  {id:'make-over-powerstay',brand:'Make Over',name:'Powerstay Weightless',category:'Face',img:'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80',
   desc:'Ultra-long-wear foundation with oil-control technology. Up to 24-hour wear, matte finish.',
   shades:[
     {name:'02 Sand',color:'#f0c99a',undertone:'Neutral',coverage:'Light-Med',summary:'NC18–NC23. Great for combo skin.'},
     {name:'03 Bone',color:'#e3bd97',undertone:'Warm Neutral',coverage:'Medium',summary:'NC23–NC28. Often recommended as Fit Me 220 dupe.'},
     {name:'04 Caramel',color:'#d09c6e',undertone:'Warm',coverage:'Med-Full',summary:'NC30–NC35. Strong oil control.'},
     {name:'05 Tawny',color:'#b87850',undertone:'Deep Warm',coverage:'Full',summary:'NC38+.'},
   ],
   matches:[
     {name:'02 Ivory Rose',brand:'Somethinc · Skintint Rose',color:'#f4d1b8',pct:93},
     {name:'220 Natural Beige',brand:'Maybelline · Fit Me',color:'#e6bf99',pct:91},
     {name:'02 Beige',brand:'Somethinc · Skin Paradise',color:'#e8c19c',pct:90},
   ]},
  {id:'you-cloudtouch',brand:'YOU',name:'Cloud Touch Skin Tint',category:'Base',img:'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80',
   desc:'Featherlight skin tint with cloud-like texture. SPF 35 PA+++. Aloe & ceramides.',
   shades:[
     {name:'N1 Vanilla',color:'#f5dfc2',undertone:'Neutral',coverage:'Sheer',summary:'NC12–NC16.'},
     {name:'N2 Sand',color:'#ebbf98',undertone:'Warm Neutral',coverage:'Light',summary:'Bestseller. NC20–NC26.'},
     {name:'N3 Almond',color:'#d4a070',undertone:'Warm',coverage:'Light-Med',summary:'NC28–NC34.'},
   ],
   matches:[
     {name:'02 Ivory Rose',brand:'Somethinc · Skintint Rose',color:'#f4d1b8',pct:94},
     {name:'Light Beige',brand:'Wardah · Lightening',color:'#f2cfa3',pct:90},
     {name:'03 Petal',brand:'Somethinc · Skintint Rose',color:'#e8bc9a',pct:87},
   ]},
  // Eye category
  {id:'eye-implora-palette',brand:'Implora',name:'Soft Glam Eyeshadow Palette',category:'Eye',img:'https://images.unsplash.com/photo-1583241800698-e8ab01830a66?w=600&q=80',
   desc:'9-pan eyeshadow palette dengan kombinasi matte & shimmer untuk look natural sampai glam.',
   shades:[
     {name:'Bare',color:'#e8d4c2',undertone:'Warm',coverage:'Matte',summary:'Base shade, super buildable.'},
     {name:'Honey',color:'#c89060',undertone:'Warm',coverage:'Shimmer',summary:'Crease shade favorit.'},
     {name:'Mocha',color:'#7a4d33',undertone:'Warm Deep',coverage:'Matte',summary:'Deepen outer corner.'},
   ],
   matches:[
     {name:'Neutral 1',brand:'Make Over · Eyeshadow Quad',color:'#ce9a72',pct:90},
     {name:'Bronze',brand:'Wardah · Eyexpert',color:'#b87a4a',pct:86},
   ]},
  {id:'eye-maybelline-mascara',brand:'Maybelline',name:'Lash Sensational Sky High',category:'Eye',img:'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&q=80',
   desc:'Mascara dengan flexible wand, bikin bulu mata panjang & volume tanpa clumping.',
   shades:[
     {name:'Very Black',color:'#0a0a0a',undertone:'Cool',coverage:'Volume',summary:'Black pekat, daily go-to.'},
     {name:'Brownish Black',color:'#2a1a14',undertone:'Warm',coverage:'Natural',summary:'Soft brown untuk look natural.'},
   ],
   matches:[
     {name:'Hypnose',brand:'L\'Oréal',color:'#0c0c0c',pct:92},
   ]},
  // Lip category
  {id:'lip-makeover-matte',brand:'Make Over',name:'Intense Matte Lip Cream',category:'Lip',img:'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&q=80',
   desc:'12 nude tones, long-wear matte hingga 8 jam. Tidak mengeringkan.',
   shades:[
     {name:'001 Bare',color:'#c89280',undertone:'Neutral',coverage:'Full',summary:'Your-lips-but-better nude.'},
     {name:'008 Brunette',color:'#a06850',undertone:'Warm',coverage:'Full',summary:'MLBB warm tone.'},
     {name:'014 Vamp',color:'#7a2030',undertone:'Cool',coverage:'Full',summary:'Berry vamp untuk look bold.'},
   ],
   matches:[
     {name:'Cherry',brand:'Wardah · Exclusive',color:'#a8454a',pct:88},
     {name:'Nude Pink',brand:'YOU · Lip Cream',color:'#c08070',pct:85},
   ]},
  {id:'lip-somethinc-tint',brand:'Somethinc',name:'Mood Lip Serum',category:'Lip',img:'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&q=80',
   desc:'Tinted lip serum dengan hyaluronic acid. Glossy finish, melembabkan sepanjang hari.',
   shades:[
     {name:'01 Pink Soda',color:'#e89090',undertone:'Cool',coverage:'Sheer',summary:'Soft pink, daily wear.'},
     {name:'02 Berry Mood',color:'#b85068',undertone:'Cool',coverage:'Light',summary:'Berry tint untuk freshness.'},
     {name:'03 Caramel',color:'#c0735a',undertone:'Warm',coverage:'Sheer',summary:'MLBB warm caramel.'},
   ],
   matches:[
     {name:'Glow Tint',brand:'YOU · Lip',color:'#d07a78',pct:87},
   ]},
  // Brow
  {id:'brow-makeover-pencil',brand:'Make Over',name:'Browliner Pencil',category:'Brow',img:'https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=600&q=80',
   desc:'Pensil alis dual-end dengan spoolie. Hasil natural hair-like strokes.',
   shades:[
     {name:'Soft Brown',color:'#a07a5a',undertone:'Warm',coverage:'Natural',summary:'Untuk rambut hitam-coklat.'},
     {name:'Dark Brown',color:'#5a3a26',undertone:'Neutral',coverage:'Defined',summary:'Untuk rambut hitam pekat.'},
   ],
   matches:[
     {name:'Brow Definer',brand:'Wardah',color:'#704a30',pct:90},
   ]},
  // Face (cheek/contour)
  {id:'face-implora-blush',brand:'Implora',name:'Cheek Pop Blush',category:'Face',img:'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80',
   desc:'Powder blush dengan finish satin natural. Buildable, tidak chalky.',
   shades:[
     {name:'Peach',color:'#f0a585',undertone:'Warm',coverage:'Natural',summary:'Soft peach daily.'},
     {name:'Rose',color:'#d87a8a',undertone:'Cool',coverage:'Natural',summary:'Pink rose flush.'},
     {name:'Coral',color:'#e88560',undertone:'Warm',coverage:'Buildable',summary:'Sunny coral.'},
   ],
   matches:[
     {name:'Blush On',brand:'Wardah',color:'#e09080',pct:86},
   ]},
  // Tools
  {id:'tools-somethinc-sponge',brand:'Somethinc',name:'Beauty Sponge Set',category:'Tools',img:'https://images.unsplash.com/photo-1631214540335-c4adb16e9c10?w=600&q=80',
   desc:'Set sponge latex-free untuk apply foundation, cushion, concealer.',
   shades:[{name:'Pink',color:'#f0a8b0',undertone:'-',coverage:'-',summary:'Soft & bouncy.'}],
   matches:[]},
];

// =============================================
// USERS
// =============================================
const USERS = [
  {handle:'@ayuputri',name:'Ayu Putri',av:'AP',followers:'12.4k',following:'318',bio:'NC22 warm neutral · Jakarta',img:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80'},
  {handle:'@reviewbyrara',name:'Rara Reviews',av:'RR',followers:'28.1k',following:'210',bio:'Honest beauty reviews · Bandung',img:'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&q=80'},
  {handle:'@nadyaverse',name:'Nadya',av:'NV',followers:'9.8k',following:'412',bio:'makeup comparison queen',img:'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&q=80'},
  {handle:'@dianamakeup',name:'Diana Makeup',av:'DM',followers:'45k',following:'504',bio:'Beauty educator · tips & tricks',img:'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&q=80'},
  {handle:'@bellaskincare',name:'Bella',av:'BS',followers:'6.2k',following:'289',bio:'skincare first · Surabaya',img:'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=80&q=80'},
  {handle:'@glowwithsiti',name:'Siti Glow',av:'GS',followers:'18.3k',following:'331',bio:'Everyday glam · NC27',img:'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&q=80'},
  {handle:'@ninabeauty_id',name:'Nina',av:'NB',followers:'4.1k',following:'180',bio:'Foundation hunter',img:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80'},
  {handle:'@ayudewi',name:'Ayu Dewi',av:'AY',followers:'2.8k',following:'305',bio:'Beauty on a budget',img:'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=80&q=80'},
  {handle:'@makeupbymira',name:'Mira',av:'MM',followers:'15.7k',following:'220',bio:'Wedding MUA · Jakarta',img:'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=80&q=80'},
  {handle:'@makeupbynora',name:'Nora',av:'MN',followers:'7.2k',following:'410',bio:'Swatch & comparison',img:'https://images.unsplash.com/photo-1546961342-1e8c2bf06ea1?w=80&q=80'},
];

// =============================================
// REVIEW GENERATOR (5–20 per product)
// =============================================
const REVIEW_TEMPLATES = [
  {t:'Shade {S} adalah holy grail aku, NC{N} warm neutral. Oksidasi minim dan finish dewy banget.',r:5},
  {t:'Wear time mantap, bertahan 8 jam di cuaca Jakarta. Shade {S} pas banget di kulit aku.',r:5},
  {t:'Awalnya ragu, tapi setelah dipakai 2 minggu, ini jadi daily go-to. Shade {S} undertone-nya pas.',r:5},
  {t:'Coverage buildable, satu layer udah cukup buat daily. Cuma packaging-nya rada license.',r:4},
  {t:'Tekstur enak, ringan, blendable. Shade {S} oxidize sedikit warm setelah 4 jam.',r:4},
  {t:'Untuk harganya, ini value banget. Shade {S} cocok NC{N}.',r:4},
  {t:'Sayang range shade-nya masih limited. Shade {S} terlalu warm buat undertone aku.',r:3},
  {t:'Formulanya OK tapi kurang long-lasting di kulit oily. Perlu setting powder.',r:3},
  {t:'Suka banget sama finishnya. Glowy tapi nggak greasy. Shade {S} highly recommend.',r:5},
  {t:'Best dupe untuk produk high-end. Shade {S} kembar identik sama brand sebelah.',r:5},
  {t:'Aplikasi gampang pakai sponge, hasil natural. Repurchase forever.',r:5},
  {t:'Shade {S} settles ke pores kalau nggak prep skin dulu. Tapi overall worth it.',r:3},
  {t:'Coverage medium tapi bisa di-build. Suka banget pakai ini untuk acara formal.',r:4},
  {t:'NC{N} dan shade {S} fits perfectly. The community was right about this one.',r:5},
  {t:'Ringan di kulit, kayak nggak pakai apa-apa. SPF-nya bonus banget.',r:4},
  {t:'Honestly, expected more buat harga segini. Tapi shade {S} masih wearable.',r:3},
  {t:'Cocok buat sensitive skin aku, no breakout. Shade {S} love.',r:5},
  {t:'Akhirnya nemu shade yang pas! Shade {S} undertone-nya match banget.',r:5},
  {t:'Bagus dipakai harian, nggak heavy di muka. Bisa untuk office look juga.',r:4},
  {t:'Pump packaging-nya hygienic banget. Shade {S} buildable dari sheer ke medium.',r:4},
];
function seededRand(seed){ let x = Math.sin(seed)*10000; return x-Math.floor(x); }
function genReviews(productId){
  const p = PRODUCTS.find(x=>x.id===productId);
  if(!p) return [];
  let seed = 0; for(let i=0;i<productId.length;i++) seed += productId.charCodeAt(i);
  const count = 5 + Math.floor(seededRand(seed)*16); // 5..20
  const arr=[];
  for(let i=0;i<count;i++){
    const u = USERS[Math.floor(seededRand(seed+i*3.1)*USERS.length)];
    const tmpl = REVIEW_TEMPLATES[Math.floor(seededRand(seed+i*7.3)*REVIEW_TEMPLATES.length)];
    const shade = p.shades[Math.floor(seededRand(seed+i*1.7)*p.shades.length)];
    const ncBase = 15 + Math.floor(seededRand(seed+i*5.1)*20);
    const text = tmpl.t.replace('{S}',shade.name).replace('{N}',ncBase);
    const time = ['2 jam lalu','5 jam lalu','1 hari lalu','2 hari lalu','3 hari lalu','5 hari lalu','1 minggu lalu','2 minggu lalu'][Math.floor(seededRand(seed+i*2.9)*8)];
    const likes = Math.floor(seededRand(seed+i*11.1)*340)+5;
    const saves = Math.floor(seededRand(seed+i*13.3)*180)+2;
    arr.push({id:`${productId}-r${i}`,user:u.handle,name:u.name,av:u.av,img:u.img,rating:tmpl.r,shade:shade.name,text,time,likes,saves,productId});
  }
  return arr;
}
let REVIEWS_BY_PRODUCT = {};
function buildReviewsIndex(){
  REVIEWS_BY_PRODUCT = {};
  PRODUCTS.forEach(p=>{ REVIEWS_BY_PRODUCT[p.id] = genReviews(p.id); });
}

// =============================================
// POSTS GENERATOR (25+ per tab)
// =============================================
const POST_IMAGES = [
  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=700&q=75',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=700&q=75',
  'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=700&q=75',
  'https://images.unsplash.com/photo-1583241800698-e8ab01830a66?w=700&q=75',
  'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=700&q=75',
  'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=700&q=75',
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=700&q=75',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&q=75',
  'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=700&q=75',
  'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=700&q=75',
];
const POST_TEMPLATES_BASE = [
  {txt:'Akhirnya shade-ku ketemu juga 🙏 NC25 ish, shade 02 Beige #SkinParadise kembar identik sama Fit Me 220. Coverage med, oksidasi minim. Holy grail budget pick!',cat:'review',prod:'cushion-somethinc',photos:1},
  {txt:'Swatch lengkap 5 shade #SkintintRose side by side. Geser ya, ada 3 lighting conditions juga 👇',cat:'swatch',prod:'skintint-rose',photos:3},
  {txt:'Trik 3 detik baca undertone tanpa alat di depan cermin biar nggak salah pilih shade lagi saat belanja online. Save dulu ya! @ayuputri @bellaskincare',cat:'tip',prod:null,photos:0},
  {txt:'#Wardah Lightening — 3 tahun loyal, ini honest review-nya. Spoiler: masih worth it di 2026.',cat:'review',prod:'wardah-lightening',photos:1},
  {txt:'#YOUBeauty Cloud Touch viral lagi di TikTok. Shade N2 Sand udah sold out 3x minggu ini 😭',cat:'hype',prod:'you-cloudtouch',photos:1},
  {txt:'Comparison thread: #Maybelline Fit Me 220 vs #Somethinc 02 Beige. Tested di NC22 warm neutral selama 2 minggu. Verdict di akhir 👇',cat:'comparison',prod:'maybelline-fitme',photos:2},
  {txt:'#MakeOver Powerstay 24-hour claim — myth or real? Aku tes seharian penuh di Surabaya. Hasilnya...',cat:'comparison',prod:'make-over-powerstay',photos:2},
  {txt:'Soft glam look pakai #Implora palette + #MakeOver matte lip 008. Total damage cuma 200k 🤍',cat:'look',prod:'eye-implora-palette',photos:4},
  {txt:'Hot take: undertone lebih penting daripada coverage. Banyak orang salah pilih foundation karena cuma liat tone. @reviewbyrara setuju nggak?',cat:'opinion',prod:null,photos:0},
  {txt:'Restock alert 🚨 #SkintintRose shade 02 Ivory Rose udah balik di official store. Jangan sampe kehabisan lagi.',cat:'hype',prod:'skintint-rose',photos:1},
  {txt:'Tested 4 lokal brand mascara, juaranya bikin kaget. Threads panjang incoming 🧵',cat:'review',prod:'eye-maybelline-mascara',photos:0},
  {txt:'PSA: jangan pakai foundation 2 shade lebih gelap demi look "tan". Akan keliatan abu-abu di foto dengan flash.',cat:'tip',prod:null,photos:0},
  {txt:'Quick swatch #MoodLipSerum dari #Somethinc. Pink Soda jadi favorit aku karena yang paling sheer.',cat:'swatch',prod:'lip-somethinc-tint',photos:2},
  {txt:'Honest take soal #WardahLightening setelah 6 bulan: brightening claim valid, tapi shade range masih terbatas.',cat:'review',prod:'wardah-lightening',photos:1},
  {txt:'NC30+ representation when?? Susah banget cari shade deep di brand lokal yang accessible. Tag brand favorit kalian di komen.',cat:'opinion',prod:null,photos:0},
  {txt:'Powder vs cream blush untuk kulit oily — winner: #Implora Cheek Pop (powder) karena nggak luntur 6 jam.',cat:'comparison',prod:'face-implora-blush',photos:1},
  {txt:'Cushion #SkinParadise shade 04 Honey buat NC30 — review jujur setelah 1 bulan dipakai.',cat:'review',prod:'cushion-somethinc',photos:2},
  {txt:'My everyday makeup routine in under 5 min ⏱️ #MakeOver + #YOUBeauty combo. Full breakdown.',cat:'tip',prod:null,photos:3},
  {txt:'Browliner @MakeOver soft brown vs dark brown — mana yang lebih cocok untuk rambut highlight?',cat:'comparison',prod:'brow-makeover-pencil',photos:1},
  {txt:'Sunday self-care: clean girl makeup look pakai #Somethinc Mood Lip & #Implora blush 🤍',cat:'look',prod:'lip-somethinc-tint',photos:2},
  {txt:'Underrated banget: beauty sponge dari #Somethinc latex-free dan harganya seperempat dari merk mahal.',cat:'review',prod:'tools-somethinc-sponge',photos:1},
  {txt:'Recap minggu ini: 3 produk baru yang aku coba. Spoiler: 2 worth it, 1 NO.',cat:'review',prod:null,photos:0},
  {txt:'Tag akun yang bantu kalian nemu shade pas pertama kali! Aku mulai @reviewbyrara @ayuputri 🤍',cat:'opinion',prod:null,photos:0},
  {txt:'#MakeOver Intense Matte 014 Vamp — vampy berry tone yang lagi naik di feed bridal MUA. Worth the hype 💄',cat:'hype',prod:'lip-makeover-matte',photos:2},
  {txt:'Demo: cara fix foundation oksidasi tanpa harus repurchase. Trik dari @dianamakeup yang valid banget.',cat:'tip',prod:null,photos:1},
  {txt:'#FitMe Cushion 220 vs cushion lokal di harga half — yang menang siapa? Komparasi side-by-side.',cat:'comparison',prod:'maybelline-fitme',photos:3},
  {txt:'New formula #SkinParadise Cushion drop! SPF 50+, 5 new deep shades, refillable case is back 🙏',cat:'hype',prod:'cushion-somethinc',photos:1},
  {txt:'My NC22 warm neutral collection ✨ Geser untuk lihat semua shade favorit aku tahun ini.',cat:'look',prod:null,photos:5},
];
let postIdCounter = 1;
function genPost(seed, tmpl){
  const u = USERS[Math.floor(seededRand(seed*2.1)*USERS.length)];
  const time = ['2 menit lalu','15 menit lalu','1 jam lalu','3 jam lalu','5 jam lalu','8 jam lalu','12 jam lalu','1 hari lalu','2 hari lalu','3 hari lalu','5 hari lalu','1 minggu lalu'][Math.floor(seededRand(seed*1.7)*12)];
  const likes = Math.floor(seededRand(seed*3.3)*5400)+12;
  const comments = Math.floor(seededRand(seed*5.7)*420)+3;
  const saves = Math.floor(seededRand(seed*7.9)*880)+5;
  let imgs = [];
  for(let j=0;j<tmpl.photos;j++){
    imgs.push(POST_IMAGES[Math.floor(seededRand(seed*1.3 + j*0.9)*POST_IMAGES.length)]);
  }
  return {id:'p'+(postIdCounter++),user:u.handle,name:u.name,av:u.av,img:u.img,time,text:tmpl.txt,images:imgs,likes,comments,saves,productId:tmpl.prod,cat:tmpl.cat};
}
function buildPostsForTab(tabSeed, filterFn){
  const arr=[];
  for(let i=0;i<28;i++){
    const tmpl = POST_TEMPLATES_BASE[(i + tabSeed*7) % POST_TEMPLATES_BASE.length];
    if(filterFn && !filterFn(tmpl)) continue;
    arr.push(genPost(tabSeed*100 + i + 1, tmpl));
  }
  // fill if filtered out too many
  let pad = tabSeed*1000;
  while(arr.length<26){
    const tmpl = POST_TEMPLATES_BASE[(pad) % POST_TEMPLATES_BASE.length];
    if(!filterFn || filterFn(tmpl)) arr.push(genPost(pad+999, tmpl));
    pad++;
    if(pad>5000) break;
  }
  return arr;
}
const FEED_POSTS = {
  forYou: buildPostsForTab(1, null),
  hype:   buildPostsForTab(2, t=>['hype','look','swatch','comparison'].includes(t.cat)),
  reviews:buildPostsForTab(3, t=>['review','comparison','tip','opinion'].includes(t.cat)),
};

// =============================================
// APP STATE
// =============================================
let followingSet = new Set();
let myPosts = [];
let likedPosts = new Set();
let savedPosts = new Set();
let savedReviews = new Set();
let bookmarkTabActive = 'posts';

// =============================================
// SESSION — backed by Supabase Auth (supabase-client.js is loaded by bookmarks.html)
// =============================================
async function applySessionState(session){
  const [savedP, savedR, liked] = await Promise.all([
    sbFetchSavedPostIds(session.user.id),
    sbFetchSavedReviewIds(session.user.id),
    sbFetchLikedPostIds(session.user.id)
  ]);
  savedPosts = new Set(savedP);
  savedReviews = new Set(savedR);
  likedPosts = new Set(liked);
  return session.user.id;
}
function saveSession(){} // no-op: actions persist directly to Supabase

// =============================================
// MISC HELPERS
// =============================================
function viewProduct(id){
  const p = PRODUCTS.find(x=>x.id===id); if(!p) return;
  const shadeNames = p.shades.map(s=>s.name).join(', ');
  alert(`${p.brand} \u2014 ${p.name}\n\n${p.desc}\n\nShades: ${shadeNames}`);
}

// =============================================
// FEED (thread post rendering, reused to display saved posts)
// =============================================
function renderThreadPost(p){
  const avContent = p.img?`<img src="${p.img}" alt=""/>`:p.av;
  const product = p.productId ? PRODUCTS.find(x=>x.id===p.productId) : null;
  const liked = likedPosts.has(p.id);
  const saved = savedPosts.has(p.id);
  const likeCount = p.likes + (liked?1:0);
  const saveCount = p.saves + (saved?1:0);
  const badgeName = ({hype:'Hype',review:'Review',swatch:'Swatch',tip:'Tip',comparison:'Comparison',look:'Look',opinion:'Opinion'})[p.cat]||'';
  return `<article class="tpost" id="post-${p.id}" onclick="event.stopPropagation()">
    <div class="tav">${avContent}</div>
    <div>
      <div class="thead">
        <span class="tname">${p.name}</span>
        <span class="thandle">${p.user}</span>
        <span class="ttime">${p.time}</span>
        ${badgeName?`<span class="tbadge">${badgeName}</span>`:''}
      </div>
      <div class="ttext">${linkifyCaption(p.text)}</div>
      ${p.images.length?renderCarousel(p.images, p.id):''}
      ${product?`<button class="tprod-link" onclick="viewProduct('${product.id}')">→ ${product.brand} · ${product.name}</button>`:''}
      <div class="tactions">
        <button onclick="toggleLike('${p.id}')" class="${liked?'liked':''}">
          <svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>
          <span>${formatN(likeCount)}</span>
        </button>
        <button>
          <svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/></svg>
          <span>${formatN(p.comments)}</span>
        </button>
        <button onclick="togglePostSave('${p.id}')" class="${saved?'saved':''}">
          <svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 5.25A2.25 2.25 0 017.25 3h9.5A2.25 2.25 0 0119 5.25V21l-7-4-7 4V5.25z"/></svg>
          <span>${formatN(saveCount)}</span>
        </button>
      </div>
    </div>
  </article>`;
}
function renderCarousel(imgs, id){
  if(imgs.length===1){
    return `<div class="tcarousel"><div class="scroller" id="car-${id}"><img src="${imgs[0]}" alt=""/></div></div>`;
  }
  const dots = imgs.map((_,i)=>`<div class="d ${i===0?'on':''}"></div>`).join('');
  return `<div class="tcarousel">
    <div class="scroller" id="car-${id}">${imgs.map(src=>`<img src="${src}" alt="" loading="lazy"/>`).join('')}</div>
    <button class="nav-btn nav-prev" onclick="carNav('${id}',-1)"><svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg></button>
    <button class="nav-btn nav-next" onclick="carNav('${id}',1)"><svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></button>
    <div class="dots" id="dots-${id}">${dots}</div>
  </div>`;
}
function setupCarousel(el){
  const scroller = el.querySelector('.scroller');
  const dots = el.querySelector('.dots');
  if(!dots) return;
  scroller.addEventListener('scroll',()=>{
    const i = Math.round(scroller.scrollLeft / scroller.clientWidth);
    dots.querySelectorAll('.d').forEach((d,j)=>d.classList.toggle('on',j===i));
  });
}
function carNav(id, dir){
  const sc = document.getElementById('car-'+id);
  if(!sc) return;
  sc.scrollBy({left:dir*sc.clientWidth,behavior:'smooth'});
}
// current authenticated user id (set by init)
let currentUserId = null;

async function toggleLike(id){
  const wasLiked = likedPosts.has(id);
  if(wasLiked) likedPosts.delete(id); else likedPosts.add(id);
  renderBookmarks();
  if(currentUserId){
    try{ await sbToggleLikePost(currentUserId, id, wasLiked); }
    catch(err){
      if(wasLiked) likedPosts.add(id); else likedPosts.delete(id);
      renderBookmarks();
    }
  }
}
async function togglePostSave(id){
  const wasSaved = savedPosts.has(id);
  if(wasSaved) savedPosts.delete(id); else savedPosts.add(id);
  renderBookmarks();
  if(currentUserId){
    try{ await sbToggleSavePost(currentUserId, id, wasSaved); }
    catch(err){
      if(wasSaved) savedPosts.add(id); else savedPosts.delete(id);
      renderBookmarks();
    }
  }
}

// =============================================
// BOOKMARKS
// =============================================
function bookmarkTab(btn, tab){
  bookmarkTabActive = tab;
  btn.parentElement.querySelectorAll('button').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  renderBookmarks();
}
function renderBookmarks(){
  const c = document.getElementById('bookmarksContent');
  if(bookmarkTabActive==='posts'){
    const allPosts = [...Object.values(FEED_POSTS).flat(), ...myPosts];
    const saved = allPosts.filter(p=>savedPosts.has(p.id));
    if(saved.length===0){ c.innerHTML=`<div class="empty-state">Belum ada postingan yang disimpan.<br/>Tap ikon bookmark di postingan untuk menyimpan.</div>`; return; }
    c.innerHTML = `<div class="thread-feed feed-grid">${saved.map(renderThreadPost).join('')}</div>`;
    document.querySelectorAll('#bookmarksContent .tcarousel').forEach(setupCarousel);
  } else {
    const allRevs = Object.values(REVIEWS_BY_PRODUCT).flat();
    const saved = allRevs.filter(r=>savedReviews.has(r.id));
    if(saved.length===0){ c.innerHTML=`<div class="empty-state">Belum ada review yang disimpan.</div>`; return; }
    c.innerHTML = `<div class="review-list feed-grid">${saved.map(r=>{
      const p = PRODUCTS.find(x=>x.id===r.productId);
      return `<div class="review-card" onclick="viewProduct('${r.productId}')" style="cursor:pointer">
        <div class="recap-target" style="margin-bottom:8px">From <b>${p?p.brand+' \u00b7 '+p.name:'product'}</b></div>
        <div class="review-header"><div class="review-av">${r.img?`<img src="${r.img}" alt=""/>`:r.av}</div><div><div class="review-name">${r.user}</div><div class="review-meta">${r.time}</div></div></div>
        <div class="review-text">${escapeHtml(r.text)}</div>
      </div>`;
    }).join('')}</div>`;
  }
}

// =============================================
// INIT
// =============================================
async function init(){
  // 1. Load products from Supabase; fall back to hardcoded array if offline/empty
  const sbProducts = await sbFetchProducts();
  if(sbProducts && sbProducts.length > 0) PRODUCTS = sbProducts;

  // 2. Build review index with final PRODUCTS
  buildReviewsIndex();

  // 3. Restore bookmark state from Supabase session
  const session = await sbGetSession();
  if(session){
    currentUserId = await applySessionState(session);
  }

  renderBookmarks();
}
init();

// =============================================
// HELPERS
// =============================================
function formatN(n){ return n>=1000?(n/1000).toFixed(1)+'k':n; }
function escapeHtml(s){ return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function linkifyCaption(s){
  // tags @user and #brand get colored
  return escapeHtml(s)
    .replace(/(@[a-zA-Z0-9_]+)/g,'<span class="tag">$1</span>')
    .replace(/(#[a-zA-Z0-9_]+)/g,'<span class="hashtag">$1</span>')
    .replace(/\n/g,'<br>');
}