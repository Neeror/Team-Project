const API_KEY = '7c71779e9c6ee2fb3d61e678ed884b7d';

const BASE_URL = 'https://api.themoviedb.org/3';

export const IMG_URL = 'https://image.tmdb.org/t/p/w500';

export async function getPopularMovies() {

    try {

        const response = await fetch(
            `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=uk-UA`
        );

        const data = await response.json();

        return data.results || [];

    } catch (error) {

        console.error("Помилка API:", error);

        return [];
    }
}

export async function getMovieDetails(id) {

    try {

        const response = await fetch(
            `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=uk-UA`
        );

        return await response.json();

    } catch (error) {

        console.error(error);

        return null;
    }
}

export async function getMovieTrailer(id) {

    try {

        const response = await fetch(
            `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=uk-UA`
        );

        const data = await response.json();

        let trailer = data.results.find(
            video =>
                video.site === 'YouTube' &&
                video.type === 'Trailer' &&
                video.iso_639_1 === 'uk'
        );

        if (!trailer) {

            trailer = data.results.find(
                video =>
                    video.site === 'YouTube' &&
                    video.type === 'Trailer'
            );
        }

        return trailer || null;

    } catch (error) {

        console.error(error);

        return null;
    }
}
export async function searchMovies(query) {
    try {
        const response = await fetch(
            `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=uk-UA`
        );

        const data = await response.json();

        return data.results || [];
    } catch (error) {
        console.error("Помилка пошуку:", error);
        return [];
    }
}