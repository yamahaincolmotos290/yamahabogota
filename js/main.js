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
