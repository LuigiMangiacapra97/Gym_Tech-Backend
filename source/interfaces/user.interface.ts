export default interface IUser {
    IdUtente: number,
    Nome: string,
    Cognome: string,
    DataNascita: string,
    Email: string,
    Password: string,
    Ruolo: 'admin' | 'coach' | 'atleta',
    Eliminato: number,
    Utente_IdUtente: number
}