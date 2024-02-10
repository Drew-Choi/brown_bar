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

export const cartOrderData = selector<MenuCartFullType[]>({
  key: 'cartOrderData',
  get: ({ get }) => {
    const data = get(cartData);

    return data.map(({ option, ...rest }) => ({
      ...rest,
      option: option?.label
        ? {
            label: option?.label,
            price: option?.price,
          }
        : {},
    }));
  },
});
