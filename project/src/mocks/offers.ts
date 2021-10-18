import { Offers } from '../types/offers';
import { nanoid } from 'nanoid';

export const offers: Offers = [
  {
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
    host: {
      avatarUrl: 'img/avatar-angelina.jpg',
      id: nanoid(),
      isPro: true,
      name: 'Angelina',
    },
    id: nanoid(),
    images: ['img/apartment-01.jpg', 'img/apartment-02.jpg','img/apartment-03.jpg'],
    isFavorite: true,
    isPremium: false,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8,
    },
    maxAdults: 4,
    previewImage: 'img/amsterdam.jpg',
    price: 120,
    rating: 4.4,
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
  },
  {
    bedrooms: 2,
    city: {
      location: {
        latitude: 52.373246,
        longitude: 4.896238,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
    description: 'City center, with a quiet street.',
    goods: ['Heating', 'Kitchen', 'Washing machine', 'Dishwasher'],
    host: {
      avatarUrl: 'img/avatar-max.jpg',
      id: nanoid(),
      isPro: true,
      name: 'Max',
    },
    id: nanoid(),
    images: ['img/apartment-small-03.jpg', 'img/apartment-small-04.jpg'],
    isFavorite: false,
    isPremium: true,
    location: {
      latitude: 52.37324655346574,
      longitude:4.89623824325345,
      zoom: 8,
    },
    maxAdults: 3,
    previewImage: 'img/amsterdam@2x.jpg',
    price: 105,
    rating: 4.9,
    title: 'Beautiful & luxurious apartment in city center',
    type: 'apartment',
  },
  {
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
    host: {
      avatarUrl: 'img/avatar-angelina.jpg',
      id: nanoid(),
      isPro: false,
      name: 'Angelina',
    },
    id: nanoid(),
    images: ['img/apartment-01.jpg', 'img/apartment-02.jpg','img/apartment-03.jpg'],
    isFavorite: false,
    isPremium: false,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8,
    },
    maxAdults: 4,
    previewImage: 'img/amsterdam.jpg',
    price: 120,
    rating: 3.1,
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
  },
  {
    bedrooms: 1,
    city: {
      location: {
        latitude: 52.832159,
        longitude: 4.765423,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
    description: 'River shore.',
    goods: ['Heating','Dishwasher','Cable TV'],
    host: {
      avatarUrl: 'img/avatar-max.jpg',
      id: nanoid(),
      isPro: true,
      name: 'Sergey',
    },
    id: nanoid(),
    images: ['img/apartment-small-03.jpg'],
    isFavorite: true,
    isPremium: true,
    location: {
      latitude: 52.8321591121133,
      longitude:4.7654264558245,
      zoom: 8,
    },
    maxAdults: 2,
    previewImage: 'img/studio-01.jpg',
    price: 130,
    rating: 5,
    title: 'Beautiful hotel in river shore',
    type: 'hotel',
  },
  {
    bedrooms: 2,
    city: {
      location: {
        latitude: 51.832159,
        longitude: 4.648423,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
    description: 'Dream house.',
    goods: ['Heating','Dishwasher','Cable TV'],
    host: {
      avatarUrl: 'img/avatar-angelina.jpg',
      id: nanoid(),
      isPro: false,
      name: 'Margo',
    },
    id: nanoid(),
    images: ['img/amsterdam.jpg'],
    isFavorite: true,
    isPremium: false,
    location: {
      latitude: 51.8321595346574,
      longitude:4.6484234325345,
      zoom: 8,
    },
    maxAdults: 5,
    previewImage: 'img/room.jpg',
    price: 125,
    rating: 4.5,
    title: 'Dream house in river shore',
    type: 'house',
  }];
