import { faker } from "@faker-js/faker";

export const createRandomMovie = () => {
  const res = `${faker.word.adjective()} ${faker.word.noun()}`;
  console.log(res);
  return res;
};

export const createRandomSong = () => {
  return `${faker.music.songName()}`;
};
