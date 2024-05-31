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
  fetch(url, {
    mode: 'no-cors'
  }) 
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      //doc stores our webpage we are temporarily searching
      const doc = parser.parseFromString(html, "text/html");
      //finds links
      const links = doc.querySelectorAll('a');

      //Goes through all the links in the page, doesn't matter if the search is linear since the best option is the first one so O(1)
      for (const link of links) {
        const href = link.getAttribute('href');
        if (href.includes(animeName)) {
          window.location.href = href;
          window.open(href);
          break;
        }
      }
    })
    //error handling
    .catch(error => console.error('Error fetching webpage:', error));
}