import { Connection, ObjectId } from 'mongoose';
import { Session } from 'next-auth';

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

  interface ProductInfoType {
    _id: string;
    pd_name: string;
    price: number;
    desc: string;
    img_url: string;
    created_at?: date;
    updated_at?: date;
  }
}

export {};
