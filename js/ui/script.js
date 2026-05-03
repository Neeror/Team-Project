const sliderImages = ['images.jpg', 'watch-dogs-review-article.webp', 'image.jpg'];
let sliderIndex = 0;

window.setSlide = function(index) {
    const hero = document.getElementById('hero-slider');
    const thumbs = document.querySelectorAll('.thumb');
    
    if (!hero) return;

    sliderIndex = index;
    hero.style.backgroundImage = `url('${sliderImages[sliderIndex]}')`;

    thumbs.forEach((t, i) => {
        if (i === index) {
            t.classList.add('active');
        } else {
            t.classList.remove('active');
        }
    });
}

setInterval(() => {
    sliderIndex = (sliderIndex + 1) % sliderImages.length;
    window.setSlide(sliderIndex);
}, 10000);