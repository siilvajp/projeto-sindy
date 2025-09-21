document.addEventListener('DOMContentLoaded', () => {
    // =============================================
    // LÓGICA DO MODAL DE SENHA
    // =============================================
    const passwordOverlay = document.getElementById('password-overlay');
    const passwordModal = document.getElementById('password-modal');
    const passwordForm = document.getElementById('password-form');
    const passwordInput = document.getElementById('password-input');
    const errorMessage = document.getElementById('error-message');

    if (passwordForm) {
        passwordForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (passwordInput.value === '07.07') {
                // Senha correta
                passwordOverlay.style.opacity = '0';
                passwordOverlay.addEventListener('transitionend', () => {
                    passwordOverlay.style.display = 'none';
                }, { once: true });
                
                document.body.style.overflow = 'auto'; // Libera o scroll
            } else {
                // Senha incorreta
                errorMessage.classList.add('visible');
                passwordModal.classList.add('shake');
                passwordInput.value = ''; // Limpa o campo

                // Remove a classe de erro e tremor após a animação
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
        console.error('Elementos do Lightbox não encontrados. Verifique os IDs e classes no HTML.');
        return;
    }

    let currentImageIndex;

    function openLightbox(index) {
        currentImageIndex = index;
        lightboxImage.src = galleryImages[currentImageIndex].src;
        lightbox.classList.add('active');
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImage.src = galleryImages[currentImageIndex].src;
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        lightboxImage.src = galleryImages[currentImageIndex].src;
    }

    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => openLightbox(index));
    });

    closeButton.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
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

    let touchstartX = 0;
    let touchendX = 0;

    lightbox.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchendX < touchstartX - 50) {
            showNextImage();
        }
        if (touchendX > touchstartX + 50) {
            showPrevImage();
        }
    }
});

