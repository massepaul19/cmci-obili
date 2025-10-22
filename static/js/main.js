// main.js - Fichier principal pour le site CMCI OBILI
// Version CORRIGÉE - Logo fonctionnel partout

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
                <span><i class="fas fa-home"></i> Accueil</span>
            </a>
        </div>

        <!-- Séparateur -->
        <div class="sidebar-divider"></div>

        <!-- Section Thèmes -->
        <div class="sidebar-section-title">
            <i class="fas fa-bars"></i> Thèmes
        </div>

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

        <div class="menu-item">
            <a href="${basePath}contact.html" class="menu-link" style="text-decoration: none;">
                <span><i class="fas fa-envelope"></i> Contactez-nous</span>
            </a>
        </div>

        <!-- Séparateur avant réseaux sociaux -->
        <div class="sidebar-divider"></div>

        <!-- Réseaux sociaux en bas -->
        <div class="sidebar-social">
            <div class="sidebar-section-title">
                <i class="fas fa-share-alt"></i> Suivez-nous
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
                    <h5 class="footer-title"><i class="fas fa-church"></i> CMCI OBILI</h5>
                    <p class="footer-text">Une communauté de foi dédiée à l'adoration, à la croissance spirituelle et au service de Dieu et de notre prochain.</p>
                    <div class="social-links">
                        <a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-youtube"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
                    </div>
                </div>
                <div class="col-6 col-md-4 mb-3 mb-md-4">
                    <h5 class="footer-title"><i class="fas fa-link"></i> Liens Rapides</h5>
                    <ul class="footer-links">
                        <li><a href="${basePath}index.html"><i class="fas fa-angle-right"></i> Accueil</a></li>
                        <li><a href="${basePath}organisation/qui-sommes-nous.html"><i class="fas fa-angle-right"></i> Qui sommes-nous</a></li>
                        <li><a href="${basePath}messages/audio.html"><i class="fas fa-angle-right"></i> Messages</a></li>
                        <li><a href="${basePath}evenements/a-venir.html"><i class="fas fa-angle-right"></i> Événements</a></li>
                        <li><a href="${basePath}contact.html"><i class="fas fa-angle-right"></i> Contact</a></li>
                    </ul>
                </div>
                <div class="col-6 col-md-4 mb-3 mb-md-4">
                    <h5 class="footer-title"><i class="fas fa-map-marker-alt"></i> Contactez-nous</h5>
                    <ul class="footer-contact">
                        <li><i class="fas fa-map-marker-alt"></i><span>Obili, Yaoundé, Cameroun</span></li>
                        <li><i class="fas fa-phone"></i><span>+237 XXX XXX XXX</span></li>
                        <li><i class="fas fa-envelope"></i><span>contact@cmciobili.org</span></li>
                        <li><i class="fas fa-clock"></i><span>Cultes: Dimanche 8h - 12h</span></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <div class="row">
                    <div class="col-12 col-md-6 text-center text-md-start mb-2 mb-md-0"><p>&copy; 2025 CMCI OBILI. Tous droits réservés.</p></div>
                 </div>
            </div>
             <div class="footer-bottom">
                    <div class="col-12 col-md-6 text-center text-md-end">
		  <p>
		    « Il y a diversité de dons, mais le même Esprit ; diversité de services, mais le même Seigneur.  
		    Ensemble, nous formons un seul corps pour la gloire de Dieu. »  
		    
              	<br><em>— 1 Corinthiens 12:4-5</em><br>
		  </p>
              	  </div>
              </div>
              <div class="footer-bottom">
		     <i class="fas fa-heart" style="color: #c6d647;"></i> Toute la gloire à Dieu.
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
    
    // Initialiser après chargement
    setTimeout(initializeApp, 200);
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
