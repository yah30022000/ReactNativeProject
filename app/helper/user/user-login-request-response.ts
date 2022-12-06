export interface UserLoginRequest {
  client_id: string,
  client_secret: string,
  grant_type: string
}

export interface GetAccessTokenResponse {
  type: string
  username: string,
  application_name: string
  client_id: string
  token_type: string
  access_token: string
  expires_in: number
  state: string
  scope: string
}
