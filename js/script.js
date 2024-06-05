let earthMeteorites=[];

fetch("js/json/earthMeteorites.json")
    .then((response) => response.json())
    .then((data) => {
        dades = data.map(meteorit => {
            return {
                name: meteorit.name,
                reclat: meteorit.reclat,
                reclong: meteorit.reclong
            };
        });
        // console.log(dades);
        printMeteors(dades);
});

var map = L.map("map").setView([41.9, 3.17], 11); //PALAMÓS PALAAAAMÓS
// console.log(map);
 L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map); 

function printMeteors(meteors) {
  const resultat = document.getElementById('resultat');
  const taula = document.createElement('table');

  const filaCapcalera = taula.insertRow();
  const titols = ['Nom', 'Latitud', 'Longitud'];

  titols.forEach(titol => {
    const th = document.createElement('th');
    th.textContent = titol;
    filaCapcalera.appendChild(th);
  });

  resultat.innerHTML = '';
  resultat.appendChild(taula);

  meteors.forEach(meteor => {
    const row = taula.insertRow();
    const celaNom = row.insertCell(0);
    const celaLat = row.insertCell(1);
    const celaLong = row.insertCell(2);

    celaNom.textContent = meteor.name;
    celaLat.textContent = meteor.reclat;
    celaLong.textContent = meteor.reclong;

    [celaNom, celaLat, celaLong].forEach(cela => {
      cela.style.border = '3px solid black';
      cela.style.padding = '5px'; 
    });

    [celaNom, celaLat, celaLong].forEach(cela => {
      cela.addEventListener('click', () => {
        const lat = parseFloat(meteor.reclat);
        const long = parseFloat(meteor.reclong);
        
        if (window.marker) {
          window.map.removeLayer(window.marker);
        }

        window.marker = L.marker([lat, long]).addTo(window.map);

        window.map.setView([lat, long], 15);

        const llistaMeteors = `<div style="font-size: 11pt;"><b>Nom:</b> ${meteor.name}<br><b>Latitud:</b> ${meteor.reclat}<br><b>Longitud:</b> ${meteor.reclong}</div>`;

        window.marker.bindPopup(llistaMeteors).openPopup();
        
        window.scrollTo(0, 0);
      });
    });
  });
}
