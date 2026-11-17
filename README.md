# nietec
Sitio corporativo de NIETEC: ingeniería y soluciones industriales, ocho especialidades generales y servicios de equipamiento gastronómico industrial.

Contenido actualizado desde los dos folletos oficiales facilitados por la empresa. Contacto: +56 9 4985 6518 · nietecspa@gmail.com · www.nietec.cl.

## Comprobación local

Ejecuta `node --test contact-form.test.cjs` desde esta carpeta para comprobar teléfonos y la preparación del mensaje de WhatsApp. Para revisar el sitio, ejecuta `python3 -m http.server 8765` y abre http://localhost:8765.

El formulario valida los datos y abre WhatsApp con un mensaje de texto dirigido al +56 9 4985 6518. El mensaje se organiza en bloques de servicio solicitado, detalle y datos de contacto, con títulos destacados. Incluye nombre, empresa o lugar si se indica, correo, teléfono, especialidad y requerimiento (hasta 2.000 caracteres). La persona revisa y envía el mensaje desde WhatsApp; abrir la conversación no confirma que se haya enviado. No admite adjuntos ni requiere un backend, claves de API o servicios adicionales en Cloudflare. Los datos no se borran al continuar.

## SEO local

La URL canónica es `https://nietec.cl/`, coherente con `CNAME` y la redirección observada desde `www`. El título, la descripción, Open Graph y el contenido visible describen servicios en Santiago y la Región Metropolitana.

Los datos JSON-LD identifican a NIETEC como `Organization` y al sitio como `WebSite`. La cobertura se declara mediante `areaServed`; no se publica una dirección física, horarios ni reseñas sin confirmar. Para ampliar el marcado a `LocalBusiness`, primero hay que disponer de la dirección física pública real.

Publica `index.html`, `robots.txt` y `sitemap.xml` junto a los recursos del sitio. Después, registra `https://nietec.cl/sitemap.xml` en Google Search Console y solicita la inspección de la página principal. Revisa el JSON-LD con Schema Markup Validator y las propiedades compatibles con Rich Results Test. La validación local no confirma indexación ni garantiza posiciones en Google.
