// main.js - Fichier principal pour le site CMCI OBILI
// Version CORRIGÉE - Logo fonctionnel + Thèmes persistants + Traductions complètes

// ========================================
// SYSTÈME DE THÈMES - PERSISTANCE GLOBALE
// ========================================

// Charger le thème IMMÉDIATEMENT avant tout
(function() {
    const savedTheme = localStorage.getItem('cmci-theme') || 'green';
    document.documentElement.setAttribute('data-theme', savedTheme);
    console.log('🎨 Thème initial chargé:', savedTheme);
})();

function changeTheme(theme) {
    console.log('🎨 Changement de thème vers:', theme);
    
    // Appliquer le thème
    document.documentElement.setAttribute('data-theme', theme);
    
    // Sauvegarder dans localStorage
    localStorage.setItem('cmci-theme', theme);
    
    // Mettre à jour tous les sélecteurs de thème sur la page
    updateAllThemeSelectors(theme);
    
    console.log('✅ Thème sauvegardé et appliqué:', theme);
}

function updateAllThemeSelectors(theme) {
    const themeSelectors = document.querySelectorAll('#themeSelector, .theme-selector');
    themeSelectors.forEach(selector => {
        if (selector && selector.value !== theme) {
            selector.value = theme;
        }
    });
}

function loadSavedTheme() {
    const savedTheme = localStorage.getItem('cmci-theme') || 'green';
    console.log('📦 Chargement du thème sauvegardé:', savedTheme);
    
    // Appliquer le thème
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Mettre à jour les sélecteurs
    updateAllThemeSelectors(savedTheme);
    
    return savedTheme;
}

// ========================================
// PARTIE 1: GÉNÉRATION DES COMPOSANTS
// ========================================

function getBasePath() {
    const path = window.location.pathname;
    console.log('📍 Chemin actuel:', path);
    
    // Si on est à la racine ou sur index.html
    if (path === '/' || 
        path === '/index.html' || 
        path.endsWith('/CMCI/') || 
        path.endsWith('/CMCI/index.html') ||
        path.endsWith('/')) {
        console.log('✅ Chemin de base: ./');
        return './';
    }
    
    // Si on est dans un sous-dossier (organisation/, departements/, etc.)
    if (path.includes('/organisation/') || 
        path.includes('/departements/') || 
        path.includes('/evangelisation/') || 
        path.includes('/messages/') || 
        path.includes('/evenements/')) {
        console.log('✅ Chemin de base: ../');
        return '../';
    }
    
    // Pour contact.html et autres pages à la racine
    console.log('✅ Chemin de base: ./');
    return './';
}

function getHeader() {
    const basePath = getBasePath();
    console.log('🖼️ Logo path:', `${basePath}static/images/logo.png`);
    
    return `
    <div class="header">
        <div class="container-fluid">
            <div class="row align-items-center">
                <div class="col-md-8 col-8">
                    <div class="logo-container">
                        <div class="logo-circle">
                            <img src="${basePath}static/images/logo.png" alt="Logo CMCI" class="logo-image" onerror="console.error('❌ Erreur chargement logo:', this.src)">
                        </div>
                        <div>
                            <div class="logo-text" data-translate="header.title">CMCI OBILI</div>
                            <div class="logo-slogan" data-translate="header.slogan">Communauté Missionnaire Chrétienne Internationale Obili</div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-4 text-end">
                    <div class="language-selector">
                        <button class="btn-language active" onclick="changeLanguage('fr')">
                            <i class="fas fa-globe"></i> <span class="d-none d-md-inline" data-translate="header.language.fr">Français</span>
                        </button>
                        <button class="btn-language" onclick="changeLanguage('en')">
                            <i class="fas fa-globe"></i> <span class="d-none d-md-inline" data-translate="header.language.en">English</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

function getSidebar() {
    const basePath = getBasePath();
    return `
    <div class="sidebar" id="sidebar">
        <div class="sidebar-close" id="sidebarClose">
            <i class="fas fa-times"></i>
        </div>
        
        <!-- Accueil - Indépendant -->
        <div class="menu-item menu-item-home">
            <a href="${basePath}index.html" class="menu-link" style="text-decoration: none;">
                <span><i class="fas fa-home"></i> <span data-translate="nav.home">Accueil</span></span>
            </a>
        </div>

        <!-- Séparateur -->
        <div class="sidebar-divider"></div>

        <!-- Section Thèmes -->
        <div class="sidebar-section d-flex align-items-center justify-content-between mb-3">
          <div class="sidebar-section-title d-flex align-items-center">
            <i class="fas fa-bars me-2"></i>
            <span data-translate="nav.themes">Thèmes</span>
          </div>

          <!-- Sélecteur de thème -->
		<select class="form-select theme-selector ms-2" id="themeSelector" onchange="changeTheme(this.value)" style="width: 150px;">
		  <option value="blue">🔵 Bleu</option>
		  <option value="green">🟢 Vert</option>
		  <option value="lime">💚 Vert citron</option>
		  <option value="red">🔴 Rouge</option>
		  <option value="pink">🌸 Rose</option>
		  <option value="white">⚪ Blanc</option>
		  <option value="black">⚫ Noir</option>
		  <option value="orange">🟠 Orange</option>
		  <option value="purple">🟣 Violet</option>
		  <option value="cyan">🔷 Cyan</option>
		  <option value="sand">🟤 Sable</option>
		  <option value="mint">💚 Menthe</option>
		  <option value="gold">🟡 Or</option>
		</select>
	  </div>

        <div class="menu-item">
            <div class="menu-link" data-submenu="organisation">
                <span><i class="fas fa-sitemap"></i> <span data-translate="nav.organisation">Organisation</span></span>
                <i class="fas fa-chevron-right chevron"></i>
            </div>
            <div class="submenu" id="submenu-organisation">
                <a href="${basePath}organisation/historique.html" class="submenu-link" data-translate="submenu.historique">Notre Histoire</a>
                <a href="${basePath}organisation/croyance.html" class="submenu-link" data-translate="submenu.croyance">Nos Croyances</a>
                <a href="${basePath}organisation/qui-sommes-nous.html" class="submenu-link" data-translate="submenu.qui-sommes-nous">Qui sommes-nous</a>
                <a href="${basePath}organisation/vision.html" class="submenu-link" data-translate="submenu.vision">Notre Vision</a>
                <a href="${basePath}organisation/mission.html" class="submenu-link" data-translate="submenu.mission">Notre Mission</a>
            </div>
        </div>

        <div class="menu-item">
            <div class="menu-link" data-submenu="departements">
                <span><i class="fas fa-users"></i> <span data-translate="nav.departements">Départements</span></span>
                <i class="fas fa-chevron-right chevron"></i>
            </div>
            <div class="submenu" id="submenu-departements">
                <a href="${basePath}departements/priere.html" class="submenu-link" data-translate="submenu.priere">Département de Prière</a>
                <a href="${basePath}departements/communication.html" class="submenu-link" data-translate="submenu.communication">Département Communication</a>
                <a href="${basePath}departements/protocole.html" class="submenu-link" data-translate="submenu.protocole">Département Protocole</a>
                <a href="${basePath}departements/jeunesse.html" class="submenu-link" data-translate="submenu.jeunesse">Département Jeunesse</a>
                <a href="${basePath}departements/musique.html" class="submenu-link" data-translate="submenu.musique">Département Musique</a>
            </div>
        </div>

        <div class="menu-item">
            <div class="menu-link" data-submenu="evangelisation">
                <span><i class="fas fa-hands-praying"></i> <span data-translate="nav.evangelisation">Évangélisation</span></span>
                <i class="fas fa-chevron-right chevron"></i>
            </div>
            <div class="submenu" id="submenu-evangelisation">
                <a href="${basePath}evangelisation/missions-locales.html" class="submenu-link" data-translate="submenu.missions-locales">Missions locales</a>
                <a href="${basePath}evangelisation/missions-internationales.html" class="submenu-link" data-translate="submenu.missions-internationales">Missions internationales</a>
                <a href="${basePath}evangelisation/programmes.html" class="submenu-link" data-translate="submenu.programmes">Programmes d'évangélisation</a>
                <a href="${basePath}evangelisation/temoignages.html" class="submenu-link" data-translate="submenu.temoignages">Témoignages</a>
            </div>
        </div>

        <div class="menu-item">
            <div class="menu-link" data-submenu="messages">
                <span><i class="fas fa-book-open"></i> <span data-translate="nav.messages">Messages</span></span>
                <i class="fas fa-chevron-right chevron"></i>
            </div>
            <div class="submenu" id="submenu-messages">
                <a href="${basePath}messages/audio.html" class="submenu-link" data-translate="submenu.audio">Messages Audio</a>
                <a href="${basePath}messages/video.html" class="submenu-link" data-translate="submenu.video">Messages Vidéo</a>
                <a href="${basePath}messages/ecrits.html" class="submenu-link" data-translate="submenu.ecrits">Messages Écrits</a>
                <a href="${basePath}messages/etudes-bibliques.html" class="submenu-link" data-translate="submenu.etudes">Études Bibliques</a>
            </div>
        </div>

        <div class="menu-item">
            <div class="menu-link" data-submenu="evenements">
                <span><i class="fas fa-calendar-alt"></i> <span data-translate="nav.evenements">Événements</span></span>
                <i class="fas fa-chevron-right chevron"></i>
            </div>
            <div class="submenu" id="submenu-evenements">
                <a href="${basePath}evenements/a-venir.html" class="submenu-link" data-translate="submenu.a-venir">Événements à venir</a>
                <a href="${basePath}evenements/passes.html" class="submenu-link" data-translate="submenu.passes">Événements passés</a>
                <a href="${basePath}evenements/programmes-speciaux.html" class="submenu-link" data-translate="submenu.speciaux">Programmes spéciaux</a>
            </div>
        </div>

        <div class="menu-item">
            <a href="${basePath}contact.html" class="menu-link" style="text-decoration: none;">
                <span><i class="fas fa-envelope"></i> <span data-translate="nav.contact">Contactez-nous</span></span>
            </a>
        </div>

        <!-- Séparateur avant réseaux sociaux -->
        <div class="sidebar-divider"></div>

        <!-- Réseaux sociaux en bas -->
        <div class="sidebar-social">
            <div class="sidebar-section-title">
                <i class="fas fa-share-alt"></i> <span data-translate="nav.follow">Suivez-nous</span>
            </div>
            <div class="sidebar-social-links">
                <a href="#" class="sidebar-social-link" title="Facebook">
                    <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#" class="sidebar-social-link" title="YouTube">
                    <i class="fab fa-youtube"></i>
                </a>
                <a href="#" class="sidebar-social-link" title="Instagram">
                    <i class="fab fa-instagram"></i>
                </a>
                <a href="#" class="sidebar-social-link" title="Twitter">
                    <i class="fab fa-twitter"></i>
                </a>
                <a href="#" class="sidebar-social-link" title="WhatsApp">
                    <i class="fab fa-whatsapp"></i>
                </a>
            </div>
        </div>
    </div>
    `;
}

function getFooter() {
    const basePath = getBasePath();
    return `
    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-4 mb-3 mb-md-4">
                    <h5 class="footer-title"><i class="fas fa-church"></i> <span data-translate="footer.about.title">CMCI OBILI</span></h5>
                    <p class="footer-text" data-translate="footer.about.text">Une communauté de foi dédiée à l'adoration, à la croissance spirituelle et au service de Dieu et de notre prochain.</p>
                    <div class="social-links">
                        <a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-youtube"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
                    </div>
                </div>
                <div class="col-6 col-md-4 mb-3 mb-md-4">
                    <h5 class="footer-title"><i class="fas fa-link"></i> <span data-translate="footer.links.title">Liens Rapides</span></h5>
                    <ul class="footer-links">
                        <li><a href="${basePath}index.html"><i class="fas fa-angle-right"></i> <span data-translate="footer.links.home">Accueil</span></a></li>
                        <li><a href="${basePath}organisation/qui-sommes-nous.html"><i class="fas fa-angle-right"></i> <span data-translate="footer.links.about">Qui sommes-nous</span></a></li>
                        <li><a href="${basePath}messages/audio.html"><i class="fas fa-angle-right"></i> <span data-translate="footer.links.messages">Messages</span></a></li>
                        <li><a href="${basePath}evenements/a-venir.html"><i class="fas fa-angle-right"></i> <span data-translate="footer.links.events">Événements</span></a></li>
                        <li><a href="${basePath}contact.html"><i class="fas fa-angle-right"></i> <span data-translate="footer.links.contact">Contact</span></a></li>
                    </ul>
                </div>
                <div class="col-6 col-md-4 mb-3 mb-md-4">
                    <h5 class="footer-title"><i class="fas fa-map-marker-alt"></i> <span data-translate="footer.contact.title">Contactez-nous</span></h5>
                    <ul class="footer-contact">
                        <li><i class="fas fa-map-marker-alt"></i><span data-translate="footer.contact.address">Obili, Yaoundé, Cameroun</span></li>
                        <li><i class="fas fa-phone"></i><span data-translate="footer.contact.phone">+237 677 29 32 34</span></li>
                        <li><i class="fas fa-envelope"></i><span data-translate="footer.contact.email">cmciobili@gmail.com</span></li>
                        <li><i class="fas fa-clock"></i><span data-translate="footer.contact.schedule">Cultes: Dimanche 8h - 12h</span></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <div class="row">
                    <div class="col-12 col-md-6 text-center text-md-start mb-2 mb-md-0">
                        <p>&copy; 2025 CMCI OBILI. <span data-translate="footer.copyright">Tous droits réservés.</span></p>
                    </div>
                 </div>
            </div>
             <div class="footer-bottom">
                    <div class="col-12 col-md-6 text-center text-md-end">
          <p data-translate="footer.verse">
            « Il y a diversité de dons, mais le même Esprit ; diversité de services, mais le même Seigneur.  
            Ensemble, nous formons un seul corps pour la gloire de Dieu. »
          </p>
          <p><em>— <span data-translate="footer.verse.ref">1 Corinthiens 12:4-5</span></em></p>
          <p><i class="fas fa-heart" style="color: #c6d647;"></i> <span data-translate="footer.glory">Toute la gloire à Dieu.</span></p>
                  </div>
              </div>
        </div>
    </footer>
    `;
}

// ========================================
// PARTIE 2: CHARGEMENT
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 CMCI OBILI - Démarrage...');
    
    // CHARGER LE THÈME EN PREMIER
    loadSavedTheme();
    
    // Charger les composants
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = getHeader();
        console.log('✅ Header chargé');
    }
    
    const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
    if (sidebarPlaceholder) {
        sidebarPlaceholder.innerHTML = getSidebar();
        console.log('✅ Sidebar chargée');
    }
    
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = getFooter();
        console.log('✅ Footer chargé');
    }
    
    // Réappliquer le thème et initialiser les traductions
    setTimeout(() => {
        loadSavedTheme();
        initializeApp();
        
        // Forcer la traduction des éléments communs après chargement
        if (window.translator) {
            window.translator.translateCommonElements();
            console.log('✅ Traductions communes appliquées');
        }
    }, 200);
});

// ========================================
// PARTIE 3: INTERACTIONS
// ========================================

function initializeApp() {
    console.log('🎯 Initialisation...');
    
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarClose = document.getElementById('sidebarClose');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const contentArea = document.getElementById('contentArea');
    
    if (!menuToggle || !sidebar || !sidebarOverlay) {
        console.error('❌ Éléments manquants!', {
            menuToggle: !!menuToggle,
            sidebar: !!sidebar,
            sidebarOverlay: !!sidebarOverlay
        });
        return;
    }
    
    console.log('✅ Tous les éléments trouvés');
    
    // FERMER
    function closeSidebar() {
        sidebar.classList.remove('open');
        menuToggle.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        if (contentArea) contentArea.classList.remove('shifted');
        if (window.innerWidth <= 768) document.body.style.overflow = '';
        console.log('✅ Menu fermé');
    }
    
    // OUVRIR
    function openSidebar() {
        sidebar.classList.add('open');
        menuToggle.classList.add('active');
        sidebarOverlay.classList.add('active');
        if (contentArea && window.innerWidth > 768) contentArea.classList.add('shifted');
        if (window.innerWidth <= 768) document.body.style.overflow = 'hidden';
        console.log('✅ Menu ouvert');
    }
    
    // Toggle
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        console.log('🔘 Clic toggle');
        sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
    });
    
    // Bouton X
    if (sidebarClose) {
        sidebarClose.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('❌ Clic X');
            closeSidebar();
        });
    }
    
    // Overlay
    sidebarOverlay.addEventListener('click', function(e) {
        e.stopPropagation();
        console.log('🖱️ Clic overlay');
        closeSidebar();
    });
    
    // Sous-menus
    document.querySelectorAll('.menu-link[data-submenu]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const submenuId = this.getAttribute('data-submenu');
            const submenu = document.getElementById(`submenu-${submenuId}`);
            const parent = this.closest('.menu-item');
            
            if (!submenu || !parent) return;
            
            const isOpen = parent.classList.contains('active');
            
            // Fermer tous les autres
            document.querySelectorAll('.menu-item').forEach(item => {
                if (item !== parent) item.classList.remove('active');
            });
            document.querySelectorAll('.submenu').forEach(sub => {
                if (sub !== submenu) sub.classList.remove('active');
            });
            
            // Toggle
            parent.classList.toggle('active', !isOpen);
            submenu.classList.toggle('active', !isOpen);
            
            console.log('📂', submenuId, isOpen ? 'fermé' : 'ouvert');
        });
    });
    
    // Empêcher propagation dans sidebar
    sidebar.addEventListener('click', e => e.stopPropagation());
    
    // ESC
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) closeSidebar();
    });
    
    // Resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && sidebar.classList.contains('open')) closeSidebar();
    });
    
    console.log('✅ CMCI OBILI prêt!');
}

// ================== CHARGEMENT CARTE GOOGLE ==================
function loadGoogleMap() {
    const mapPlaceholder = document.getElementById('map-placeholder');
    if (!mapPlaceholder) return;
    
    const iframe = document.createElement('iframe');
    iframe.width = '100%';
    iframe.height = '400';
    iframe.loading = 'lazy';
    iframe.allowFullscreen = true;
    iframe.src = 'https://maps.google.com/maps?q=3.8546926,11.4898802&hl=fr&z=15&output=embed';
    
    mapPlaceholder.innerHTML = '';
    mapPlaceholder.appendChild(iframe);
}

// Animation scroll
function animateOnScroll() {
    document.querySelectorAll('.content-card').forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
