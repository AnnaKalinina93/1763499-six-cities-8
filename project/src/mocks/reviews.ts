import { Reviews } from '../types/reviews';
import { nanoid } from 'nanoid';


export const reviews: Reviews = [{
  comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  date: '2019-05-08T14:13:56.569Z',
  id: nanoid(),
  rating: 4,
  user: {
    avatarUrl: 'img/avatar-max.jpg',
    id: nanoid(),
    isPro: false,
    name: 'Max',
  },
},
{
  comment: 'Well appointed apartment in the center. There is a delicious cafe nearby.',
  date: '2019-05-10T18:12:56.569Z',
  id: nanoid(),
  rating: 5,
  user: {
    avatarUrl: 'img/avatar-angelina.jpg',
    id: nanoid(),
    isPro: false,
    name: 'Elizabet',
  },
}];
