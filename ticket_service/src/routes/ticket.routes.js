import express from 'express';
import TicketController from '../controller/ticket.controller.js';
import { authenticateToken } from '../auth/middleware.auth.js';

const router = express.Router();

router.post("/",authenticateToken, TicketController.createTicket);
router.get("/:id",authenticateToken, TicketController.getTicketById);
router.get("/",authenticateToken, TicketController.getAllTickets);
router.put("/:id", authenticateToken, TicketController.updateTicketById);
router.delete("/:id", authenticateToken, TicketController.deleteTicketById);

export default router;