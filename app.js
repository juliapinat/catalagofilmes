// Substitua pela sua chave REAL da OMDB API
const OMDB_API_KEY = 'd0733099';
const listaFilmesContainer = document.querySelector('.lista-filmes');
const searchInput = document.querySelector('.search-input');

@param {Object} filme

function criarCardFilme (filme) {
    const card = document.createElement('div');
    card.classList.add('card-filme');
    card.dataset.imdbId = filme.imdbID;

    const rating = filme.imdbRating ? `⭐ ${filme.imdbRating}`⭐ N/A`;
