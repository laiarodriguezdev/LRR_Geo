let meteoritesArray = [];

fetch("js/json/earthMeteorites.json")
  .then((response) => response.json())
  .then((data) => {
    meteorites = data.map((meteor) => {
      return {
        name: meteor.name,
        lat: meteor.reclat,
        long: meteor.reclong,
      };
    });
    console.log(meteorites);
    printMeteors(meteorites);
  });

const map = L.map("map").setView([41.9, 3.17], 11); //PALAMÓS PALAAAAMÓS
// console.log(map)

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

function printMeteors(meteor) {
  let resultat = document.getElementById("resultat");
  let taula = document.createElement("table");

  let rowHeader = taula.insertRow();
  let titles = ["Nom", "Latitud", "Longitud"];

  titles.forEach((txt) => {
    const th = document.createElement("th");
    th.textContent = txt;
    rowHeader.appendChild(th);
  });

  resultat.innerHTML = "";
  resultat.appendChild(taula);

  meteor.forEach((meteora) => {
    // console.log("entro a fer el taulainsertrow");
    const row = taula.insertRow();
    const celaNom = row.insertCell(0);
    const celaLat = row.insertCell(1);
    const celaLong = row.insertCell(2);

    celaNom.textContent = meteora.nom;
    celaLat.textContent = meteora.reclat;
    celaLong.textContent = meteora.reclong;

    [celaNom, celaLat, celaLong].forEach((cela) => {
      // console.log("Soc a cela afegint border");
      cela.style.border = "1px solid black";
      cela.style.padding = "2.5px";
    });

    [celaNom, celaLat, celaLong].forEach((cela) => {
      cela.addEventListener("click", () => {
        // console.log("Soc a cela afegint les dades");
        const lat = parseFloat(meteora.reclat);
        const long = parseFloat(meteora.reclong);
        
        if (window.marker) {
          window.map.removeLayer(window.marker);
        }
        
        window.marker = L.marker([lat, long]).addTo(window.map);

        console.log("Latitud:", lat);
        console.log("Longitud:", long);

        window.map.setView([lat, long], 15);

        console.log("Latitud:", lat);
        console.log("Longitud:", long);


        const popupContent = `<div style="font-size: 16px;"><b>Nom:</b> ${meteora.nom}<br><b>Latitud:</b> ${meteora.reclat}<br><b>Longitud:</b> ${meteora.reclong}</div>`;

        window.marker.bindPopup(popupContent).openPopup();

        window.scrollTo(0, 0);
      });
    });
  });
}
