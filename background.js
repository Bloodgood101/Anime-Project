document.getElementById('searchForm').addEventListener('submit', async (e) => {
//console.log(chrome) //test
e.preventDefault();
const searchTerm = document.getElementById('searchTerm').value;
const mediaType = document.getElementById('mediaType').value;

 // Generate unique ID and timestamp
 const searchEntry = {
    id: Date.now().toString(),
    searchTerm,
    mediaType,
    timestamp: new Date().toISOString(),
    metadata: {} // Add barcode/ISBN data here if needed
 };

 // Save to storage
 const result = await chrome.storage.local.get(['searches']);
 const searches = result.searches || [];
 searches.push(searchEntry);
 await chrome.storage.local.set({ searches });
 console.log('search result received', searchTerm);

  //the searching process
  if (mediaType == "manga") {
      let mangaNameUrl = searchTerm.replace(/ /g, "+");
      let url = "https://mangafire.to/filter?keyword="+mangaNameUrl;
      window.open(url, '_blank');
  } else if (mediaType == "movie") {
        let movieName = searchTerm.replace(/ /g, "-");
        if (confirm("Click confirm for torrents, otherwise click other option")) {
            window.alert("VPN recommended (You need to reenter your media as Pirate Bay uses a database...)");
            window.open('https://ww1.thepiratebay3.co/s/') //if not an anime then opens pirate bay for the user
        } else {
            let url = 'https://movies2watch.tv/search/'+movieName;
            window.open(url, '_blank')
        }
  } else if (mediaType == "tv") {
      //Our torrent website
      if (confirm("Click confirm for torrents, otherwise click other option")) {
        //Replace the animeName spaces with + so it fits the format for 1337x.to
        let tvName = searchTerm.replace(/ /g, "+");
        window.alert("VPN recommended");
        let url = 'https://1337x.to/category-search/'+tvName+'/TV/1/';
        window.open(url, '_blank');
      } else {
        let tvName = searchTerm.replace(/ /g, "-");
        let url = "https://movies2watch.tv/search/"+tvName;
        window.open(url, '_blank');
      }
  } else if (mediaType == "anime") {
    let animeNameUrl = searchTerm.replace(/ /g, "+")
    let url = "https://hianime.to/search?keyword="+animeNameUrl;
    window.alert("VPN recommended");
    window.open(url, '_blank');
  } else if (mediaType == "game") {
      let gameNameUrl = searchTerm.replace(/ /g, "-");
      //if the game is on console it will go through the nested if statements
      if (confirm("Click left option for PC, right for console")) {
        if (confirm("left for dig1ital, right for disc.")) {
            let url = 'https://www.amazon.co.uk/s?k='+gameNameUrl;
            window.open(url, '_blank');
        } else {
            let url = 'https://www.playstation.com/en-gb/games/'+gameNameUrl+'/';
            window.open(url, '_blank');
        }
      } else {
        let url = 'https://isthereanydeal.com/game/'+gameNameUrl+'/info/';
        window.open(url, '_blank');
      }
  } else if (mediaType == "other") {
    let item = searchTerm.replace(/ /g, "-");
    let url = 'https://pricespy.co.uk/search?search='+item;
    window.open(url, '_blank');
  } else if (mediaType == "trophy-hunting") {
    let trophyGameNameUrl = searchTerm.replace(/ /g, "%20");
    let url = "https://psnprofiles.com/search/guides?q="+trophyGameNameUrl;
    window.open(url, '_blank');
  };

 // Clear input and refresh history
 document.getElementById('searchForm').reset();
 loadHistory();
});

// Load and display history
async function loadHistory() {
  const historyDiv = document.getElementById('history');
  historyDiv.innerHTML = '';

  const result = await chrome.storage.local.get(['searches']);
  const searches = result.searches || [];

  searches.forEach(search => { //saves the search in the tab
    const entry = document.createElement('div');
    entry.className = 'history-entry';
    entry.innerHTML = `
      <strong>${search.searchTerm}</strong> (${search.mediaType})<br>
      <small>${new Date(search.timestamp).toLocaleString()}</small>
    `;
    historyDiv.appendChild(entry);
  });
};

//deletes history
document.getElementById('clearHistory').addEventListener('click', async () => {
  await chrome.storage.local.remove('searches');
  loadHistory();
});

// Load history when popup opens
document.addEventListener('DOMContentLoaded', loadHistory);
