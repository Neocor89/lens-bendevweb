const STORAGE_KEY = "LH_STORAGE_KEY";

//: 1 Reading access token from storage
export function readAccessToken() {
  
}

//: Setting the access token in storage
export function setAccessToken(accessToken: string, refreshToken: string) {
  const { exp } = parseJWt(accessToken);

  const ls = localStorage || window.localStorage;

  if (!ls) {
    throw new Error("Localstorage is Not avaiable" )    
  }
}

//: Parse the JWT token that comes back and extract the exp date field
export function parseJWt(token: string) {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/-/g, "/");
  let jsonPayload = decodeURIComponent(
    window
    .atob(base64)
    .split("")
    .map(function (c) { 
      return "%" +("00" + c.charCodeAt(0).toString(16)).slice(-2);
    })
    .join("")
  );

  return JSON.parse(jsonPayload);
}