export const MEDIA = {
  NEWS: 'news',
  VIDEO: 'video',
} as const;

export const MEDIA_QUERY = {
  NEWS: 'news',
  VIDEO: 'video',
  ALL: 'all',
} as const;

export type MEDIA_TYPES = (typeof MEDIA)[keyof typeof MEDIA];
export type MEDIA_QUERY_TYPES = (typeof MEDIA_QUERY)[keyof typeof MEDIA_QUERY];
