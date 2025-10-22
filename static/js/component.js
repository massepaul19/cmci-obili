// components.js - Fichier pour factoriser header, sidebar et footer

// Fonction pour obtenir le chemin relatif correct
function getBasePath() {
    const path = window.location.pathname;
    
    // Si vous êtes à la racine du projet
    if (path === '/' || path === '/index.html') {
        return './';
    }
    
    // Si vous êtes dans un sous-dossier (organisation/, departements/, etc.)
    const depth = (path.match(/\//g) || []).length - 1;
    return depth > 1 ? '../' : './';
}

// Header HTML
function getHeader() {
    const basePath = getBasePath();
    return `
    <div class="header">
        <div class="container-fluid">
            <div class="row align-items-center">
                <div class="col-md-8 col-8">
                    <div class="logo-container">
                        <div class="logo-circle">
                            <img src="${basePath}static/images/logo.png" alt="Logo CMCI" class="logo-image">
                        </div>
                        <div>
                            <div class="logo-text">CMCI OBILI</div>
                            <div class="logo-slogan">Une Église, Une Famille, Une Mission</div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-4 text-end">
                    <div class="language-selector">
                        <button class="btn-language active" onclick="changeLanguage('fr')">
                            <i class="fas fa-globe"></i> <span class="d-none d-md-inline">Français</span>
                        </button>
                        <button class="btn-language" onclick="changeLanguage('en')">
                            <i class="fas fa-globe"></i> <span class="d-none d-md-inline">English</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

// Sidebar HTML
function getSidebar() {
    const basePath = getBasePath();
    return `
    <div class="sidebar" id="sidebar">
        <div class="sidebar-close" id="sidebarClose">
            <i class="fas fa-times"></i>
        </div>
        
        <!-- Organisation -->
        <div class="menu-item">
            <div class="menu-link" data-submenu="organisation">
                <span><i class="fas fa-sitemap"></i> Organisation</span>
                <i class="fas fa-chevron-right chevron"></i>
            </div>
            <div class="submenu" id="submenu-organisation">
                <a href="${basePath}organisation/historique.html" class="submenu-link">Historique</a>
                <a href="${basePath}organisation/qui-sommes-nous.html" class="submenu-link">Qui sommes-nous</a>
                <a href="${basePath}organisation/vision.html" class="submenu-link">Notre Vision</a>
                <a href="${basePath}organisation/mission.html" class="submenu-link">Notre Mission</a>
            </div>
        </div>

        <!-- Départements -->
        <div class="menu-item">
            <div class="menu-link" data-submenu="departements">
                <span><i class="fas fa-users"></i> Départements</span>
                <i class="fas fa-chevron-right chevron"></i>
            </div>
            <div class="submenu" id="submenu-departements">
                <a href="${basePath}departements/priere.html" class="submenu-link">Département de Prière</a>
                <a href="${basePath}departements/communication.html" class="submenu-link">Département Communication</a>
                <a href="${basePath}departements/protocole.html" class="submenu-link">Département Protocole</a>
                <a href="${basePath}departements/jeunesse.html" class="submenu-link">Département Jeunesse</a>
                <a href="${basePath}departements/musique.html" class="submenu-link">Département Musique</a>
            </div>
        </div>

        <!-- Évangélisation -->
        <div class="menu-item">
            <div class="menu-link" data-submenu="evangelisation">
                <span><i class="fas fa-hands-praying"></i> Évangélisation</span>
                <i class="fas fa-chevron-right chevron"></i>
            </div>
            <div class="submenu" id="submenu-evangelisation">
                <a href="${basePath}evangelisation/missions-locales.html" class="submenu-link">Missions locales</a>
                <a href="${basePath}evangelisation/missions-internationales.html" class="submenu-link">Missions internationales</a>
                <a href="${basePath}evangelisation/programmes.html" class="submenu-link">Programmes d'évangélisation</a>
                <a href="${basePath}evangelisation/temoignages.html" class="submenu-link">Témoignages</a>
            </div>
        </div>

        <!-- Messages -->
        <div class="menu-item">
            <div class="menu-link" data-submenu="messages">
                <span><i class="fas fa-book-open"></i> Messages</span>
                <i class="fas fa-chevron-right chevron"></i>
            </div>
            <div class="submenu" id="submenu-messages">
                <a href="${basePath}messages/audio.html" class="submenu-link">Messages Audio</a>
                <a href="${basePath}messages/video.html" class="submenu-link">Messages Vidéo</a>
                <a href="${basePath}messages/ecrits.html" class="submenu-link">Messages Écrits</a>
                <a href="${basePath}messages/etudes-bibliques.html" class="submenu-link">Études Bibliques</a>
            </div>
        </div>

        <!-- Événements -->
        <div class="menu-item">
            <div class="menu-link" data-submenu="evenements">
                <span><i class="fas fa-calendar-alt"></i> Événements</span>
                <i class="fas fa-chevron-right chevron"></i>
            </div>
            <div class="submenu" id="submenu-evenements">
                <a href="${basePath}evenements/a-venir.html" class="submenu-link">Événements à venir</a>
                <a href="${basePath}evenements/passes.html" class="submenu-link">Événements passés</a>
                <a href="${basePath}evenements/programmes-speciaux.html" class="submenu-link">Programmes spéciaux</a>
            </div>
        </div>

        <!-- Contact -->
        <div class="menu-item">
            <a href="${basePath}contact.html" class="menu-link direct-link">
                <span><i class="fas fa-envelope"></i> Contactez-nous</span>
            </a>
        </div>
    </div>
    `;
}

// Footer HTML
function getFooter() {
    const basePath = getBasePath();
    return `
    <footer class="footer">
        <div class="container">
            <div class="row">
                <!-- À propos -->
                <div class="col-md-4 mb-4">
                    <h5 class="footer-title">
                        <i class="fas fa-church"></i> CMCI OBILI
                    </h5>
                    <p class="footer-text">
                        Une communauté de foi dédiée à l'adoration, à la croissance spirituelle 
                        et au service de Dieu et de notre prochain.
                    </p>
                    <div class="social-links">
                        <a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-youtube"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
                    </div>
                </div>

                <!-- Liens rapides -->
                <div class="col-md-4 mb-4">
                    <h5 class="footer-title">
                        <i class="fas fa-link"></i> Liens Rapides
                    </h5>
                    <ul class="footer-links">
                        <li><a href="${basePath}index.html"><i class="fas fa-angle-right"></i> Accueil</a></li>
                        <li><a href="${basePath}organisation/qui-sommes-nous.html"><i class="fas fa-angle-right"></i> Qui sommes-nous</a></li>
                        <li><a href="${basePath}messages/audio.html"><i class="fas fa-angle-right"></i> Messages</a></li>
                        <li><a href="${basePath}evenements/a-venir.html"><i class="fas fa-angle-right"></i> Événements</a></li>
                        <li><a href="${basePath}contact.html"><i class="fas fa-angle-right"></i> Contact</a></li>
                    </ul>
                </div>

                <!-- Contact Info -->
                <div class="col-md-4 mb-4">
                    <h5 class="footer-title">
                        <i class="fas fa-map-marker-alt"></i> Contactez-nous
                    </h5>
                    <ul class="footer-contact">
                        <li>
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Obili, Yaoundé, Cameroun</span>
                        </li>
                        <li>
                            <i class="fas fa-phone"></i>
                            <span>+237 XXX XXX XXX</span>
                        </li>
                        <li>
                            <i class="fas fa-envelope"></i>
                            <span>contact@cmciobili.org</span>
                        </li>
                        <li>
                            <i class="fas fa-clock"></i>
                            <span>Cultes: Dimanche 9h - 12h</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="footer-bottom">
                <div class="row">
                    <div class="col-md-6">
                        <p>&copy; 2024 CMCI OBILI. Tous droits réservés.</p>
                    </div>
                    <div class="col-md-6 text-end">
                        <p>
                            Développé avec <i class="fas fa-heart" style="color: #c6d647;"></i> 
                            pour la gloire de Dieu
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    `;
}

// Variable pour éviter les initialisations multiples
let componentsInitialized = false;

// Charger les composants au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Insérer le header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = getHeader();
    }
    
    // Insérer la sidebar
    const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
    if (sidebarPlaceholder) {
        sidebarPlaceholder.innerHTML = getSidebar();
    }
    
    // Insérer le footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = getFooter();
    }
    
    // Initialiser les fonctionnalités après chargement des composants
    if (!componentsInitialized) {
        setTimeout(initializeComponents, 100);
        componentsInitialized = true;
    }
});

// Initialiser les composants (menu, etc.)
function initializeComponents() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarClose = document.getElementById('sidebarClose');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const contentArea = document.getElementById('contentArea');
    
    if (!menuToggle || !sidebar) {
        console.warn('Éléments du menu non trouvés');
        return;
    }
    
    // Fonction pour fermer le sidebar
    function closeSidebar() {
        sidebar.classList.remove('open');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        if (contentArea) contentArea.classList.remove('shifted');
        
        // Fermer tous les sous-menus
        document.querySelectorAll('.submenu').forEach(submenu => {
            submenu.classList.remove('active');
        });
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
    }
    
    // Fonction pour ouvrir le sidebar
    function openSidebar() {
        sidebar.classList.add('open');
        if (sidebarOverlay) sidebarOverlay.classList.add('active');
        if (contentArea) contentArea.classList.add('shifted');
    }
    
    // Toggle sidebar
    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (sidebar.classList.contains('open')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });
    
    // Fermer sidebar avec le bouton X
    if (sidebarClose) {
        sidebarClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeSidebar();
        });
    }
    
    // Fermer sidebar avec l'overlay
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeSidebar();
        });
    }
    
    // Gestion des sous-menus (pour les menus avec flèche)
    document.querySelectorAll('.menu-link[data-submenu]').forEach(menuLink => {
        menuLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const submenuId = this.getAttribute('data-submenu');
            const submenu = document.getElementById(`submenu-${submenuId}`);
            const parentMenuItem = this.closest('.menu-item');
            
            if (!submenu || !parentMenuItem) return;
            
            // Fermer les autres sous-menus
            document.querySelectorAll('.menu-item').forEach(item => {
                if (item !== parentMenuItem) {
                    item.classList.remove('active');
                }
            });
            
            document.querySelectorAll('.submenu').forEach(sub => {
                if (sub !== submenu) {
                    sub.classList.remove('active');
                }
            });
            
            // Toggle actuel
            parentMenuItem.classList.toggle('active');
            submenu.classList.toggle('active');
        });
    });
    
    // Les liens directs (comme Contact) fonctionnent normalement
    document.querySelectorAll('.menu-link.direct-link').forEach(link => {
        link.addEventListener('click', function(e) {
            // Ne rien faire de spécial, laisser le lien fonctionner
            // Le navigateur suivra le href naturellement
        });
    });
    
    // Les liens du submenu sont cliquables et ferment le menu sur mobile
    document.querySelectorAll('.submenu-link').forEach(link => {
        link.addEventListener('click', function(e) {
            // Le lien fonctionne normalement
            // Fermer le sidebar sur mobile après un court délai
            if (window.innerWidth <= 768) {
                setTimeout(() => closeSidebar(), 150);
            }
        });
    });
    
    // Fermer avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
            closeSidebar();
        }
    });
    
    console.log('Composants CMCI initialisés avec succès');
}

// Fonction changement de langue
function changeLanguage(lang) {
    document.querySelectorAll('.btn-language').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (event && event.target) {
        event.target.closest('.btn-language').classList.add('active');
    }
    
    console.log(`Langue changée vers: ${lang}`);
    // Ajoutez ici la logique de changement de langue
    // Par exemple: window.location.href = `/${lang}/`;
}
