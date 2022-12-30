import { fetcher } from "../../graphql/auth-fetcher"
import { 
  RefreshDocument, 
  RefreshMutation, 
  RefreshMutationVariables
 } from "../../graphql/generated"
import { readAccessToken } from "./helpers"

export default async function refreshAccessToken() {
  //: Get current refresh token from Local Storage
  const refreshToken = readAccessToken()?.refreshToken;

  if (!refreshToken) return null;

  //: Send Lens Api from new access token
  const result = await fetcher<RefreshMutation, RefreshMutationVariables>(
    RefreshDocument,
    {
      request: {
        refreshToken: refreshToken,
      }
    }
    )();

    //: Set new access token in Local Storage test command git 
}