document.addEventListener('DOMContentLoaded', function () {
    const galleries = document.querySelectorAll('.product-gallery');

    galleries.forEach(gallery => {
        const slides = gallery.querySelector('.slides');
        const images = slides.querySelectorAll('img');
        const prevButton = gallery.querySelector('.prev');
        const nextButton = gallery.querySelector('.next');

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
            // Update ARIA attributes for accessibility
            slides.setAttribute('aria-live', 'polite');
            slides.setAttribute('aria-label', `Image ${index + 1} of ${images.length}`);
        }

        function startAutoSlide() {
            interval = setInterval(function () {
                showSlide(index + 1);
            }, 5000); // Change image every 5 seconds
        }

        function stopAutoSlide() {
            clearInterval(interval);
        }

        prevButton.addEventListener('click', function () {
            showSlide(index - 1);
            stopAutoSlide();
            startAutoSlide(); // Restart auto slide after manual action
        });

        nextButton.addEventListener('click', function () {
            showSlide(index + 1);
            stopAutoSlide();
            startAutoSlide(); // Restart auto slide after manual action
        });

        gallery.addEventListener('mouseenter', stopAutoSlide);
        gallery.addEventListener('mouseleave', startAutoSlide);

        // Keyboard Navigation
        gallery.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowLeft') {
                showSlide(index - 1);
            } else if (event.key === 'ArrowRight') {
                showSlide(index + 1);
            }
        });

        // Start the auto slide initially
        startAutoSlide();
    });
});
