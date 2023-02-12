import bcryptjs from "bcryptjs";

const { hash, compare } = bcryptjs;

export const encodePassword = async (password) => {
  return await hash(password, 10);
};

export const decodePassword = async (password, hash) => {
  return await compare(password, hash);
};
