export const PORTFOLIO_SIZE_QUERY = {
  ALL: 'all',
  TO_TEN: 'toTen',
  ELEVEN_TO_TWENTY: 'elevenToTwenty',
  TWENTY_TO_THIRTY: 'twentyToThirty',
  MORE_THAN_THIRTY: 'moreThanThirty',
} as const;

export type PORTFOLIO_SIZE_QUERY_TYPE =
  (typeof PORTFOLIO_SIZE_QUERY)[keyof typeof PORTFOLIO_SIZE_QUERY];
