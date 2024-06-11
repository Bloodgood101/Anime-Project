window.onload = function() {
  const startButton = document.getElementById('startButton');
  startButton.addEventListener('click', startAnime);
};

function startAnime() {
  //gets the anime the user entered and downloads it from a torrent website (to be converted in Vuze and streamed on VLC)
  let getAnime = document.getElementById("anime");
  const animeName = getAnime.value;

  let divLine = document.getElementById("confirmation");
  const newP = document.createElement('p');
  newP.textContent = "You have started "+animeName; 
  divLine.appendChild(newP);

  //Replace the animeName spaces with + so it fits the format for 1337x.to
  let animeNameUrl = animeName.replace(/ /g, "+");
  //Our torrent website
  let url = 'https://1337x.to/search/'+animeNameUrl+'/1/';
  window.open(url, '_blank');
}