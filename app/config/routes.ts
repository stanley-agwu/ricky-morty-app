export const routes = {
  characters: '/characters',
  locations: '/locations',
  episodes: '/episodes',
} as const;

export const endPoints = {
  "characters": "https://rickandmortyapi.com/api/character",
  "locations": "https://rickandmortyapi.com/api/location",
  "episodes": "https://rickandmortyapi.com/api/episode"
} as const;

