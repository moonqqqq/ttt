export const LANGUAGE = {
  KO: 'ko',
  EN: 'en',
} as const;

export type LANGUAGE_TYPE = (typeof LANGUAGE)[keyof typeof LANGUAGE];
