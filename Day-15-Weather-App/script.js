const api = {
    key: "ca5731435241dd187e5f9c2e077dd114",
    base: "https://api.openweathermap.org/data/2.5/"
}

const search = document.querySelector(".search")
const btn = document.querySelector(".btn");

btn.addEventListener("click", getInput);

function getInput (event) {
    //This would do the same as onSubmit="return false"
    //event.preventDefault();

    if(event.type == "click"){
        getData(search.value);
        console.log(search.value)
    }
}

//The getData function is the function which uses the user input to fetch information from the api
function getData () {
    fetch(`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}`)
    .then((response) => response.json())
    .then(displayData)
}

function displayData (response) {
    //console.log(response);
    if(response.cod === "404"){
        const error = document.querySelector(".error");
        error.textContent = `Please enter a valid city`;
        search.value = '';
    }else {
        const city = document.querySelector(".city");
        city.innerText = `${response.name}, ${response.sys.country}`;

        const today = new Date();
        const date = document.querySelector(".date");
        date.innerText = dateFunction(today);

        const temp = document.querySelector(".temp");
        temp.innerHTML = `Temp: ${Math.round(response.main.temp)} <span>°C</span>`;

        const weather = document.querySelector(".weather");
        weather.innerText = `Weather: ${response.weather[0].main}`;

        const tempRange = document.querySelector(".temp-range");
        tempRange.innerText = `Temp Range: ${Math.round(response.main.temp_min)}°C / ${Math.round(response.main.temp_max)}°C`;

        const weatherIcon = document.querySelector('.weather-icon');
        const iconUrl = 'http://openweathermap.org/img/w/';
        weatherIcon.src = `${iconUrl}${response.weather[0].icon}.png`;

        search.value = "";
    }
}

function dateFunction (d) {
    let months = ["January","February","March","April","May","June","July","August","September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
}