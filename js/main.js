/* ============================================
   VOYGER LUXURY TRAVEL - MAIN JS
   Global functionality: Nav, Dark mode, Counter
   Carousels, Testimonials, Masonry, Modals, Toasts
   ============================================ */

// ---- DARK MODE TOGGLE ----
const themeToggle = document.querySelectorAll('.theme-toggle');
const html = document.documentElement;

function getTheme() {
  return localStorage.getItem('voygerTheme') || 'dark';
}

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('voygerTheme', theme);
  themeToggle.forEach(btn => {
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  });
}

setTheme(getTheme());

themeToggle.forEach(btn => {
  btn.addEventListener('click', () => {
    const current = getTheme();
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
});

// ---- NAVBAR SCROLL STICKY & BACK TO TOP ----
const navbar = document.querySelector('.navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (navbar) {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  if (backToTop) {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
});

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ---- MOBILE MENU ----
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ---- TOAST NOTIFICATIONS ----
let toastContainer = document.querySelector('.toast-container');
if (!toastContainer) {
  toastContainer = document.createElement('div');
  toastContainer.className = 'toast-container';
  document.body.appendChild(toastContainer);
}

function showToast(message, type = 'info', duration = 3500) {
  const icons = { success: '✅', info: 'ℹ️', warning: '⚠️', error: '❌' };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${icons[type] || '✨'}</span><span>${message}</span>`;
  toastContainer.appendChild(toast);

  toast.addEventListener('click', () => removeToast(toast));
  setTimeout(() => removeToast(toast), duration);
}

function removeToast(toast) {
  toast.style.animation = 'slideInRight 0.3s ease reverse forwards';
  toast.addEventListener('animationend', () => toast.remove());
}

// ---- FAVORITE HEART BUTTONS ----
function toggleFavorite(btn, name) {
  btn.classList.toggle('active');
  const isFav = btn.classList.contains('active');
  btn.innerHTML = isFav ? '❤️' : '🤍';
  showToast(isFav ? `Saved ${name} to your favorites!` : `Removed ${name} from favorites`, isFav ? 'success' : 'info');
}

// ---- DROPDOWN MENUS (Notifications, Profile) ----
function toggleDropdown(id) {
  const dropdown = document.getElementById(id);
  if (!dropdown) return;
  
  // Close other open dropdowns
  document.querySelectorAll('.dropdown-menu.show').forEach(el => {
    if (el.id !== id) el.classList.remove('show');
  });

  dropdown.classList.toggle('show');
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown-wrapper')) {
    document.querySelectorAll('.dropdown-menu.show').forEach(el => el.classList.remove('show'));
  }
});

// ---- SCROLL ANIMATED COUNTERS ----
function animateCounter(el) {
  const targetStr = el.dataset.target || el.textContent;
  const numMatches = targetStr.match(/[\d.]+/);
  if (!numMatches) return;

  const target = parseFloat(numMatches[0]);
  const isDecimal = targetStr.includes('.');
  const duration = 2000;
  const steps = 60;
  const increment = target / steps;
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const formatted = isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString();
    el.textContent = `${prefix}${formatted}${suffix}`;
  }, duration / steps);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = 'true';
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.4 });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-counter]').forEach(el => {
    counterObserver.observe(el);
  });
  initTestimonialsAutoSlide();
  initGalleryFilters();
});

// ---- TRENDING PACKAGES CAROUSEL CONTROLS ----
function scrollPackagesCarousel(direction) {
  const track = document.getElementById('packageCarouselTrack');
  if (!track) return;
  const scrollAmount = 380;
  track.scrollBy({
    left: direction === 'next' ? scrollAmount : -scrollAmount,
    behavior: 'smooth'
  });
}

// ---- TESTIMONIALS AUTO-SLIDER ----
let currentTestiIndex = 0;
let testimonialInterval;

const testimonialsData = [
  {
    stars: '⭐⭐⭐⭐⭐',
    quote: '"Voyger curated our anniversary trip to Bora Bora beyond our wildest dreams. From the private helicopter arrival to the overwater villa, every single detail was flawless!"',
    name: 'Victoria & James Sterling',
    location: 'London, United Kingdom',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200'
  },
  {
    stars: '⭐⭐⭐⭐⭐',
    quote: '"The AI Travel Planner created a 10-day Japan itinerary that perfectly balanced luxury ryokans with hidden local ramen shops. Highly recommend Voyger for hassle-free VIP travel."',
    name: 'Marcus Vance',
    location: 'San Francisco, USA',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200'
  },
  {
    stars: '⭐⭐⭐⭐⭐',
    quote: '"24/7 Concierge saved our honeymoon when our European connection got canceled. Within 15 minutes, we were rebooked on a private charter. Exceptional luxury service!"',
    name: 'Sophia Martinez',
    location: 'Madrid, Spain',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200'
  }
];

function initTestimonialsAutoSlide() {
  const container = document.getElementById('testimonialSlideContainer');
  const dotsContainer = document.getElementById('testiDots');
  if (!container || !dotsContainer) return;

  // Generate dots
  dotsContainer.innerHTML = testimonialsData.map((_, i) => 
    `<div class="testi-dot ${i === 0 ? 'active' : ''}" onclick="goToTestimonial(${i})"></div>`
  ).join('');

  renderTestimonial(0);

  // Start auto-slide every 5 seconds
  testimonialInterval = setInterval(() => {
    currentTestiIndex = (currentTestiIndex + 1) % testimonialsData.length;
    renderTestimonial(currentTestiIndex);
  }, 5000);
}

function renderTestimonial(index) {
  currentTestiIndex = index;
  const container = document.getElementById('testimonialSlideContainer');
  if (!container) return;

  const data = testimonialsData[index];
  container.style.opacity = '0';
  container.style.transform = 'translateY(15px)';

  setTimeout(() => {
    container.innerHTML = `
      <div class="testi-stars">${data.stars}</div>
      <div class="testi-quote">${data.quote}</div>
      <div class="testi-user">
        <img src="${data.avatar}" alt="${data.name}" class="testi-avatar" />
        <div class="testi-info">
          <h5>${data.name}</h5>
          <p>${data.location}</p>
        </div>
      </div>
    `;
    container.style.opacity = '1';
    container.style.transform = 'translateY(0)';
  }, 250);

  // Update dots
  document.querySelectorAll('.testi-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function goToTestimonial(index) {
  clearInterval(testimonialInterval);
  renderTestimonial(index);
  testimonialInterval = setInterval(() => {
    currentTestiIndex = (currentTestiIndex + 1) % testimonialsData.length;
    renderTestimonial(currentTestiIndex);
  }, 5000);
}

// ---- PINTEREST MASONRY GALLERY FILTERS ----
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.masonry-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
          item.style.animation = 'scaleIn 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// ---- LIGHTBOX PREVIEW MODAL ----
function openLightbox(imgSrc, title, category) {
  let lightbox = document.getElementById('galleryLightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'galleryLightbox';
    lightbox.style.cssText = `
      position: fixed; inset: 0; z-index: 10000;
      background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(20px);
      display: flex; align-items: center; justify-content: center;
      padding: 20px; opacity: 0; transition: opacity 0.3s ease;
    `;
    document.body.appendChild(lightbox);
  }

  lightbox.innerHTML = `
    <div style="position:relative; max-width: 900px; width: 100%; text-align:center;">
      <button onclick="closeLightbox()" style="position:absolute; top:-40px; right:0; background:none; border:none; color:white; font-size:32px; cursor:pointer;">&times;</button>
      <img src="${imgSrc}" alt="${title}" style="max-width:100%; max-height:80vh; border-radius:20px; box-shadow:0 30px 60px rgba(0,0,0,0.6);" />
      <div style="margin-top:16px; color:white;">
        <span style="color:#14B8A6; font-size:0.85rem; font-weight:700; text-transform:uppercase;">${category}</span>
        <h3 style="margin:4px 0 0; font-size:1.5rem;">${title}</h3>
      </div>
    </div>
  `;

  lightbox.style.display = 'flex';
  setTimeout(() => lightbox.style.opacity = '1', 10);
  document.body.style.overflow = 'hidden';

  lightbox.onclick = (e) => {
    if (e.target === lightbox) closeLightbox();
  };
}

function closeLightbox() {
  const lightbox = document.getElementById('galleryLightbox');
  if (lightbox) {
    lightbox.style.opacity = '0';
    setTimeout(() => {
      lightbox.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  }
}

// ---- DESTINATION PAGE INTERACTIVE LOGIC ----

// Detailed data dictionary for destination modals
const destinationDetailsData = {
  paris: {
    city: 'Paris',
    country: 'France',
    rating: '4.8',
    reviewsCount: '12,450',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200',
    overview: 'Paris, the capital of France, is a major European city and a global center for art, fashion, gastronomy, and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine.',
    bestTime: 'Apr – Jun & Sep – Nov',
    weather: '18°C – 25°C Mild',
    currency: 'Euro (€)',
    language: 'French',
    duration: '5 – 7 Days',
    budget: '₹75,000 / $900 per person',
    attractions: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame Cathedral', 'Arc de Triomphe', 'Montmartre'],
    thingsToDo: ['Seine River Cruise', 'Wine & Cheese Tasting in Le Marais', 'Stroll Along Champs-Élysées', 'Visit Palace of Versailles'],
    localFood: ['Croissants & Pain au Chocolat', 'Beef Bourguignon', 'French Macarons', 'Escargots de Bourgogne'],
    tips: 'Buy museum passes in advance to skip long lines, and use the Paris Métro for fast urban travel.'
  },
  bali: {
    city: 'Bali',
    country: 'Indonesia',
    rating: '4.9',
    reviewsCount: '18,200',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200',
    overview: 'Bali is an Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs. The island is home to religious sites such as cliffside Uluwatu Temple.',
    bestTime: 'Apr – Oct (Dry Season)',
    weather: '27°C – 31°C Tropical',
    currency: 'Indonesian Rupiah (IDR)',
    language: 'Indonesian & Balinese',
    duration: '6 – 8 Days',
    budget: '₹45,000 / $550 per person',
    attractions: ['Ubud Monkey Forest', 'Uluwatu Temple', 'Tegallalang Rice Terraces', 'Tanah Lot Temple', 'Nusa Penida'],
    thingsToDo: ['Surfing in Canggu', 'Floating Breakfast in Ubud', 'Sunrise Trek at Mount Batur', 'Traditional Balinese Spa'],
    localFood: ['Nasi Goreng', 'Babi Guling', 'Satay Lilit', 'Bebek Betutu'],
    tips: 'Rent a scooter with an international permit to easily explore Ubud and coastal beach clubs.'
  },
  tokyo: {
    city: 'Tokyo',
    country: 'Japan',
    rating: '4.9',
    reviewsCount: '15,100',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200',
    overview: 'Tokyo, Japan’s bustling capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples. The opulent Meiji Shinto Shrine is known for its towering gate and surrounding woods.',
    bestTime: 'Mar – May & Sep – Nov',
    weather: '15°C – 22°C Pleasant',
    currency: 'Japanese Yen (¥)',
    language: 'Japanese',
    duration: '6 – 9 Days',
    budget: '₹85,000 / $1,050 per person',
    attractions: ['Shibuya Crossing', 'Senso-ji Temple', 'Tokyo Skytree', 'Meiji Jingu Shrine', 'Akihabara'],
    thingsToDo: ['Watch Cherry Blossoms in Ueno Park', 'Experience TeamLab Planets', 'Eat Fresh Sushi at Tsukiji Outer Market', 'Take the Shinkansen Bullet Train'],
    localFood: ['Tonkotsu Ramen', 'Fresh Edomae Sushi', 'Tempura', 'Wagyu Beef Yakiniku'],
    tips: 'Purchase a Suica IC card for seamless transit across subway lines and convenience store payments.'
  },
  santorini: {
    city: 'Santorini',
    country: 'Greece',
    rating: '4.95',
    reviewsCount: '9,800',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200',
    overview: 'Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape with whitewashed cliffside cubiform houses.',
    bestTime: 'May – Oct',
    weather: '24°C – 29°C Sunny',
    currency: 'Euro (€)',
    language: 'Greek',
    duration: '4 – 6 Days',
    budget: '₹95,000 / $1,150 per person',
    attractions: ['Oia Sunset Point', 'Red Beach', 'Fira to Oia Cliffside Hike', 'Ancient Akrotiri', 'Amoudi Bay'],
    thingsToDo: ['Sunset Catamaran Cruise', 'Volcano & Hot Springs Boat Tour', 'Wine Tasting at Cliffside Wineries', 'Stay in a Cave Suite'],
    localFood: ['Fresh Greek Salad & Feta', 'Grilled Octopus', 'Souvlaki', 'Santorini Fava'],
    tips: 'Book cave suites in Oia months ahead to secure front-row sunset caldera views.'
  },
  dubai: {
    city: 'Dubai',
    country: 'UAE',
    rating: '4.85',
    reviewsCount: '22,300',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200',
    overview: 'Dubai is a city and emirate in the United Arab Emirates known for luxury shopping, ultramodern architecture and a lively nightlife scene. Burj Khalifa, an 830m-tall tower, dominates the skyscraper-filled skyline.',
    bestTime: 'Nov – Mar',
    weather: '22°C – 28°C Warm',
    currency: 'UAE Dirham (AED)',
    language: 'Arabic & English',
    duration: '5 – 7 Days',
    budget: '₹65,000 / $800 per person',
    attractions: ['Burj Khalifa', 'Dubai Mall & Fountains', 'Palm Jumeirah', 'Museum of the Future', 'Desert Conservation Reserve'],
    thingsToDo: ['4x4 Desert Safari & Dune Bashing', 'Helicopter Tour over Palm Jumeirah', 'Dinner at Burj Al Arab', 'Yacht Cruise in Dubai Marina'],
    localFood: ['Shawarma & Falafel', 'Machboos', 'Luqaimat', 'Camel Milk Chocolate'],
    tips: 'Visit Burj Khalifa observation decks during golden hour for stunning sunset photography.'
  },
  maldives: {
    city: 'Maldives',
    country: 'Maldives',
    rating: '5.0',
    reviewsCount: '14,700',
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1200',
    overview: 'The Maldives is a tropical nation in the Indian Ocean composed of 26 ring-shaped atolls, which are made up of more than 1,000 coral islands. It’s known for its beaches, blue lagoons and extensive reefs.',
    bestTime: 'Nov – Apr',
    weather: '28°C – 32°C Tropical',
    currency: 'Maldivian Rufiyaa (MVR) & USD',
    language: 'Dhivehi & English',
    duration: '5 – 7 Days',
    budget: '₹110,000 / $1,350 per person',
    attractions: ['Overwater Bungalow Resorts', 'Male Atoll Reefs', 'Bioluminescent Beach Vaadhoo', 'Ari Atoll Marine Reserve'],
    thingsToDo: ['Swim with Whale Sharks & Manta Rays', 'Sunset Dolphin Cruise', 'Underwater Dining at Ithaa', 'Private Sandbank Picnic'],
    localFood: ['Mas Huni', 'Garudhiya', 'Bis Keemiya', 'Fresh Grilled Lobster'],
    tips: 'Seaplane transfers operate only during daylight hours, so schedule flights accordingly.'
  },
  swissalps: {
    city: 'Swiss Alps',
    country: 'Switzerland',
    rating: '4.92',
    reviewsCount: '8,400',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1200',
    overview: 'The Swiss Alps are famous for their dramatic snow-capped peaks, scenic mountain passes, world-class ski resorts, mountain railways, and tranquil alpine lakes like Lake Lucerne and Lake Geneva.',
    bestTime: 'Dec – Mar (Skiing) & Jun – Sep (Hiking)',
    weather: '-2°C – 18°C Alpine',
    currency: 'Swiss Franc (CHF)',
    language: 'German, French, Italian',
    duration: '6 – 8 Days',
    budget: '₹105,000 / $1,280 per person',
    attractions: ['Matterhorn & Zermatt', 'Jungfraujoch – Top of Europe', 'Interlaken', 'Glacier Express', 'Lake Geneva'],
    thingsToDo: ['Ride the Glacier Express Panoramic Train', 'Skiing in Zermatt', 'Cable Car ride to Schilthorn', 'Fondue Dinner in Alpine Chalet'],
    localFood: ['Swiss Cheese Fondue', 'Rösti', 'Raclette', 'Swiss Dark Chocolate'],
    tips: 'Invest in a Swiss Travel Pass for unlimited rides on trains, boats, and mountain railways.'
  },
  newyork: {
    city: 'New York',
    country: 'USA',
    rating: '4.8',
    reviewsCount: '28,500',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1200',
    overview: 'New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough that’s among the world’s major commercial and cultural centers.',
    bestTime: 'Apr – Jun & Sep – Nov',
    weather: '16°C – 24°C Moderate',
    currency: 'US Dollar ($)',
    language: 'English',
    duration: '5 – 7 Days',
    budget: '₹80,000 / $980 per person',
    attractions: ['Statue of Liberty', 'Central Park', 'Times Square', 'Empire State Building', 'Brooklyn Bridge'],
    thingsToDo: ['Watch a Broadway Show', 'Stroll across Brooklyn Bridge', 'Helicopter Tour over Manhattan', 'Visit MoMA & Met Museums'],
    localFood: ['NYC Style Thin Crust Pizza', 'Bagels with Lox & Cream Cheese', 'Pastrami on Rye', 'New York Cheesecake'],
    tips: 'Walk as much as possible to absorb the energy, and use the NYC Subway for fast travel across boroughs.'
  },
  rome: {
    city: 'Rome',
    country: 'Italy',
    rating: '4.87',
    reviewsCount: '19,300',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1200',
    overview: 'Rome, Italy’s capital, is a sprawling, cosmopolitan city with nearly 3,000 years of globally influential art, architecture and culture on display. Ancient ruins such as the Colosseum evoke the former Roman Empire.',
    bestTime: 'Apr – May & Sep – Oct',
    weather: '18°C – 25°C Pleasant',
    currency: 'Euro (€)',
    language: 'Italian',
    duration: '4 – 6 Days',
    budget: '₹70,000 / $850 per person',
    attractions: ['Colosseum', 'Vatican Museums & Sistine Chapel', 'Trevi Fountain', 'Pantheon', 'Piazza Navona'],
    thingsToDo: ['Toss a coin into Trevi Fountain', 'Explore St. Peter’s Basilica', 'Gelato Tasting Tour in Trastevere', 'Take an Italian Cooking Class'],
    localFood: ['Spaghetti Carbonara', 'Cacio e Pepe', 'Roman Pizza al Taglio', 'Artisanal Gelato'],
    tips: 'Wear comfortable walking shoes for cobblestone streets and purchase skip-the-line tickets for the Colosseum.'
  },
  singapore: {
    city: 'Singapore',
    country: 'Singapore',
    rating: '4.88',
    reviewsCount: '16,900',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1200',
    overview: 'Singapore is a sunny, tropical island city-state in Southeast Asia. It is famous for its clean streets, futuristic skyline, world-class Gardens by the Bay, diverse culinary scene, and vibrant shopping districts.',
    bestTime: 'Nov – Aug',
    weather: '26°C – 32°C Tropical',
    currency: 'Singapore Dollar (SGD)',
    language: 'English, Malay, Mandarin, Tamil',
    duration: '4 – 5 Days',
    budget: '₹55,000 / $680 per person',
    attractions: ['Gardens by the Bay & Supertree Grove', 'Marina Bay Sands Skypark', 'Sentosa Island', 'Jewel Changi Airport Waterfall'],
    thingsToDo: ['Watch Supertree Light Show', 'Night Safari at Singapore Zoo', 'Cocktails at CÉ LA VI Rooftop Bar', 'Explore Chinatown & Little India'],
    localFood: ['Chilli Crab', 'Hainanese Chicken Rice', 'Laksa', 'Kaya Toast & Soft-boiled Eggs'],
    tips: 'Use the EZ-Link card on the efficient MRT train system for quick transit across the island.'
  },
  kyoto: {
    city: 'Kyoto',
    country: 'Japan',
    rating: '4.93',
    reviewsCount: '11,200',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200',
    overview: 'Kyoto was Japan’s capital for over 1,000 years and remains its cultural heart. It is famous for thousands of classical Buddhist temples, gardens, imperial palaces, Shinto shrines and traditional wooden machiya houses.',
    bestTime: 'Mar – May & Oct – Nov',
    weather: '14°C – 22°C Moderate',
    currency: 'Japanese Yen (¥)',
    language: 'Japanese',
    duration: '4 – 5 Days',
    budget: '₹82,000 / $1,000 per person',
    attractions: ['Fushimi Inari Taisha Shrine', 'Arashiyama Bamboo Grove', 'Kinkaku-ji (Golden Pavilion)', 'Gion Geisha District'],
    thingsToDo: ['Walk through 10,000 Torii Gates', 'Experience Traditional Tea Ceremony', 'Stay in a Luxury Ryokan with Onsen', 'Stroll along Philosopher’s Path'],
    localFood: ['Matcha Sweets & Parfait', 'Kaiseki Multi-course Dining', 'Yudofu (Tofu Hot Pot)', 'Kyoto Style Ramen'],
    tips: 'Visit Fushimi Inari early in the morning (around 7 AM) to enjoy peaceful crowds and quiet photos.'
  },
  barcelona: {
    city: 'Barcelona',
    country: 'Spain',
    rating: '4.86',
    reviewsCount: '14,100',
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1200',
    overview: 'Barcelona, the cosmopolitan capital of Spain’s Catalonia region, is known for its art and architecture. The fantastical Sagrada Família church and other modernist landmarks designed by Antoni Gaudí dot the city.',
    bestTime: 'May – Jun & Sep – Oct',
    weather: '20°C – 26°C Sunny',
    currency: 'Euro (€)',
    language: 'Spanish & Catalan',
    duration: '5 – 6 Days',
    budget: '₹68,000 / $830 per person',
    attractions: ['La Sagrada Família', 'Park Güell', 'Casa Batlló', 'La Rambla & Gothic Quarter', 'Barceloneta Beach'],
    thingsToDo: ['Guided Tour of Sagrada Família', 'Tapas Hopping in El Born', 'Sunset at Bunkers del Carmel', 'Watch Flamenco Show'],
    localFood: ['Paella Valenciana', 'Tapas (Patatas Bravas, Jamón)', 'Churros con Chocolate', 'Sangria & Cava'],
    tips: 'Book Sagrada Família entry tickets online weeks in advance to guarantee access to the towers.'
  }
};

// Open Destination Modal
function openDestModal(destKey) {
  const data = destinationDetailsData[destKey] || destinationDetailsData.paris;
  let modal = document.getElementById('destDetailsModal');
  
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'destDetailsModal';
    modal.className = 'dest-modal-wrapper';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="dest-modal-card">
      <button class="dest-modal-close-btn" onclick="closeDestModal()">&times;</button>
      
      <div class="dest-modal-header-img">
        <img src="${data.image}" alt="${data.city}" />
        <div style="position:absolute; inset:0; background:linear-gradient(to top, #0F172A 0%, transparent 60%); display:flex; flex-direction:column; justify-content:flex-end; padding:28px;">
          <span style="color:#14B8A6; font-size:0.85rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em;">${data.country}</span>
          <h2 style="font-family:var(--font-display); font-size:2.2rem; font-weight:800; margin:4px 0 0; color:white;">${data.city}, ${data.country}</h2>
        </div>
      </div>

      <div class="dest-modal-body">
        
        <div style="display:flex; align-items:center; gap:16px; flex-wrap:wrap; margin-bottom:20px;">
          <div style="background:rgba(245,158,11,0.15); border:1px solid rgba(245,158,11,0.4); color:#F59E0B; padding:6px 14px; border-radius:30px; font-weight:700; font-size:0.9rem;">
            ⭐ ${data.rating} (${data.reviewsCount} reviews)
          </div>
          <div style="background:rgba(0,194,255,0.15); border:1px solid rgba(0,194,255,0.4); color:#00C2FF; padding:6px 14px; border-radius:30px; font-weight:700; font-size:0.9rem;">
            💰 ${data.budget}
          </div>
        </div>

        <p style="font-size:1.05rem; line-height:1.65; color:rgba(255,255,255,0.9); margin-bottom:24px;">
          ${data.overview}
        </p>

        <!-- Stats Grid -->
        <div class="dest-info-grid">
          <div class="dest-info-item">
            <span>📅 Best Time</span>
            <strong>${data.bestTime}</strong>
          </div>
          <div class="dest-info-item">
            <span>🌡️ Weather</span>
            <strong>${data.weather}</strong>
          </div>
          <div class="dest-info-item">
            <span>💶 Currency</span>
            <strong>${data.currency}</strong>
          </div>
          <div class="dest-info-item">
            <span>⏱️ Duration</span>
            <strong>${data.duration}</strong>
          </div>
        </div>

        <!-- Top Attractions & Things To Do -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-bottom:28px;">
          <div>
            <h4 style="color:var(--color-primary); font-size:1.1rem; margin-bottom:12px;">📍 Top Attractions</h4>
            <ul style="padding-left:20px; color:rgba(255,255,255,0.85); line-height:1.7;">
              ${data.attractions.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
          <div>
            <h4 style="color:var(--color-accent); font-size:1.1rem; margin-bottom:12px;">🌟 Must-Do Experiences</h4>
            <ul style="padding-left:20px; color:rgba(255,255,255,0.85); line-height:1.7;">
              ${data.thingsToDo.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        </div>

        <!-- Food & Tips -->
        <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-radius:18px; padding:20px; margin-bottom:28px;">
          <h4 style="color:white; font-size:1rem; margin-bottom:8px;">🍲 Local Culinary Specialties</h4>
          <p style="color:rgba(255,255,255,0.8); font-size:0.9rem; margin-bottom:16px;">${data.localFood.join(', ')}</p>

          <h4 style="color:white; font-size:1rem; margin-bottom:8px;">💡 Insider Travel Tip</h4>
          <p style="color:rgba(255,255,255,0.8); font-size:0.9rem; margin:0;">${data.tips}</p>
        </div>

        <!-- Action CTAs -->
        <div style="display:flex; gap:14px; flex-wrap:wrap; margin-top:20px;">
          <a href="trip-planner.html" class="btn-hero-primary" style="padding:12px 28px; font-size:0.9rem;">📅 Plan Trip</a>
          <a href="hotels.html" class="btn-hero-secondary" style="padding:12px 28px; font-size:0.9rem;">🏨 Find Hotels</a>
          <a href="flights.html" class="btn-hero-secondary" style="padding:12px 28px; font-size:0.9rem;">✈️ Check Flights</a>
        </div>

      </div>
    </div>
  `;

  modal.classList.add('show');
  document.body.style.overflow = 'hidden';

  modal.onclick = (e) => {
    if (e.target === modal) closeDestModal();
  };
}

function closeDestModal() {
  const modal = document.getElementById('destDetailsModal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
}

// Destination Filtering System
function applyDestinationFilters() {
  const searchVal = (document.getElementById('destSearchInput')?.value || document.getElementById('destHeroSearch')?.value || '').toLowerCase();
  const continent = (document.getElementById('filterContinent')?.value || 'all').toLowerCase();
  const travelType = (document.getElementById('filterTravelType')?.value || 'all').toLowerCase();
  const budget = (document.getElementById('filterBudget')?.value || 'all').toLowerCase();
  const rating = (document.getElementById('filterRating')?.value || 'all').toLowerCase();

  const cards = document.querySelectorAll('.dest-card-item');
  let visibleCount = 0;

  cards.forEach(card => {
    const cardCity = (card.dataset.city || '').toLowerCase();
    const cardCountry = (card.dataset.country || '').toLowerCase();
    const cardContinent = (card.dataset.continent || '').toLowerCase();
    const cardType = (card.dataset.type || '').toLowerCase();
    const cardBudget = (card.dataset.budget || '').toLowerCase();
    const cardRating = parseFloat(card.dataset.rating || '0');

    const matchesSearch = !searchVal || cardCity.includes(searchVal) || cardCountry.includes(searchVal);
    const matchesContinent = continent === 'all' || cardContinent === continent;
    const matchesType = travelType === 'all' || cardType.includes(travelType);
    const matchesBudget = budget === 'all' || cardBudget === budget;
    const matchesRating = rating === 'all' || cardRating >= parseFloat(rating);

    if (matchesSearch && matchesContinent && matchesType && matchesBudget && matchesRating) {
      card.style.display = 'flex';
      card.style.animation = 'scaleIn 0.4s ease forwards';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  const countBadge = document.getElementById('destResultsCount');
  if (countBadge) {
    countBadge.textContent = `${visibleCount > 0 ? visibleCount : 0} destinations found`;
  }
}

function clearDestinationFilters() {
  if (document.getElementById('destSearchInput')) document.getElementById('destSearchInput').value = '';
  if (document.getElementById('destHeroSearch')) document.getElementById('destHeroSearch').value = '';
  if (document.getElementById('filterContinent')) document.getElementById('filterContinent').value = 'all';
  if (document.getElementById('filterCountry')) document.getElementById('filterCountry').value = 'all';
  if (document.getElementById('filterTravelType')) document.getElementById('filterTravelType').value = 'all';
  if (document.getElementById('filterBudget')) document.getElementById('filterBudget').value = 'all';
  if (document.getElementById('filterSeason')) document.getElementById('filterSeason').value = 'all';
  if (document.getElementById('filterRating')) document.getElementById('filterRating').value = 'all';

  document.querySelectorAll('.continent-tab-btn').forEach(btn => btn.classList.remove('active'));
  const allTab = document.querySelector('.continent-tab-btn[data-continent="all"]');
  if (allTab) allTab.classList.add('active');

  applyDestinationFilters();
  showToast('Filters cleared! Showing all destinations.', 'info');
}

function filterByContinent(btn, continent) {
  document.querySelectorAll('.continent-tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const continentSelect = document.getElementById('filterContinent');
  if (continentSelect) continentSelect.value = continent;
  applyDestinationFilters();
}

function filterByStyle(styleKey) {
  const typeSelect = document.getElementById('filterTravelType');
  if (typeSelect) typeSelect.value = styleKey;
  applyDestinationFilters();

  const destGrid = document.getElementById('popularDestinationsGrid');
  if (destGrid) {
    destGrid.scrollIntoView({ behavior: 'smooth' });
  }
  showToast(`Filtered destinations for "${styleKey.toUpperCase()}"`, 'success');
// ---- TRIP PLANNER INTERACTIVE LOGIC ----

// Interest chips selector
function toggleInterestChip(btn) {
  btn.classList.toggle('active');
}

// Pace card selector
function selectPaceCard(card) {
  document.querySelectorAll('.pace-card').forEach(c => c.classList.remove('active'));
  card.classList.add('active');
}

// Generate Trip Form Submission & Dynamic Generator
function generateTrip(e) {
  if (e) e.preventDefault();

  const destInput = document.getElementById('plannerDestInput')?.value || 'Paris, France';
  const startDate = document.getElementById('plannerStartDate')?.value || '2026-07-15';
  const endDate = document.getElementById('plannerEndDate')?.value || '2026-07-22';
  const adults = document.getElementById('plannerAdults')?.value || '2';
  const children = document.getElementById('plannerChildren')?.value || '0';
  const budget = document.getElementById('plannerBudgetSelect')?.value || '₹2,50,000';
  const customBudget = document.getElementById('plannerCustomBudget')?.value;

  const overlay = document.getElementById('plannerLoadingOverlay');
  if (overlay) {
    overlay.classList.add('show');
  }

  setTimeout(() => {
    if (overlay) overlay.classList.remove('show');

    // Display generated results section
    const resultsSection = document.getElementById('plannerResultsSection');
    if (resultsSection) {
      resultsSection.style.display = 'block';
      resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Update dynamic header text
    const titleEl = document.getElementById('generatedTripTitle');
    if (titleEl) titleEl.textContent = `${destInput.toUpperCase()} GETAWAY`;

    const subEl = document.getElementById('generatedTripSub');
    if (subEl) subEl.textContent = `📍 ${destInput}  •  📅 ${startDate} to ${endDate}  •  👥 ${adults} Adults, ${children} Children`;

    const budgetEl = document.getElementById('generatedBudgetSummary');
    if (budgetEl) budgetEl.textContent = customBudget ? `₹${parseInt(customBudget).toLocaleString()}` : budget;

    showToast('✨ Dynamic VIP Itinerary Generated Successfully!', 'success', 5000);
  }, 1800);
}

// Switch Sub-tabs (Itinerary, Calendar, Budget, Packing, Notes)
function switchPlannerTab(tabId) {
  document.querySelectorAll('.planner-tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.planner-tab-pane').forEach(pane => pane.style.display = 'none');

  const activeBtn = document.querySelector(`.planner-tab-btn[data-tab="${tabId}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  const activePane = document.getElementById(`tabPane-${tabId}`);
  if (activePane) {
    activePane.style.display = 'block';
    activePane.style.animation = 'fadeInUp 0.4s ease forwards';
  }
}

// Activity Management
function openAddActivityModal() {
  const modal = document.getElementById('addActivityModal');
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function closeAddActivityModal() {
  const modal = document.getElementById('addActivityModal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
}

function submitNewActivity(e) {
  e.preventDefault();
  const title = document.getElementById('newActivityTitle')?.value || 'New Tour Activity';
  const time = document.getElementById('newActivityTime')?.value || '02:00 PM';
  const location = document.getElementById('newActivityLocation')?.value || 'City Center';
  const cost = document.getElementById('newActivityCost')?.value || '₹2,500';

  const dayList = document.getElementById('day1ActivityList');
  if (dayList) {
    const newItem = document.createElement('div');
    newItem.className = 'activity-card-item';
    newItem.innerHTML = `
      <div style="display:flex; align-items:center; gap:16px;">
        <span class="activity-time-badge">${time}</span>
        <div>
          <h4 style="margin:0; font-size:1.05rem; color:white;">📍 ${title}</h4>
          <div style="font-size:0.8rem; color:var(--gray-400); margin-top:2px;">Location: ${location} • Cost: ${cost}</div>
        </div>
      </div>
      <div class="activity-actions">
        <button class="btn-activity-action" onclick="TravelApp.toggleActivityComplete(this)">Check</button>
        <button class="btn-activity-action danger" onclick="TravelApp.deleteActivity(this)">Delete</button>
      </div>
    `;
    dayList.appendChild(newItem);
  }

  closeAddActivityModal();
  showToast(`Added "${title}" to Day 1 Itinerary!`, 'success');
}

function deleteActivity(btn) {
  const item = btn.closest('.activity-card-item');
  if (item) {
    item.style.opacity = '0';
    item.style.transform = 'translateX(20px)';
    setTimeout(() => item.remove(), 300);
    showToast('Activity removed from itinerary', 'info');
  }
}

function moveActivity(btn, dir) {
  const item = btn.closest('.activity-card-item');
  if (!item) return;
  if (dir === 'up' && item.previousElementSibling) {
    item.parentElement.insertBefore(item, item.previousElementSibling);
  } else if (dir === 'down' && item.nextElementSibling) {
    item.parentElement.insertBefore(item.nextElementSibling, item);
  }
}

function toggleActivityComplete(btn) {
  const item = btn.closest('.activity-card-item');
  if (!item) return;
  item.classList.toggle('completed');
  if (item.classList.contains('completed')) {
    item.style.opacity = '0.6';
    btn.textContent = 'Completed ✓';
    btn.style.background = '#10B981';
  } else {
    item.style.opacity = '1';
    btn.textContent = 'Check';
    btn.style.background = '';
  }
}

// Interactive Packing Checklist Logic
function togglePackingItem(checkbox) {
  const row = checkbox.closest('.packing-item-row');
  if (row) {
    row.classList.toggle('completed', checkbox.checked);
  }
  updatePackingProgress();
}

function addNewPackingItem() {
  const input = document.getElementById('newPackingInput');
  if (!input || !input.value.trim()) return;

  const val = input.value.trim();
  const list = document.getElementById('packingChecklistContainer');
  if (list) {
    const row = document.createElement('div');
    row.className = 'packing-item-row';
    row.innerHTML = `
      <label style="display:flex; align-items:center; gap:12px; cursor:pointer; color:white; font-size:0.92rem;">
        <input type="checkbox" onchange="TravelApp.togglePackingItem(this)" />
        <span>${val}</span>
      </label>
      <button class="btn-activity-action danger" onclick="TravelApp.deletePackingItem(this)" style="padding:4px 8px; font-size:0.75rem;">&times;</button>
    `;
    list.appendChild(row);
  }
  input.value = '';
  updatePackingProgress();
  showToast(`Added "${val}" to packing checklist`, 'success');
}

function deletePackingItem(btn) {
  const row = btn.closest('.packing-item-row');
  if (row) {
    row.remove();
    updatePackingProgress();
  }
}

function updatePackingProgress() {
  const allInputs = document.querySelectorAll('#packingChecklistContainer input[type="checkbox"]');
  const checkedInputs = document.querySelectorAll('#packingChecklistContainer input[type="checkbox"]:checked');
  const countBadge = document.getElementById('packingProgressBadge');
  if (countBadge) {
    countBadge.textContent = `${checkedInputs.length} of ${allInputs.length} items packed`;
  }
}

// Trip Notes Manager
function addTripNote() {
  const titleInput = document.getElementById('newNoteTitle');
  const descInput = document.getElementById('newNoteDesc');

  if (!titleInput || !descInput || !titleInput.value.trim()) {
    showToast('Please enter a note title', 'warning');
    return;
  }

  const title = titleInput.value.trim();
  const desc = descInput.value.trim();

  const grid = document.getElementById('tripNotesGrid');
  if (grid) {
    const noteCard = document.createElement('div');
    noteCard.className = 'feature-glass-card';
    noteCard.style.padding = '24px';
    noteCard.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
        <h4 style="margin:0; font-size:1.1rem; color:white;">📌 ${title}</h4>
        <div style="display:flex; gap:6px;">
          <button class="btn-activity-action" onclick="TravelApp.pinTripNote(this)">Pin</button>
          <button class="btn-activity-action danger" onclick="TravelApp.deleteTripNote(this)">Delete</button>
        </div>
      </div>
      <p style="margin:0; font-size:0.88rem; color:var(--gray-300); line-height:1.5;">${desc}</p>
    `;
    grid.insertBefore(noteCard, grid.firstChild);
  }

  titleInput.value = '';
  descInput.value = '';
  showToast('Added travel note!', 'success');
}

function pinTripNote(btn) {
  const card = btn.closest('.feature-glass-card');
  if (card) {
    card.style.border = '1px solid var(--color-primary)';
    card.style.boxShadow = '0 0 25px rgba(0, 194, 255, 0.3)';
    btn.textContent = 'Pinned ⭐';
    btn.style.background = 'var(--color-primary)';
    showToast('Note pinned to top', 'info');
  }
}

function deleteTripNote(btn) {
  const card = btn.closest('.feature-glass-card');
  if (card) {
    card.remove();
    showToast('Note deleted', 'info');
  }
}

// Recommended Places Add to Trip Handler
function addRecommendedToTrip(name, price, cat) {
  showToast(`Added "${name}" (${cat}) to Day 2 Itinerary!`, 'success');
}

// Save, Share, Export Handlers
function saveCurrentTrip() {
  const tripData = {
    title: document.getElementById('generatedTripTitle')?.textContent || 'PARIS GETAWAY',
    sub: document.getElementById('generatedTripSub')?.textContent || '',
    savedAt: new Date().toISOString()
  };

  const existing = JSON.parse(localStorage.getItem('voyger_saved_trips') || '[]');
  existing.push(tripData);
  localStorage.setItem('voyger_saved_trips', JSON.stringify(existing));

  showToast('💾 Trip saved! View your trip inside Dashboard → My Trips', 'success', 5000);
}

function shareTrip() {
  navigator.clipboard?.writeText(window.location.href);
  showToast('🔗 Trip share link copied to clipboard!', 'info', 4000);
}

function exportTripPDF() {
  showToast('📄 Generating high-resolution PDF itinerary...', 'info', 3000);
  setTimeout(() => {
    showToast('✅ Downloaded "Voyger_Trip_Itinerary.pdf"', 'success', 4000);
  }, 2500);
}

// SCROLL REVEAL OBSERVER
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
  revealObserver.observe(el);
});

// ---- HOTELS PAGE INTERACTIVE LOGIC ----

// Search Hotels Form Submit & Date Validation
function searchHotels(e) {
  if (e) e.preventDefault();
  
  const dest = document.getElementById('hotelDestInput')?.value || 'Paris, France';
  const checkinVal = document.getElementById('hotelCheckinDate')?.value;
  const checkoutVal = document.getElementById('hotelCheckoutDate')?.value;

  if (checkinVal && checkoutVal) {
    const checkin = new Date(checkinVal);
    const checkout = new Date(checkoutVal);
    if (checkout <= checkin) {
      showToast('Check-out date must be after check-in date!', 'warning');
      return;
    }
  }

  showToast(`🔍 Searching luxury stays in ${dest}...`, 'info');
  applyHotelFilters();
}

// Accommodation Category Filter
function filterHotelsByCategory(btn, categoryKey) {
  document.querySelectorAll('.accom-category-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const cards = document.querySelectorAll('.hotel-card-item');
  let visibleCount = 0;

  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category') || 'hotel';
    if (categoryKey === 'all' || cardCat.includes(categoryKey)) {
      card.style.display = 'grid';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  const countLabel = document.getElementById('hotelsResultCount');
  if (countLabel) {
    countLabel.textContent = `${visibleCount} properties found`;
  }

  const emptyState = document.getElementById('noHotelsState');
  if (emptyState) {
    emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
  }
}

// Apply Sidebar Filters
function applyHotelFilters() {
  const cards = document.querySelectorAll('.hotel-card-item');
  let visibleCount = 0;

  const maxPrice = parseInt(document.getElementById('priceRangeSlider')?.value || '50000');
  
  // Selected Property Types
  const selectedTypes = Array.from(document.querySelectorAll('.filter-type-checkbox:checked')).map(cb => cb.value);
  
  // Selected Star Ratings
  const selectedStars = Array.from(document.querySelectorAll('.filter-star-checkbox:checked')).map(cb => cb.value);

  cards.forEach(card => {
    const price = parseInt(card.getAttribute('data-price') || '0');
    const type = card.getAttribute('data-category') || 'hotel';
    const stars = card.getAttribute('data-stars') || '5';

    const matchesPrice = price <= maxPrice;
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes('all') || selectedTypes.includes(type);
    const matchesStars = selectedStars.length === 0 || selectedStars.includes('all') || selectedStars.includes(stars);

    if (matchesPrice && matchesType && matchesStars) {
      card.style.display = 'grid';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  const countLabel = document.getElementById('hotelsResultCount');
  if (countLabel) {
    countLabel.textContent = `${visibleCount} properties found`;
  }

  const emptyState = document.getElementById('noHotelsState');
  if (emptyState) {
    emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
  }
}

// Clear All Filters
function clearHotelFilters() {
  const slider = document.getElementById('priceRangeSlider');
  if (slider) slider.value = 50000;
  const sliderVal = document.getElementById('priceRangeVal');
  if (sliderVal) sliderVal.textContent = '₹50,000';

  document.querySelectorAll('.filter-checkbox-label input[type="checkbox"]').forEach(cb => cb.checked = false);
  document.querySelectorAll('.accom-category-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.accom-category-btn[data-category="all"]')?.classList.add('active');

  const cards = document.querySelectorAll('.hotel-card-item');
  cards.forEach(card => card.style.display = 'grid');

  const countLabel = document.getElementById('hotelsResultCount');
  if (countLabel) countLabel.textContent = `${cards.length} properties found`;

  const emptyState = document.getElementById('noHotelsState');
  if (emptyState) emptyState.style.display = 'none';

  showToast('All hotel filters cleared!', 'info');
}

// Update Price Slider Display Text
function updatePriceSliderVal(val) {
  const label = document.getElementById('priceRangeVal');
  if (label) {
    label.textContent = val >= 50000 ? '₹50,000+' : `₹${parseInt(val).toLocaleString()}`;
  }
  applyHotelFilters();
}

// Sort Hotels
function sortHotels(sortKey) {
  const container = document.getElementById('hotelListViewContainer');
  if (!container) return;

  const cards = Array.from(container.querySelectorAll('.hotel-card-item'));

  cards.sort((a, b) => {
    const priceA = parseInt(a.getAttribute('data-price') || '0');
    const priceB = parseInt(b.getAttribute('data-price') || '0');
    const ratingA = parseFloat(a.getAttribute('data-rating') || '0');
    const ratingB = parseFloat(b.getAttribute('data-rating') || '0');

    if (sortKey === 'price-low') return priceA - priceB;
    if (sortKey === 'price-high') return priceB - priceA;
    if (sortKey === 'rating') return ratingB - ratingA;
    return 0; // Default recommended
  });

  cards.forEach(card => container.appendChild(card));
  showToast(`Sorted properties by ${sortKey.toUpperCase()}`, 'info');
}

// View Mode Switcher (List vs Map)
function switchHotelViewMode(mode) {
  const listBtn = document.getElementById('btnListView');
  const mapBtn = document.getElementById('btnMapView');
  const listContainer = document.getElementById('hotelListViewContainer');
  const mapContainer = document.getElementById('hotelMapViewContainer');

  if (mode === 'map') {
    listBtn?.classList.remove('active');
    mapBtn?.classList.add('active');
    if (listContainer) listContainer.style.display = 'none';
    if (mapContainer) mapContainer.style.display = 'block';
  } else {
    mapBtn?.classList.remove('active');
    listBtn?.classList.add('active');
    if (mapContainer) mapContainer.style.display = 'none';
    if (listContainer) listContainer.style.display = 'block';
  }
}

// Hotel Details Modal Management
function openHotelDetailsModal(hotelName) {
  const modal = document.getElementById('hotelDetailsModal');
  if (modal) {
    const nameEl = document.getElementById('modalHotelName');
    if (nameEl && hotelName) nameEl.textContent = hotelName;

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function closeHotelDetailsModal() {
  const modal = document.getElementById('hotelDetailsModal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
}

// Select Room inside Details Modal
function selectHotelRoom(roomName, pricePerNight) {
  const roomEl = document.getElementById('selectedRoomName');
  const priceEl = document.getElementById('selectedRoomPrice');
  const totalEl = document.getElementById('selectedRoomTotal');

  if (roomEl) roomEl.textContent = roomName;
  if (priceEl) priceEl.textContent = `₹${pricePerNight.toLocaleString()}`;

  const numNights = 3;
  const subtotal = pricePerNight * numNights;
  const taxes = 4500;
  const grandTotal = subtotal + taxes;

  if (totalEl) totalEl.textContent = `₹${grandTotal.toLocaleString()}`;

  showToast(`Selected "${roomName}" for booking!`, 'success');
  document.getElementById('bookingSummarySidebar')?.scrollIntoView({ behavior: 'smooth' });
}

// Reserve Now Handler & Confirmation
function reserveHotelNow() {
  closeHotelDetailsModal();

  const confirmModal = document.getElementById('bookingConfirmModal');
  if (confirmModal) {
    confirmModal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  // Save booking to localStorage
  const newBooking = {
    id: '#VOY-HTL-' + Math.floor(10000 + Math.random() * 90000),
    hotel: document.getElementById('modalHotelName')?.textContent || 'Grand Hôtel Paris',
    room: document.getElementById('selectedRoomName')?.textContent || 'Deluxe King Room',
    checkin: '15 July 2026',
    checkout: '18 July 2026',
    amount: document.getElementById('selectedRoomTotal')?.textContent || '₹41,997',
    status: 'Confirmed'
  };

  const existing = JSON.parse(localStorage.getItem('voyger_hotel_bookings') || '[]');
  existing.push(newBooking);
  localStorage.setItem('voyger_hotel_bookings', JSON.stringify(existing));

  showToast('🎉 Hotel Stay Reserved Successfully!', 'success', 5000);
}

function closeBookingConfirmModal() {
  const confirmModal = document.getElementById('bookingConfirmModal');
  if (confirmModal) {
    confirmModal.classList.remove('show');
    document.body.style.overflow = '';
  }
}

// Global expose
window.TravelApp = {
  showToast,
  toggleFavorite,
  toggleDropdown,
  scrollPackagesCarousel,
  scrollTrendingCarousel,
  goToTestimonial,
  openLightbox,
  closeLightbox,
  openDestModal,
  closeDestModal,
  applyDestinationFilters,
  clearDestinationFilters,
  filterByContinent,
  filterByStyle,
  toggleQuizTag,
  findMyDestination,
  toggleInterestChip,
  selectPaceCard,
  generateTrip,
  switchPlannerTab,
  openAddActivityModal,
  closeAddActivityModal,
  submitNewActivity,
  deleteActivity,
  moveActivity,
  toggleActivityComplete,
  togglePackingItem,
  addNewPackingItem,
  deletePackingItem,
  addTripNote,
  pinTripNote,
  deleteTripNote,
  addRecommendedToTrip,
  saveCurrentTrip,
  shareTrip,
  exportTripPDF,
  searchHotels,
  filterHotelsByCategory,
  applyHotelFilters,
  clearHotelFilters,
  updatePriceSliderVal,
  sortHotels,
  switchHotelViewMode,
  openHotelDetailsModal,
  closeHotelDetailsModal,
  selectHotelRoom,
  reserveHotelNow,
  closeBookingConfirmModal,
  handleSearch,
  handleNewsletterSubmit,
  setTheme,
  getTheme
};




