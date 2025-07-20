# AK Solar - Dockerfile
# Güneş enerjisi web sitesi için Docker container

# Nginx Alpine imajını kullan (hafif ve güvenli)
FROM nginx:alpine

# Metadata
LABEL maintainer="a.koc <ak@ak-pro.com>"
LABEL description="AK Solar - Güneş Enerjisi Web Sitesi"
LABEL version="1.0.0"

# Sistem paketlerini güncelle
RUN apk update && apk upgrade

# Gerekli paketleri yükle
RUN apk add --no-cache \
    curl \
    wget \
    unzip \
    && rm -rf /var/cache/apk/*

# Nginx konfigürasyonunu kopyala
COPY nginx.conf /etc/nginx/nginx.conf

# Web sitesi dosyalarını kopyala
COPY . /usr/share/nginx/html/

# Gerekli izinleri ayarla
RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chmod -R 755 /usr/share/nginx/html

# Güvenlik için nginx kullanıcısı olarak çalıştır
USER nginx

# Port 80'i aç
EXPOSE 80

# Health check ekle
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Nginx'i başlat
CMD ["nginx", "-g", "daemon off;"] 