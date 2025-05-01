import { master } from '../configuration/connection.js';

export default class RealStateService {
    static async createRealState(data) {
        const {
            in_charge, area, description, registration_date,
            brand, model, number_serial, mac_address, connection_type
        } = data;

        const query = `
            INSERT INTO sige.real_state (
                in_charge, area, description, registration_date,
                brand, model, number_serial, mac_address, connection_type
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *;
        `;

        const values = [
            in_charge, area, description, registration_date,
            brand, model, number_serial, mac_address, connection_type
        ];

        const result = await master.query(query, values);
        return result.rows[0];
    }

    static async getRealStateById(id) {
        const result = await master.query(
            'SELECT * FROM sige.real_state WHERE id_state = $1;',
            [id]
        );
        return result.rows[0];
    }

    static async getAllRealStates() {
        const result = await master.query('SELECT * FROM sige.real_state;');
        return result.rows;
    }

    static async updateRealStateById(id, data) {
        const {
            in_charge, area, description, registration_date,
            brand, model, number_serial, mac_address, connection_type
        } = data;

        const query = `
            UPDATE sige.real_state
            SET in_charge = $2, area = $3, description = $4, registration_date = $5,
                brand = $6, model = $7, number_serial = $8, mac_address = $9, connection_type = $10
            WHERE id_state = $1
            RETURNING *;
        `;

        const values = [
            id, in_charge, area, description, registration_date,
            brand, model, number_serial, mac_address, connection_type
        ];

        const result = await master.query(query, values);
        if (result.rowCount === 0) throw new Error(`Registro no encontrado con el ID: ${id}`);
        return result.rows[0];
    }

    static async deleteRealState(id) {
        const result = await master.query(
            'DELETE FROM sige.real_state WHERE id_state = $1 RETURNING *;',
            [id]
        );
        if (result.rowCount === 0) throw new Error(`Registro no encontrado con el ID: ${id}`);
        return result.rows[0];
    }
}
