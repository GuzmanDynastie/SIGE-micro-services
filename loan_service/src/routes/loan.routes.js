import express from 'express';
import LoanController from '../controller/loan.controller.js';
import { authenticateToken } from '../auth/middleware.auth.js';

const router = express.Router();

// Crear un préstamo
router.post("/", authenticateToken, LoanController.createLoan);

// Obtener todos los préstamos
router.get("/", authenticateToken, LoanController.getAllLoans);

// Obtener todos los laboratorios (solo los campos id_laboratory y category)
router.get("/laboratories", authenticateToken, LoanController.getAllLaboratories);  // Asegúrate de que este método esté en el controller

// Obtener un préstamo por ID
router.get("/:id", authenticateToken, LoanController.getLoanById);

// Actualizar un préstamo por ID
router.put("/:id", authenticateToken, LoanController.updateLoanById);

// Eliminar un préstamo por ID
router.delete("/:id", authenticateToken, LoanController.deleteLoanById);

export default router;
