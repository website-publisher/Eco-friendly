document.addEventListener('DOMContentLoaded', function () {
    const galleries = document.querySelectorAll('.product-gallery');

    galleries.forEach(gallery => {
        const slides = gallery.querySelector('.slides');
        const images = slides.querySelectorAll('img');
        const prevButton = gallery.querySelector('.prev');
        const nextButton = gallery.querySelector('.next');

        let index = 0;

        function showSlide(n) {
            if (n >= images.length) {
                index = 0;
            } else if (n < 0) {
                index = images.length - 1;
            } else {
                index = n;
            }
            slides.style.transform = `translateX(${-index * 100}%)`;
        }

        prevButton.addEventListener('click', function () {
            showSlide(index - 1);
        });

        nextButton.addEventListener('click', function () {
            showSlide(index + 1);
        });

        // Optional: Auto slide
        setInterval(function () {
            showSlide(index + 1);
        }, 5000); // Change image every 5 seconds
    });
});
