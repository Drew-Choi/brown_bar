import { createClient, RedisClientType } from 'redis';

// 글로벌 스코프에서 연결을 생성
let redisClient: RedisClientType | undefined;

const connectRedis = async () => {
  if (!redisClient) {
    // 환경 변수 타입 확인
    const redisUrl = process.env.REDIS_URL;
    if (!redisUrl) {
      throw new Error('REDIS_URL Error');
    }

    redisClient = createClient({
      url: redisUrl,
    });

    redisClient.on('error', (err: Error) => console.error('RedisClientError', err));

    try {
      await redisClient.connect();
    } catch (err) {
      console.error('Radis Failed to connect', err);
    }
  }
};

export const getRedisClient = async (): Promise<RedisClientType> => {
  if (!redisClient || !redisClient.isOpen) {
    await connectRedis();
  }
  if (!redisClient) {
    throw new Error('Redis client is not initialized');
  }
  return redisClient;
};
