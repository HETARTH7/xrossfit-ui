export interface LoginResponse {
  id: number,
  displayName: string,
  emailVerified: boolean,
  role: string,
  token: string,
  error: string
}
