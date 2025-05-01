import { master } from "../configuration/connection.js";
import { sendTicketNotification } from "../utils/lavinmq.js";

export default class TicketService {

    // Crear un nuevo ticket
    static async createTicket(category, status, communication, report, priority, applicant, id_area, id_technical) {
        try {
            const result = await master.query(`
                    INSERT INTO sige.ticket (category, status, communication, report, priority, applicant, id_area, id_technical)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                    RETURNING *;`,
                [category, status, communication, report, priority, applicant, id_area, id_technical]
            );
            const newTicket = result.rows[0];
            
            try {
                const message = `Nuevo ticket asignado: "${newTicket.report}"`;
                await sendTicketNotification(id_technical, message, `${newTicket.category}`);
            } catch (notifyError) {
                console.error(`No se pudo enviar la notificación: ${notifyError.message}`);
            }

            return newTicket;
        } catch (error) {
            throw new Error(`Ha ocurrido un error al crear un nuevo ticket: ${error.message}`);
        }
    }

    // Obtener ticket por ID
    static async getTicketById(id) {
        try {
            const result = await master.query(`
                SELECT * FROM sige."getAllTickets"
                WHERE id_ticket = $1;`,
                [id]
            );

            if (result.rows.length === 0) {
                throw new Error("Ticket no encontrado.")
            }
            return result.rows[0];
        } catch (error) {
            throw new Error(`Ha ocurrido un error al solicitar el ticket: ${error.message}`);
        }
    }

    // Obtener todos los tickets
    static async getAllTickets() {
        try {
            const result = await master.query(`
                    SELECT * FROM sige."getAllTickets";

                    
                `);
            return result.rows;
        } catch (error) {
            throw new Error(`Ha ocurrido un error al obtener los tickets: ${error.message}`);
        }
    }

    // Actualizar un ticket por su ID
    static async updateTicketById(id, category, status, communication, report, priority, applicant, start_date, end_date, solution, id_area, id_technical) {
        try {
            const result = await master.query(`
                    UPDATE sige.ticket
                    SET category = $2, status = $3, communication = $4, report = $5, priority = $6, applicant = $7, start_date = $8, end_date = $9, solution = $10, id_area = $11, id_technical = $12 
                    WHERE id_ticket = $1
                    RETURNING *;`,
                [id, category, status, communication, report, priority, applicant, start_date, end_date, solution, id_area, id_technical]
            );
            if (result.rowCount === 0) {
                throw new Error(`Ticket no encontrado con el ID: ${id}`);
            }
            return result.rows[0];
        } catch (error) {
            throw new Error(`Ha ocurrido un error al actualizar el ticket: ${error.message}`);
        }
    }

    // Eliminar un ticket por su ID
    static async deleteTicket(id) {
        try {
            const result = await master.query(`
                    UPDATE sige.ticket
                    SET status = eliminado
                    WHERE id_ticket = $1`,
                [id]
            );
            if (result.rows.length === 0) {
                throw new Error(`Ticket no encontrado con el ID: ${id}`);
            }
            return result.rows[0];
        } catch (error) {
            throw new Error(`Ha ocurrido un error al eliminar el ticket: ${error.message}`);
        }
    }

}