export const MODEL_PURPOSE = {
  RESIDENCE: 'residence',
  ACCOMMODATION: 'accommodation',
  MULTIPURPOSE: 'multipurpose',
} as const;

export type MODEL_PURPOSE_TYPE =
  (typeof MODEL_PURPOSE)[keyof typeof MODEL_PURPOSE];
