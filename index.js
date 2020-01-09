console.log("live")

// form.addEventListener("click", e => console.log(e.target))
// const peopleDiv = document.getElementById("people")
// peopleDiv.addEventListener("click", e => {
//   console.log(e.target)
// })

// const filmsDiv = document.getElementById("films")
// filmsDiv.addEventListener("click", e => {
//   console.log(e.target)
// })

const content = {
  "#people": [],
  "#films": [],
  "#starships": [],
  "#vehicles": []
}

const loadData = () => {
  const peoplePromise = axios
    .get("http://star-cors.herokuapp.com/people")
    .then(response => response.data)
  const filmsPromise = axios
    .get("http://star-cors.herokuapp.com/films")
    .then(response => response.data)
  const starshipsPromise = axios
    .get("http://star-cors.herokuapp.com/starships")
    .then(response => response.data)
  const vehiclesPromise = axios
    .get("http://star-cors.herokuapp.com/vehicles")
    .then(response => response.data)

  Promise.all([
    peoplePromise, // 5 seconds
    filmsPromise, // 3 seconds
    starshipsPromise, // 1 second
    vehiclesPromise // 8 seconds
  ]).then(resultArr => {
    const [people, films, starships, vehicles] = resultArr
    // console.dir(resultArr)
    content["#people"] = people
    content["#films"] = films
    content["#starships"] = starships
    content["#vehicles"] = vehicles

    renderData(content["#people"], "#people")
    renderData(content["#films"], "#films")
    renderData(content["#starships"], "#starships")
    renderData(content["#vehicles"], "#vehicles")
  })
}
loadData()

const renderData = ({ results }, querySelector) => {
  const inputValue = document.getElementById("search").value
  if (inputValue) {
    results.filter(result => {
      //console.log(result)
      if (result.name === inputValue) {
        //  console.log(result)

        let keys = Object.keys(result)
        let values = Object.values(result)
        console.log(keys)
        console.log(values)
        const container = document.querySelector(querySelector)
        container.innerHTML = `
        <h2>People</h2>
        <form>
          <input type="text" id="search" />
        </form>

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
      </div>`
      }
    })
  } else {
    let names = results
      .map(val => {
        //console.log(val)
        let keys = Object.keys(val)
        let values = Object.values(val)
        //console.log(keys)
        // console.log(values)
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

  <ul>${names}</ul>`
    const container = document.querySelector(querySelector)
    //const peopleDiv = document.createElement(div)
    container.innerHTML += names
  }
}

const form = document.querySelector(".data")
form.addEventListener("keyup", loadData)
