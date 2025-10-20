document.addEventListener('DOMContentLoaded', () => {
    // =============================================
    // LÓGICA DO LIGHTBOX (ÁLBUM DE FOTOS)
    // =============================================
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeButton = document.querySelector('.close-button');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    // Verificação de segurança para garantir que todos os elementos existem
    if (!lightbox || !lightboxImage || !closeButton || !prevButton || !nextButton) {
        console.error('Elementos do Lightbox não encontrados. Verifique os IDs e classes no HTML.');
        return;
    }

    let currentImageIndex;

    const openLightbox = (index) => {
        currentImageIndex = index;
        lightboxImage.src = galleryImages[currentImageIndex].src;
        lightbox.classList.add('active');
        // Trava o scroll do body enquanto o lightbox estiver ativo
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        // Libera o scroll do body
        document.body.style.overflow = 'auto';
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
    
    // Fecha o lightbox se clicar fora da imagem
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    prevButton.addEventListener('click', showPrevImage);
    nextButton.addEventListener('click', showNextImage);

    // Navegação pelo teclado
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'ArrowRight') showNextImage();
            if (e.key === 'Escape') closeLightbox();
        }
    });

    // Navegação por swipe em telas touch
    let touchstartX = 0;
    let touchendX = 0;

    const handleSwipe = () => {
        const swipeThreshold = 50; // Mínimo de pixels para considerar um swipe
        if (touchendX < touchstartX - swipeThreshold) {
            showNextImage();
        }
        if (touchendX > touchstartX + swipeThreshold) {
            showPrevImage();
        }
    };

    lightbox.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX;
        handleSwipe();
    });
});
