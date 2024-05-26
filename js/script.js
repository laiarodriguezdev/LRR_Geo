let meteoritesArray = [];

fetch("js/json/earthMeteorites.json")
    .then((response) => response.json())
    .then((data) => {
        meteorites = data.map(meteor => {
            return {
                name: meteor.name,
                lat: meteor.reclat,
                long: meteor.reclong
            };
        });
        console.log(meteorites);
});

const map = L.map('map').setView([41.9, 3.15], 12); //PALAMÓS PALAAAAMÓS

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);