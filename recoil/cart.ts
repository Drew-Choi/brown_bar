import { atom, selector } from 'recoil';

export const cartData = atom<MenuType[]>({
  key: 'cartData',
  default: [],
});

export const cartQuantity = selector<number>({
  key: 'cartQuantity',
  get: ({ get }) => {
    const data = get(cartData);

    return data.reduce((acc, cur) => acc + cur.ea, 0);
  },
});
