import dotenv from 'dotenv';
dotenv.config();

function get(key: string, defaultValue?: string): string {
  return process.env[key] ?? defaultValue ?? '';
}

function getNumber(key: string, defaultValue: number): number {
  const val = process.env[key];
  return val ? parseInt(val, 10) : defaultValue;
}

export const config = {
  nodeEnv: get('NODE_ENV', 'development'),
  port: getNumber('PORT', 4000),
  mongoUri: get('MONGODB_URI', ''),
  jwt: {
    secret: get('JWT_SECRET', 'default-dev-secret-change-in-production'),
    expiresIn: get('JWT_EXPIRES_IN', '7d'),
  },
  admin: {
    email: get('ADMIN_EMAIL', ''),
    passwordHash: get('ADMIN_PASSWORD_HASH', ''),
  },
  frontendOrigin: get('FRONTEND_ORIGIN', 'http://localhost:4321'),
  amazon: {
    associateTag: get('AMAZON_ASSOCIATE_TAG', ''),
    accessKey: get('AMAZON_ACCESS_KEY', ''),
    secretKey: get('AMAZON_SECRET_KEY', ''),
    marketplace: get('AMAZON_MARKETPLACE', 'www.amazon.in'),
  },
  flipkart: {
    affiliateId: get('FLIPKART_AFFILIATE_ID', ''),
    token: get('FLIPKART_TOKEN', ''),
  },
  contact: {
    emailHost: get('CONTACT_EMAIL_HOST', ''),
    emailPort: getNumber('CONTACT_EMAIL_PORT', 587),
    emailUser: get('CONTACT_EMAIL_USER', ''),
    emailPass: get('CONTACT_EMAIL_PASS', ''),
    emailTo: get('CONTACT_EMAIL_TO', 'hello@savrivo.in'),
  },
  isDev: get('NODE_ENV', 'development') === 'development',
  isProd: get('NODE_ENV', 'development') === 'production',
};