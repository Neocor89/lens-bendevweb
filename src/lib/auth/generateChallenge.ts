import { fetcher } from "../../graphql/auth-fetcher";
import { 
  ChallengeDocument, 
  ChallengeQuery, 
  ChallengeQueryVariables 
} from "../../graphql/generated";


//: API Request
export default async function generateChallenge(address:string) {
  return await fetcher<ChallengeQuery, ChallengeQueryVariables>(
    ChallengeDocument, 
    {
      request: {
        address,
      }
    }
  )();
}