const body = document.body

fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature')
.then(res => res.json())
.then(data => {
    console.log(data)
    body.style.backgroundImage = `url(${data.urls.full})`
    document.getElementById('author').textContent = ` Picture by ${data.user.name}`
})
.catch(err => {
    body.style.backgroundImage = `url(https://images.unsplash.com/photo-1458501534264-7d326fa0ca04?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTQ4MTIxNzZ8&ixlib=rb-4.0.3&q=85)`
})

fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
.then(res => {
    if (!res.ok) {
        throw Error("something went wrong")
    }
    return res.json()
})
.then(data => {
    document.getElementById('Crypto').innerHTML = `<img src=${data.image.small}>
                                                    <span>${data.name}</span>`
    document.getElementById('Crypto').innerHTML += `
    <p> 🎯: $${data.market_data.current_price.usd}</p>
    <p> ☝️: $${data.market_data.high_24h.usd}</p>
    <p> 👇: $${data.market_data.low_24h.usd}</p>
    `
})
.catch(err => console.error(err))

function updateTime() {
    let time = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
    document.querySelector('.time').textContent = time 
}
updateTime();
setInterval(updateTime, 1000);

navigator.geolocation.getCurrentPosition(position => {
  console.log(position)
  fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
  .then(res => {
      if (!res.ok) {
          throw error("weather data not available!")
      }
      return res.json()
  })
  .then(data => {
      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      document.getElementById('weather').innerHTML = `
                                        <img src=${iconUrl} />
                                        <p class="weather-temp">${Math.round(data.main.temp)}</p>
                                        <p class="weather-city">${data.name}</p>`
    })
  .catch(err => console.error(err))
})

fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data)
    document.getElementById('quote').textContent = `"${data[Math.floor(Math.random() * 16)].text}"`
});