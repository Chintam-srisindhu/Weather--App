// WEATHER APP

const weatherForm=document.querySelector(".weatherForm");  // because we use classes as id
const cityInput=document.querySelector(".cityInput");
const card=document.querySelector(".card");
const apikey="5c354f453fa5b15c4a3c5a5540214b88";

weatherForm.addEventListener("submit", async event =>{
    event.preventDefault();   // we dont want to refresh the page
    const city=cityInput.value;
    if(city){
        try{
            const weatherData=await getWeatherdata(city);
            displayweatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }

    }
    else{
        displayError("Please enter a city");
    }


});
async function getWeatherdata(city){
    const apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    
    const response =await fetch(apiUrl);
  if(!response.ok){
    throw new Error("could not fetch weather data");
  }
  return await response.json();
}
function displayweatherInfo(data){
   const {name:city,
          main:{temp,humidity},
          weather:{descrption,id}} =data;

    card.textContent="";
    card.style.display="flex";
    const cityDisplay= document.createElement("h1");
    const tempDisplay= document.createElement("p");
    const humidityDisplay= document.createElement("p");
    const descDisplay= document.createElement("p");
    const weatheremoji= document.createElement("p");
    cityDisplay.textContent=city;
    tempDisplay.textContent=`${(temp -273.15).toFixed(1)}°C`;
    humidityDisplay.textContent=`Humidity:${humidity}%`;
    descDisplay.textContent=description;
    weatheremoji.textContent=getweatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatheremoji.classList.add("weatheremoji");


    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatheremoji);


}
function getweatherEmoji(weatherId){
    switch(true){
        case (weatherId>=200 && weatherId<300):
            return "☁️";
        case (weatherId>=300 && weatherId<400):
            return "☁️";
        case (weatherId>=400 && weatherId<600):
            return "☁️";
        case (weatherId>=600 && weatherId<700):
            return "❄️";
        case (weatherId>=700 && weatherId<800):
            return "🌫️";
        case (weatherId===800):
            return "☀️";
        case (weatherId>=801 && weatherId<810):
            return "☁️";
        default:
            return "❓";
            
    }

}
function displayError(message){
    const errorDisplay=document.createElement("p");
    errorDisplay.textContent=message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent=" ";
    card.style.display="flex";
    card.append(errorDisplay);

}





