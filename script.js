/* BAYANGAN NAVBAR SAAT SCROLL */
window.addEventListener('scroll', function() {
  var navbar = document.getElementById('navbarUtama');
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* EFEK MUNCUL SAAT DI-SCROLL */
var pengamatElemen = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      pengamatElemen.unobserve(entry.target); 
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal, .fade-up').forEach(function(elemen, index) {
  
  elemen.style.transitionDelay = (index % 4) * 0.15 + 's'; 
  pengamatElemen.observe(elemen);
});

/* ANGKA BERJALAN */
function jalankanAnimasiHitung() {
  document.querySelectorAll('[data-count]').forEach(function(el) {
    var angkaTarget = parseInt(el.dataset.count);
    var angkaAwal = 0;
    
    setTimeout(() => {
      function tambahAngka() {
        angkaAwal += Math.ceil(angkaTarget / 40);
        
        if (angkaAwal >= angkaTarget) {
          el.textContent = angkaTarget + '+';
        } else {
          el.textContent = angkaAwal;
          requestAnimationFrame(tambahAngka);
        }
      }
      tambahAngka();
    }, 500);
  });
}

var pengamatHero = new IntersectionObserver(function(entries) {
  if (entries[0].isIntersecting) {
    jalankanAnimasiHitung();
    pengamatHero.disconnect();
  }
}, { threshold: 0.5 });

pengamatHero.observe(document.getElementById('home'));

/* TOMBOL GESER PROJECT */
var trackProject = document.getElementById('areaTrackProject');
var tombolKiri = document.getElementById('tombolGeserKiri');
var tombolKanan = document.getElementById('tombolGeserKanan');

tombolKanan.addEventListener('click', function() {
  trackProject.scrollBy({ left: 342, behavior: 'smooth' });
});

tombolKiri.addEventListener('click', function() {
  trackProject.scrollBy({ left: -342, behavior: 'smooth' });
});

/* efek pesan terkirin */
function prosesKirimPesan() {
  var tombolKirim = document.getElementById('tombolKirimPesan');
  var teksAwal = tombolKirim.innerHTML;
  
  tombolKirim.innerHTML = 'Message Sent! 🎉';
  tombolKirim.style.background = 'var(--c-accent3)';
  tombolKirim.style.transform = 'scale(1.05)';
  tombolKirim.style.boxShadow = '0 10px 25px rgba(6, 214, 160, 0.4)';
  
  setTimeout(function() {
    tombolKirim.innerHTML = teksAwal;
    tombolKirim.style.background = '';
    tombolKirim.style.transform = '';
    tombolKirim.style.boxShadow = '';
  }, 3500);
}

/* ANIMASI PROGRESS BAR */
var pengamatProgressBar = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry, index) {
    if (entry.isIntersecting) {
      var lebarTarget = entry.target.style.width;
      entry.target.style.width = '0';
      
      setTimeout(function() {
        entry.target.style.transition = 'width 1.5s cubic-bezier(0.25, 1, 0.5, 1)';
        entry.target.style.width = lebarTarget;
      }, index * 200 + 100); 
      
      pengamatProgressBar.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.progress-bar').forEach(function(pb) {
  pengamatProgressBar.observe(pb);
});

/*mode gelap*/
const toggleButton = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// Check tema yang tersimpan di localStorage saat website dibuka
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  // Sesuaikan ikon berdasarkan tema yang aktif
  if (currentTheme === 'dark') {
    themeIcon.textContent = '☀️'; // Tampilkan matahari jika sedang mode gelap
  }
}

// Fungsi ketika tombol diklik
toggleButton.addEventListener('click', () => {
  let theme = document.documentElement.getAttribute('data-theme');
  
  if (theme === 'dark') {
    // Ubah ke mode terang
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
    themeIcon.textContent = '🌙';
  } else {
    // Ubah ke mode gelap
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    themeIcon.textContent = '☀️';
  }
})
