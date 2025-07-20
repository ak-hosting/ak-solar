// AK Solar - Genel JavaScript Fonksiyonları

// Sayfa yüklendiğinde çalışacak genel fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    initGeneralFeatures();
    initAnimations();
    initCounters();
    initParallax();
});

// Genel özellikler
function initGeneralFeatures() {
    // Navbar scroll efekti
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobil menü kapanma
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });

    // Tooltip'leri etkinleştir
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Popover'ları etkinleştir
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
}

// Animasyonlar
function initAnimations() {
    // Typing efekti
    const heroTitle = document.querySelector('#hero h1');
    if (heroTitle) {
        typeWriter(heroTitle, heroTitle.textContent, 100);
    }

    // Fade in animasyonları
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-active');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => observer.observe(el));

    // Hover efektleri
    const hoverElements = document.querySelectorAll('.hover-effect');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Typing efekti
function typeWriter(element, text, speed) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Sayaç animasyonları
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 saniye
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// Parallax efekti
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Lazy loading
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Form gelişmiş özellikleri
function initAdvancedFormFeatures() {
    // Otomatik kaydetme
    const formInputs = document.querySelectorAll('input, textarea, select');
    
    formInputs.forEach(input => {
        // Local storage'dan değerleri yükle
        const savedValue = localStorage.getItem(`form_${input.name}`);
        if (savedValue && !input.value) {
            input.value = savedValue;
        }
        
        // Değerleri otomatik kaydet
        input.addEventListener('input', function() {
            localStorage.setItem(`form_${this.name}`, this.value);
        });
    });
    
    // Form temizleme
    const clearFormBtn = document.querySelector('.clear-form');
    if (clearFormBtn) {
        clearFormBtn.addEventListener('click', function() {
            const form = this.closest('form');
            form.reset();
            
            // Local storage'dan temizle
            formInputs.forEach(input => {
                localStorage.removeItem(`form_${input.name}`);
            });
        });
    }
}

// Bildirim sistemi
class NotificationSystem {
    constructor() {
        this.container = this.createContainer();
    }
    
    createContainer() {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            max-width: 400px;
        `;
        document.body.appendChild(container);
        return container;
    }
    
    show(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show`;
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        this.container.appendChild(notification);
        
        // Otomatik kaldırma
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, duration);
        
        return notification;
    }
}

// Performans optimizasyonu
function optimizePerformance() {
    // Debounce fonksiyonu
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Scroll event'ini optimize et
    const optimizedScrollHandler = debounce(() => {
        // Scroll işlemleri burada
    }, 16); // 60fps
    
    window.addEventListener('scroll', optimizedScrollHandler);
    
    // Resize event'ini optimize et
    const optimizedResizeHandler = debounce(() => {
        // Resize işlemleri burada
    }, 250);
    
    window.addEventListener('resize', optimizedResizeHandler);
}

// Tema değiştirici
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }
    
    init() {
        this.applyTheme();
        this.createThemeToggle();
    }
    
    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        document.body.classList.toggle('dark-theme', this.currentTheme === 'dark');
    }
    
    createThemeToggle() {
        const toggle = document.createElement('button');
        toggle.className = 'btn btn-outline-secondary position-fixed';
        toggle.style.cssText = `
            top: 20px;
            left: 20px;
            z-index: 1000;
            border-radius: 50%;
            width: 50px;
            height: 50px;
        `;
        toggle.innerHTML = this.currentTheme === 'dark' ? '☀️' : '🌙';
        toggle.title = 'Tema Değiştir';
        
        toggle.addEventListener('click', () => {
            this.toggleTheme();
            toggle.innerHTML = this.currentTheme === 'dark' ? '☀️' : '🌙';
        });
        
        document.body.appendChild(toggle);
    }
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.currentTheme);
        this.applyTheme();
    }
}

// Çevrimdışı desteği
function initOfflineSupport() {
    // Service Worker kaydı
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('ServiceWorker başarıyla kaydedildi:', registration.scope);
                })
                .catch(error => {
                    console.log('ServiceWorker kaydı başarısız:', error);
                });
        });
    }
    
    // Çevrimdışı bildirim
    window.addEventListener('online', () => {
        const notification = new NotificationSystem();
        notification.show('İnternet bağlantısı geri geldi!', 'success');
    });
    
    window.addEventListener('offline', () => {
        const notification = new NotificationSystem();
        notification.show('İnternet bağlantısı kesildi. Çevrimdışı mod aktif.', 'warning');
    });
}

// Sosyal medya paylaşım
function initSocialSharing() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.getAttribute('data-platform');
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            const text = encodeURIComponent('AK Solar - Güneş Enerjisi Çözümleri');
            
            let shareUrl = '';
            
            switch(platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${text}%20${url}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}

// Gelişmiş arama
function initAdvancedSearch() {
    const searchInput = document.querySelector('#search-input');
    if (!searchInput) return;
    
    const searchResults = document.querySelector('#search-results');
    
    searchInput.addEventListener('input', debounce(function() {
        const query = this.value.toLowerCase();
        
        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }
        
        // Arama sonuçlarını göster
        searchResults.style.display = 'block';
        searchResults.innerHTML = `
            <div class="list-group">
                <a href="#services" class="list-group-item list-group-item-action">
                    <i class="fas fa-solar-panel me-2"></i>GES Kurulumu
                </a>
                <a href="#calculator" class="list-group-item list-group-item-action">
                    <i class="fas fa-calculator me-2"></i>Enerji Hesaplayıcı
                </a>
                <a href="#projects" class="list-group-item list-group-item-action">
                    <i class="fas fa-images me-2"></i>Proje Galerisi
                </a>
            </div>
        `;
    }, 300));
    
    // Debounce fonksiyonu
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Sayfa yüklendiğinde tüm özellikleri başlat
document.addEventListener('DOMContentLoaded', function() {
    // Temel özellikler
    initGeneralFeatures();
    initAnimations();
    initCounters();
    initParallax();
    
    // Gelişmiş özellikler
    initLazyLoading();
    initAdvancedFormFeatures();
    optimizePerformance();
    
    // Opsiyonel özellikler
    if (document.querySelector('.share-btn')) {
        initSocialSharing();
    }
    
    if (document.querySelector('#search-input')) {
        initAdvancedSearch();
    }
    
    // Tema yöneticisi (opsiyonel)
    // new ThemeManager();
    
    // Çevrimdışı desteği
    initOfflineSupport();
    
    // Global bildirim sistemi
    window.notificationSystem = new NotificationSystem();
    
    console.log('🚀 AK Solar - Tüm özellikler yüklendi!');
});

// Hata yakalama
window.addEventListener('error', function(e) {
    console.error('Sayfa hatası:', e.error);
    
    if (window.notificationSystem) {
        window.notificationSystem.show('Bir hata oluştu. Lütfen sayfayı yenileyin.', 'danger');
    }
});

// Sayfa görünürlük API'si
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Sayfa arka planda');
    } else {
        console.log('Sayfa ön planda');
    }
}); 