document.addEventListener('DOMContentLoaded', function () {
    const galleries = document.querySelectorAll('.product-gallery');

    galleries.forEach(gallery => {
        const slides = gallery.querySelector('.slides');
        const images = slides.querySelectorAll('img');
        const prevButton = gallery.querySelector('.prev');
        const nextButton = gallery.querySelector('.next');

        if (images.length === 0) return; // Check if there are images

        let index = 0;
        let interval;

        function showSlide(n) {
            if (n >= images.length) {
                index = 0;
            } else if (n < 0) {
                index = images.length - 1;
            } else {
                index = n;
            }
            slides.style.transform = `translateX(${-index * 100}%)`;
            updateAria();
        }

        function updateAria() {
            slides.setAttribute('aria-live', 'polite');
            slides.setAttribute('aria-label', `Image ${index + 1} of ${images.length}`);
        }

        function startAutoSlide() {
            interval = setInterval(function () {
                showSlide(index + 1);
            }, 5000);
        }

        function stopAutoSlide() {
            clearInterval(interval);
        }

        prevButton.addEventListener('click', function () {
            showSlide(index - 1);
            stopAutoSlide();
            startAutoSlide();
        });

        nextButton.addEventListener('click', function () {
            showSlide(index + 1);
            stopAutoSlide();
            startAutoSlide();
        });

        gallery.addEventListener('mouseenter', stopAutoSlide);
        gallery.addEventListener('mouseleave', startAutoSlide);

        // Keyboard Navigation
        gallery.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowLeft') {
                showSlide(index - 1);
                stopAutoSlide(); // Pause auto slide
            } else if (event.key === 'ArrowRight') {
                showSlide(index + 1);
                stopAutoSlide(); // Pause auto slide
            }
        });

        // Start the auto slide initially
        startAutoSlide();
    });
});
