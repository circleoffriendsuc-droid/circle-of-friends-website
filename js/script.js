document.addEventListener('DOMContentLoaded', () => {
    // 1. Netlify Form Handling via Background Fetch
    const contactForm = document.getElementById('contact-form');
    const contactSuccess = document.getElementById('contact-success');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);

            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            })
            .then(() => {
                contactForm.style.display = 'none';
                contactSuccess.style.display = 'block';
            })
            .catch(error => {
                alert("There was an issue sending your message. Please try again or call us directly.");
                console.error("Form error:", error);
            });
        });
    }

    // 2. Interactive Gallery Lightbox & Slideshow
    const galleryImages = Array.from(document.querySelectorAll('.gallery-grid img'));
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');

    if (galleryImages.length > 0 && modal && modalImg) {
        const closeBtn = document.querySelector('.lightbox-close');
        const prevBtn = document.querySelector('.lightbox-prev');
        const nextBtn = document.querySelector('.lightbox-next');
        let currentIndex = 0;

        function showImage(index) {
            if (index < 0) {
                currentIndex = galleryImages.length - 1;
            } else if (index >= galleryImages.length) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }

            modalImg.src = galleryImages[currentIndex].src;
            modalImg.alt = galleryImages[currentIndex].alt;
        }

        // Add click listener to every gallery photo
        galleryImages.forEach((img, index) => {
            img.addEventListener('click', (e) => {
                e.stopPropagation();
                modal.style.display = 'flex';
                showImage(index);
            });
        });

        // Close button
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        // Navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                showImage(currentIndex - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                showImage(currentIndex + 1);
            });
        }

        // Close when clicking outside the photo (dark overlay)
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Keyboard arrow key navigation & Escape to close
        document.addEventListener('keydown', (e) => {
            if (modal.style.display === 'flex') {
                if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
                if (e.key === 'ArrowRight') showImage(currentIndex + 1);
                if (e.key === 'Escape') modal.style.display = 'none';
            }
        });
    }
});