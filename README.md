# AK Solar - Güneş Enerjisi Web Sitesi Şablonu (Demo)

![AK Solar Banner](https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=400&fit=crop)

Türkiye'deki güneş enerjisi firmaları için ücretsiz, modern ve mobil uyumlu web şablonu. Bootstrap 5 ile geliştirildi.

**[Canlı Demo](https://ak-hosting.github.io/ak-solar/)** | **[Özelleştirme Talebi](mailto:ak@ak-pro.com)**

## 🌞 Temel Özellikler

- **⚡ Enerji Hesaplayıcı**: Müşterilerin tasarrufunu anında hesaplar
- **📸 Proje Galerisi**: Lightbox destekli tesis görselleri
- **📝 Teklif Formu**: SMTP entegrasyonlu form sistemi
- **🔍 SEO Optimize**: "GES kurulumu", "güneş paneli" gibi anahtar kelimeler
- **⚡ Hızlı Yükleme**: WebP görseller ve minify edilmiş kod
- **📱 Mobil Uyumlu**: Tüm cihazlarda mükemmel görünüm
- **🎨 Modern Tasarım**: Teknolojik ve çevreci görsel kimlik

## 📊 Kurulum

### Hızlı Başlangıç

```bash
# Projeyi klonlayın
git clone https://github.com/ak-hosting/ak-solar.git

# Proje dizinine gidin
cd ak-solar

# HTTP sunucusu başlatın
python -m http.server 8000

# Tarayıcıda açın
# http://localhost:8000
```

### Docker ile Kurulum

```bash
# Dockerfile oluşturun
echo 'FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80' > Dockerfile

# Docker image oluşturun
docker build -t ak-solar .

# Container'ı çalıştırın
docker run -p 8080:80 ak-solar

# Tarayıcıda açın
# http://localhost:8080
```

### Geliştirme Ortamı

```bash
# Node.js bağımlılıkları (opsiyonel)
npm install -g live-server

# Canlı sunucu başlatın
live-server --port=8000
```

## 🎨 Özelleştirme

### Renk Teması Değiştirme

`assets/css/style.css` dosyasında CSS değişkenlerini düzenleyin:

```css
:root {
  --solar-green: #0F9D58; /* Ana renk */
  --solar-blue: #4285F4;  /* Vurgu rengi */
  --solar-dark: #1a1a1a;  /* Koyu renk */
  --solar-light: #f8f9fa; /* Açık renk */
}
```

### Hizmet Kartı Ekleme

`index.html` dosyasında services bölümüne yeni kart ekleyin:

```html
<div class="col-md-4">
    <div class="service-card text-center p-4 h-100">
        <i class="fas fa-bolt-lightning fa-3x text-warning mb-3"></i>
        <h4>Enerji Depolama</h4>
        <p>Lithium-ion batarya çözümleri ile kesintisiz enerji</p>
        <div class="price">₺25.000'den başlayan fiyatlar</div>
        <ul class="list-unstyled mt-3">
            <li><i class="fas fa-check text-success me-2"></i>24/7 izleme</li>
            <li><i class="fas fa-check text-success me-2"></i>10 yıl garanti</li>
            <li><i class="fas fa-check text-success me-2"></i>Uzaktan kontrol</li>
        </ul>
    </div>
</div>
```

### Proje Galerisi Ekleme

`index.html` dosyasında projects bölümüne yeni proje ekleyin:

```html
<div class="col-md-4">
    <div class="project-card">
        <a href="assets/images/proje-4.webp" data-lightbox="projects" data-title="Yeni Proje - 600 kW">
            <img src="assets/images/proje-4-thumb.webp" class="img-fluid rounded" alt="Yeni Proje" loading="lazy">
        </a>
        <div class="project-info mt-3">
            <h5>Yeni Proje Adı</h5>
            <p class="text-muted">600 kW • Yıllık 720k kWh üretim</p>
            <div class="project-stats">
                <span class="badge bg-success">₺1.1M Tasarruf/yıl</span>
                <span class="badge bg-primary">2024</span>
            </div>
        </div>
    </div>
</div>
```

### Enerji Hesaplayıcı Özelleştirme

`assets/js/calculator.js` dosyasında hesaplama parametrelerini düzenleyin:

```javascript
// Panel özellikleri
this.panelWattage = 400; // Watt
this.panelEfficiency = 0.85; // %85 verimlilik

// Maliyet parametreleri
this.systemCost = 1200; // ₺/kW
this.maintenanceCost = 0.02; // %2 bakım maliyeti

// Güneş ışınımı verileri
getSolarIrradiation(location) {
    const irradiationData = {
        'istanbul': 4.2,
        'izmir': 4.8,
        'ankara': 4.5,
        'antalya': 5.2,
        'bursa': 4.3,
        'yeni-sehir': 4.0 // Yeni şehir ekleyin
    };
    return irradiationData[location] || 4.5;
}
```

## 📧 SMTP Entegrasyonu

### .env Dosyası Oluşturma

Proje kök dizininde `.env` dosyası oluşturun:

```env
# SMTP Ayarları
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=AK Solar <noreply@aksolar.com>

# Form Ayarları
FORM_RECIPIENT=info@aksolar.com
FORM_SUBJECT=Yeni Teklif Talebi
```

### PHP Mail Entegrasyonu

`assets/php/mail.php` dosyası oluşturun:

```php
<?php
header('Content-Type: application/json');

// .env dosyasını yükle
$env = parse_ini_file('../../.env');

// Form verilerini al
$data = json_decode(file_get_contents('php://input'), true);

// E-posta içeriği
$to = $env['FORM_RECIPIENT'];
$subject = $env['FORM_SUBJECT'];
$message = "
Ad Soyad: {$data['name']}
Telefon: {$data['phone']}
E-posta: {$data['email']}
Kurulum Yeri: {$data['location']}
Tüketim: {$data['consumption']} kWh/ay
Hizmetler: {$data['services']}
Notlar: {$data['notes']}
";

// SMTP ayarları
$headers = "From: {$env['SMTP_FROM']}\r\n";
$headers .= "Reply-To: {$data['email']}\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// E-postayı gönder
$success = mail($to, $subject, $message, $headers);

echo json_encode(['success' => $success]);
?>
```

## 🔧 Gelişmiş Özellikler

### Enerji İzleme Paneli Entegrasyonu

```javascript
// Gerçek zamanlı veri entegrasyonu
class EnergyMonitor {
    constructor() {
        this.apiUrl = 'https://api.energy.gov.tr/current-production';
        this.updateInterval = 30000; // 30 saniye
        this.init();
    }

    init() {
        this.updateData();
        setInterval(() => this.updateData(), this.updateInterval);
    }

    async updateData() {
        try {
            const response = await fetch(this.apiUrl);
            const data = await response.json();
            
            document.getElementById('realtime-production').innerText = data.solar + ' MW';
            document.getElementById('grid-status').innerText = data.status;
        } catch (error) {
            console.error('Veri güncellenemedi:', error);
        }
    }
}
```

### 3D Panel Simülasyonu

```html
<!-- Three.js ile 3D simülasyon -->
<div id="solar-simulator" class="my-5">
    <canvas id="panel-3d" width="800" height="600"></canvas>
    <div class="controls mt-3">
        <label>Açı: <input type="range" id="angle-control" min="15" max="90" value="35"></label>
        <label>Yön: <input type="range" id="direction-control" min="0" max="360" value="180"></label>
    </div>
</div>
```

### PDF Rapor Oluşturucu

```javascript
// jsPDF ile rapor oluşturma
function generatePDFReport(data) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Başlık
    doc.setFontSize(20);
    doc.text('AK Solar - Enerji Analiz Raporu', 20, 20);
    
    // Veriler
    doc.setFontSize(12);
    doc.text(`Önerilen Kapasite: ${data.kapasite} kW`, 20, 40);
    doc.text(`Panel Sayısı: ${data.panelSayisi}`, 20, 50);
    doc.text(`Yıllık Üretim: ${data.yillikUretim} kWh`, 20, 60);
    doc.text(`Aylık Tasarruf: ₺${data.aylikTasarruf}`, 20, 70);
    doc.text(`Geri Ödeme Süresi: ${data.geriOdemeSuresi} yıl`, 20, 80);
    
    // PDF'i indir
    doc.save('ak-solar-rapor.pdf');
}
```

## 📈 SEO Optimizasyonu

### Meta Etiketleri

```html
<!-- Anahtar kelimeler -->
<meta name="keywords" content="güneş enerjisi, GES kurulumu, solar panel, İstanbul, İzmir, Ankara, yenilenebilir enerji, güneş paneli fiyatları, endüstriyel GES">

<!-- Açıklama -->
<meta name="description" content="Türkiye'nin önde gelen güneş enerjisi firması. GES kurulumu, bakım ve enerji danışmanlığı hizmetleri. %100 yerli üretim, 10 yıl garanti.">

<!-- Open Graph -->
<meta property="og:title" content="AK Solar | Güneş Enerjisi Çözümleri">
<meta property="og:description" content="Türkiye'nin güneş enerjisi partneri">
<meta property="og:image" content="https://aksolar.com/assets/images/og-image.jpg">
<meta property="og:url" content="https://aksolar.com">
```

### Yerel SEO

```html
<!-- Schema.org markup -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "AK Solar Enerji",
  "description": "Güneş enerjisi kurulum ve bakım hizmetleri",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Merkez Mahallesi, Solar Caddesi No:123",
    "addressLocality": "İstanbul",
    "addressRegion": "Şişli",
    "postalCode": "34000",
    "addressCountry": "TR"
  },
  "telephone": "+90-212-555-0123",
  "email": "info@aksolar.com",
  "url": "https://aksolar.com",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 41.0082,
    "longitude": 28.9784
  },
  "openingHours": "Mo-Fr 09:00-18:00",
  "priceRange": "₺₺₺"
}
</script>
```

## 🚀 Performans Optimizasyonu

### Görsel Optimizasyonu

```bash
# WebP formatına dönüştürme
cwebp -q 80 image.jpg -o image.webp

# Responsive görseller
<picture>
  <source srcset="image-800.webp" media="(min-width: 800px)">
  <source srcset="image-400.webp" media="(min-width: 400px)">
  <img src="image-200.webp" alt="Açıklama">
</picture>
```

### CSS/JS Minifikasyonu

```bash
# CSS minifikasyonu
npm install -g clean-css-cli
cleancss -o style.min.css style.css

# JS minifikasyonu
npm install -g uglify-js
uglifyjs script.js -o script.min.js
```

## 📊 Analitik Entegrasyonu

### Google Analytics

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Facebook Pixel

```html
<!-- Facebook Pixel -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

## 🔒 Güvenlik

### Form Güvenliği

```javascript
// CSRF koruması
function addCSRFToken(form) {
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = '_token';
    input.value = token;
    form.appendChild(input);
}

// XSS koruması
function sanitizeInput(input) {
    return input.replace(/[<>]/g, '');
}
```

### HTTPS Zorunluluğu

```javascript
// HTTPS yönlendirmesi
if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}
```

## 📞 Destek

### Ücretsiz Destek

- **GitHub Issues**: [Proje sayfasında](https://github.com/ak-hosting/ak-solar/issues) soru sorun
- **Dokümantasyon**: Bu README dosyasını inceleyin
- **Örnekler**: `examples/` klasöründeki örnekleri inceleyin

### Ücretli Özelleştirme

Profesyonel özelleştirmeler için:

- **Enerji İzleme Paneli** entegrasyonu
- **3D Tesis Simülasyonu** geliştirme
- **Özel Logo Tasarımı** ve marka kimliği
- **API Entegrasyonları** (TEİAŞ, EPDK)
- **Çok Dilli Destek** (İngilizce, Almanca)
- **E-ticaret Entegrasyonu**

**İletişim**: ak@ak-pro.com | **Fiyatlandırma**: Proje bazlı

## 📈 Sektör Analizi

### Neden Güneş Enerjisi?

1. **Pazar Büyüklüğü**:
   - Türkiye'de GES kurulu gücü 2023'te 10 GW'ı aştı
   - KOBİ'lerin %68'i enerji maliyetlerini azaltmak için GES düşünüyor

2. **Tasarım İhtiyaçları**:
   - Teknolojik ve çevreci görsel kimlik
   - Enerji simülasyonu gibi interaktif araçlar
   - TEİAŞ mevzuatına uygun bilgi paylaşımı

3. **SEO Potansiyeli**:
   - "solar panel fiyatları İzmir", "endüstriyel GES Ankara" gibi yüksek hacimli anahtar kelimeler
   - Yerel aramalarda %62 daha fazla dönüşüm

4. **Fonksiyonel Zorunluluklar**:
   - Online teklif sistemi
   - Tasarruf hesaplayıcı
   - Referans proje galerisi

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasını inceleyin.

## 🤝 Katkıda Bulunma

1. Bu repository'yi fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request oluşturun

## 📞 İletişim

- **Geliştirici**: a.koc
- **GitHub**: [ak-hosting](https://github.com/ak-hosting)
- **E-posta**: ak@ak-pro.com
- **Website**: [ak-pro.com](https://ak-pro.com)

---

**⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!**

**🌞 Güneş enerjisi geleceğimizdir!** 