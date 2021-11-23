import { CitiesList, sortType } from '../const';
import { Offers } from '../types/offers';

function getRandomCity ( obj: CitiesList ): string  {
  const keys = Object.keys(obj);
  return keys[Math.floor(Math.random()*keys.length)];
}

function getSortSelectedOffers (activeSortType: string, offers: Offers): Offers {
  switch (activeSortType) {
    case sortType.priceHighToLow:
      return offers.sort((a, b) => b.price - a.price);
    case sortType.priceLowToHigh:
      return offers.sort((a, b) => a.price - b.price);
    case sortType.topRated:
      return offers.sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
}

export { getRandomCity, getSortSelectedOffers };
