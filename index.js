import express from 'express'
import { JSONFilePreset } from 'lowdb/node'

import { MAX_VOTES } from './html/js/config.js'
import MOVIES from './html/movies.json' assert { type: 'json' }
import USERS from './html/users.json' assert { type: 'json' }

const defaultData = { votes: {} }
const db = await JSONFilePreset('./data/votes.json', defaultData)

const app = express()
app.use(express.json())

app.post('/vote', async (req, res) => {
  const { name, movies } = req.body

  if (!USERS.includes(name)) {
    res.status(401).send('Je bent niet geautoriseerd om te stemmen.')
    return
  }

  if (db.data.votes.hasOwnProperty(name)) {
    res.status(401).send('Je hebt al een keer gestemd!')
    return
  }

  if (!Array.isArray(movies) || movies.length === 0 || movies.length > MAX_VOTES) {
    res.status(400).send(`Je moet minimaal 1 en maximaal ${MAX_VOTES} films kiezen.`)
    return
  }

  if (movies.some((other) => !MOVIES.some((movie) => movie.name === other))) {
    res.status(400).send('Je kan niet op onbekende films stemmen.')
    return
  }

  await db.update(({ votes }) => {
    votes[name] = movies
  })

  res.send('Je hebt succesvol gestemd!')
})

app.get('/votes', (req, res) => {
  const counts = {}

  for (const movies of Object.values(db.data.votes)) {
    for (const name of movies) {
      counts[name] = (counts[name] ?? 0) + 1
    }
  }

  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1])
  const results = []

  for (const [name, votes] of entries) {
    const movie = MOVIES.find((movie) => movie.name === name)
    if (movie) results.push({ ...movie, votes })
  }

  res.json(results)
})

app.use(express.static('html'))

app.listen(8080, () => console.log('App started.'))
