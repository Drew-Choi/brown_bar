import { Connection } from 'mongoose';
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
}

export {};
