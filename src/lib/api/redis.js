import Redis from 'ioredis';
import { redisEnv } from './env';

const { url, key } = redisEnv;

const redis = new Redis(url);

redis.setJobs = (jobs) => redis.set(key, JSON.stringify({ jobs, date: Date.now() }));

redis.getJobs = () => redis.get(key);

redis.delJobs = () => redis.del(key);

export default redis;
