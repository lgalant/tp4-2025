import pkg from 'pg'
const {Client} = pkg;
import { config } from "../dbconfig.js";

const getUsuarioById = async (id) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "SELECT * FROM usuario WHERE userid = $1",
            [id]
        );
        if (rows.length < 1) return null;

        await client.end();
        return rows[0];
    } catch (error) {
        await client.end();
        throw error;
    }
};

const createUsuario = async (usuario) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "INSERT INTO usuario (userid, nombre, password, admin) VALUES ($1, $2, $3, false)",
            [usuario.userid, usuario.nombre, usuario.password]
        );

        await client.end();
        return rows;
    } catch (error) {
        await client.end();
        throw error;
    }
};

export default { getUsuarioById, createUsuario };