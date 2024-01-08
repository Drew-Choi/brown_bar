import { Connection, ObjectId } from 'mongoose';
import { Session } from 'next-auth';
import { ReactNode } from 'react';

declare global {
  type FontSizeSx = string | { xs?: string; sm?: string; md?: string; lg?: string; xl?: string };

  type FontWeightCrimson = '400' | '600' | '700';

  declare module NodeJS {
    interface Global {
      mongoose: {
        conn: Connection | null;
        promise: Promise<typeof mongoose> | null;
      };
    }
  }

  interface SessionAdd extends Session {
    error?: string;
  }

  interface UsePopupProps {
    show?: boolean;
    title: string;
    content: string | ReactNode;
    onConfirm?: (() => void) | null;
  }

  interface ProductInfoType {
    _id: string;
    pd_name: string;
    price: number;
    desc: string;
    img_url: string;
    created_at?: date;
    updated_at?: date;
  }

  interface MenuCategoryType {
    label: string;
    category_idx: number;
  }

  interface MenuProductsType {
    category_idx: number;
    pd_datas: ProductInfoType[];
  }
}

export {};
