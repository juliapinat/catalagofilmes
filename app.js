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

    try{
        // Busca na OMDB (o parâmetro 's' serve para busca por termo)
         const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(termo)}&apikey=${OMDB_API_KEY}`);
         const data = await response.json();

         listaFilmesContainer.innerHTML = ''

         if (data.Response == 'True' && data.Search) {
            data.Search.forEach(async (filmeBase) => {
               const filmeDetalhado = await buscarDetalhes(filmeBase.imdbID);
               if (filmeDetalhado) {
                listaFilmesContainer.appendChild(criarCardFilme(filmeDetalhado));
               }
            });
    } else {
        listaFilmesContainer.innerHTML = `<p style="text-align: center;">Nenhum filme encontrado para "${termo}".</p>`;
    }
     } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      listaFilmesContainer.innerHTML = `<p style="text-align: center; color: red;">Erro na conexão com a API.</p>`;
     } 
} 

// Busca na OMDB (O parâmetro 'i' para busca por ID)
async function buscarDetalhes(imdbID) {
    try{
    const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=${OMDB_API_KEY}`);
    const data = await response.json();
    return data.Response === "True" ? data : null;
    } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
        return null;
    }
}
