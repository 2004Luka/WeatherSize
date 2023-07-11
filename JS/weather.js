const TimeEl = document.getElementById("Time");
const DateEl= document.getElementById("Date");
const icon=document.getElementById("Icon");
const video=document.querySelector("Video");
const main=document.getElementById("Main");


const days = ['Sunday' , 'Monday', 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday'];
const months=['Jan','Fab','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const API_KEY='b9c46ebdf56641775c7fd332d87c3b7a';
const API_URL="https://api.openweathermap.org/data/2.5/weather?units=metric&q=georgia";

//will be called every 1 sec 
setInterval(()=> {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day=time.getDay();
    const hour=time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12:hour;
    const minuts = time.getMinutes();



    TimeEl.innerHTML = hoursIn12HrFormat + ":" + minuts;
    DateEl.innerHTML = days[day] + ","+date+" "+months[month]; 
},1000);


async function checkWeather(){
    const response = await fetch(API_URL+`&appid=${API_KEY}`);
    var data = await response.json();

    console.log(data);

    showWeatherData(data);
    
    if(data.weather[0].main=="Clear"){
        icon.src="../Pictures/day_clear.png";
        video.src="../Pictures/clear.mov";
    }
    else if(data.weather[0].main=="Clouds"){
        icon.src="../Pictures/cloudy.png";
        video.src="../Pictures/cloudy.mov";
    }else if(data.weather[0].main=="Rain"){
        icon.src="../Pictures/rain.png";
        video.src="../Pictures/rain.mp4";
    }else if(data.weather[0].main=="Dizzle"){
        icon.src="../Pictures/day_rain.png";
        video.src="../Pictures/dizzle.mp4";
    }else if(data.weather[0].main=="Mist"){
        icon.src="../Pictures/mist.png";
        video.src="../Pictures/mist.mp4";
    }
}
checkWeather();

function showWeatherData(data){
    document.getElementById("Day").innerHTML ="temp:" + Math.round(data.main.temp)+"°C";
    document.getElementById("Night").innerHTML ="fells-like:" + Math.round(data.main.feels_like)+"°C";
    document.getElementById("Humidity").innerHTML ="humidity:" + Math.round(data.main.humidity);
    document.getElementById("Preassure").innerHTML ="pressure:" + Math.round(data.main.pressure);
    main.innerHTML=data.weather[0].main;
}
