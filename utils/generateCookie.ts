import { cookies } from 'next/headers';

type GenerateTokenProps = {
  name: string;
  value: string;
  maxAge: number;
};

const domainURL = process.env.COOKIE_DOMAIN;

export const generateCookie = async ({ name, value, maxAge }: GenerateTokenProps) => {
  cookies().set({
    name,
    value,
    maxAge,
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'lax',
    domain: domainURL,
  });
};
