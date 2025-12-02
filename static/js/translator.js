// translator.js - Système de traduction CMCI OBILI (Français/Anglais)
// Version améliorée avec toutes les traductions du site

class TranslationManager {
    constructor() {
        this.currentLang = this.getStoredLanguage() || 'fr';
        this.notificationTimeout = null;
        this.isTranslating = false;
        
        // Messages de notification
        this.notificationMessages = {
            fr: 'Traduction en cours...',
            en: 'Translating...'
        };

        // Traductions communes (navigation, footer, header, etc.)
        this.commonTranslations = {
            fr: {
                // ========== HEADER ==========
                'header.title': 'CMCI OBILI',
                'header.slogan': 'Communauté Missionnaire Chrétienne Internationale Obili',
                'header.language.fr': 'Français',
                'header.language.en': 'English',
                
                // ========== NAVIGATION (Sidebar) ==========
                'nav.home': 'Accueil',
                'nav.themes': 'Thèmes',
                'nav.organisation': 'Organisation',
                'nav.departements': 'Départements',
                'nav.evangelisation': 'Évangélisation',
                'nav.messages': 'Messages',
                'nav.evenements': 'Événements',
                'nav.contact': 'Contactez-nous',
                'nav.follow': 'Suivez-nous',
                
                // Sous-menu Organisation
                'submenu.historique': 'Notre Historique',
                'submenu.croyance': 'Nos Croyances',
                'submenu.qui-sommes-nous': 'Qui sommes-nous',
                'submenu.vision': 'Notre Vision',
                'submenu.mission': 'Notre Mission',
                
                // Sous-menu Départements
                'submenu.priere': 'Département de Prière',
                'submenu.communication': 'Département Communication',
                'submenu.protocole': 'Département Protocole',
                'submenu.jeunesse': 'Département Jeunesse',
                'submenu.musique': 'Département Musique',
                
                // Sous-menu Évangélisation
                'submenu.missions-locales': 'Missions locales',
                'submenu.missions-internationales': 'Missions internationales',
                'submenu.programmes': 'Programmes d\'évangélisation',
                'submenu.temoignages': 'Témoignages',
                
                // Sous-menu Messages
                'submenu.audio': 'Messages Audio',
                'submenu.video': 'Messages Vidéo',
                'submenu.ecrits': 'Messages Écrits',
                'submenu.etudes': 'Études Bibliques',
                
                // Sous-menu Événements
                'submenu.a-venir': 'Événements à venir',
                'submenu.passes': 'Événements passés',
                'submenu.speciaux': 'Programmes spéciaux',
                
                // ========== FOOTER ==========
                'footer.about.title': 'CMCI OBILI',
                'footer.about.text': 'Une communauté de foi dédiée à l\'adoration, à la croissance spirituelle et au service de Dieu et de notre prochain.',
                'footer.links.title': 'Liens Rapides',
                'footer.links.home': 'Accueil',
                'footer.links.about': 'Qui sommes-nous',
                'footer.links.messages': 'Messages',
                'footer.links.events': 'Événements',
                'footer.links.contact': 'Contact',
                'footer.contact.title': 'Contactez-nous',
                'footer.contact.address': 'Obili, Yaoundé, Cameroun',
                'footer.contact.phone': '+237 677 29 32 34',
                'footer.contact.email': 'cmciobili@gmail.com',
                'footer.contact.schedule': 'Cultes: Dimanche 8h - 12h',
                'footer.copyright': 'Tous droits réservés.',
                'footer.verse': '« Il y a diversité de dons, mais le même Esprit ; diversité de services, mais le même Seigneur. Ensemble, nous formons un seul corps pour la gloire de Dieu. »',
                'footer.verse.ref': '1 Corinthiens 12:4-5',
                'footer.glory': 'Toute la gloire à Dieu.',
                
                // ========== BOUTONS COMMUNS ==========
                'btn.learn-more': 'En savoir plus',
                'btn.contact': 'Contactez-nous',
                'btn.read-more': 'Lire la suite',
                'btn.back': 'Retour',
                'btn.next': 'Suivant',
                'btn.previous': 'Précédent',
                'btn.download': 'Télécharger',
                'btn.share': 'Partager',
                'btn.register': 'S\'inscrire',
                
                // ========== MESSAGES GÉNÉRAUX ==========
                'msg.welcome': 'Bienvenue',
                'msg.loading': 'Chargement...',
                'msg.error': 'Une erreur s\'est produite',
                'msg.success': 'Succès',
                'msg.no-content': 'Aucun contenu disponible',
                'msg.coming-soon': 'Bientôt disponible'
            },
            en: {
                // ========== HEADER ==========
                'header.title': 'CMFI OBILI',
                'header.slogan': 'International Christian Missionary Community Obili',
                'header.language.fr': 'French',
                'header.language.en': 'English',
                
                // ========== NAVIGATION (Sidebar) ==========
                'nav.home': 'Home',
                'nav.themes': 'Themes',
                'nav.organisation': 'Organization',
                'nav.departements': 'Departments',
                'nav.evangelisation': 'Evangelization',
                'nav.messages': 'Messages',
                'nav.evenements': 'Events',
                'nav.contact': 'Contact Us',
                'nav.follow': 'Follow Us',
                
                // Sous-menu Organisation
                'submenu.historique': 'Our History',
                'submenu.croyance': 'Our Beliefs',
                'submenu.qui-sommes-nous': 'About Us',
                'submenu.vision': 'Our Vision',
                'submenu.mission': 'Our Mission',
                
                // Sous-menu Départements
                'submenu.priere': 'Prayer Department',
                'submenu.communication': 'Communication Department',
                'submenu.protocole': 'Protocol Department',
                'submenu.jeunesse': 'Youth Department',
                'submenu.musique': 'Music Department',
                
                // Sous-menu Évangélisation
                'submenu.missions-locales': 'Local Missions',
                'submenu.missions-internationales': 'International Missions',
                'submenu.programmes': 'Evangelization Programs',
                'submenu.temoignages': 'Testimonies',
                
                // Sous-menu Messages
                'submenu.audio': 'Audio Messages',
                'submenu.video': 'Video Messages',
                'submenu.ecrits': 'Written Messages',
                'submenu.etudes': 'Bible Studies',
                
                // Sous-menu Événements
                'submenu.a-venir': 'Upcoming Events',
                'submenu.passes': 'Past Events',
                'submenu.speciaux': 'Special Programs',
                
                // ========== FOOTER ==========
                'footer.about.title': 'CMFI OBILI',
                'footer.about.text': 'A faith community dedicated to worship, spiritual growth, and serving God and our neighbors.',
                'footer.links.title': 'Quick Links',
                'footer.links.home': 'Home',
                'footer.links.about': 'About Us',
                'footer.links.messages': 'Messages',
                'footer.links.events': 'Events',
                'footer.links.contact': 'Contact',
                'footer.contact.title': 'Contact Us',
                'footer.contact.address': 'Obili, Yaoundé, Cameroon',
                'footer.contact.phone': '+237 677 29 32 34',
                'footer.contact.email': 'cmciobili@gmail.com',
                'footer.contact.schedule': 'Services: Sunday 8am - 12pm',
                'footer.copyright': 'All rights reserved.',
                'footer.verse': '"There are different kinds of gifts, but the same Spirit; there are different kinds of service, but the same Lord. Together, we form one body for the glory of God."',
                'footer.verse.ref': '1 Corinthians 12:4-5',
                'footer.glory': 'All glory to God.',
                
                // ========== BOUTONS COMMUNS ==========
                'btn.learn-more': 'Learn More',
                'btn.contact': 'Contact Us',
                'btn.read-more': 'Read More',
                'btn.back': 'Back',
                'btn.next': 'Next',
                'btn.previous': 'Previous',
                'btn.download': 'Download',
                'btn.share': 'Share',
                'btn.register': 'Register',
                
                // ========== MESSAGES GÉNÉRAUX ==========
                'msg.welcome': 'Welcome',
                'msg.loading': 'Loading...',
                'msg.error': 'An error occurred',
                'msg.success': 'Success',
                'msg.no-content': 'No content available',
                'msg.coming-soon': 'Coming soon'
            }
        };
        
        this.init();
    }

    // ========================================
    // INITIALISATION
    // ========================================
    init() {
        this.createNotificationElement();
        this.setupLanguageButtons();
        this.updateLanguageButtons();
        this.translateCommonElements();
        console.log(`🌐 Translation system initialized! Current language: ${this.currentLang}`);
    }

    // ========================================
    // NOTIFICATION
    // ========================================
    createNotificationElement() {
        if (!document.getElementById('translationNotification')) {
            const notification = document.createElement('div');
            notification.className = 'translation-notification';
            notification.id = 'translationNotification';
            notification.innerHTML = `
                <i class="fas fa-language"></i>
                <span id="notificationText">Traduction en cours...</span>
            `;
            
            // Styles
            const style = document.createElement('style');
            style.textContent = `
                .translation-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                    color: white;
                    padding: 15px 25px;
                    border-radius: 50px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(-20px);
                    transition: all 0.3s ease;
                    z-index: 10000;
                    font-weight: 600;
                }
                
                .translation-notification.show {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0);
                }
                
                .translation-notification i {
                    font-size: 20px;
                    animation: pulse 1.5s infinite;
                }
                
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                
                .translating {
                    opacity: 0.5;
                    transition: opacity 0.15s ease;
                }
            `;
            document.head.appendChild(style);
            document.body.appendChild(notification);
        }
    }

    showNotification(lang) {
        const notification = document.getElementById('translationNotification');
        const notificationText = document.getElementById('notificationText');
        
        if (!notification || !notificationText) return;

        if (this.notificationTimeout) {
            clearTimeout(this.notificationTimeout);
        }

        notificationText.textContent = this.notificationMessages[lang] || this.notificationMessages['fr'];
        notification.classList.add('show');
        
        this.notificationTimeout = setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }

    // ========================================
    // GESTION DES BOUTONS DE LANGUE
    // ========================================
    setupLanguageButtons() {
        const langButtons = document.querySelectorAll('.btn-language');
        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const onclickAttr = btn.getAttribute('onclick');
                if (onclickAttr) {
                    const match = onclickAttr.match(/changeLanguage\('(\w+)'\)/);
                    if (match) {
                        this.switchLanguage(match[1]);
                    }
                }
            });
        });
    }

    updateLanguageButtons() {
        const langButtons = document.querySelectorAll('.btn-language');
        langButtons.forEach(btn => {
            const onclickAttr = btn.getAttribute('onclick');
            if (onclickAttr) {
                const match = onclickAttr.match(/changeLanguage\('(\w+)'\)/);
                if (match && match[1] === this.currentLang) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            }
        });
    }

    // ========================================
    // STOCKAGE DE LA LANGUE
    // ========================================
    getStoredLanguage() {
        try {
            return sessionStorage.getItem('cmci_language') || 'fr';
        } catch (error) {
            return 'fr';
        }
    }

    storeLanguage(lang) {
        try {
            sessionStorage.setItem('cmci_language', lang);
        } catch (error) {
            console.warn('Unable to store language');
        }
    }

    // ========================================
    // TRADUCTION
    // ========================================
    simulateTranslationAPI(lang) {
        return new Promise(resolve => {
            setTimeout(() => resolve(), 300);
        });
    }

    translateCommonElements(lang = this.currentLang) {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            
            if (this.commonTranslations[lang] && this.commonTranslations[lang][key]) {
                this.animateTranslation(element, this.commonTranslations[lang][key]);
            }
        });
    }

    translateWithPageTranslations(pageTranslations, lang = this.currentLang) {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            let translation = null;

            // 1. Chercher dans les traductions de page d'abord
            if (pageTranslations[lang] && pageTranslations[lang][key]) {
                translation = pageTranslations[lang][key];
            }
            // 2. Puis dans les traductions communes
            else if (this.commonTranslations[lang] && this.commonTranslations[lang][key]) {
                translation = this.commonTranslations[lang][key];
            }

            if (translation) {
                this.animateTranslation(element, translation);
            }
        });
    }

    animateTranslation(element, text) {
        element.classList.add('translating');
        setTimeout(() => {
            // Gérer les éléments input
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else {
                element.textContent = text;
            }
            element.classList.remove('translating');
        }, 150);
    }

    // ========================================
    // CHANGEMENT DE LANGUE
    // ========================================
    async switchLanguage(lang) {
        if (lang === this.currentLang || this.isTranslating) return;

        this.isTranslating = true;
        this.showNotification(lang);
        
        try {
            await this.simulateTranslationAPI(lang);
            
            this.currentLang = lang;
            this.storeLanguage(lang);
            this.updateLanguageButtons();
            
            // Mettre à jour le titre de la page si applicable
            const titleElement = document.querySelector('title[data-translate]');
            if (titleElement) {
                const key = titleElement.getAttribute('data-translate');
                if (this.commonTranslations[lang] && this.commonTranslations[lang][key]) {
                    titleElement.textContent = this.commonTranslations[lang][key];
                }
            }
            
            // Événement personnalisé pour les pages spécifiques
            const event = new CustomEvent('languageChanged', {
                detail: { language: lang }
            });
            document.dispatchEvent(event);
            
            // Traduire les éléments communs
            this.translateCommonElements();

            console.log(`✅ Language changed to: ${lang}`);

        } catch (error) {
            console.error('❌ Translation error:', error);
        } finally {
            this.isTranslating = false;
        }
    }

    // ========================================
    // ENREGISTREMENT DES TRADUCTIONS DE PAGE
    // ========================================
    registerPageTranslations(pageTranslations) {
        // Écouter les changements de langue
        document.addEventListener('languageChanged', (event) => {
            this.translateWithPageTranslations(pageTranslations, event.detail.language);
        });

        // Traduire immédiatement avec la langue actuelle
        this.translateWithPageTranslations(pageTranslations, this.currentLang);
        
        console.log('📄 Page translations registered');
    }

    // ========================================
    // UTILITAIRES
    // ========================================
    getCurrentLanguage() {
        return this.currentLang;
    }
    
    getTranslation(key, lang = this.currentLang) {
        return this.commonTranslations[lang]?.[key] || key;
    }
}

// ========================================
// CRÉATION DE L'INSTANCE GLOBALE
// ========================================
window.translator = new TranslationManager();

// ========================================
// FONCTION GLOBALE POUR COMPATIBILITÉ
// ========================================
function changeLanguage(lang) {
    if (window.translator) {
        window.translator.switchLanguage(lang);
    }
}

// ========================================
// EXPORT POUR UTILISATION DANS D'AUTRES SCRIPTS
// ========================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TranslationManager;
}
