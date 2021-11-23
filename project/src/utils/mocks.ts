import { address, lorem, commerce, name, internet, image, datatype } from 'faker';
import { Offer, ServerOffer } from '../types/offers';
import { PostReview, Review, ReviewServer } from '../types/reviews';
import { AuthInfo, AuthInfoServer } from '../types/users';

const getRandomRaiting = () => (Math.floor(Math.random() * 5) + 1);

export const makeFakeOffer = (): Offer => ({
  bedrooms: datatype.number(),
  city: {
    location: {
      latitude: Number(address.latitude()),
      longitude: Number(address.longitude()),
      zoom: datatype.number(),
    },
    name: address.cityName(),
  },
  description: lorem.paragraph(),
  goods: new Array(3).fill(null).map(() => (commerce.product())),
  host: {
    avatarUrl: internet.avatar(),
    id: datatype.string(),
    isPro: datatype.boolean(),
    name: name.firstName(),
  },
  id: datatype.string(),
  images: new Array(3).fill(null).map(() => (image.image())),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: {
    latitude: Number(address.latitude()),
    longitude: Number(address.longitude()),
    zoom: datatype.number(),
  },
  maxAdults: datatype.number(),
  previewImage: image.image(),
  price: datatype.number(),
  rating: getRandomRaiting(),
  title: name.title(),
  type: name.title(),
});

export const makeFakeServerOffer = (): ServerOffer => ({
  bedrooms: datatype.number(),
  city: {
    location: {
      latitude: Number(address.latitude()),
      longitude: Number(address.longitude()),
      zoom: datatype.number(),
    },
    name: address.cityName(),
  },
  description: lorem.paragraph(),
  goods: new Array(3).fill(null).map(() => (commerce.product())),
  host: {
    'avatar_url': internet.avatar(),
    id: datatype.string(),
    'is_pro': datatype.boolean(),
    name: name.firstName(),
  },
  id: datatype.string(),
  images: new Array(3).fill(null).map(() => (image.image())),
  'is_favorite': datatype.boolean(),
  'is_premium': datatype.boolean(),
  location: {
    latitude: Number(address.latitude()),
    longitude: Number(address.longitude()),
    zoom: datatype.number(),
  },
  'max_adults': datatype.number(),
  'preview_image': image.image(),
  price: datatype.number(),
  rating: getRandomRaiting(),
  title: name.title(),
  type: name.title(),
});

export const makeFakeReview = (): Review => ({
  comment: lorem.paragraph(),
  date: String(datatype.datetime()),
  id: datatype.string(),
  rating: getRandomRaiting(),
  user: {
    avatarUrl: internet.avatar(),
    id: datatype.string(),
    isPro: datatype.boolean(),
    name: name.firstName(),
  },
});

export const makeFakeServerReview = (): ReviewServer => ({
  comment: lorem.paragraph(),
  date: String(datatype.datetime()),
  id: datatype.string(),
  rating: getRandomRaiting(),
  user: {
    'avatar_url': internet.avatar(),
    id: datatype.string(),
    'is_pro': datatype.boolean(),
    name: name.firstName(),
  },
});

export const makeFakeComment = (): PostReview => ({
  comment: lorem.paragraph(),
  rating: String(getRandomRaiting()),
});

export const makeFakeUser = (): AuthInfo => ({
  avatarUrl: internet.avatar(),
  email: internet.email(),
  id: datatype.number(),
  isPro: datatype.boolean(),
  name: name.firstName(),
  token: datatype.string(),
});


export const makeFakeServerUser = (): AuthInfoServer => ({
  'avatar_url': internet.avatar(),
  email: internet.email(),
  id: datatype.number(),
  'is_pro': datatype.boolean(),
  name: name.firstName(),
  token: datatype.string(),
});
