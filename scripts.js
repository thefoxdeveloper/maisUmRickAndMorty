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
async function apiDataLoadEpisode(number) {
  const episodes = await axios.get(`${episodesURL}/${number}`);

  return {
    episodes: episodes.data,
  };
}
async function getEpisode(number) {
  const res = await apiDataLoadEpisode(number);
  return res.episodes.name;
}

console.log(getEpisode(51));
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
async function montarCard(name) {
  const cards = await apiDataLoadCards(name, currentpage);
  for (const x of cards) {
    const episodeName = await getEpisode(x.episode.length);
    content.innerHTML += `<div class="avatar">
<img
  src="${x.image}"
  alt=""
/>
</div>
<div class="info">
<div class="title"><h1>${x.name}</h1></div>
<div class="stats"><h4>💚 ${x.status} - ${x.species}</h4></div>
<div class="location">
  <strong>Última localização conhecida:<br /></strong>
  <span id="lastLoc">${x.location.name}</span>
</div>
<div class="episode">
  <strong>Visto a última vez em:<br /></strong>
  <span id="lastEp">${episodeName}</span>
</div>
<div class="pagination">
  <div class="prev"><-</div>
  <div class="current">1</div>
  <div class="next">-></div>
</div>
</div>
</div>`;
  }
}
montarCard("");
