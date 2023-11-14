export const FILE_ENUM = {
  IMAGE: 'image',
} as const;

export type FILE_ENUM_TYPE = (typeof FILE_ENUM)[keyof typeof FILE_ENUM];
