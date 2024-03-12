import JWT from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

export const generateSignJWT = ({
  value,
  expiresIn,
}: {
  value: object | Buffer;
  expiresIn?: string | number | undefined;
}) => {
  const Jwt = JWT.sign(value, JWT_SECRET as string, {
    expiresIn,
  });

  return Jwt;
};
