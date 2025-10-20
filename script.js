document.addEventListener('DOMContentLoaded', () => {
    
    // =============================================
    // LÓGICA DO MODAL DE SENHA
    // =============================================
    const passwordOverlay = document.getElementById('password-overlay');
    const passwordModal = document.getElementById('password-modal');
    const passwordForm = document.getElementById('password-form');
    const passwordInput = document.getElementById('password-input');
    const errorMessage = document.getElementById('error-message');
    const body = document.body;

    if (passwordForm) {
        passwordForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // A senha correta
            if (passwordInput.value === '07.07') {
                // Senha correta: Inicia o processo de desbloqueio
                
                // 1. Adiciona a classe para o fade-out do overlay
                passwordOverlay.classList.add('fade-out');
                
                // 2. Remove a classe 'locked' do body para revelar o conteúdo
                body.classList.remove('locked');

                // 3. Opcional: Remove o modal do DOM após a transição para limpar o HTML
                passwordOverlay.addEventListener('transitionend', () => {
                    passwordOverlay.remove();
                }, { once: true });

            } else {
                // Senha incorreta: Mostra o erro e treme o modal
                errorMessage.classList.add('visible');
                passwordModal.classList.add('shake');
                passwordInput.value = ''; // Limpa o campo

                // Remove as classes de erro após a animação
                setTimeout(() => {
                    errorMessage.classList.remove('visible');
                    passwordModal.classList.remove('shake');
                }, 1000);
            }
        });
    }

    // =============================================
    // LÓGICA DO LIGHTBOX (ÁLBUM DE FOTOS)
    // =============================================
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeButton = document.querySelector('.close-button');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    if (!lightbox || !lightboxImage || !closeButton || !prevButton || !nextButton) {
        console.error('Elementos do Lightbox não encontrados.');
        return;
    }

    let currentImageIndex;

    const openLightbox = (index) => {
        currentImageIndex = index;
        lightboxImage.src = galleryImages[currentImageIndex].src;
        lightbox.classList.add('active');
        body.style.overflow = 'hidden'; // Trava o scroll principal
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        // Só libera o scroll se a página não estiver mais bloqueada pela senha
        if (!body.classList.contains('locked')) {
            body.style.overflow = 'auto';
        }
    };

    const showPrevImage = () => {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImage.src = galleryImages[currentImageIndex].src;
    };

    const showNextImage = () => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        lightboxImage.src = galleryImages[currentImageIndex].src;
    };

    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => openLightbox(index));
    });

    closeButton.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    prevButton.addEventListener('click', showPrevImage);
    nextButton.addEventListener('click', showNextImage);

    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'ArrowRight') showNextImage();
            if (e.key === 'Escape') closeLightbox();
        }
    });

    // Lógica de Swipe para o Lightbox
    let touchstartX = 0;
    let touchendX = 0;

    const handleSwipe = () => {
        if (touchendX < touchstartX - 50) showNextImage();
        if (touchendX > touchstartX + 50) showPrevImage();
    };
    
    lightbox.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    lightbox.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX;
        handleSwipe();
    });
});
