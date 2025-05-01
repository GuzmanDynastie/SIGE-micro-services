import RealStateService from '../service/real_state.service.js';

export default class RealStateController {
    static async createRealState(req, res) {
        try {
            const newRealState = await RealStateService.createRealState(req.body);
            res.status(201).json({ newRealState });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getRealStateById(req, res) {
        try {
            const realState = await RealStateService.getRealStateById(req.params.id);
            if (!realState) return res.status(404).json({ error: "Registro no encontrado." });
            res.status(200).json({ realState });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAllRealStates(req, res) {
        try {
            const allRealStates = await RealStateService.getAllRealStates();
            res.status(200).json({ allRealStates });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateRealStateById(req, res) {
        try {
            const updatedRealState = await RealStateService.updateRealStateById(req.params.id, req.body);
            res.status(200).json({ updatedRealState });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteRealStateById(req, res) {
        try {
            const deleted = await RealStateService.deleteRealState(req.params.id);
            res.status(200).json({ message: "Registro eliminado", deleted });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
