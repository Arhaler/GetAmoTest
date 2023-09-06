type AuthData = {
    client_id:string,
    client_secret:string,
    redirectUri:string,
    authCode:string,
    refreshToken:string,
    accessToken:string,
    accessTokenExpires:number
}
export default AuthData;