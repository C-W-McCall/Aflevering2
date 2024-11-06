// Constructor function som definere album-objekterne.
function Album(id, artist, albumName, year, genre, trackList) {
    this.id = id;
    this.artist = artist;
    this.albumName = albumName;
    this.year = year;
    this.genre = genre;
    this.trackList = trackList;
  }
  
  // Funktion, der bruges til at generere HTML-strukturen og indsætte et albumkort. Tilføjer dynamisk et nyt albumkort til DOM’en.
  function displayAlbumCard(album, parentId) {
    const parentElement = document.getElementById(parentId);
  
    const card = document.createElement("div");
    card.classList.add("album-card");
    
    // Her bliver albumkortet dannet. Vi gør brug af string interpolation.
    card.innerHTML = `
      <h2>${album.albumName}</h2>
      <p><strong>Artist:</strong> ${album.artist}</p>
      <p><strong>Year:</strong> ${album.year}</p>
      <p><strong>Genre:</strong> ${album.genre}</p>
      <ul class="tracklist">
        ${album.trackList.map(track => `
          <li>${track.trackNumber}. ${track.trackTitle} (${track.trackTimeInSeconds} sek)</li>
        `).join("")}
      </ul>
    `;
  
    parentElement.appendChild(card); /* Tilføjer det nyoprettede albumkort-element til det eksisterende parentElement, som er en DOM-manipulation.
    Dette er den endelige handling, der gør albumkortet synligt på siden ved at placere det i den visuelle struktur.
    */
  }
  
  // Thomas magiske kode - Det virker jo bare :-)
  async function fetchContent(url) {
    let request = await fetch(url);
    let json = await request.json();
    return json;
  } 
  
  // Organiserer data ved at hente JSON-indhold og opretter album-objekter, som senere bruges til at vise hvert albumkort.
  document.addEventListener("DOMContentLoaded", () => {
    fetchContent("albums.json") // Henter data fra JSON-filen.
      .then(albumsData => {
        const albumObjects = []; // Et array som vil bruge til indsætning af JSON data
  
        /* Et forEach-loop som gennemgår elementerne i JSON-filen, 
        og ved hjælp af ovenstående constructor function skaber album-objekterne. 
        Disse gemmes i vores tidligere oprettet albumObjects array.*/
        albumsData.forEach(data => {
          const album = new Album(
            data.id,
            data.artistName,
            data.albumName,
            data.productionYear,
            data.genre,
            data.trackList
          );
          albumObjects.push(album);
        });
  
        /*
        Her benytter vi endnu et forEach-loop. 
        Dette loop går gennem hvert Album-objekt i albumObjects-arrayet og kalder displayAlbumCard-funktionen for hvert album.*/
        albumObjects.forEach(album => {
          displayAlbumCard(album, "albumGrid");
        });
      });
  });
  