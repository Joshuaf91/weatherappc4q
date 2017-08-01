const WEATHER_URL = "http://api.aerisapi.com/forecasts/11101?client_id=gclU34HU5zApT0DTl87nF&client_secret=UIAbbTayB0fOkjcJnvWPhW0bVdlYqg0XIm59a988"
let main = document.getElementById('root');

const showInverse = (e, buttonElement, ULElement, response) => {
  let { innerHTML } = e.target
  buttonElement.innerHTML = innerHTML === 'Show Celsius' ? 'Show Farenheit' : 'Show Celsius'
  loadUL(ULElement, response, innerHTML[5])
}

const loadUL = (ULElement, response, temptype) => {
  ULElement.innerHTML = '';
  response.forEach((ele) => {
    let li = document.createElement('li');
    let div = document.createElement('div');
    let img = document.createElement('img');
    let date = document.createElement('p');
    let high = document.createElement('p');
    let low = document.createElement('p'); 
    let { minTempF, maxTempF, minTempC, maxTempC, dateTimeISO, icon } = ele;
    date.innerHTML = dateTimeISO.split('T')[0];
    if(temptype === 'F'){
      high.innerHTML = maxTempF + '&#8457;';
      low.innerHTML = minTempF + '&#8457;';
    }else {
      high.innerHTML = maxTempC + '&#8451;';
      low.innerHTML = minTempC + '&#8451;';
    }
    img.setAttribute('src', `./icons/${icon}`)
    li.appendChild(div)
    div.appendChild(date)
    div.appendChild(img)
    div.appendChild(high)
    div.appendChild(low)
    ULElement.appendChild(li)
  })
}

const loadUI = (response) => {
  main.innerHTML = '';
  let ul = document.createElement('ul');
  let button = document.createElement('button');
  button.innerHTML = 'Show Celsius';
  button.addEventListener('click' , (e) => showInverse(e, button, ul, response));
  main.appendChild(button);

  loadUL(ul, response, 'F');
  main.appendChild(ul)
}

let get_weather = $.ajax({
  url: WEATHER_URL,
  method: "GET"
})

get_weather.done((data)=>{
  loadUI(data.response[0].periods)
})

get_weather.fail((data)=>{
  console.log(data)
})



