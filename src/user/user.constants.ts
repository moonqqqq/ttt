// move this after creating user module
export const USER_TYPE = {
  // EMPLOYEE: 'employee',
  // COMPANY: 'company',
  ADMIN: 'admin',
} as const;

export type USER_TYPE_TYPES = (typeof USER_TYPE)[keyof typeof USER_TYPE];
