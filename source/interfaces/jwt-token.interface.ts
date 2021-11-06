export default interface IJwtToken {
    _id: number,
    email: string,
    ruolo: string,
    iat: number,
    exp: number,
    iss: string
}