
export let amadeusClientId = 'Gc0KBoGGsk05jAebiWdSl6grrvNC0AFG'
export let amadeusClientSecret = 'G57cS8cq3JcbBvwk'

export interface GetAccessTokenRequest {
  client_id: string,
  client_secret: string,
  grant_type: string
}

export let getAccessTokenRequestBody: GetAccessTokenRequest = {
  client_id: amadeusClientId,
  client_secret: amadeusClientSecret,
  grant_type: "client_credentials"
};

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
