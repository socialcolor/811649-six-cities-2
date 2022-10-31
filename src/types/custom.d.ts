declare namespace Express {
  export interface Request {
    user: {
      id: string,
      name: string,
      email: string,
      isPro: boolean,
      avatarUrl: string,
    }
  }
}
