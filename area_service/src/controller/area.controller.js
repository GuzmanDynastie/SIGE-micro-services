import AreaService from '../service/area.service.js';

export default class AreaController {

    // Crear nueva area
    static async createArea(req, res) {
        try {
            const { type_space, sede, building, floor, division, coordination, classroom_lab, equipment, classroom } = req.body;
            const imagesUrl = req.files.map(image => image.path);
            const equipmentArray = Array.isArray(equipment) ? equipment : equipment.split(',').map(item => item.trim());
            const newArea = await AreaService.createArea(
                type_space, sede, building, floor, division, coordination, classroom_lab, imagesUrl, equipmentArray, classroom
            );
            res.status(201).json({ newArea });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Obtener area por ID
    static async getAreaById(req, res) {
        try {
            const id = req.params.id;
            const area = await AreaService.getAreaById(id);
            if (!area) {
                return res.status(404).json({ error: "Area no encontrada." })
            }
            res.status(200).json({ area });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Obtener equipo de area por ID
    static async getEquipmentAreaById(req, res) {
        try {
            const id = req.params.id;
            const equipment = await AreaService.getEquipmentAreaById(id);
            if (!equipment) {
                return res.status(404).json({ error: "Area no encontrada." })
            }
            res.status(200).json({ equipment });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Obtener todas las areas
    static async getAllAreas(req, res) {
        try {
            const getAllAreas = await AreaService.getAllAreas();
            res.status(200).json({ getAllAreas });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Actualizar area por ID
    static async updateAreaById(req, res) {
        try {
            const id = req.params.id;
            const { type_space, sede, building, floor, division, coordination, classroom_lab, equipment, classroom } = req.body;

            const existingArea = await AreaService.getAreaById(id);
            if (!existingArea) {
                return res.status(404).json({ error: "Área no encontrada" });
            }

            // Si no se suben nuevas imágenes, mantener las antiguas
            const imagesUrl = req.files.length > 0 ? req.files.map(image => image.path) : existingArea.image;
            const equipmentArray = Array.isArray(equipment) ? equipment : equipment.split(',').map(item => item.trim());
            const updatedArea = await AreaService.updateAreaById(id, type_space, sede, building, floor, division, coordination, classroom_lab, imagesUrl, equipmentArray, classroom);
            res.status(200).json({ updatedArea });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Eliminar area por ID
    static async deleteAreaById(req, res) {
        try {
            const id = req.params.id;
            const success = await AreaService.deleteArea(id);
            if (!success) return res.status(404).json({ error: "Area no encontrada." });
            res.status(200).json({ message: "Area eliminada." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}