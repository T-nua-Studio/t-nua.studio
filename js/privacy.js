(function () {
    'use strict';

    const STORAGE_KEY = 'tnua-consent';
    const CONSENT_VERSION = '2026-07-24';
    const GA_ID = 'G-T91GMBJ81G';
    const MOTION_KEY = 'tnua-motion-paused';
    const SITE_ROOT = new URL('../', document.currentScript.src);
    let analyticsLoaded = false;

    function siteUrl(path) {
        return new URL(path.replace(/^\//, ''), SITE_ROOT).href;
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
        window.dataLayer.push(arguments);
    };
    window.gtag('consent', 'default', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        wait_for_update: 500
    });

    function getConsent() {
        try {
            const value = JSON.parse(localStorage.getItem(STORAGE_KEY));
            return value && value.version === CONSENT_VERSION ? value : null;
        } catch (error) {
            return null;
        }
    }

    function removeAnalyticsCookies() {
        document.cookie.split(';').forEach(function (entry) {
            const name = entry.split('=')[0].trim();
            if (name === '_ga' || name.indexOf('_ga_') === 0 || name === '_gid' || name === '_gat') {
                document.cookie = name + '=; Max-Age=0; path=/; SameSite=Lax';
                document.cookie = name + '=; Max-Age=0; path=/; domain=.' + location.hostname + '; SameSite=Lax';
            }
        });
    }

    function loadAnalytics() {
        if (analyticsLoaded) return;
        analyticsLoaded = true;
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID);
        document.head.appendChild(script);
        window.gtag('js', new Date());
        window.gtag('config', GA_ID, { anonymize_ip: true });
    }

    function loadExternalMedia() {
        document.querySelectorAll('iframe[data-consent-src]').forEach(function (frame) {
            if (!frame.src) frame.src = frame.dataset.consentSrc;
            frame.removeAttribute('hidden');
            const placeholder = frame.previousElementSibling;
            if (placeholder && placeholder.classList.contains('external-media')) {
                placeholder.hidden = true;
            }
        });
    }

    function unloadExternalMedia() {
        document.querySelectorAll('iframe[data-consent-src]').forEach(function (frame) {
            frame.removeAttribute('src');
            frame.hidden = true;
            const placeholder = frame.previousElementSibling;
            if (placeholder && placeholder.classList.contains('external-media')) {
                placeholder.hidden = false;
            }
        });
    }

    function applyConsent(consent) {
        const analytics = Boolean(consent && consent.analytics);
        const externalMedia = Boolean(consent && consent.externalMedia);
        window.gtag('consent', 'update', {
            analytics_storage: analytics ? 'granted' : 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
        });
        if (analytics) loadAnalytics();
        else removeAnalyticsCookies();
        if (externalMedia) loadExternalMedia();
        else unloadExternalMedia();
    }

    function saveConsent(analytics, externalMedia) {
        const consent = {
            version: CONSENT_VERSION,
            date: new Date().toISOString(),
            necessary: true,
            analytics: Boolean(analytics),
            externalMedia: Boolean(externalMedia)
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
        applyConsent(consent);
        document.getElementById('cookie-banner').hidden = true;
        const dialog = document.getElementById('consent-dialog');
        if (dialog.open) dialog.close();
    }

    function createMediaPlaceholders() {
        document.querySelectorAll('iframe[data-consent-src]').forEach(function (frame) {
            if (!frame.title) frame.title = 'Embedded media';
            const placeholder = document.createElement('div');
            placeholder.className = 'external-media';
            placeholder.innerHTML =
                '<div><p>This media is hosted by a third party and may set cookies or receive your IP address.</p>' +
                '<button type="button" class="consent-button external-media-enable">Allow external media</button> ' +
                '<a href="' + frame.dataset.consentSrc + '" target="_blank" rel="noopener noreferrer">Open on provider website</a></div>';
            frame.parentNode.insertBefore(placeholder, frame);
            frame.hidden = true;
            placeholder.querySelector('button').addEventListener('click', function () {
                const current = getConsent() || {};
                saveConsent(Boolean(current.analytics), true);
            });
        });
    }

    function createConsentUi() {
        const banner = document.createElement('section');
        banner.id = 'cookie-banner';
        banner.className = 'cookie-banner';
        banner.setAttribute('aria-labelledby', 'cookie-title');
        banner.innerHTML =
            '<h2 id="cookie-title">Your privacy choices</h2>' +
            '<p>We use optional analytics and external media only with your permission. Rejecting them will not restrict the core website.</p>' +
            '<p><a href="' + siteUrl('cookies.html') + '">Cookie details</a> · <a href="' + siteUrl('privacy.html') + '">Privacy policy</a></p>' +
            '<div class="consent-actions">' +
            '<button type="button" class="consent-button" data-consent="accept">Accept all</button>' +
            '<button type="button" class="consent-button" data-consent="reject">Reject all</button>' +
            '<button type="button" class="consent-button" data-consent="manage">Manage settings</button>' +
            '</div>';

        const dialog = document.createElement('dialog');
        dialog.id = 'consent-dialog';
        dialog.className = 'consent-dialog';
        dialog.setAttribute('aria-labelledby', 'consent-dialog-title');
        dialog.innerHTML =
            '<form method="dialog">' +
            '<h2 id="consent-dialog-title">Privacy settings</h2>' +
            '<p>Choose which optional services may load. You can change this choice at any time.</p>' +
            '<div class="consent-category"><input id="consent-necessary" type="checkbox" checked disabled>' +
            '<div><label for="consent-necessary">Necessary</label><p>Stores your privacy selection. Always active.</p></div></div>' +
            '<div class="consent-category"><input id="consent-analytics" type="checkbox">' +
            '<div><label for="consent-analytics">Analytics</label><p>Allows Google Analytics to measure visits and site usage.</p></div></div>' +
            '<div class="consent-category"><input id="consent-media" type="checkbox">' +
            '<div><label for="consent-media">External media</label><p>Allows embedded YouTube and Vimeo players to load.</p></div></div>' +
            '<div class="consent-actions">' +
            '<button type="button" class="consent-button" data-dialog-action="save">Save choices</button>' +
            '<button type="button" class="consent-button" data-dialog-action="cancel">Cancel</button>' +
            '</div></form>';

        document.body.appendChild(banner);
        document.body.appendChild(dialog);

        banner.querySelector('[data-consent="accept"]').addEventListener('click', function () {
            saveConsent(true, true);
        });
        banner.querySelector('[data-consent="reject"]').addEventListener('click', function () {
            saveConsent(false, false);
        });
        banner.querySelector('[data-consent="manage"]').addEventListener('click', openSettings);
        dialog.querySelector('[data-dialog-action="save"]').addEventListener('click', function () {
            saveConsent(
                dialog.querySelector('#consent-analytics').checked,
                dialog.querySelector('#consent-media').checked
            );
        });
        dialog.querySelector('[data-dialog-action="cancel"]').addEventListener('click', function () {
            dialog.close();
        });

        document.querySelectorAll('[data-open-consent]').forEach(function (button) {
            button.addEventListener('click', openSettings);
        });
    }

    function openSettings() {
        const consent = getConsent() || {};
        const dialog = document.getElementById('consent-dialog');
        dialog.querySelector('#consent-analytics').checked = Boolean(consent.analytics);
        dialog.querySelector('#consent-media').checked = Boolean(consent.externalMedia);
        dialog.showModal();
    }

    function respectReducedMotion() {
        const videos = Array.from(document.querySelectorAll('video[autoplay]'));
        if (!videos.length) return;
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let paused = prefersReduced || localStorage.getItem(MOTION_KEY) === 'true';
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'consent-button motion-toggle';

        function updateMotion() {
            videos.forEach(function (video) {
                if (paused) video.pause();
                else video.play().catch(function () {});
            });
            button.textContent = paused ? 'Play animations' : 'Pause animations';
            button.setAttribute('aria-pressed', String(paused));
        }

        button.addEventListener('click', function () {
            paused = !paused;
            localStorage.setItem(MOTION_KEY, String(paused));
            updateMotion();
        });
        document.body.appendChild(button);
        updateMotion();
    }

    document.addEventListener('DOMContentLoaded', function () {
        createMediaPlaceholders();
        createConsentUi();
        respectReducedMotion();
        const consent = getConsent();
        document.getElementById('cookie-banner').hidden = Boolean(consent);
        applyConsent(consent);
    });
}());
