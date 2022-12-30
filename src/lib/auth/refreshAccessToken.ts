import { fetcher } from "../../graphql/auth-fetcher"
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

  //: Send Lens Api from new access token
  const result = await fetcher<RefreshMutation, RefreshMutationVariables>(
    RefreshDocument,
    {
      request: {
        refreshToken: currentRefreshToken,
      }
    }
    )();

    //: Set new access token in Local Storage 
    const { accessToken, refreshToken: newRefreshToken } = result.refresh;
    setAccessToken(accessToken, newRefreshToken);

    return accessToken as string;
}