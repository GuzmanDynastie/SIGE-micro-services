import express from 'express';
import SubnetController from '../controller/subnet.controller.js'; 
import { authenticateToken } from '../auth/middleware.auth.js';

const router = express.Router();

// Crear una nueva subred
router.post("/", authenticateToken, SubnetController.createSubnet);

// Obtener todas las subredes
router.get("/", authenticateToken, SubnetController.getAllSubnets);

// Actualizar una subred por ID
router.put("/:id", authenticateToken, SubnetController.updateSubnetById);

// Eliminar una subred por ID
router.delete("/:id", authenticateToken, SubnetController.deleteSubnetById);

// Crear una nueva reserva de IP
router.post("/reservation", authenticateToken, SubnetController.createIpReservation);

// Obtener todas las reservas de IP
router.get("/reservation", authenticateToken, SubnetController.getAllIpReservations);

// Eliminar una reserva de IP por ID
router.delete("/reservation/:id", authenticateToken, SubnetController.deleteIpReservationById);

export default router;
