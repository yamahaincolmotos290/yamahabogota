/* ============================================================
   INCOLMOTOS YAMAHA BOGOTÁ — main.js
   Sitio estático de una página. Sin dependencias externas.
   ============================================================ */

(function () {
    'use strict';

    /* ========================================================
       1. CONFIGURACIÓN DEL SITIO
       ⚠️ ÚNICO LUGAR QUE HAY QUE EDITAR con los datos reales
          del concesionario de Bogotá. Ver CLAUDE.md.
       ======================================================== */
    var SiteConfig = {
        name: 'Incolmotos Yamaha Bogotá',
        domain: 'https://incolmotosyamahabogota.com',

        // Número de WhatsApp en formato internacional sin "+".
        whatsapp: '573150657011',

        // Teléfono para mostrar y para el enlace tel:
        phone: '315 065 7011',
        phoneLink: '+573150657011',

        // Dirección del showroom
        address: 'Cl. 71C #29B-36, Bogotá D.C.',
        city: 'Bogotá D.C., Colombia',
        mapQuery: 'Calle 71C #29B-36, Bogotá, Colombia',

        email: 'yamahaincolmotos290@gmail.com',
        nit: '890.916.911-6',

        schedule: {
            main: 'Lunes a viernes 7:15 a. m. – 6:00 p. m.',
            extra: 'Sábados 7:15 a. m. – 12:30 p. m. · Domingos y festivos: cerrado'
        },

        // ⚠️ PENDIENTE: redes reales de la sede. Deja en null las que no existan.
        social: {
            facebook: null,
            instagram: null,
            tiktok: null
        },

        waDefault: 'Hola, quiero información sobre las motos Yamaha en Bogotá.'
    };

    /* ========================================================
       1b. FICHAS TÉCNICAS
       Datos de referencia del fabricante, por modelo.
       La clave debe coincidir con el data-name de la tarjeta.
       'destacados' son los 3 números grandes; 'specs' la tabla.
       ======================================================== */
    var MotoSpecs = {
        'NMAX V3': {
            destacados: [['155 cc', 'Cilindraje'], ['131 kg', 'Peso'], ['7.1 L', 'Tanque']],
            specs: [
                ['Motor', '4 tiempos SOHC, refrigerado por líquido'],
                ['Potencia máxima', '15.1 Hp a 8.000 rpm'],
                ['Torque máximo', '13.9 Nm a 6.500 rpm'],
                ['Transmisión', 'Automática por variador'],
                ['Freno delantero', 'Disco con ABS'],
                ['Freno trasero', 'Disco con ABS'],
                ['Encendido', 'TCI'],
                ['Llantas (D/T)', '110/70-13 · 130/70-13'],
                ['Carga máxima', '167 kg']
            ]
        },
        'Aerox 155': {
            destacados: [['155 cc', 'Cilindraje'], ['116 kg', 'Peso'], ['5.5 L', 'Tanque']],
            specs: [
                ['Motor', '155 cc 4T SOHC, refrigerado por líquido, VVA'],
                ['Potencia máxima', '15.4 Hp a 8.000 rpm'],
                ['Torque máximo', '13.9 Nm a 6.500 rpm'],
                ['Transmisión', 'Automática CVT'],
                ['Freno delantero', 'Disco'],
                ['Freno trasero', 'Disco']
            ]
        },
        'XTZ 250': {
            destacados: [['249 cc', 'Cilindraje'], ['153 kg', 'Peso'], ['12 L', 'Tanque']],
            specs: [
                ['Motor', 'Monocilíndrico, 4 tiempos, SOHC, 249 cc'],
                ['Potencia máxima', '21 Hp a 7.500 rpm'],
                ['Torque máximo', '20.4 Nm a 6.000 rpm'],
                ['Transmisión', '5 velocidades'],
                ['Freno delantero', 'Disco 245 mm'],
                ['Freno trasero', 'Disco 203 mm'],
                ['Suspensión delantera', 'Horquilla convencional 225 mm'],
                ['Suspensión trasera', 'Monoamortiguador'],
                ['Llantas (D/T)', '80/90-21 · 120/80-18']
            ]
        },
        'XTZ 150': {
            destacados: [['150 cc', 'Cilindraje'], ['130 kg', 'Peso'], ['12 L', 'Tanque']],
            specs: [
                ['Motor', '150 cc 4 tiempos SOHC, refrigerado por aire'],
                ['Transmisión', '5 velocidades'],
                ['Freno delantero', 'Disco'],
                ['Freno trasero', 'Tambor']
            ]
        },
        'FZ 250': {
            destacados: [['249 cc', 'Cilindraje'], ['148 kg', 'Peso'], ['14 L', 'Tanque']],
            specs: [
                ['Motor', '249 cc monocilíndrico 4 tiempos, refrigerado por aceite'],
                ['Potencia máxima', '20.8 Hp a 8.000 rpm'],
                ['Torque máximo', '20.1 Nm a 6.000 rpm'],
                ['Transmisión', '5 velocidades'],
                ['Freno delantero', 'Disco con ABS'],
                ['Freno trasero', 'Disco']
            ]
        },
        'FZ V3': {
            destacados: [['149 cc', 'Cilindraje'], ['135 kg', 'Peso'], ['13 L', 'Tanque']],
            specs: [
                ['Motor', 'Monocilíndrico, 4 tiempos, SOHC, 149 cc'],
                ['Potencia máxima', '12.4 Hp a 7.250 rpm'],
                ['Torque máximo', '13.6 Nm a 5.500 rpm'],
                ['Transmisión', '5 velocidades'],
                ['Freno delantero', 'Disco con ABS'],
                ['Freno trasero', 'Disco'],
                ['Llantas (D/T)', '100/80-17 · 140/60-17']
            ]
        },
        'Cryptón FI': {
            destacados: [['115 cc', 'Cilindraje'], ['102 kg', 'Peso'], ['3.8 L', 'Tanque']],
            specs: [
                ['Motor', '115 cc monocilíndrico 4 tiempos SOHC, refrigerado por aire'],
                ['Inyección', 'Electrónica FI'],
                ['Transmisión', '4 velocidades semiautomática'],
                ['Freno delantero', 'Disco'],
                ['Freno trasero', 'Tambor'],
                ['Rendimiento', '~50 km/L']
            ]
        },
        'MT-09': {
            destacados: [['890 cc', 'Cilindraje'], ['193 kg', 'Peso'], ['14 L', 'Tanque']],
            specs: [
                ['Motor', '890 cc 3 cilindros en línea CP3 DOHC, refrigerado por líquido'],
                ['Potencia máxima', '119 Hp a 10.000 rpm'],
                ['Torque máximo', '93 Nm a 7.000 rpm'],
                ['Transmisión', '6 velocidades'],
                ['Freno delantero', 'Doble disco 298 mm'],
                ['Freno trasero', 'Disco 245 mm'],
                ['Suspensión delantera', 'Horquilla invertida KYB 41 mm'],
                ['Electrónica', 'Modos de conducción, TCS, quickshifter']
            ]
        },
        'MT-15': {
            destacados: [['155 cc', 'Cilindraje'], ['138 kg', 'Peso'], ['10 L', 'Tanque']],
            specs: [
                ['Motor', '155 cc 4T SOHC, refrigerado por líquido, VVA'],
                ['Potencia máxima', '18.4 Hp a 10.000 rpm'],
                ['Torque máximo', '14.1 Nm a 7.500 rpm'],
                ['Transmisión', '6 velocidades'],
                ['Freno delantero', 'Disco 282 mm'],
                ['Freno trasero', 'Disco 220 mm']
            ]
        },
        'R15 V4': {
            destacados: [['155 cc', 'Cilindraje'], ['140 kg', 'Peso'], ['11 L', 'Tanque']],
            specs: [
                ['Motor', '155 cc monocilíndrico, refrigerado por líquido, 4 válvulas, SOHC'],
                ['Potencia máxima', '18.4 Hp a 10.000 rpm'],
                ['Torque máximo', '14.2 Nm a 7.500 rpm'],
                ['Transmisión', '6 velocidades'],
                ['Frenos', 'Disco delantero y trasero, ABS'],
                ['Suspensión', 'Horquilla invertida / monoamortiguador'],
                ['Altura del asiento', '815 mm'],
                ['Embrague', 'Assist & Slipper Clutch']
            ]
        },
        'XMAX 300': {
            destacados: [['292 cc', 'Cilindraje'], ['181 kg', 'Peso'], ['13 L', 'Tanque']],
            specs: [
                ['Motor', '292 cc monocilíndrico, refrigerado por líquido, 4 válvulas, SOHC, Blue Core'],
                ['Potencia máxima', '27.6 Hp a 7.250 rpm'],
                ['Torque máximo', '29.0 Nm a 5.750 rpm'],
                ['Transmisión', 'Automática CVT'],
                ['Frenos', 'Doble disco delantero + disco trasero, ABS'],
                ['Suspensión', 'Horquilla telescópica / doble amortiguador'],
                ['Altura del asiento', '795 mm'],
                ['Control de tracción', 'TCS']
            ]
        },
        'MT-07': {
            destacados: [['689 cc', 'Cilindraje'], ['183 kg', 'Peso'], ['13 L', 'Tanque']],
            specs: [
                ['Motor', '689 cc bicilíndrico en paralelo, refrigerado por líquido, DOHC, 8 válvulas'],
                ['Potencia máxima', '73.4 Hp a 8.750 rpm'],
                ['Torque máximo', '67.0 Nm a 6.500 rpm'],
                ['Transmisión', '6 velocidades'],
                ['Frenos', 'Doble disco delantero + disco trasero, ABS'],
                ['Suspensión delantera', 'Horquilla invertida 41 mm'],
                ['Suspensión trasera', 'Monoamortiguador ajustable'],
                ['Altura del asiento', '805 mm']
            ]
        },
        'XSR900': {
            destacados: [['890 cc', 'Cilindraje'], ['193 kg', 'Peso'], ['14 L', 'Tanque']],
            specs: [
                ['Motor', '890 cc tricilíndrico en línea CP3, refrigerado por líquido, DOHC, 12 válvulas'],
                ['Potencia máxima', '117.3 Hp a 10.000 rpm'],
                ['Torque máximo', '93.0 Nm a 7.000 rpm'],
                ['Transmisión', '6 velocidades con quickshifter'],
                ['Frenos', 'Doble disco delantero 298 mm + disco trasero, ABS'],
                ['Suspensión delantera', 'Horquilla invertida 41 mm totalmente ajustable'],
                ['Suspensión trasera', 'Monoamortiguador ajustable'],
                ['Altura del asiento', '810 mm'],
                ['Electrónica', 'Modos de conducción, control de tracción, panel TFT']
            ]
        },
        'TMAX': {
            destacados: [['562 cc', 'Cilindraje'], ['220 kg', 'Peso'], ['15 L', 'Tanque']],
            specs: [
                ['Motor', '562 cc bicilíndrico en paralelo, refrigerado por líquido, DOHC, 8 válvulas'],
                ['Potencia máxima', '47.6 Hp a 7.500 rpm'],
                ['Torque máximo', '55.7 Nm a 5.250 rpm'],
                ['Transmisión', 'Automática con embrague centrífugo'],
                ['Frenos', 'Doble disco delantero 267 mm + disco trasero, ABS'],
                ['Suspensión', 'Horquilla invertida 41 mm / monoamortiguador'],
                ['Altura del asiento', '800 mm'],
                ['Electrónica', 'TCS, D-Mode, panel TFT, Smart Key']
            ]
        }
    };

    /* ========================================================
       2. Utilidades
       ======================================================== */
    var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
    var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

    function hasWhatsApp() {
        return typeof SiteConfig.whatsapp === 'string' && /^\d{10,15}$/.test(SiteConfig.whatsapp);
    }

    function waLink(text) {
        if (!hasWhatsApp()) return null;
        return 'https://wa.me/' + SiteConfig.whatsapp + '?text=' + encodeURIComponent(text || SiteConfig.waDefault);
    }

    var toastTimer = null;
    function toast(message) {
        var el = $('#toast');
        if (!el) return;
        el.textContent = message;
        el.classList.add('is-open');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () { el.classList.remove('is-open'); }, 4200);
    }

    /* ========================================================
       3. Aplicar la configuración al DOM
       ======================================================== */
    function applyConfig() {
        // 3.1 Enlaces de WhatsApp (todo lo que tenga data-wa)
        var ready = hasWhatsApp();
        $$('[data-wa]').forEach(function (el) {
            if (!ready) return;                      // se queda apuntando a #contacto
            el.setAttribute('href', waLink(el.getAttribute('data-wa')));
            el.setAttribute('target', '_blank');
            el.setAttribute('rel', 'noopener');
        });

        if (!ready) {
            console.warn('[SiteConfig] Falta el número de WhatsApp. Los botones apuntan al formulario de contacto. Edita js/main.js → SiteConfig.whatsapp');
        }

        // 3.2 Bloque de contacto: WhatsApp
        var waItem = $('[data-contact="whatsapp"]');
        if (waItem && ready) {
            waItem.hidden = false;
            var waAnchor = $('[data-contact-link="whatsapp"]', waItem);
            waAnchor.href = waLink(SiteConfig.waDefault);
            waAnchor.target = '_blank';
            waAnchor.rel = 'noopener';
            waAnchor.textContent = '+' + SiteConfig.whatsapp.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})$/, '$1 $2 $3 $4');
        }

        // 3.3 Bloque de contacto: teléfono
        var phoneItem = $('[data-contact="phone"]');
        if (phoneItem && SiteConfig.phone && SiteConfig.phoneLink) {
            phoneItem.hidden = false;
            var phoneAnchor = $('[data-contact-link="phone"]', phoneItem);
            phoneAnchor.href = 'tel:' + SiteConfig.phoneLink;
            phoneAnchor.textContent = SiteConfig.phone;
        }

        // 3.4 Dirección y horario
        var addressEl = $('[data-contact-text="address"]');
        if (addressEl) addressEl.textContent = SiteConfig.address;

        var scheduleEl = $('[data-contact-schedule]');
        if (scheduleEl) {
            scheduleEl.innerHTML = '';
            scheduleEl.appendChild(document.createTextNode(SiteConfig.schedule.main));
            var extra = document.createElement('span');
            extra.textContent = SiteConfig.schedule.extra;
            scheduleEl.appendChild(extra);
        }

        // 3.5 Mapa
        var iframe = $('.map iframe');
        if (iframe) {
            iframe.src = 'https://www.google.com/maps?q=' + encodeURIComponent(SiteConfig.mapQuery || SiteConfig.address) + '&output=embed';
        }

        // 3.6 Redes sociales
        var socialBox = $('#social');
        if (socialBox) {
            var icons = {
                facebook: '<path d="M14 9h3V6h-3a4 4 0 0 0-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2a1 1 0 0 1 1-1z"/>',
                instagram: '<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.3"/>',
                tiktok: '<path d="M16.5 3c.4 2.3 1.9 3.7 4.2 3.9v2.9a7.5 7.5 0 0 1-4.1-1.3v5.9a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v3a2.8 2.8 0 1 0 2 2.7V3z"/>'
            };
            var labels = { facebook: 'Facebook', instagram: 'Instagram', tiktok: 'TikTok' };

            Object.keys(icons).forEach(function (key) {
                var url = SiteConfig.social[key];
                if (!url) return;
                var a = document.createElement('a');
                a.href = url;
                a.target = '_blank';
                a.rel = 'noopener';
                a.setAttribute('aria-label', labels[key] + ' de ' + SiteConfig.name);
                a.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' + icons[key] + '</svg>';
                socialBox.appendChild(a);
            });
        }

        // 3.7 Año en el footer
        var year = $('#year');
        if (year) year.textContent = new Date().getFullYear();
    }

    /* ========================================================
       4. Header: sombra al hacer scroll
       ======================================================== */
    function initHeader() {
        var header = $('#header');
        if (!header) return;
        var onScroll = function () {
            header.classList.toggle('is-stuck', window.scrollY > 8);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    /* ========================================================
       5. Menú móvil
       ======================================================== */
    function initMenu() {
        var burger = $('#burger');
        var nav = $('#nav');
        if (!burger || !nav) return;

        function setOpen(open) {
            nav.classList.toggle('is-open', open);
            burger.setAttribute('aria-expanded', String(open));
            burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
            document.body.classList.toggle('is-locked', open);
        }

        burger.addEventListener('click', function () {
            setOpen(burger.getAttribute('aria-expanded') !== 'true');
        });

        $$('a', nav).forEach(function (a) {
            a.addEventListener('click', function () { setOpen(false); });
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && nav.classList.contains('is-open')) {
                setOpen(false);
                burger.focus();
            }
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 860 && nav.classList.contains('is-open')) setOpen(false);
        });
    }

    /* ========================================================
       6. Enlace activo en el menú
       ======================================================== */
    function initScrollSpy() {
        var links = $$('.nav__link');
        if (!links.length || !('IntersectionObserver' in window)) return;

        var map = {};
        links.forEach(function (link) {
            var id = link.getAttribute('href');
            if (id && id.charAt(0) === '#') {
                var section = document.querySelector(id);
                if (section) map[id.slice(1)] = link;
            }
        });

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                links.forEach(function (l) { l.classList.remove('is-active'); });
                var link = map[entry.target.id];
                if (link) link.classList.add('is-active');
            });
        }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

        Object.keys(map).forEach(function (id) {
            var el = document.getElementById(id);
            if (el) observer.observe(el);
        });
    }

    /* ========================================================
       7. Filtros del catálogo
       ======================================================== */
    function initFilters() {
        var chips = $$('.chip[data-filter]');
        var cards = $$('#grid-motos .moto-card');
        var meta = $('#catalog-meta');
        var empty = $('#catalog-empty');
        if (!chips.length || !cards.length) return;

        function apply(filter) {
            var shown = 0;
            cards.forEach(function (card) {
                var match = filter === 'todas' || card.getAttribute('data-category') === filter;
                card.classList.toggle('is-hidden', !match);
                if (match) shown++;
            });

            if (empty) empty.hidden = shown !== 0;
            if (meta) meta.textContent = 'Mostrando ' + shown + ' de ' + cards.length + ' modelos';

            chips.forEach(function (chip) {
                chip.setAttribute('aria-pressed', String(chip.getAttribute('data-filter') === filter));
            });
        }

        chips.forEach(function (chip) {
            chip.addEventListener('click', function () {
                apply(chip.getAttribute('data-filter'));
            });
        });
    }

    /* ========================================================
       7b. Ficha técnica en modal
       Mejora progresiva: si el navegador no soporta <dialog>,
       no se inyecta nada y las tarjetas quedan como estaban.
       ======================================================== */
    function initFichas() {
        var dialog = $('#ficha');
        var cards = $$('#grid-motos .moto-card');
        if (!dialog || !cards.length || typeof dialog.showModal !== 'function') return;

        var elImg = $('#ficha-img');
        var elBadge = $('#ficha-badge');
        var elBrand = $('#ficha-brand');
        var elName = $('#ficha-name');
        var elPrice = $('#ficha-price');
        var elHigh = $('#ficha-highlights');
        var elSpecs = $('#ficha-specs');
        var elCta = $('#ficha-cta');
        var scroller = $('.ficha__scroll', dialog);
        var lastTrigger = null;

        function text(sel, card) {
            var el = $(sel, card);
            return el ? el.textContent.trim() : '';
        }

        function fill(card) {
            var data = MotoSpecs[card.getAttribute('data-name')];
            if (!data) return false;

            var img = $('.moto-card__media img', card);
            elImg.src = img.currentSrc || img.src;
            elImg.alt = img.alt;

            elBadge.textContent = text('.moto-card__badge', card);
            elBrand.textContent = text('.moto-card__brand', card);
            elName.textContent = text('.moto-card__name', card);
            elPrice.textContent = text('.moto-card__price b', card);

            elHigh.innerHTML = '';
            data.destacados.forEach(function (pair) {
                var li = document.createElement('li');
                var b = document.createElement('b');
                var s = document.createElement('span');
                b.textContent = pair[0];
                s.textContent = pair[1];
                li.appendChild(b);
                li.appendChild(s);
                elHigh.appendChild(li);
            });

            elSpecs.innerHTML = '';
            data.specs.forEach(function (pair) {
                var row = document.createElement('div');
                var dt = document.createElement('dt');
                var dd = document.createElement('dd');
                row.className = 'ficha__spec';
                dt.textContent = pair[0];
                dd.textContent = pair[1];
                row.appendChild(dt);
                row.appendChild(dd);
                elSpecs.appendChild(row);
            });

            // El CTA hereda el enlace ya resuelto de la tarjeta (wa.me o #contacto)
            var cardCta = $('.moto-card__actions a[data-wa]', card);
            if (cardCta) {
                elCta.href = cardCta.getAttribute('href');
                if (cardCta.target) { elCta.target = cardCta.target; elCta.rel = cardCta.rel; }
                else { elCta.removeAttribute('target'); elCta.removeAttribute('rel'); }
            }

            return true;
        }

        function open(card, trigger) {
            if (!fill(card)) return;
            lastTrigger = trigger || null;
            document.body.classList.add('is-locked');
            dialog.showModal();
            if (scroller) scroller.scrollTop = 0;
        }

        // Soltar el scroll del fondo. Se llama desde cada vía de cierre y no
        // solo desde el evento 'close': si ese evento no llegara, la página
        // se quedaría sin poder desplazarse.
        function unlock() {
            document.body.classList.remove('is-locked');
            if (lastTrigger) { lastTrigger.focus(); lastTrigger = null; }
        }

        function close() {
            unlock();
            dialog.close();
        }

        cards.forEach(function (card) {
            if (!MotoSpecs[card.getAttribute('data-name')]) return;
            var actions = $('.moto-card__actions', card);
            if (!actions) return;

            card.classList.add('moto-card--clickable');

            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'btn btn--outline btn--sm btn--wide';
            btn.textContent = 'Ver ficha técnica';
            btn.setAttribute('aria-haspopup', 'dialog');
            actions.appendChild(btn);

            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                open(card, btn);
            });

            card.addEventListener('click', function (e) {
                if (e.target.closest('a, button')) return;   // no robar los clics del CTA
                open(card, btn);
            });
        });

        $('#ficha-close').addEventListener('click', close);

        // Clic en el fondo oscuro
        dialog.addEventListener('click', function (e) {
            if (e.target === dialog) close();
        });

        // El CTA cierra el modal al abrir WhatsApp o al bajar al formulario
        elCta.addEventListener('click', close);

        // Esc: <dialog> cierra solo y dispara 'cancel' y luego 'close'.
        // Escuchamos los dos por si alguno no llega.
        dialog.addEventListener('cancel', unlock);
        dialog.addEventListener('close', unlock);
    }

    /* ========================================================
       8. Contadores del hero
       ======================================================== */
    function initCounters() {
        var counters = $$('[data-count]');
        if (!counters.length) return;

        var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        function run(el) {
            var target = parseInt(el.getAttribute('data-count'), 10) || 0;
            var suffix = el.getAttribute('data-suffix') || '';

            if (reduced) { el.textContent = target + suffix; return; }

            var duration = 1400;
            var start = null;

            function step(now) {
                if (start === null) start = now;
                var progress = Math.min((now - start) / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.round(target * eased) + suffix;
                if (progress < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        }

        if (!('IntersectionObserver' in window)) {
            counters.forEach(run);
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                run(entry.target);
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.4 });

        counters.forEach(function (c) { observer.observe(c); });
    }

    /* ========================================================
       9. Animación de aparición
       ======================================================== */
    function initReveal() {
        var items = $$('.reveal');
        if (!items.length) return;

        if (!('IntersectionObserver' in window) ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            items.forEach(function (el) { el.classList.add('is-visible'); });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry, i) {
                if (!entry.isIntersecting) return;
                var el = entry.target;
                setTimeout(function () { el.classList.add('is-visible'); }, Math.min(i, 5) * 70);
                observer.unobserve(el);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

        items.forEach(function (el) { observer.observe(el); });
    }

    /* ========================================================
       10. Formulario → WhatsApp (con fallback a correo)
       ======================================================== */
    function initForm() {
        var form = $('#contact-form');
        if (!form) return;

        function fieldOf(input) { return input.closest('.field'); }

        function validate(input) {
            var valid = input.value.trim() !== '';
            var wrapper = fieldOf(input);
            if (wrapper) wrapper.classList.toggle('has-error', !valid);
            return valid;
        }

        $$('[required]', form).forEach(function (input) {
            input.addEventListener('blur', function () { validate(input); });
            input.addEventListener('input', function () {
                var wrapper = fieldOf(input);
                if (wrapper && wrapper.classList.contains('has-error')) validate(input);
            });
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var required = $$('[required]', form);
            var firstInvalid = null;

            required.forEach(function (input) {
                if (!validate(input) && !firstInvalid) firstInvalid = input;
            });

            if (firstInvalid) {
                firstInvalid.focus();
                toast('Completa los campos obligatorios.');
                return;
            }

            var data = new FormData(form);
            var lines = [
                'Hola, soy ' + data.get('nombre').trim() + '.',
                'Estoy interesado en: ' + data.get('interes') + '.'
            ];

            if (data.get('modelo')) lines.push('Modelo: ' + data.get('modelo') + '.');
            lines.push('Teléfono: ' + data.get('telefono').trim() + '.');
            if (data.get('mensaje') && data.get('mensaje').trim()) {
                lines.push('Mensaje: ' + data.get('mensaje').trim());
            }

            var body = lines.join('\n');
            var link = waLink(body);

            if (link) {
                window.open(link, '_blank', 'noopener');
                toast('Abriendo WhatsApp con tu mensaje…');
            } else {
                window.location.href = 'mailto:' + SiteConfig.email +
                    '?subject=' + encodeURIComponent('Consulta desde la web — ' + data.get('interes')) +
                    '&body=' + encodeURIComponent(body);
                toast('Abriendo tu correo con la consulta…');
            }

            form.reset();
        });
    }

    /* ========================================================
       11. Banner de cookies
       ======================================================== */
    function initCookies() {
        var banner = $('#cookie');
        if (!banner) return;

        var KEY = 'iyb-cookies';
        var stored = null;
        try { stored = localStorage.getItem(KEY); } catch (err) { stored = 'skip'; }

        if (!stored) {
            setTimeout(function () { banner.classList.add('is-open'); }, 1200);
        }

        $$('[data-cookie]', banner).forEach(function (btn) {
            btn.addEventListener('click', function () {
                try { localStorage.setItem(KEY, btn.getAttribute('data-cookie')); } catch (err) { /* noop */ }
                banner.classList.remove('is-open');
            });
        });
    }

    /* ========================================================
       12. Arranque
       ======================================================== */
    function init() {
        applyConfig();
        initHeader();
        initMenu();
        initScrollSpy();
        initFilters();
        initFichas();
        initCounters();
        initReveal();
        initForm();
        initCookies();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.SiteConfig = SiteConfig;
})();
