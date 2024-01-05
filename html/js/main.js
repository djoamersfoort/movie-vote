import { getMovies, getNames, postVote } from './api.js'
import { NAME_KEY, AGE_KEY, VOTED_KEY, MAX_VOTES } from './config.js'

// name fetching
let name = localStorage.getItem(NAME_KEY)
let age = localStorage.getItem(AGE_KEY)
let hasVoted = localStorage.getItem(VOTED_KEY)

const updateName = () => {
  if (name === null) return

  const firstName = name.split(' ')[0]
  document.querySelector('#userName').textContent = firstName
}

const updateAge = () => {
  if (age === null) return

  Array.from(document.querySelectorAll('.movie')).forEach((movie) => {
    if (parseInt(movie.dataset.rating) > parseInt(age)) {
      movie.classList.add('movie-underage')
    }
  })
}

if (!(name && age) && !hasVoted) {
  const nameModal = new bootstrap.Modal('#nameModal', {
    backdrop: 'static',
    keyboard: false
  })

  getNames().then((names) => {
    const nameSelect = document.querySelector('#nameSelect')

    names.forEach((name) => {
      const option = document.createElement('option')
      option.textContent = name
      nameSelect.appendChild(option)
    })

    nameModal.show()
  })

  document.querySelector('#nameForm').onsubmit = (event) => {
    event.preventDefault()

    name = document.querySelector('#nameSelect').value
    age = document.querySelector('#ageInput').value

    localStorage.setItem(NAME_KEY, name)
    localStorage.setItem(AGE_KEY, age)

    nameModal.hide()
    updateName()
    updateAge()
  }
}

updateName()

// success message modal
const showSuccessMessage = () => {
  new bootstrap.Modal('#successModal', {
    backdrop: 'static',
    keyboard: false
  }).show()
}

if (hasVoted) showSuccessMessage()

// poster click handler
const votes = new Set()

const updateVoteCount = () => {
  document.querySelector('#voteCount').textContent = `${votes.size} / ${MAX_VOTES}`
  // document.querySelector('#voteButton').toggleAttribute('disabled', !votes.size)
}

const onPosterClick = function () {
  const { movie } = this.dataset
  const adding = !votes.has(movie)

  if (adding && votes.size >= MAX_VOTES) return

  this.classList.toggle('movie-voted', adding)

  if (adding) {
    votes.add(movie)
  } else {
    votes.delete(movie)
  }

  updateVoteCount()
}

updateVoteCount()

// building up movie list
getMovies().then((movies) => {
  const movieList = document.querySelector('#movieList')

  movies.forEach((movie) => {
    const image = document.createElement('img')
    image.className = 'card-img-top movie-poster'
    image.draggable = false
    image.src = movie.image
    image.alt = movie.name

    const cardText = document.createElement('div')
    cardText.className = 'card-text text-center text-truncate'
    cardText.textContent = movie.name

    const cardBody = document.createElement('div')
    cardBody.className = 'card-body px-2 py-1'

    cardBody.append(cardText)

    const card = document.createElement('div')
    card.className = 'card movie'
    card.onclick = onPosterClick
    card.title = movie.name
    card.dataset.movie = movie.name
    card.dataset.rating = movie.rating

    new bootstrap.Tooltip(card)
    card.append(image, cardBody)

    if (movie.rating) {
      const rating = document.createElement('div')
      rating.className = 'movie-rating badge fs-6 shadow-lg'
      rating.textContent = movie.rating + '+'

      if (movie.rating >= 16) {
        rating.classList.add('text-bg-danger')
      } else if (movie.rating >= 12) {
        rating.classList.add('text-bg-warning')
      } else {
        rating.classList.add('text-bg-light')
      }

      card.append(rating)
    }

    const column = document.createElement('div')
    column.className = 'col'

    column.append(card)
    movieList.append(column)
  })

  updateAge()
})

// submitting handler
let errorModal

document.querySelector('#voteButton').onclick = async () => {
  if (!name || hasVoted) return

  const res = await postVote(name, Array.from(votes))

  if (res.ok) {
    hasVoted = true
    localStorage.setItem(VOTED_KEY, hasVoted)

    showSuccessMessage()
    return
  }

  if (!errorModal) errorModal = new bootstrap.Modal('#errorModal')
  const message = await res.text()

  document.querySelector('#errorMessage').textContent = message
  errorModal.show()
}
