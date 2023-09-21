export const CACHE_KEY = {
  OTP: 'otp',
} as const;

export type CACHE_KEY_TYPES = (typeof CACHE_KEY)[keyof typeof CACHE_KEY];

export const CACHE_TTL = {
  OTP: 60 * 3,
} as const;

export type CACHE_TTL_TYPE = (typeof CACHE_TTL)[keyof typeof CACHE_TTL];
