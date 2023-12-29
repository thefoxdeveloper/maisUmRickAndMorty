const charactersURL = "https://rickandmortyapi.com/api/character/";
const episodesURL = "https://rickandmortyapi.com/api/episode";
const locationsURL = "https://rickandmortyapi.com/api/location";

let currentpage = 1;

async function apiDataLoad() {
  const characters = await axios.get(`${charactersURL}`);
  const episodes = await axios.get(`${episodesURL}`);
  const locations = await axios.get(`${locationsURL}`);
  return {
    characters: characters.data,
    episodes: episodes.data,
    locations: locations.data,
  };
}
async function apiDataLoadEpisode(url) {
  const episodes = await axios.get(url);

  return {
    episodes: episodes.data,
  };
}
async function getEpisode(url) {
  const res = await apiDataLoadEpisode(url);
  return res.episodes.name;
}

async function getDataCount(data) {
  const res = await apiDataLoad(2);
  return res[data].info.count;
}
async function mostrarCount() {
  const characters = await getDataCount("characters");
  const episodes = await getDataCount("episodes");
  const locations = await getDataCount("locations");
  personagens.innerHTML = characters;
  localizacoes.innerHTML = locations;
  episodios.innerHTML = episodes;
}
mostrarCount();

async function apiDataLoadCards(name, currentpage) {
  const characters = await axios.get(
    `${charactersURL}/?name=${name}&page=${currentpage}`
  );
  return characters.data.results;
}
let pagina = 1;

async function montarCard() {
  console.log("pagina ", pagina);
  console.log("currentPage ", currentpage);

  const searchTerm = document.getElementById("buscador").value;
  const cards = await apiDataLoadCards(searchTerm, currentpage);
  if (cards[pagina - 1]) {
    console.log("Personagem ", cards);

    const episodeName = await getEpisode(
      cards[pagina - 1].episode[cards[pagina - 1].episode.length - 1]
    );

    content.innerHTML = renderizar(cards, episodeName);
  }

  function renderizar(cards, episodeName) {
    return `<div class="avatar">
  <img
    src="${cards[pagina - 1].image}"
    alt=""
  />
  </div>
  <div class="info">
  <div class="title"><h1>${cards[pagina - 1].name}</h1></div>
  <div class="stats"><h4> ${status(cards, pagina)} - ${
      cards[pagina - 1].species
    }</h4></div>
  <div class="location">
    <strong>Última localização conhecida:<br /></strong>
    <span id="lastLoc">${cards[pagina - 1].location.name}</span>
  </div>
  <div class="episode">
    <strong>Visto a última vez em:<br /></strong>
    <span id="lastEp">${episodeName}</span>
  </div>
  ${devoRender(pagina, cards)}
  </div>
  </div>`;
  }
}
function devoRender(pagina, cards) {
  if (pagina == 1 && currentpage == 1) {
    return beforeDisable(pagina);
  } else if (cards[pagina] || pagina == 20) {
    return bothAble(pagina);
  } else {
    return nextDisable(pagina);
  }
}
function status(cards, pagina) {
  if (cards[pagina - 1].status == "Alive") {
    return `<h4>💚 Vivo`;
  }
  if (cards[pagina - 1].status == "Dead") {
    return `<h4>❤️ Morto`;
  } else {
    return `<h4>🩶 Desconhecido`;
  }
}
function nextDisable(pagina) {
  return `<div class="pagination">
  <div class="prev"><button onclick="prevPage()" id="prev"  >Anterior</button></div>
  <div class="current"> ${pagina} </div>
  <div class="next">  <button onclick="proxPage()" id="next" disabled>Proximo</button></div>
  </div>`;
}
function bothAble(pagina) {
  return ` <div class="pagination">
  <div class="prev"><button onclick="prevPage()" id="prev"  >Anterior</button></div>
  <div class="current"> ${pagina} </div>
  <div class="next">  <button onclick="proxPage()" id="next" >Proximo</button></div>
</div>`;
}
function beforeDisable(pagina) {
  return `<div class="pagination">
  <div class="prev"><button onclick="prevPage()" id="prev" disabled >Anterior</button></div>
  <div class="current"> ${pagina} </div>
  <div class="next">  <button onclick="proxPage()" id="next" >Proximo</button></div>
  </div>`;
}
montarCard();
function proxPage() {
  pagina++;
  montarCard();
  if (pagina > 20) {
    currentpage++;
    pagina = 1;
    montarCard();
  }
}
function prevPage() {
  if (pagina >= 2) {
    pagina--;
    montarCard();
  } else if (pagina == 1 && currentpage > 1) {
    currentpage--;
    pagina = 20;
    montarCard();
  }
}
function buscar() {
  pagina = 1;
  montarCard();
}
