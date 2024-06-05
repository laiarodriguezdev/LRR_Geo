let meteoritesArray = [];

fetch("js/json/earthMeteorites.json")
  .then((response) => response.json())
  .then((data) => {
    dades = data.map((meteorit) => {
      return {
        name: meteorit.name,
        lat: meteorit.reclat,
        long: meteorit.reclong
      };
    });
    printMeteors(dades);
});

var map = L.map("map").setView([41.9, 3.17], 11); //PALAMÓS PALAAAAMÓS
// console.log(map)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map); 

function printMeteors(meteor) {
  const resultat = document.getElementById('resultat');
  const taula = document.createElement('table');

  const rowHeader = taula.insertRow();
  const titols = ['Nom', 'Latitud', 'Longitud'];

  titols.forEach((titol) => {
    const th = document.createElement('th');
    th.textContent = titol;
    rowHeader.appendChild(th);
  });

  resultat.innerHTML = "";
  resultat.appendChild(taula);

  meteor.forEach((mtr) => {
    // console.log("entro a fer el taulainsertrow");
    const row = taula.insertRow();
    const celaNom = row.insertCell(0);
    const celaLat = row.insertCell(1);
    const celaLong = row.insertCell(2);

    celaNom.textContent = mtr.name;
    celaLat.textContent = mtr.reclat;
    celaLong.textContent = mtr.reclong;

    [celaNom, celaLat, celaLong].forEach((cela) => {
      // console.log("Soc a cela afegint border");
      cela.style.border = "1px solid black";
      cela.style.padding = "2.5px";
    });

    // [celaNom, celaLat, celaLong].forEach(cela => {
    //   cela.addEventListener('click', () => {
    //     const lat = parseFloat(mtr.reclat);
    //     const long = parseFloat(mtr.reclong);
        
    //     if (window.marker) {
    //       window.map.removeLayer(window.marker);
    //     }

    //     window.marker = L.marker([lat, long]).addTo(window.map);

    //     window.map.setView([lat, long], 15);

    //     const llistaMeteors = `<div style="font-size: 11pt;"><b>Nom:</b> ${mtr.name}<br><b>Latitud:</b> ${mtr.reclat}<br><b>Longitud:</b> ${mtr.reclong}</div>`;

    //     window.marker.bindPopup(llistaMeteors).openPopup();
        
    //     window.scrollTo(0, 0);
    //   });
    // });

    
  });
}