import { isTokenExpired, readAccessToken } from "../lib/auth/helpers";
import refreshAccessToken from "../lib/auth/refreshAccessToken";

export const fetcher = <TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: RequestInit['headers']
): (() => Promise<TData>) => {


  async function getAccessToken() {
    //: 1 Check Local Storage for the access token
    const token = readAccessToken();

    //: 2 If not access token return null
    if (!token) return null;

    let accessToken = token.accessToken;
    
    //: 3 If access token check the expiration date
    if (isTokenExpired( token.exp)) {
      //: If it's expired update it using refresh token
      const newToken = await refreshAccessToken();
      if (!newToken) return null;
      accessToken = newToken;
      
    }

    //: Last thing return Token
    return accessToken;
  };


  return async () => {
    const token = typeof window !== "undefined" ? await getAccessToken() : null;

    const res = await fetch(" https://api-mumbai.lens.dev/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options,
        "x-access-token": token ? token : "",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        query,
        variables
      })
    });

 //! ERROR IN THIS FILE AUTH_FETCHER
    const json = await res.json()
 
    if (json.errors) {
      const { message } = json.errors[0] || {}
      throw new Error(message || 'Error…')
    }
 
    return json.data
  }
}