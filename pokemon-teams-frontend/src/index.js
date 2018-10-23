const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () => {
  renderAllTrainerCards()

})

function renderAllTrainerCards() {
  // fetch(`${TRAINERS_URL}`)
  fetch("http://localhost:3000/trainers")
  .then(response => response.json())
  .then(trainerData => trainerData.forEach((trainer) => {
    renderTrainerCard(trainer)
    renderTrainerPokemon(trainer)
  }))
}
const main = document.getElementById('main')
let dataId = 0
let dataTrainerId = 0
// let dataPokemonId = 0

function renderTrainerCard(trainer) {
  const card = document.createElement('div')
  card.className = 'card'
  card.setAttribute('data-id',`${++dataId}` )
  const para = document.createElement('p')
  para.innerText = trainer.name
  const button = document.createElement('button')
  button.setAttribute('data-trainer-id', `${trainer.id}`)
  button.innerText = "Add Pokemon"
  const ul = document.createElement('ul')
  ul.id = 'pokemon-list'

  main.appendChild(card)
  card.appendChild(para)
  card.appendChild(button)
  card.appendChild(ul)

}

function renderTrainerPokemon(trainer) {
  // debugger
  trainer.pokemons.forEach((pokemon) => {
    // debugger
    const li = document.createElement('li')
    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    const releaseButton = document.createElement('button')
    releaseButton.innerText = "Release"
    releaseButton.className = "release"
    releaseButton.setAttribute('data-pokemon-id', `${pokemon.id}`)
    li.appendChild(releaseButton)
    const correctRow = document.querySelector(`[data-id = "${trainer.id}"]`)
    correctRow.children[2].appendChild(li)
  })
}

main.addEventListener('click', (event) => {
  event.preventDefault()
  if(event.target && event.target.getAttribute('data-trainer-id')) {
    fetch("http://localhost:3000/pokemons", {
      'method': "POST",
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      'body': JSON.stringify({
        'trainer_id': event.target.getAttribute('data-trainer-id')
      })
    })
    .then((response) => response.json())
    .then((pokemon) => renderTrainerPokemon(pokemon))
  }
})

main.addEventListener('click', (event) => {
  // debugger
  if(event.target && event.target.className === "release") {
    debugger
    const desiredPokemonId = event.target.getAttribute('data-pokemon-id')
    fetch(`http://localhost:3000/pokemons/${desiredPokemonId}`, {
      'method': "DELETE"
    })
    .then((response) => response.json())
    .then((json) => {
      main.innerHTMLhtml = ""
      renderAllTrainerCards()
    })
    // console.log("hi")
  }
})
