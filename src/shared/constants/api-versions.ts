export const API_VERSION = {
  ONE: 'v1',
} as const;

export type API_VERSION_TYPES = (typeof API_VERSION)[keyof typeof API_VERSION];

export const API_ENDPOINT = {
  UPLOAD: 'upload',
  ROOM: 'room',
  MEDIA: 'media',
  PORTFOLIO: 'portfolio',
  FAQ: 'faq',
  MODEL: 'model',
  USER: 'user',
  REPUTATION: 'reputation',
  RESERVATION: 'reservation',
} as const;
