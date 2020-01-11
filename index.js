console.log("live")

//**possible option for accessing data out of the functions */
//function createState() {
//   const state = {}
//   return {
//     set: (val) => {
//       state[val] = val
// return state    }
//   }
// }

const state = {}
let peopleClickCount = 1
let filmsClickCount = 1
let starshipsClickCount = 1
let vehiclesClickCount = 1

const loadPeopleData = () => {
  axios.get("http://star-cors.herokuapp.com/people").then(response => {
    let data = response.data
    state.peopleData = data
    renderData(data, ".people-cards")
  })
}

const loadFilmsData = () => {
  axios.get("http://star-cors.herokuapp.com/films").then(response => {
    let data = response.data
    state.filmsData = data
    renderData(data, ".films-cards")
  })
}

const loadStarshipsData = () => {
  axios.get("http://star-cors.herokuapp.com/starships").then(response => {
    let data = response.data
    state.starshipsData = data
    renderData(data, ".starships-cards")
  })
}

const loadVehiclesData = () => {
  axios.get("http://star-cors.herokuapp.com/vehicles").then(response => {
    let data = response.data
    state.vehiclesData = data
    renderData(data, ".vehicles-cards")
  })
}

const renderData = (obj, querySelector) => {
  let results = obj.results
  const container = document.querySelector(querySelector)

  container.innerHTML = `
  <div>Showing ${results.length} of ${obj.count} entries</div>`
  let names = results
    .map(val => {
      let keys = Object.keys(val)
      let values = Object.values(val)

      return `
    <div class="card border-info mb-3"  style="width: 18rem;">
      <div class="card-header">${values[0]}

      </div>
        <div class="card-body">
        <ol><b>${keys[1]}</b>: ${values[1]}</ol>
        <ol><b>${keys[5]}</b>: ${values[5]}</ol>
        <ol><b>${keys[3]}</b>: ${values[3]}</ol>
        <ol><b>${keys[4]}</b>: ${values[4]}</ol>
          </p>

        </div>
    </div>
    `
    })
    .join("")
  names = `
  <div>${names}</div>`

  container.innerHTML += names
}

const searchData = (category, input) => {
  console.log(input)
  axios
    .get(`https://swapi.co/api/${category}/?search=${input}`)
    .then(response => {
      let data = response.data
      state.peopleData = data
      //debugger
      renderData(data, `.${category}-cards`)
      console.log(data)
    })
}

const loadMoreData = category => {
  console.log(category)
  if (category === "people") {
    peopleClickCount++
    console.log(peopleClickCount)
    axios
      .get(`https://swapi.co/api/${category}/?page=${peopleClickCount}`)
      .then(response => {
        let data = response.data
        state.peopleData = data
        //debugger
        renderData(data, `.${category}-cards`)
        console.log(data)
      })
      .catch(err => {
        alert(`No more ${category}`)
      })
  }

  if (category === "films") {
    filmsClickCount++
    console.log(filmsClickCount)
    axios
      .get(`https://swapi.co/api/${category}/?page=${filmsClickCount}`)
      .then(response => {
        let data = response.data
        state.peopleData = data
        //debugger
        renderData(data, `.${category}-cards`)
        console.log(data)
      })
      .catch(err => {
        alert(`No more ${category}`)
      })
  }

  if (category === "starships") {
    starshipsClickCount++
    console.log(starshipsClickCount)
    axios
      .get(`https://swapi.co/api/${category}/?page=${starshipsClickCount}`)
      .then(response => {
        let data = response.data
        state.peopleData = data
        //debugger
        renderData(data, `.${category}-cards`)
        console.log(data)
      })
      .catch(err => {
        alert(`No more ${category}`)
      })
  }
  if (category === "vehicles") {
    vehiclesClickCount++
    console.log(vehiclesClickCount)
    axios
      .get(`https://swapi.co/api/${category}/?page=${vehiclesClickCount}`)
      .then(response => {
        let data = response.data
        state.peopleData = data
        //debugger
        renderData(data, `.${category}-cards`)
        console.log(data)
      })
      .catch(err => {
        alert(`No more ${category}`)
      })
  }
}

loadPeopleData()
loadFilmsData()
loadStarshipsData()
loadVehiclesData()
