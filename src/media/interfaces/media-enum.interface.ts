export const MEDIA = {
  NEWS: 'news',
  VIDEO: 'video',
} as const;

export type MEDIA_TYPES = (typeof MEDIA)[keyof typeof MEDIA];
