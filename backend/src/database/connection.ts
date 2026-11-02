import mongoose from 'mongoose';
import { config } from '../config/env';

export async function connectDatabase(): Promise<void> {
  if (!config.mongoUri) {
    console.warn('[DB] MONGODB_URI not set. Database connection skipped.');
    return;
  }
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.mongoUri);
    console.log('[DB] Connected to MongoDB Atlas');
  } catch (err) {
    console.error('[DB] Connection failed:', err);
    throw err;
  }
}

export function getDbStatus(): string {
  const states: Record<number, string> = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  return states[mongoose.connection.readyState] ?? 'unknown';
}