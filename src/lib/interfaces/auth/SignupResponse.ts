export interface SignupResponse {
  id: number,
  displayName: string,
  emailVerified: boolean,
  role: string,
  token: string,
  error: string
}
