import mysql from 'mysql';
import config from './config';

const params = {
    user: config.mysql.user,
    password: config.mysql.password,
    host: config.mysql.host,
    database: config.mysql.database
};

const Connect = async () => new Promise<mysql.Connection>((resolve, reject) => {
    const connection = mysql.createConnection(params);

    connection.connect((error) => {
        if(error) {
            reject(error);
            return;
        }
        resolve(connection);
    })
});

const Query = async <T>(connection: mysql.Connection, query: string) => new Promise<T>((resolve, reject) => {
    connection.query(query, connection, (error, result) => {
        if(error) {
            reject(error);
            return;
        }
        resolve(result);
    })
});

// TODO: Rendere dinamica anche la parte del WHERE.
const getQueryUpdate = (nameTable: string, idColumn: string, idValue: string, columns: any[], values: any[]): string => {
    let query = `UPDATE ${nameTable} SET ` + columns.join(" = ?, ") + " = ?";

    values.forEach(v => {
        query = query.replace('?', `'${v}'`);
    });

    query += ` WHERE ${idColumn} = '${idValue}'`;

    return query;
}

// TODO
const getQueryInsert = (): string => {

    return "";
}


export { Connect, Query, getQueryUpdate};