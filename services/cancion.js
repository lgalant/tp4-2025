import pkg from 'pg'
const {Client} = pkg;
import { config } from "../dbconfig.js";

const getCanciones = async (id) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "SELECT * FROM escucha WHERE usuario = $1",
            [id]
        );
        if (rows.length < 1) return null;

        await client.end();
        return rows;
    } catch (error) {
        await client.end();
        throw error;
    }
};


const escuchoCancion = async (cancion) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "INSERT INTO escucha (usuario, cancion) VALUES ($1, $2) RETURNING *",
            [cancion.usuario, cancion.cancion]
        );
        await client.end();
        return rows[0];
    } catch (error) {
        await client.end();
        throw error;
    }
};

const postCancion = async (cancion) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "INSERT INTO cancion (nombre) VALUES ($1) RETURNING *",
            [cancion.nombre]
        );
        await client.end();
        return rows[0];
    } catch (error) {
        await client.end();
        throw error;
    }
}

const putCancion = async (id, nombre) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "UPDATE cancion SET nombre = $1 WHERE id = $2 RETURNING *",
            [nombre, id]
        );
        await client.end();
        return rows[0];
    } catch (error) {
        await client.end();
        throw error;
    }
}

const deleteCancion = async (id) => {
    const client = new Client(config);
    await client.connect();

    try {
        await client.query(
            "DELETE FROM cancion WHERE id = $1",
            [id]
        );
        await client.end();
    } catch (error) {
        await client.end();
        throw error;
    }
}

export default { getCanciones, postCancion, putCancion , deleteCancion, escuchoCancion };