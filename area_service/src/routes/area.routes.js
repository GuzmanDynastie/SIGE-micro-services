import express from 'express';
import { authenticateToken } from '../auth/middleware.auth.js';
import { upload } from '../auth/cloudinary.auth.js';
import AreaController from '../controller/area.controller.js';

const router = express.Router();

router.post("/",authenticateToken, upload.array('image', 2), AreaController.createArea)
router.get("/",authenticateToken, AreaController.getAllAreas);
router.get("/:id", authenticateToken, AreaController.getAreaById)
router.get("/equipment/:id",authenticateToken, AreaController.getEquipmentAreaById);
router.put("/:id",authenticateToken, upload.array('image', 2), AreaController.updateAreaById);
router.delete("/:id", authenticateToken, AreaController.deleteAreaById);

export default router;