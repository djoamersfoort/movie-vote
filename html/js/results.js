import { getVotes } from './api.js'

getVotes().then((movies) => {
  const movieList = document.querySelector('#movieList')

  movies.forEach((movie, index) => {
    const image = document.createElement('img')
    image.className = 'card-img-top movie-poster'
    image.draggable = false
    image.src = movie.image
    image.alt = movie.name

    const cardText = document.createElement('div')
    cardText.className = 'card-text text-truncate fw-bold'
    cardText.textContent = movie.name

    const cardStats = document.createElement('div')
    cardStats.className = 'card-text'
    cardStats.textContent = `${movie.votes} stemmen`

    const cardBody = document.createElement('div')
    cardBody.className = 'card-body text-center px-2 py-1'

    cardBody.append(cardText, cardStats)

    const card = document.createElement('div')
    card.className = 'card movie'
    card.title = movie.name

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
})
