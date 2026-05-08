import { getPopularMovies, searchMovies, IMG_URL } from '../api/api.js';

const sliderImages = ['images.jpg', 'watch-dogs-review-article.webp', 'image.jpg'];
let sliderIndex = 0;

window.setSlide = function(index) {
    const hero = document.getElementById('hero-slider');
    const thumbs = document.querySelectorAll('.thumb');
    if (!hero) return;
    sliderIndex = index;
    hero.style.backgroundImage = `url('${sliderImages[sliderIndex]}')`;
    thumbs.forEach((t, i) => {
        t.classList.toggle('active', i === index);
    });
}

setInterval(() => {
    sliderIndex = (sliderIndex + 1) % sliderImages.length;
    window.setSlide(sliderIndex);
}, 10000);

const searchInput = document.getElementById('search-input');
const searchBtn = document.querySelector('.search-wrap button');
const moviesGrid = document.getElementById('movies-grid');
const suggestionsBox = document.getElementById('suggestions');

let timeout;

async function showSuggestions(query) {
    if (!suggestionsBox) return;
    if (!query) {
        suggestionsBox.innerHTML = '';
        suggestionsBox.style.display = 'none';
        return;
    }
    const results = await searchMovies(query);
    const top = results.slice(0, 5);
    if (top.length === 0) {
        suggestionsBox.innerHTML = '';
        suggestionsBox.style.display = 'none';
        return;
    }
    suggestionsBox.style.display = 'block';
    suggestionsBox.innerHTML = top.map(movie => `
        <div class="suggestion-item" data-id="${movie.id}">
            <img src="${movie.poster_path ? IMG_URL + movie.poster_path : 'https://via.placeholder.com/40x60'}" 
                 width="40" height="60" style="object-fit:cover; border-radius:3px; margin-right:10px; vertical-align:middle;">
            <span>${movie.title}</span>
        </div>
    `).join('');
}

if (suggestionsBox) {
    suggestionsBox.addEventListener('mousedown', (e) => {
        const item = e.target.closest('.suggestion-item');
        if (!item) return;
        window.location.href = `movie.html?id=${item.dataset.id}`;
    });
}

function renderMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.addEventListener('click', () => {
        window.location.href = `movie.html?id=${movie.id}`;
    });
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "0.0";
    card.innerHTML = `
        <img src="${movie.poster_path ? IMG_URL + movie.poster_path : 'https://via.placeholder.com/500x750'}" />
        <div class="movie-info">
            <h3>${movie.title}</h3>
            <p>⭐ ${rating}</p>
        </div>
    `;
    return card;
}

function displayMovies(movies) {
    if (!moviesGrid) return;
    moviesGrid.innerHTML = '';
    if (!Array.isArray(movies) || movies.length === 0) {
        moviesGrid.innerHTML = `<h2 style="color:white;text-align:center;">Нічого не знайдено 😕</h2>`;
        return;
    }
    movies.forEach(movie => moviesGrid.appendChild(renderMovieCard(movie)));
}

async function renderMovies() {
    if (!moviesGrid) return;
    moviesGrid.innerHTML = `<p style="color:white;text-align:center;">Завантаження...</p>`;
    const movies = await getPopularMovies();
    displayMovies(movies);
}

async function handleSearch() {
    const query = searchInput.value.trim();
    suggestionsBox.innerHTML = '';
    suggestionsBox.style.display = 'none';
    if (!query) {
        renderMovies();
        return;
    }
    const results = await searchMovies(query);
    displayMovies(results);
}

searchBtn.addEventListener('click', handleSearch);

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSearch();
});

searchInput.addEventListener('input', () => {
    clearTimeout(timeout);
    const query = searchInput.value.trim();
    timeout = setTimeout(() => showSuggestions(query), 300);
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrap')) {
        suggestionsBox.innerHTML = '';
        suggestionsBox.style.display = 'none';
    }
});

renderMovies();