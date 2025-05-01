import { master } from '../configuration/connection.js';

export default class LoanService {

    // Crear un nuevo préstamo
    static async createLoan(id_fk_laboratory, id_in_charger, date_start, date_end) {
        try {
            const result = await master.query(`
                INSERT INTO sige.loan (id_fk_laboratory, id_in_charger, date_start, date_end)
                VALUES ($1, $2, $3, $4)
                RETURNING *;`,
                [id_fk_laboratory, id_in_charger, date_start, date_end]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error al crear un nuevo préstamo: ${error.message}`);
        }
    }

    // Obtener un préstamo por su ID
    static async getLoanById(id) {
        try {
            const result = await master.query('SELECT * FROM sige.loan WHERE id_loan = $1;', [id]);
            return result.rows;
        } catch (error) {
            throw new Error(`Error al obtener el préstamo: ${error.message}`);
        }
    }

    // Obtener todos los préstamos
    static async getAllLoans() {
        try {
            const result = await master.query('SELECT * FROM sige.loan;');
            return result.rows;
        } catch (error) {
            throw new Error(`Error al obtener los préstamos: ${error.message}`);
        }
    }

    // Obtener todos los laboratorios (solo los campos id_laboratory y category)
    static async getAllLaboratories() {
        try {
            const result = await master.query('SELECT id_laboratory, category FROM sige.view_laboratories');
            return result.rows;
        } catch (error) {
            throw new Error(`Error al obtener los laboratorios: ${error.message}`);
        }
    }

    // Actualizar un préstamo por su ID
    static async updateLoanById(id, id_fk_laboratory, id_in_charger, date_start, date_end) {
        try {
            const result = await master.query(`
                UPDATE sige.loan
                SET id_fk_laboratory = $2, id_in_charger = $3, date_start = $4, date_end = $5
                WHERE id_loan = $1
                RETURNING *;`,
                [id, id_fk_laboratory, id_in_charger, date_start, date_end]
            );
            if (result.rowCount === 0) {
                throw new Error(`Préstamo no encontrado con el ID: ${id}`);
            }
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error al actualizar el préstamo: ${error.message}`);
        }
    }

    // Eliminar un préstamo por su ID
    static async deleteLoan(id) {
        try {
            const result = await master.query(`
                DELETE FROM sige.loan
                WHERE id_loan = $1
                RETURNING *;`,
                [id]
            );
            if (result.rowCount === 0) {
                throw new Error(`Préstamo no encontrado con el ID: ${id}`);
            }
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error al eliminar el préstamo: ${error.message}`);
        }
    }
}
