console.log("live")
const content = {
  "#people": [],
  "#films": [],
  "#starships": [],
  "#vehicles": []
}

const loadData = async () => {
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
  const [people, films, starships, vehicles] = await Promise.all([
    peoplePromise,
    filmsPromise,
    starshipsPromise,
    vehiclesPromise
  ])
  content["#people"] = people
  content["#films"] = films
  content["#starships"] = starships
  content["#vehicles"] = vehicles

  renderData(content["#people"], "#people")
  renderData(content["#films"], "#films")
  renderData(content["#starships"], "#starships")
  renderData(content["#vehicles"], "#vehicles")
}

//loadData()
const renderData = ({ results }, querySelector) => {
  // console.log(content["people"].length)
  let names = results
    .map(val => {
      //console.log(val)
      let keys = Object.keys(val)
      let values = Object.values(val)
      //console.log(keys)
      console.log(values)
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

const filterData = () => {
  ;`<input type="text" id="find" onkeyup= "function">

  `
}
loadData()

//Add event listener for typing the name
//might add a button to hit search
//need to create function that uses loaddata as a callback
//--- in that function want to grab the input text in the inputbox and use that to load data where the input text matches
//addEventListener("keyup", loadData())
