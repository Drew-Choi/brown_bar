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
    user_id?: string;
  }

  interface UsePopupProps {
    show?: boolean;
    title: string;
    content: string | ReactNode;
    onConfirm?: (() => void) | null;
  }

  type ProductOptionType = {
    label: string;
    value: number;
    price: number;
    _id: string;
  };

  interface ProductInfoType {
    _id: string;
    pd_name: string;
    price: number;
    desc: string;
    img_url: string;
    category_idx: number;
    created_at?: date;
    updated_at?: date;
    option_arr: ProductOptionType[] | [];
    finding_section?: string[];
  }

  interface ProductNewListType extends Omit<ProductInfoType, 'created_at' | 'updated_at'> {
    category: string;
  }

  interface MenuCategoryType {
    label: string;
    category_idx: number;
  }

  interface MenuProductsType {
    category_idx: number;
    pd_datas: ProductInfoType[];
  }

  interface InfinityFetchingType {
    pageParams: number[] | [];
    pages: { data: { message: string; data: ProductNewListType[] } }[] | [];
  }

  // 영업시작 파트
  type MenuOptionType = {
    label?: string;
    price?: number;
    value?: number;
    _id?: string;
  };

  interface MenuType {
    _id: string;
    pd_name: string;
    price: number;
    ea: number;
    option: MenuOptionType | undefined;
  }

  interface OrderCardProps {
    order_idx: string;
    tb_idx: number;
    menu: MenuType[];
    complete: boolean;
    pay: boolean;
    created_at?: Date | string;
    updated_at?: Date | string;
  }

  type TableDataProps = {
    tb_idx: number;
    bar: boolean;
  };

  type FindingIntroType = {
    _id?: string;
    finding_idx: number;
    intro_text: string;
  };

  type SectionListType = {
    _id: string;
    title: string;
  };

  interface FindingSectionType {
    _id?: string;
    finding_idx: number;
    sub_category_idx: number;
    section_list: SectionListType[] | [];
  }

  interface SubProductListType {
    _id: string;
    pd_name: string;
    price: number;
    category_idx?: number;
    category?: string;
  }

  interface ErrorResponse {
    message?: string;
    status?: number;
  }
}

export {};
