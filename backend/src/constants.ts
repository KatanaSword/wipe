export const DB_NAME: string = "wipe";

export const userRoleEnum: { USER: string; ADMIN: string } = {
  USER: "USER",
  ADMIN: "ADMIN",
};

export const availableUserRole: string[] = Object.values(userRoleEnum);

export const options: { httpOnly: boolean; secret: boolean } = {
  httpOnly: true,
  secret: true,
};

export const USER_TEMPORARY_TOKEN_EXPIRY: number = 5 * 60 * 1000; // 5 min
