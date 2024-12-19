document.getElementById('search-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const city = document.getElementById('city-input').value;

    if (!city) {
        alert('Veuillez entrer un nom de ville.');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${API_KEY}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Ville introuvable');
        }

        const data = await response.json();
        updateWeatherInfo(data);
        adjustCloudSpeed(data.wind.speed); // Ajoute la fonction pour ajuster la vitesse des nuages
    } catch (error) {
        alert(error.message);
    }
});

function adjustCloudSpeed(windSpeed) {
    // Calculer la durée de l'animation en fonction de la vitesse du vent
    let speedFactor = Math.max(6, 20 - windSpeed * 2); // Ajuster entre 6s et 20s
    console.log(`Vitesse du vent : ${windSpeed} m/s, durée de l'animation : ${speedFactor}s`);

    // Appliquer la durée calculée à la variable CSS
    document.documentElement.style.setProperty('--cloud-speed', `${speedFactor}s`);
}