import LoanService from '../service/loan.service.js';

export default class LoanController {

    // Crear un nuevo préstamo
    static async createLoan(req, res) {
        const { id_fk_laboratory, id_in_charger, date_start, date_end } = req.body;
        try {
            const newLoan = await LoanService.createLoan(id_fk_laboratory, id_in_charger, date_start, date_end);
            res.status(201).json({ newLoan });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Obtener préstamo por ID
    static async getLoanById(req, res) {
        const id = req.params.id;
        try {
            const loan = await LoanService.getLoanById(id);
            if (!loan || loan.length === 0) {
                return res.status(404).json({ error: "Préstamo no encontrado" });
            }
            res.status(200).json({ loan: loan[0] }); // Modificado para enviar un solo préstamo
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Obtener todos los préstamos
    static async getAllLoans(req, res) {
        try {
            const getAllLoans = await LoanService.getAllLoans();
            res.status(200).json({ getAllLoans });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Obtener todos los laboratorios (solo id_laboratory y category)
    static async getAllLaboratories(req, res) {
        try {
            const getAllLaboratories = await LoanService.getAllLaboratories();
            res.status(200).json({ laboratories: getAllLaboratories });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Actualizar préstamo por ID
    static async updateLoanById(req, res) {
        const id = req.params.id;
        const { id_fk_laboratory, id_in_charger, date_start, date_end } = req.body;
        try {
            const updatedLoan = await LoanService.updateLoanById(id, id_fk_laboratory, id_in_charger, date_start, date_end);
            res.status(200).json({ updatedLoan });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Eliminar préstamo por ID
    static async deleteLoanById(req, res) {
        const id = req.params.id;
        try {
            const success = await LoanService.deleteLoan(id);
            if (!success) return res.status(404).json({ error: "Préstamo no encontrado." });
            res.status(200).json({ message: "Préstamo eliminado." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}
