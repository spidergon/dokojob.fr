import Redis from 'ioredis';
import { redisEnv } from './env';

const redis = new Redis(redisEnv.url);

redis.setJobs = (jobs) => redis.set(redisEnv.key, JSON.stringify({ jobs, date: Date.now() }));

redis.getJobs = () => redis.get(redisEnv.key);

redis.delJobs = () => redis.del(redisEnv.key);

export default redis;
