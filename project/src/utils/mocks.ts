import { address, lorem, commerce, name, internet, image, datatype } from 'faker';
import { AuthorizationStatus, citiesList, sortType } from '../const';
import { Offer, ServerOffer } from '../types/offers';
import { PostReview, Review, ReviewServer } from '../types/reviews';
import { State } from '../types/state';
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
    name: 'Paris',
  },
  description: lorem.paragraph(),
  goods: new Array(3).fill(null).map(() => (commerce.product())),
  host: {
    avatarUrl: internet.avatar(),
    id: String(datatype.number()),
    isPro: datatype.boolean(),
    name: name.firstName(),
  },
  id: String(datatype.number()),
  images: new Array(2).fill(null).map(() => (image.image())),
  isFavorite: true,
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
    name: 'Paris',
  },
  description: lorem.paragraph(),
  goods: new Array(3).fill(null).map(() => (commerce.product())),
  host: {
    'avatar_url': internet.avatar(),
    id: String(datatype.number()),
    'is_pro': datatype.boolean(),
    name: name.firstName(),
  },
  id: String(datatype.number()),
  images: new Array(3).fill(null).map(() => (image.image())),
  'is_favorite': true,
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
  id: String(datatype.number()),
  rating: getRandomRaiting(),
  user: {
    avatarUrl: internet.avatar(),
    id: String(datatype.number()),
    isPro: datatype.boolean(),
    name: name.firstName(),
  },
});

export const makeFakeServerReview = (): ReviewServer => ({
  comment: lorem.paragraph(),
  date: String(datatype.datetime()),
  id: String(datatype.number()),
  rating: getRandomRaiting(),
  user: {
    'avatar_url': internet.avatar(),
    id: String(datatype.number()),
    'is_pro': datatype.boolean(),
    name: name.firstName(),
  },
});

export const makeFakeComment = (): PostReview => ({
  comment: lorem.paragraph(10),
  rating: String(getRandomRaiting()),
});

export const makeFakeErrorComment = (): PostReview => ({
  comment: lorem.paragraph(1),
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


export const makeFakeStoreWithAuthorization = (): State => ({
  UI_STATE: {
    activeCity: citiesList.Paris,
    activeSortType: sortType.popular,
  },
  OFFERS: {
    offers: new Array(3).fill(null).map(()=>(makeFakeOffer())),
    offersLoading: false,
    offersError: false,
    offer: makeFakeOffer(),
    offerLoading: false,
    offerError: false,
    nearbyOffers: new Array(3).fill(null).map(()=>(makeFakeOffer())),
    nearbyOffersLoading: false,
    nearbyOffersError: false,
  },
  COMMENTS: {
    reviews: new Array(3).fill(null).map(()=>(makeFakeReview())),
    reviewsLoading: false,
    reviewsError: false,
    isPostReview: false,
  },
  USER: {
    authorizationStatus: AuthorizationStatus.Auth,
    loginLoading: false,
    user: makeFakeUser(),
  },
  FAVORITES: {
    favoritesOffers: new Array(2).fill(null).map(()=>(makeFakeOffer())),
    favoritesOffersLoading: false,
    favoritesOffersError: false,
    favoritesOffer: null,
  },
});

export const makeFakeStoreWithoutAuthorization = (): State => ({
  UI_STATE: {
    activeCity: citiesList.Paris,
    activeSortType: sortType.popular,
  },
  OFFERS: {
    offers: new Array(6).fill(null).map(()=>(makeFakeOffer())),
    offersLoading: false,
    offersError: false,
    offer: makeFakeOffer(),
    offerLoading: false,
    offerError: false,
    nearbyOffers: new Array(3).fill(null).map(()=>(makeFakeOffer())),
    nearbyOffersLoading: false,
    nearbyOffersError: false,
  },
  COMMENTS: {
    reviews: new Array(3).fill(null).map(()=>(makeFakeReview())),
    reviewsLoading: false,
    reviewsError: false,
    isPostReview: false,
  },
  USER: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    loginLoading: false,
    user: null,
  },
  FAVORITES: {
    favoritesOffers: [],
    favoritesOffersLoading: false,
    favoritesOffersError: false,
    favoritesOffer: null,
  },
});

