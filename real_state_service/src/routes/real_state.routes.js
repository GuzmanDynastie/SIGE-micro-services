import express from 'express';
import RealStateController from '../controller/real_state.controller.js';
import { authenticateToken } from '../auth/middleware.auth.js';

const router = express.Router();

router.post("/", authenticateToken, RealStateController.createRealState);
router.get("/", authenticateToken, RealStateController.getAllRealStates);
router.get("/:id", authenticateToken, RealStateController.getRealStateById);
router.put("/:id", authenticateToken, RealStateController.updateRealStateById);
router.delete("/:id", authenticateToken, RealStateController.deleteRealStateById);

export default router;
