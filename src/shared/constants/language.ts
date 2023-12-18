export const LANGUAGE = {
  KO: 'KO',
  EN: 'EN',
} as const;

export type LANGUAGE_TYPE = (typeof LANGUAGE)[keyof typeof LANGUAGE];
