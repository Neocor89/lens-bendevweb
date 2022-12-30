const STORAGE_KEY = "LH_STORAGE_KEY";

export function isTokenExpired(exp: number) {
  if(!exp) return true;

  if (Date.now() >= exp * 1000) {
    return false;
  }
  return true;
}

//: 1 Reading access token from storage
export function readAccessToken() {
  //: Check Client-side environement
  if (typeof window === "undefined") return null;

  const ls = localStorage || window.localStorage;

  if (!ls) {
    throw new Error("Localstorage is Not avaiable" )    
  }

  const data = ls.getItem(STORAGE_KEY);

  if (!data) return null;

  return JSON.parse(data) as {
    accessToken: string;
    refreshToken: string;
    exp: number;
  };
}

//: Setting the access token in storage
export function setAccessToken(accessToken: string, refreshToken: string) {
  const { exp } = parseJWt(accessToken);

  const ls = localStorage || window.localStorage;

  if (!ls) {
    throw new Error("Localstorage is Not avaiable" )    
  }

  ls.setItem(STORAGE_KEY, JSON.stringify({ accessToken, refreshToken, exp}));
}


//: Parse the JWT token that comes back and extract the exp date field
function parseJWt(token: string) {
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
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