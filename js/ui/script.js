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
import { getPopularMovies, IMG_URL } from '../api/api.js';

async function renderMovies() {
    const moviesGrid = document.getElementById('movies-grid');
    if (!moviesGrid) return;

    const movies = await getPopularMovies();

    moviesGrid.innerHTML = movies.map(movie => `
        <div class="movie-card" onclick="window.location.href='movie.html?id=${movie.id}'">
            <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>Рейтинг: ⭐${movie.vote_average.toFixed(1)}</p>
            </div>
        </div>
    `).join('');
}

renderMovies();