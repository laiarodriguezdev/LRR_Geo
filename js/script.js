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
    printMeteors(meteorites);
  });

var map = L.map("map").setView([41.9, 3.17], 11); //PALAMÓS PALAAAAMÓS
// console.log(map)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map); 


function printMeteors(meteor) {
  const resultat = document.getElementById("resultat");
  const taula = document.createElement("table");

  const rowHeader = taula.insertRow();
  const titles = ["Nom", "Latitud", "Longitud"];

  titles.forEach((title) => {
    const th = document.createElement("th");
    th.textContent = title;
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

    celaNom.textContent = mtr.nom;
    celaLat.textContent = mtr.reclat;
    celaLong.textContent = mtr.reclong;

    [celaNom, celaLat, celaLong].forEach((cela) => {
      // console.log("Soc a cela afegint border");
      cela.style.border = "1px solid black";
      cela.style.padding = "2.5px";
    });

    
  });
}