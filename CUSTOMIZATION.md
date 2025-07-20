# AK Solar - Özelleştirme Rehberi

Bu rehber, AK Solar web sitesi şablonunu ihtiyaçlarınıza göre özelleştirmeniz için hazırlanmıştır.

## 🎨 Renk Teması Değiştirme

### Ana Renkler

`assets/css/style.css` dosyasında CSS değişkenlerini düzenleyin:

```css
:root {
  /* Mevcut renkler */
  --solar-green: #0F9D58;     /* Ana yeşil */
  --solar-blue: #4285F4;      /* Mavi vurgu */
  --solar-dark: #1a1a1a;      /* Koyu arka plan */
  --solar-light: #f8f9fa;     /* Açık arka plan */
  
  /* Yeni renkler için örnekler */
  --solar-orange: #FF6B35;    /* Turuncu tema */
  --solar-purple: #6B46C1;    /* Mor tema */
  --solar-red: #DC2626;       /* Kırmızı tema */
  --solar-yellow: #F59E0B;    /* Sarı tema */
}
```

### Gradient Değiştirme

```css
/* Mevcut gradient */
--solar-gradient: linear-gradient(135deg, var(--solar-green) 0%, var(--solar-blue) 100%);

/* Alternatif gradientler */
--solar-gradient-orange: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
--solar-gradient-purple: linear-gradient(135deg, #6B46C1 0%, #8B5CF6 100%);
--solar-gradient-red: linear-gradient(135deg, #DC2626 0%, #EF4444 100%);
```

### Buton Renkleri

```css
/* Ana buton rengi */
.btn-solar {
  background: var(--solar-gradient);
  /* Diğer özellikler... */
}

/* Alternatif buton renkleri */
.btn-orange {
  background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
}

.btn-purple {
  background: linear-gradient(135deg, #6B46C1 0%, #8B5CF6 100%);
}
```

## 📝 İçerik Değiştirme

### Firma Bilgileri

`index.html` dosyasında aşağıdaki bölümleri güncelleyin:

```html
<!-- Navbar -->
<a class="navbar-brand" href="#">
    <i class="fas fa-sun me-2"></i>FIRMA ADINIZ
</a>

<!-- Hero Section -->
<h1 class="display-3 fw-bold mb-4">Firmanızın Sloganı</h1>
<p class="lead mb-4">Firmanızın öne çıkan özellikleri</p>

<!-- Footer -->
<h5><i class="fas fa-sun me-2"></i>FIRMA ADINIZ ENERJİ</h5>
<p>Firmanızın açıklaması</p>
```

### İletişim Bilgileri

```html
<!-- İletişim bölümü -->
<div class="contact-info text-center mb-4">
    <i class="fas fa-map-marker-alt fa-2x text-success mb-3"></i>
    <h5>Adres</h5>
    <p>Firmanızın adresi<br>Şehir / İl</p>
</div>

<div class="contact-info text-center mb-4">
    <i class="fas fa-phone fa-2x text-primary mb-3"></i>
    <h5>Telefon</h5>
    <p>+90 (xxx) xxx xx xx<br>+90 (5xx) xxx xx xx</p>
</div>

<div class="contact-info text-center mb-4">
    <i class="fas fa-envelope fa-2x text-info mb-3"></i>
    <h5>E-posta</h5>
    <p>info@firmaniz.com<br>teknik@firmaniz.com</p>
</div>
```

## 🛠️ Hizmet Kartları Özelleştirme

### Yeni Hizmet Ekleme

```html
<div class="col-md-4">
    <div class="service-card text-center p-4 h-100">
        <!-- İkon değiştirme -->
        <i class="fas fa-bolt-lightning fa-3x text-warning mb-3"></i>
        
        <!-- Başlık -->
        <h4>Yeni Hizmet Adı</h4>
        
        <!-- Açıklama -->
        <p>Hizmetinizin detaylı açıklaması buraya gelecek.</p>
        
        <!-- Fiyat -->
        <div class="price">₺XX.XXX'den başlayan fiyatlar</div>
        
        <!-- Özellikler listesi -->
        <ul class="list-unstyled mt-3">
            <li><i class="fas fa-check text-success me-2"></i>Özellik 1</li>
            <li><i class="fas fa-check text-success me-2"></i>Özellik 2</li>
            <li><i class="fas fa-check text-success me-2"></i>Özellik 3</li>
        </ul>
    </div>
</div>
```

### İkon Değiştirme

Font Awesome ikonları kullanabilirsiniz:

```html
<!-- Enerji ikonları -->
<i class="fas fa-solar-panel"></i>      <!-- Güneş paneli -->
<i class="fas fa-bolt-lightning"></i>   <!-- Enerji -->
<i class="fas fa-chart-line"></i>       <!-- Grafik -->
<i class="fas fa-tools"></i>            <!-- Bakım -->
<i class="fas fa-calculator"></i>       <!-- Hesaplayıcı -->
<i class="fas fa-file-invoice"></i>     <!-- Teklif -->
<i class="fas fa-phone"></i>            <!-- Telefon -->
<i class="fas fa-envelope"></i>         <!-- E-posta -->
<i class="fas fa-map-marker-alt"></i>   <!-- Konum -->

<!-- Renk sınıfları -->
text-success    <!-- Yeşil -->
text-primary    <!-- Mavi -->
text-warning    <!-- Sarı -->
text-danger     <!-- Kırmızı -->
text-info       <!-- Açık mavi -->
text-secondary  <!-- Gri -->
```

## 📊 Enerji Hesaplayıcı Özelleştirme

### Hesaplama Parametreleri

`assets/js/calculator.js` dosyasında değişiklik yapın:

```javascript
// Panel özellikleri
this.panelWattage = 400;        // Panel gücü (Watt)
this.panelEfficiency = 0.85;    // Panel verimliliği (%)
this.systemCost = 1200;         // Sistem maliyeti (₺/kW)
this.maintenanceCost = 0.02;    // Bakım maliyeti (%)

// Güneş ışınımı verileri (kWh/m²/gün)
getSolarIrradiation(location) {
    const irradiationData = {
        'istanbul': 4.2,
        'izmir': 4.8,
        'ankara': 4.5,
        'antalya': 5.2,
        'bursa': 4.3,
        'adana': 5.0,
        'konya': 4.7,
        'samsun': 4.1,
        'trabzon': 3.8,
        'diyarbakir': 5.3
    };
    return irradiationData[location] || 4.5;
}

// Sistem verimliliği
getSystemEfficiency(roofType) {
    const efficiencyData = {
        'flat': 0.85,      // Düz çatı
        'sloped': 0.90,    // Eğimli çatı
        'ground': 0.88,    // Yer üstü
        'tracking': 0.95   // Takip sistemi
    };
    return efficiencyData[roofType] || 0.85;
}
```

### Yeni Şehir Ekleme

```javascript
// Hesaplayıcıya yeni şehir ekleme
const newLocation = document.createElement('option');
newLocation.value = 'yeni-sehir';
newLocation.textContent = 'Yeni Şehir';
document.getElementById('location').appendChild(newLocation);

// Işınım verisi ekleme
irradiationData['yeni-sehir'] = 4.5; // kWh/m²/gün
```

## 📸 Proje Galerisi Özelleştirme

### Yeni Proje Ekleme

```html
<div class="col-md-4">
    <div class="project-card">
        <!-- Proje görseli -->
        <a href="assets/images/proje-yeni.webp" 
           data-lightbox="projects" 
           data-title="Proje Adı - Kapasite">
            <img src="assets/images/proje-yeni-thumb.webp" 
                 class="img-fluid rounded" 
                 alt="Proje Adı" 
                 loading="lazy">
        </a>
        
        <!-- Proje bilgileri -->
        <div class="project-info mt-3">
            <h5>Proje Adı</h5>
            <p class="text-muted">Kapasite • Yıllık üretim</p>
            <div class="project-stats">
                <span class="badge bg-success">₺XXXk Tasarruf/yıl</span>
                <span class="badge bg-primary">2024</span>
            </div>
        </div>
    </div>
</div>
```

### Görsel Optimizasyonu

```bash
# Görselleri WebP formatına dönüştürme
cwebp -q 80 proje-orijinal.jpg -o proje-yeni.webp

# Thumbnail oluşturma
cwebp -q 70 -resize 400 300 proje-orijinal.jpg -o proje-yeni-thumb.webp
```

## 📧 Form Özelleştirme

### Form Alanları Ekleme

```html
<!-- Yeni form alanı -->
<div class="col-md-6">
    <div class="mb-3">
        <label class="form-label">Yeni Alan *</label>
        <input type="text" class="form-control" name="yeni-alan" required>
        <div class="invalid-feedback">Bu alan zorunludur.</div>
    </div>
</div>

<!-- Checkbox grubu -->
<div class="mb-3">
    <label class="form-label">Hizmet Türü</label>
    <div class="form-check">
        <input class="form-check-input" type="checkbox" value="yeni-hizmet" id="yeniHizmet">
        <label class="form-check-label" for="yeniHizmet">Yeni Hizmet</label>
    </div>
</div>
```

### Form Validasyonu

```javascript
// Yeni validasyon kuralı
validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Özel validasyon kuralları
    if (field.name === 'yeni-alan') {
        if (value.length < 3) {
            isValid = false;
            errorMessage = 'En az 3 karakter giriniz.';
        }
    }

    // Diğer validasyonlar...
    return isValid;
}
```

## 🔧 Gelişmiş Özelleştirmeler

### Özel CSS Ekleme

`assets/css/style.css` dosyasının sonuna ekleyin:

```css
/* Özel stiller */
.custom-section {
    background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
    padding: 4rem 0;
    color: white;
}

.custom-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 2rem;
    margin: 1rem 0;
}

.custom-button {
    background: var(--solar-orange);
    border: none;
    color: white;
    padding: 12px 30px;
    border-radius: 50px;
    transition: all 0.3s ease;
}

.custom-button:hover {
    background: #E55A2B;
    transform: translateY(-2px);
    color: white;
}
```

### JavaScript Fonksiyonları Ekleme

`assets/js/script.js` dosyasına ekleyin:

```javascript
// Özel fonksiyon
function customFunction() {
    console.log('Özel fonksiyon çalıştı');
    
    // Özel işlemler
    const customElement = document.querySelector('.custom-section');
    if (customElement) {
        customElement.classList.add('animated');
    }
}

// Sayfa yüklendiğinde çalıştır
document.addEventListener('DOMContentLoaded', function() {
    customFunction();
});
```

## 📱 Mobil Uyumluluk

### Responsive Tasarım

```css
/* Mobil cihazlar için özel stiller */
@media (max-width: 768px) {
    .hero-stats h3 {
        font-size: 1.8rem;
    }
    
    .service-card {
        margin-bottom: 2rem;
    }
    
    .btn-lg {
        padding: 10px 20px;
        font-size: 1rem;
    }
}

/* Tablet cihazlar için */
@media (max-width: 1024px) and (min-width: 769px) {
    .container {
        max-width: 90%;
    }
}
```

## 🚀 Performans Optimizasyonu

### Görsel Optimizasyonu

```html
<!-- Lazy loading -->
<img src="placeholder.jpg" 
     data-src="actual-image.webp" 
     class="lazy" 
     alt="Açıklama">

<!-- Responsive görseller -->
<picture>
    <source srcset="image-large.webp" media="(min-width: 1200px)">
    <source srcset="image-medium.webp" media="(min-width: 768px)">
    <img src="image-small.webp" alt="Açıklama">
</picture>
```

### CSS/JS Minifikasyonu

```bash
# CSS minifikasyonu
npm install -g clean-css-cli
cleancss -o assets/css/style.min.css assets/css/style.css

# JS minifikasyonu
npm install -g uglify-js
uglifyjs assets/js/script.js -o assets/js/script.min.js
```

## 📊 SEO Optimizasyonu

### Meta Etiketleri

```html
<!-- Sayfa başlığı -->
<title>Firma Adı | Güneş Enerjisi Çözümleri</title>

<!-- Meta açıklama -->
<meta name="description" content="Firmanızın açıklaması ve hizmetleri">

<!-- Anahtar kelimeler -->
<meta name="keywords" content="güneş enerjisi, GES kurulumu, solar panel, şehir adı">

<!-- Open Graph -->
<meta property="og:title" content="Firma Adı | Güneş Enerjisi">
<meta property="og:description" content="Firmanızın açıklaması">
<meta property="og:image" content="https://firmaniz.com/og-image.jpg">
<meta property="og:url" content="https://firmaniz.com">
```

### Schema.org Markup

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Firma Adı",
  "description": "Güneş enerjisi kurulum ve bakım hizmetleri",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Firma adresi",
    "addressLocality": "Şehir",
    "addressRegion": "İl",
    "postalCode": "34000",
    "addressCountry": "TR"
  },
  "telephone": "+90-xxx-xxx-xxxx",
  "email": "info@firmaniz.com",
  "url": "https://firmaniz.com"
}
</script>
```

## 🔒 Güvenlik Ayarları

### Form Güvenliği

```javascript
// CSRF token ekleme
function addCSRFToken() {
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = '_token';
        input.value = token;
        form.appendChild(input);
    });
}

// XSS koruması
function sanitizeInput(input) {
    return input.replace(/[<>]/g, '');
}
```

## 📞 Destek ve İletişim

### Ücretsiz Destek

- **GitHub Issues**: [Proje sayfasında](https://github.com/ak-hosting/ak-solar/issues) soru sorun
- **Dokümantasyon**: Bu rehberi inceleyin
- **Örnekler**: `examples/` klasöründeki örnekleri inceleyin

### Ücretli Özelleştirme

Profesyonel özelleştirmeler için:

- **Özel Tasarım**: Tamamen özel görsel tasarım
- **API Entegrasyonları**: TEİAŞ, EPDK, enerji verileri
- **3D Simülasyonlar**: Tesis simülasyonu ve görselleştirme
- **Çok Dilli Destek**: İngilizce, Almanca, Arapça
- **E-ticaret Entegrasyonu**: Online satış sistemi
- **Mobil Uygulama**: iOS/Android uygulaması

**İletişim**: ak@ak-pro.com | **Fiyatlandırma**: Proje bazlı

---

**💡 İpucu**: Özelleştirme yaparken her zaman yedek alın ve değişiklikleri test edin!

**🌞 Başarılı bir güneş enerjisi web sitesi için bu rehberi takip edin!** 