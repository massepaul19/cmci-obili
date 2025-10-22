// translator.js - Système de traduction CMCI OBILI (Français/Anglais)

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

        // Traductions communes (navigation, footer, header)
        this.commonTranslations = {
            fr: {
                // Header
                'header.title': 'CMCI OBILI',
                'header.slogan': 'Une Église, Une Famille, Une Mission',
                
                // Navigation
                'nav.organisation': 'Organisation',
                'nav.departements': 'Départements',
                'nav.evangelisation': 'Évangélisation',
                'nav.messages': 'Messages',
                'nav.evenements': 'Événements',
                'nav.contact': 'Contactez-nous',
                
                // Sous-menu Organisation
                'submenu.historique': 'Historique',
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
                
                // Footer
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
                'footer.contact.schedule': 'Cultes: Dimanche 9h - 12h',
                'footer.copyright': 'Tous droits réservés.',
                'footer.developed': 'Développé avec',
                'footer.developed.end': 'pour la gloire de Dieu'
            },
            en: {
                // Header
                'header.title': 'CMCI OBILI',
                'header.slogan': 'One Church, One Family, One Mission',
                
                // Navigation
                'nav.organisation': 'Organization',
                'nav.departements': 'Departments',
                'nav.evangelisation': 'Evangelization',
                'nav.messages': 'Messages',
                'nav.evenements': 'Events',
                'nav.contact': 'Contact Us',
                
                // Sous-menu Organisation
                'submenu.historique': 'History',
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
                
                // Footer
                'footer.about.title': 'CMCI OBILI',
                'footer.about.text': 'A faith community dedicated to worship, spiritual growth, and serving God and our neighbors.',
                'footer.links.title': 'Quick Links',
                'footer.links.home': 'Home',
                'footer.links.about': 'About Us',
                'footer.links.messages': 'Messages',
                'footer.links.events': 'Events',
                'footer.links.contact': 'Contact',
                'footer.contact.title': 'Contact Us',
                'footer.contact.address': 'Obili, Yaoundé, Cameroon',
                'footer.contact.schedule': 'Services: Sunday 9am - 12pm',
                'footer.copyright': 'All rights reserved.',
                'footer.developed': 'Developed with',
                'footer.developed.end': 'for the glory of God'
            }
        };
        
        this.init();
    }

    // Initialisation
    init() {
        this.createNotificationElement();
        this.setupLanguageButtons();
        this.updateLanguageButtons();
        this.translateCommonElements();
        console.log(`🌐 Translation system initialized! Current language: ${this.currentLang}`);
    }

    // Créer l'élément de notification
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
                    background: linear-gradient(135deg, var(--primary-green), var(--light-green));
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
                }
                
                .translation-notification.show {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0);
                }
                
                .translation-notification i {
                    font-size: 20px;
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

    // Configuration des boutons de langue
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

    // Mise à jour des boutons
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

    // Obtenir la langue stockée
    getStoredLanguage() {
        try {
            return sessionStorage.getItem('cmci_language') || 'fr';
        } catch (error) {
            return 'fr';
        }
    }

    // Stocker la langue
    storeLanguage(lang) {
        try {
            sessionStorage.setItem('cmci_language', lang);
        } catch (error) {
            console.warn('Unable to store language');
        }
    }

    // Afficher la notification
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

    // Simuler un délai
    simulateTranslationAPI(lang) {
        return new Promise(resolve => {
            setTimeout(() => resolve(), 300);
        });
    }

    // Traduire les éléments communs
    translateCommonElements(lang = this.currentLang) {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            
            if (this.commonTranslations[lang] && this.commonTranslations[lang][key]) {
                this.animateTranslation(element, this.commonTranslations[lang][key]);
            }
        });
    }

    // Traduire avec traductions de page
    translateWithPageTranslations(pageTranslations, lang = this.currentLang) {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            let translation = null;

            // Chercher dans les traductions de page
            if (pageTranslations[lang] && pageTranslations[lang][key]) {
                translation = pageTranslations[lang][key];
            }
            // Puis dans les traductions communes
            else if (this.commonTranslations[lang] && this.commonTranslations[lang][key]) {
                translation = this.commonTranslations[lang][key];
            }

            if (translation) {
                this.animateTranslation(element, translation);
            }
        });
    }

    // Animation de traduction
    animateTranslation(element, text) {
        element.classList.add('translating');
        setTimeout(() => {
            element.textContent = text;
            element.classList.remove('translating');
        }, 150);
    }

    // Changer de langue
    async switchLanguage(lang) {
        if (lang === this.currentLang || this.isTranslating) return;

        this.isTranslating = true;
        this.showNotification(lang);
        
        try {
            await this.simulateTranslationAPI(lang);
            
            this.currentLang = lang;
            this.storeLanguage(lang);
            this.updateLanguageButtons();
            
            // Événement personnalisé
            const event = new CustomEvent('languageChanged', {
                detail: { language: lang }
            });
            document.dispatchEvent(event);
            
            // Traduire
            this.translateCommonElements();

            console.log(`✅ Language changed to: ${lang}`);

        } catch (error) {
            console.error('Translation error:', error);
        } finally {
            this.isTranslating = false;
        }
    }

    // Enregistrer les traductions de page
    registerPageTranslations(pageTranslations) {
        document.addEventListener('languageChanged', (event) => {
            this.translateWithPageTranslations(pageTranslations, event.detail.language);
        });

        this.translateWithPageTranslations(pageTranslations, this.currentLang);
    }

    // Obtenir la langue actuelle
    getCurrentLanguage() {
        return this.currentLang;
    }
}

// Créer l'instance globale
window.translator = new TranslationManager();

// Fonction globale pour compatibilité
function changeLanguage(lang) {
    if (window.translator) {
        window.translator.switchLanguage(lang);
    }
}
