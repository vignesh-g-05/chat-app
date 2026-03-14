export type UserBase = {
  email: string;
  password: string;
};

export type UserRegister = UserBase & {
  username: string;
};

export type User = UserBase & {
  id: string;
  password: string;
};
