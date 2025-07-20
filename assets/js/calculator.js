// AK Solar - Enerji Hesaplayıcı JavaScript

class SolarCalculator {
    constructor() {
        this.init();
        this.bindEvents();
        this.calculate();
    }

    init() {
        // DOM elementlerini seç
        this.consumptionSlider = document.getElementById('consumption');
        this.consumptionValue = document.getElementById('consumption-value');
        this.locationSelect = document.getElementById('location');
        this.roofTypeSelect = document.getElementById('roof-type');
        this.electricityPrice = document.getElementById('electricity-price');
        
        // Sonuç elementleri
        this.savingResult = document.getElementById('saving-result');
        this.panelCount = document.getElementById('panel-count');
        this.systemPower = document.getElementById('system-power');
        this.yearlyProduction = document.getElementById('yearly-production');
        this.paybackPeriod = document.getElementById('payback-period');
        
        // Varsayılan değerler
        this.panelWattage = 400; // Watt
        this.panelEfficiency = 0.85; // %85 verimlilik
        this.systemCost = 1200; // ₺/kW
        this.maintenanceCost = 0.02; // %2 bakım maliyeti
    }

    bindEvents() {
        // Slider değişikliklerini dinle
        this.consumptionSlider.addEventListener('input', (e) => {
            this.consumptionValue.textContent = e.target.value;
            this.calculate();
        });

        // Select değişikliklerini dinle
        this.locationSelect.addEventListener('change', () => this.calculate());
        this.roofTypeSelect.addEventListener('change', () => this.calculate());
        
        // Elektrik fiyatı değişikliklerini dinle
        this.electricityPrice.addEventListener('input', () => this.calculate());
    }

    // Güneş ışınımı verileri (kWh/m²/gün)
    getSolarIrradiation(location) {
        const irradiationData = {
            'istanbul': 4.2,
            'izmir': 4.8,
            'ankara': 4.5,
            'antalya': 5.2,
            'bursa': 4.3
        };
        return irradiationData[location] || 4.5;
    }

    // Sistem verimliliği (çatı tipine göre)
    getSystemEfficiency(roofType) {
        const efficiencyData = {
            'flat': 0.85,
            'sloped': 0.90,
            'ground': 0.88
        };
        return efficiencyData[roofType] || 0.85;
    }

    calculate() {
        // Kullanıcı girdilerini al
        const monthlyConsumption = parseInt(this.consumptionSlider.value);
        const location = this.locationSelect.value;
        const roofType = this.roofTypeSelect.value;
        const electricityPrice = parseFloat(this.electricityPrice.value);

        // Hesaplamalar
        const solarIrradiation = this.getSolarIrradiation(location);
        const systemEfficiency = this.getSystemEfficiency(roofType);
        
        // Gerekli sistem gücü (kW)
        const requiredPower = (monthlyConsumption * 12) / (solarIrradiation * 365 * systemEfficiency);
        const systemPowerKW = Math.ceil(requiredPower * 10) / 10; // 0.1 kW hassasiyet
        
        // Panel sayısı
        const panelCount = Math.ceil((systemPowerKW * 1000) / this.panelWattage);
        
        // Yıllık üretim (kWh)
        const yearlyProduction = systemPowerKW * solarIrradiation * 365 * systemEfficiency;
        
        // Aylık tasarruf (₺)
        const monthlySaving = (yearlyProduction / 12) * electricityPrice;
        
        // Sistem maliyeti
        const systemCost = systemPowerKW * this.systemCost * 1000;
        
        // Yıllık bakım maliyeti
        const yearlyMaintenance = systemCost * this.maintenanceCost;
        
        // Net yıllık tasarruf
        const netYearlySaving = (yearlyProduction * electricityPrice) - yearlyMaintenance;
        
        // Geri ödeme süresi (yıl)
        const paybackPeriod = systemCost / netYearlySaving;

        // Sonuçları güncelle
        this.updateResults({
            monthlySaving: monthlySaving,
            panelCount: panelCount,
            systemPower: systemPowerKW,
            yearlyProduction: yearlyProduction,
            paybackPeriod: paybackPeriod,
            systemCost: systemCost
        });

        // Animasyonlu güncelleme
        this.animateResults();
    }

    updateResults(data) {
        // Sonuçları formatla ve güncelle
        this.savingResult.innerHTML = `₺${Math.round(data.monthlySaving).toLocaleString()}<small>/ay</small>`;
        this.panelCount.textContent = data.panelCount;
        this.systemPower.textContent = `${data.systemPower} kW`;
        this.yearlyProduction.textContent = `${Math.round(data.yearlyProduction).toLocaleString()} kWh`;
        this.paybackPeriod.textContent = `${data.paybackPeriod.toFixed(1)} yıl`;
    }

    animateResults() {
        // Sonuç kartlarına animasyon ekle
        const resultCard = document.querySelector('.card');
        resultCard.classList.add('pulse');
        
        setTimeout(() => {
            resultCard.classList.remove('pulse');
        }, 1000);
    }

    // Detaylı rapor oluştur
    generateDetailedReport() {
        const monthlyConsumption = parseInt(this.consumptionSlider.value);
        const location = this.locationSelect.value;
        const electricityPrice = parseFloat(this.electricityPrice.value);
        
        const report = {
            tüketim: monthlyConsumption,
            konum: location,
            elektrikFiyatı: electricityPrice,
            önerilenKapasite: parseFloat(this.systemPower.textContent),
            panelSayısı: parseInt(this.panelCount.textContent),
            yıllıkÜretim: parseInt(this.yearlyProduction.textContent.replace(/,/g, '')),
            aylıkTasarruf: parseInt(this.savingResult.textContent.replace(/[₺,]/g, '')),
            geriÖdemeSüresi: parseFloat(this.paybackPeriod.textContent)
        };

        return report;
    }
}

// Form validasyonu
class FormValidator {
    constructor() {
        this.form = document.getElementById('quote-form');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Zorunlu alan kontrolü
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Bu alan zorunludur.';
        }

        // E-posta kontrolü
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Geçerli bir e-posta adresi giriniz.';
            }
        }

        // Telefon kontrolü
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Geçerli bir telefon numarası giriniz.';
            }
        }

        // Sayısal değer kontrolü
        if (field.type === 'number' && value) {
            const numValue = parseFloat(value);
            if (isNaN(numValue) || numValue < 0) {
                isValid = false;
                errorMessage = 'Geçerli bir sayı giriniz.';
            }
        }

        this.showFieldValidation(field, isValid, errorMessage);
        return isValid;
    }

    showFieldValidation(field, isValid, message) {
        // Önceki hata mesajını temizle
        this.clearFieldError(field);

        if (!isValid) {
            field.classList.add('is-invalid');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'invalid-feedback';
            errorDiv.textContent = message;
            field.parentNode.appendChild(errorDiv);
        } else {
            field.classList.add('is-valid');
        }
    }

    clearFieldError(field) {
        field.classList.remove('is-invalid', 'is-valid');
        const errorDiv = field.parentNode.querySelector('.invalid-feedback');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        // Tüm alanları doğrula
        const inputs = this.form.querySelectorAll('input, select, textarea');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            this.submitForm();
        } else {
            // İlk hatalı alana odaklan
            const firstInvalid = this.form.querySelector('.is-invalid');
            if (firstInvalid) {
                firstInvalid.focus();
            }
        }
    }

    submitForm() {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Loading durumu
        submitBtn.innerHTML = '<span class="loading"></span> Gönderiliyor...';
        submitBtn.disabled = true;

        // Form verilerini topla
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // Simüle edilmiş API çağrısı
        setTimeout(() => {
            // Başarılı gönderim
            this.showSuccessMessage();
            
            // Formu sıfırla
            this.form.reset();
            
            // Butonu eski haline getir
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Validasyon sınıflarını temizle
            this.form.querySelectorAll('.is-valid, .is-invalid').forEach(field => {
                field.classList.remove('is-valid', 'is-invalid');
            });
        }, 2000);
    }

    showSuccessMessage() {
        // Başarı mesajı göster
        const successAlert = document.createElement('div');
        successAlert.className = 'alert alert-success alert-dismissible fade show';
        successAlert.innerHTML = `
            <i class="fas fa-check-circle me-2"></i>
            Teklifiniz başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        this.form.parentNode.insertBefore(successAlert, this.form);
        
        // 5 saniye sonra mesajı kaldır
        setTimeout(() => {
            successAlert.remove();
        }, 5000);
    }
}

// Scroll animasyonları
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.observeElements();
        window.addEventListener('scroll', () => this.handleScroll());
    }

    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Animasyonlu elementleri seç
        const animatedElements = document.querySelectorAll('.service-card, .project-card, .contact-info');
        animatedElements.forEach(el => {
            el.classList.add('scroll-reveal');
            observer.observe(el);
        });
    }

    handleScroll() {
        // Navbar scroll efekti
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}

// Smooth scroll
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Navbar yüksekliği
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Teklif talep fonksiyonu
function requestQuote() {
    const calculator = new SolarCalculator();
    const report = calculator.generateDetailedReport();
    
    // Hesaplayıcı verilerini form'a aktar
    const form = document.getElementById('quote-form');
    const consumptionInput = form.querySelector('input[type="number"]');
    if (consumptionInput) {
        consumptionInput.value = report.tüketim;
    }
    
    // Teklif bölümüne scroll
    document.getElementById('offer').scrollIntoView({ behavior: 'smooth' });
}

// Sayfa yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', function() {
    // Hesaplayıcıyı başlat
    new SolarCalculator();
    
    // Form validasyonunu başlat
    new FormValidator();
    
    // Scroll animasyonlarını başlat
    new ScrollAnimations();
    
    // Smooth scroll'u başlat
    initSmoothScroll();
    
    // Lightbox ayarları
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'albumLabel': 'Proje %1 / %2'
        });
    }
    
    // Console mesajı
    console.log('🌞 AK Solar - Güneş Enerjisi Hesaplayıcı yüklendi!');
    console.log('📧 Özelleştirme talepleri için: ak@ak-pro.com');
}); 