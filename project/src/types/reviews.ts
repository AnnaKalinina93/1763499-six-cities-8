export type Review = {
  comment: string,
  date: string,
  id: string,
  rating: number,
  user: {
    avatarUrl: string,
    id: string,
    isPro: boolean,
    name: string,
}};
export type Reviews = Review[];

export type ReviewServer = {
  comment: string,
  date: string,
  id: string,
  rating: number,
  user: {
    ['avatar_url']?: string,
    id?: string,
    ['is_pro']?: boolean,
    name?: string,
}};

export type ReviewsServer = ReviewServer[];

export type PostReview = {
  comment: string,
  rating: string,
};
