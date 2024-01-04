export const getNames = async () => {
  const request = await fetch('users.json')
  const names = await request.json()
  // sort alphabetically
  return names.sort()
}

export const getMovies = async () => {
  const request = await fetch('movies.json')
  const movies = await request.json()
  // sort alphabetically
  return movies.sort((a, b) => {
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  })
}

export const getVotes = async () => {
  const request = await fetch('votes')
  return request.json()
}

export const postVote = async (name, movies) => {
  const payload = { name, movies }
  return fetch('vote', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
