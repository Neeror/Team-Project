import {  getMovieDetails, IMG_URL } from './js/api/api.js';

const params = new URLSearchParams(window.location.search);
const movieId = params.get('id');
const content = document.getElementById('movie-content');

async function init() {
    if (!movieId) {
        content.innerHTML = "<h1>Помилка: ID фільму не знайдено в посиланні</h1>";
        return;
    }

    try {
        const movie = await getMovieDetails(movieId);
        
        if (!movie) {
            content.innerHTML = "<h1>Не вдалося завантажити дані про фільм</h1>";
            return;
        }

        content.innerHTML = `
            <div class="movie-poster">
                <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
            </div>
            <div class="movie-info">
                <a href="index.html" class="back-btn" style="color: red; text-decoration: none;">← Назад</a>
                <h1>${movie.title}</h1>
                <p>${movie.overview || "Опис відсутній"}</p>
            </div>
        `;
    } catch (error) {
        console.error(error);
        content.innerHTML = `<h1>Сталася помилка: ${error.message}</h1>`;
    }
}

init();