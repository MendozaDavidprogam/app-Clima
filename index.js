const locali = async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const temp = data.current_weather.temperature;
        const wind = data.current_weather.windspeed;
        const dir = data.current_weather.winddirection;
        const container = document.getElementById("container");


        document.getElementById("temperature").textContent = `${temp} °C`;
        document.getElementById("windspeed").textContent = `Viento: ${wind} km/h`;
        document.getElementById("winddirection").textContent = `Dirección: ${dir}°`;

        // cambio de icono depende de la temperatura
        const icon = document.getElementById("weather-icon");
        if(temp <= 10){
            icon.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/642/642102.png')";
            document.body.style.background = "linear-gradient(to top, #00c6ff, #0072ff)";
        } else if(temp <= 25){
            icon.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/869/869869.png')";
            document.body.style.background = "linear-gradient(to top, #fefcea, #f1da36)";
        } else{
            icon.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/1116/1116453.png')";
            document.body.style.background = "linear-gradient(to top, #f7971e, #ffd200)";
        }

    } catch (error) {
        console.error("Error al obtener el clima:", error);
        container.innerHTML = `<p>Error al obtener el clima.</p>`;
    }
};

const onLoad = () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(locali, (err) => {
            console.error("Error de geolocalización:", err);
        });
    } else{
        alert("Tu navegador no soporta geolocalización.");
    }
};