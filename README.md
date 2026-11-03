# AK Solar

Güneş enerjisi firmaları için veri odaklı, erişilebilir ve statik web sitesi şablonu.

**Canlı demo:** https://ak-hosting.github.io/ak-solar/<br>
**Lisans:** MIT

> Tüm hesap sonuçları eğitim amaçlı temsili varsayımlardır. Keşif, mühendislik hesabı, yatırım tavsiyesi veya fiyat teklifi değildir.

## Özellikler

- Özgün solar potansiyel stüdyosu tasarımı
- Çatı alanı, güneşlenme ve yerleşim katsayısıyla yerel demo hesaplama
- Kişisel veri, çerez, analiz, CDN veya harici font yok
- Mobil menü ve erişilebilir semantik yapı
- GitHub Pages üzerinde doğrudan yayınlanabilir

## Yerel kullanım

```bash
python3 -m http.server 8000
```

Kontroller:

```bash
npm test
npm run lint
npm run build
```

## Üretime uyarlama

`index.html` içindeki marka ve içerikleri doğrulanmış bilgilerle değiştirin. Hesap modelini bölgesel ışınım, gölgelenme, ekipman, kayıp ve mevzuat verileriyle yetkili uzman kontrolünde yeniden kurun. Gerçek form eklenirse veri minimizasyonu, onay, sunucu güvenliği ve gizlilik metni ayrıca uygulanmalıdır.

`assets/js/calculator.js` eski sürümden kalan, canlı sayfada yüklenmeyen bir referans dosyadır. Canlı hesap yalnızca `assets/js/script.js` içindedir.
