import TicketService from '../service/ticket.service.js';

export default class TicketController {

    // Crear nuevo ticket
    static async createTicket(req, res) {
        const { category, status, communication, report, priority, applicant, id_area, id_technical } = req.body;
        try {
            const newTicket = await TicketService.createTicket(category, status, communication, report, priority, applicant, id_area, id_technical);
            res.status(201).json({ newTicket });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getTicketById(req, res) {
        const id = req.params.id;
        try {
            const ticket = await TicketService.getTicketById(id);
            if (!ticket) {
                return res.status(404).json({ error: "Ticket no encontrado" });
            }
            res.status(200).json({ ticket });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Obtener todos los usuarios
    static async getAllTickets(req, res) {
        try {
            const getAllTickets = await TicketService.getAllTickets();
            res.status(200).json({ getAllTickets });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Actualizar ticket por ID
    static async updateTicketById(req, res) {
        const id = req.params.id;
        const { category, status, communication, report, priority, applicant, start_date, end_date, solution, id_area, id_technical } = req.body;
        try {
            const updatedTicket = await TicketService.updateTicketById(id, category, status, communication, report, priority, applicant, start_date, end_date, solution, id_area, id_technical);
            res.status(200).json({ updatedTicket });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Eliminar ticket por ID
    static async deleteTicketById(req, res) {
        const id = req.params.id;
        try {
            const success = await TicketService.deleteTicket(id);
            if (!success) return res.status(404).json({ error: "Ticket no encontrado." });
            res.status(200).json({ message: "Ticket eliminado." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}