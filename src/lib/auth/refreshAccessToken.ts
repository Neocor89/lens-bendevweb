import { 
  RefreshDocument, 
  RefreshMutation, 
  RefreshMutationVariables
 } from "../../graphql/generated"
import { readAccessToken, setAccessToken } from "./helpers"

//: Fetching new access token
export default async function refreshAccessToken() {
  //: Get current refresh token from Local Storage
  const currentRefreshToken = readAccessToken()?.refreshToken;

  if (!currentRefreshToken) return null;

  async function fetchData<TData, TVariables>(
    query: string,
    variables?: TVariables,
    options?: RequestInit['headers']
  ) : Promise<TData> {

    const res = await fetch("https://api.lens.dev/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        query,
        variables
      })
    });
 
    const json = await res.json()
 
    if (json.errors) {
      const { message } = json.errors[0] || {};
      throw new Error(message || 'Error…');
    }
 
    return json.data
  }

    //: Set new access token in Local Storage 
    const result = await fetchData<RefreshMutation, RefreshMutationVariables>(
      RefreshDocument, {
        request: {
          refreshToken: currentRefreshToken,
        },
      }
    );

    const {
      refresh: { accessToken, refreshToken: newRefreshToken },
    } = result;

    setAccessToken(accessToken, newRefreshToken);

    return accessToken as string;

};