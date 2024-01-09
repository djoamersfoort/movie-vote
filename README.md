# DJO Movie Vote

Een webapp voor het stemmen op films voor de DJO Filmavond.

## Resultaten

Iedereen kan de resultaten bekijken door naar [`html/results.html`](html/results.html) te gaan.

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

In `html/movies.json` definieer je op welke films je kan stemmen. Deze heeft het volgende formaat:

```jsonc
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

In `html/users.json` definieer je welke gebruikers kunnen stemmen. Deze heeft het volgende formaat:

```jsonc
[
  "naam 1",
  "naam 2",
  ...
]
```

> Let erop dat deze twee bestanden in `.gitignore` staan en dat je ze dus zelf moet creëren als je deze repository clonet! 
