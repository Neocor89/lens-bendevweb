export const fetcher = <TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: RequestInit['headers']
): (() => Promise<TData>) => {


  async function getAccessToken() {
    //TODO RESTART HERE <> <> 
    //TODO                <>...I'M HERE!!
    //: Check Local Storage for the access token
    //: If not access token return null
    //: If access token check the expiration date
  };


  return async () => {
    const res = await fetch("https://api.lens.dev/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options,
        //: Adding Authentification headers here
      },
      body: JSON.stringify({
        query,
        variables
      })
    });
 
    const json = await res.json()
 
    if (json.errors) {
      const { message } = json.errors[0] || {}
      throw new Error(message || 'Error…')
    }
 
    return json.data
  }
}