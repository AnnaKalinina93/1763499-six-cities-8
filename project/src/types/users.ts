export type AuthInfo = {
  avatarUrl: string,
  email: string,
  id: number,
  isPro: boolean,
  name: string,
  token: string,
};

export type AuthInfoServer = {
  ['avatar_url']?: string,
  email: string,
  id: number,
  ['is_pro']?: false,
  name: string,
  token: string,
};
