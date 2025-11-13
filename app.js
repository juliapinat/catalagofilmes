// Substitua pela sua chave REAL da OMDB API
const OMDB_API_KEY = 'd0733099';

const listaFilmesContainer = document.querySelector('.lista-filmes');
const searchInput = document.querySelector('.search-input');

/**
 * Cria um card de filme.
 * @param {Object} filme
 * @returns {HTMLElement}
 */
function criarCardFilme(filme) {
    const card = document.createElement('div');
    card.classList.add('card-filme');

    card.dataset.imdbId = filme.imdbID;

    const rating = filme.imdbRating ? `⭐ ${filme.imdbRating}` : '⭐ N/A';

    card.innerHTML = `
        <img 
            src="${filme.Poster !== 'N/A' ? filme.Poster : 'placeholder.jpg'}" 
            alt="${filme.Title}"
            class="poster-filme">
        <span class="avaliacao">${rating}</span>
        <div class="card-detalhes">
            <h3 class="titulo-filme">${filme.Title} (${filme.Year})</h3>
            <button class="botao-adicionar" data-title="${filme.Title}">
                + Minha Lista
            </button>
        </div>
    `;

    card.addEventListener('click', () => buscarEExibirDetalhes(filme.imdbID));

    return card;
}

/**
 * Busca filmes na API da OMDb
 * @param {string} termo 
 */
async function buscarFilmes(termo) {
    if (!termo) return;

    listaFilmesContainer.innerHTML = '<p style="text-align: center; color: gray;">Carregando...</p>';