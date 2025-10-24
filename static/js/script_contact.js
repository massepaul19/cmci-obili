// ================== CONFIGURATION EMAILJS ==================
const EMAILJS_CONFIG = {
    publicKey: 'JBxvRpj_xoYx1XIrA',        
    serviceId: 'service_4hbrkbi',           
    templateId: 'template_94gp3d9'
};

let emailJSInitialized = false;

// ================== INITIALISATION EMAILJS ==================
function initializeEmailJS() {
    try {
        if (typeof emailjs !== 'undefined') {
            emailjs.init(EMAILJS_CONFIG.publicKey);
            emailJSInitialized = true;
            console.log('✅ EmailJS initialisé');
            return true;
        }
        console.error('❌ EmailJS non disponible');
        return false;
    } catch (error) {
        console.error('❌ Erreur init EmailJS:', error);
        return false;
    }
}

// ================== ENVOI EMAIL ==================
async function sendEmail(formData) {
    if (!emailJSInitialized) {
        throw new Error('EmailJS non initialisé');
    }

    const templateParams = {
        from_name: formData.from_name,
        from_email: formData.from_email,
        phone: formData.phone || 'Non renseigné',
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.from_email
    };

    const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams
    );

    return response;
}

// ================== VALIDATION FORMULAIRE ==================
function validateForm(data) {
    if (!data.from_name || data.from_name.length < 2) {
        alert('Veuillez entrer votre nom complet (minimum 2 caractères)');
        return false;
    }
    
    if (!data.from_email) {
        alert('Veuillez entrer votre email');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.from_email)) {
        alert('Format d\'email invalide');
        return false;
    }
    
    if (!data.subject) {
        alert('Veuillez choisir un sujet');
        return false;
    }
    
    return true;
}

// ================== RÉCUPÉRATION DES DONNÉES ==================
function getFormData() {
    const form = document.getElementById('contactForm');
    if (!form) return {};
    
    return {
        from_name: form.from_name?.value?.trim() || '',
        from_email: form.from_email?.value?.trim() || '',
        phone: form.phone?.value?.trim() || '',
        subject: form.subject?.value || '',
        message: form.message?.value?.trim() || ''
    };
}

// ================== GESTIONNAIRE PRINCIPAL ==================
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.innerHTML;
    
    // État de chargement
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
    
    try {
        // 1. Récupérer les données
        const formData = getFormData();
        
        // 2. Valider
        if (!validateForm(formData)) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            return;
        }
        
        // 3. Envoyer
        if (emailJSInitialized) {
            await sendEmail(formData);
            
            // Succès
            alert('✅ Message envoyé avec succès !\nVous recevrez une réponse sous 24h.');
            document.getElementById('contactForm').reset();
        } else {
            throw new Error('Service email non disponible');
        }
        
    } catch (error) {
        console.error('Erreur envoi:', error);
        alert('❌ Erreur lors de l\'envoi. Veuillez réessayer ou nous contacter via WhatsApp.');
        
    } finally {
        // Restaurer le bouton
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }, 1000);
    }
}


// ================== INITIALISATION ==================
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser EmailJS
    setTimeout(() => {
        initializeEmailJS();
    }, 500);
    
    // Configurer le formulaire
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    // Animations fade-in
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('active');
        }, 200 + (index * 100));
    });
});
