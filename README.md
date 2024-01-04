# DJO Movie Vote

Een webapp voor het stemmen op films voor de DJO filmavond.

## Resultaten

Iedereen kan de resultaten bekijken door naar `/results.html` te gaan.

## Scripts

### Installatie

```bash
npm install
```

### Uitvoeren

```bash
npm start # runs on :8080
```

### Ontwikkelserver

```bash
npm run dev # runs on :8080
```

## Configuratie

### Films

In `html/movies.json` definiëer je op welke films je kan stemmen. Deze hebben het volgende formaat:

```json
[
  {
    "name": "...",
    "image": "...",
    "rating": 12 // optional
  },
  ...
]
```

### Gebruikers

In `html/users.json` definiëer je welke gebruikers kunnen stemmen. Deze heeft het volgende formaat:

```json
[
  "naam 1",
  "naam 2",
  ...
]
```
