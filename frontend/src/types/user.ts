export type TUser = {
  id: string,
  name: string,
  description?: string,
  avatar: string,
  online: boolean,
}

export type TRandomUserData = {
  results: {
    name: {
      first: string,
      last: string,
    },
    picture: {
      large: string,
    },
  }[],
}