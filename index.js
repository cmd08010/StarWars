// const people = document.querySelector("#people")
// const films = document.querySelector("#films")
// const starships = document.querySelector("#startships")
// const vehicles = document.querySelector("#vehicles")

// async function getStarWarsData() {
//   const peopleDataPromise = axios
//     .get(`http://star-cors.herokuapp.com/people`)
//     .then(response => response.data)

//   console.log(peopleDataPromise)
//   const filmsData = axios
//     .get(`http://star-cors.herokuapp.com/films`)
//     .then(response => response.data)

//   const starshipsData = axios
//     .get(`http://star-cors.herokuapp.com/starships`)
//     .then(response => response.data)

//   const vehiclesData = axios
//     .get(`http://star-cors.herokuapp.com/vehicles`)
//     .then(response => response.data)

//   await Promise.all(peopleDataPromise, filmsData, starshipsData, vehiclesData)

//   console.log("test")

//   //Promise.all()

//   // people.innerHTML += `<p><li>${peopleDataPromise}</li></p>`
// }

// getStarWarsData()

console.log("live")
const content = {
  "#people": [],
  "#films": [],
  "#starships": [],
  "#vehicles": []
}
//console.log(content, "test")
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
  //console.log(content)
  renderPeople(content["#people"])
}
loadData()
const renderPeople = ({ results }) => {
  let names = results
  console
    .log(results)
    .map(val => {
      // console.log(val)
      return `
    <li>${val.name}</li>
    `
    })
    .join("")
  names = `
  <h4>People</h4>
  <ul>${names}</ul>`
  const container = document.querySelector("#people")
  //const peopleDiv = document.createElement(div)
  container.innerHTML = names
}
