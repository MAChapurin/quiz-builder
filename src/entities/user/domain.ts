export type UserEntity = {
  id: string;
  passwordHash: string;
  salt: string;
  email: string;
  name: string;
};

export type SessionEntity = {
  id: string;
  login: string;
  expiredAt: string;
};

export const userToSession = (
  user: UserEntity,
  expiredAt: string,
): SessionEntity => {
  return {
    id: user.id,
    login: user.email,
    expiredAt,
  };
};
