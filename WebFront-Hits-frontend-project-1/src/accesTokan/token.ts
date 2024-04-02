export const accessTokenKey = "accessToken";

export function saveToken(accessToken: string | (null| 'null')) {
    if(accessToken === null) {
        localStorage.removeItem(accessTokenKey);
    }
    else {
        localStorage.setItem(accessTokenKey, accessToken);
    }
    console.log({accessToken}); 
}

export function getToken(): string | null {
    let token: string | null = localStorage.getItem(accessTokenKey);
    if(token === null) token = "null";
    return token;
}

