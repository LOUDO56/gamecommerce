import { prisma } from "@/prisma"
import { Platform } from "@prisma/client"

async function seedGames() {
    const games = [
    {
      title: 'Elden Ring',
      description: 'Un jeu de type action RPG développé par FromSoftware et édité par Bandai Namco.',
      price: 59.99,
      platforms: [Platform.PC, Platform.PS5, Platform.XBOX_SERIES_X_S],
      imageUrl: 'https://cdn.thegamesdb.net/images/original/boxart/front/72163-1.jpg',
      stock: 50
    },
    {
      title: 'God of War Ragnarök',
      description: 'La suite épique des aventures de Kratos et Atreus dans les royaumes nordiques.',
      price: 69.99,
      platforms: [Platform.PS4, Platform.PS5],
      imageUrl: 'https://cdn.thegamesdb.net/images/original/boxart/front/91197-1.jpg',
      stock: 35
    },
    {
      title: 'Cyberpunk 2077',
      description: 'Un RPG futuriste dans un monde ouvert dystopique de CD Projekt Red.',
      price: 39.99,
      platforms: [Platform.PC, Platform.PS5, Platform.XBOX_SERIES_X_S],
      imageUrl: 'https://cdn.thegamesdb.net/images/original/boxart/front/22722-1.jpg',
      stock: 25
    },
    {
      title: 'Mario Kart 8 Deluxe',
      description: 'Le jeu de course ultime avec les personnages de Nintendo.',
      price: 49.99,
      platforms: [Platform.NINTENDO_SWITCH],
      imageUrl: 'https://cdn.thegamesdb.net/images/original/boxart/front/111503-1.jpg',
      stock: 40
    },
    {
      title: 'Halo Infinite',
      description: 'Le dernier épisode de la légendaire série de FPS de Microsoft.',
      price: 49.99,
      platforms: [Platform.PC, Platform.XBOX_ONE, Platform.XBOX_SERIES_X_S],
      imageUrl: 'https://cdn.thegamesdb.net/images/original/boxart/front/121175-1.jpg',
      stock: 30
    },
    {
      title: 'Ghost of Tsushima',
      description: 'Un jeu d\'action-aventure se déroulant dans le Japon féodal.',
      price: 49.99,
      platforms: [Platform.PS4, Platform.PS5],
      imageUrl: 'https://cdn.thegamesdb.net/images/original/boxart/front/98321-1.jpg',
      stock: 20
    },
    {
      title: 'FIFA 23',
      description: 'Le jeu de football annuel avec les dernières équipes et joueurs.',
      price: 59.99,
      platforms: [Platform.PC, Platform.PS4, Platform.PS5, Platform.XBOX_ONE, Platform.XBOX_SERIES_X_S, Platform.NINTENDO_SWITCH],
      imageUrl: 'https://cdn.thegamesdb.net/images/original/boxart/front/104901-1.jpg',
      stock: 45
    },
    {
      title: 'Horizon Forbidden West',
      description: 'La suite du jeu d\'action-RPG avec Aloy dans un monde post-apocalyptique.',
      price: 69.99,
      platforms: [Platform.PS4, Platform.PS5],
      imageUrl: 'https://cdn.thegamesdb.net/images/original/boxart/front/97990-1.jpg',
      stock: 28
    },
    {
      title: 'Forza Horizon 5',
      description: 'Un jeu de course en monde ouvert se déroulant au Mexique.',
      price: 59.99,
      platforms: [Platform.PC, Platform.XBOX_ONE, Platform.XBOX_SERIES_X_S],
      imageUrl: 'https://cdn.thegamesdb.net/images/original/boxart/front/87604-1.jpg',
      stock: 35
    },
    {
      title: 'Animal Crossing: New Horizons',
      description: 'Un jeu de simulation de vie décontracté sur une île paradisiaque.',
      price: 49.99,
      platforms: [Platform.NINTENDO_SWITCH],
      imageUrl: 'https://cdn.thegamesdb.net/images/original/boxart/front/61029-1.jpg',
      stock: 42
    }
  ]
  
  for (const game of games) {
    await prisma.game.create({
      data: game
    })
  }
}
seedGames();