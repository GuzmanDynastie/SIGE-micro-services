import SubnetService from '../service/subnet.service.js';

export default class SubnetController {

    // Crear una nueva subred
    static async createSubnet(req, res) {
        const { vlan, initial_range, end_range, getway, description, number_of_ips } = req.body;
        try {
            const newSubnet = await SubnetService.createSubnet(vlan, initial_range, end_range, getway, description, number_of_ips);
            res.status(201).json({ newSubnet });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Obtener todas las subredes
    static async getAllSubnets(req, res) {
        try {
            const getAllSubnets = await SubnetService.getAllSubnets();
            res.status(200).json({ getAllSubnets });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Actualizar una subred por ID
    static async updateSubnetById(req, res) {
        const id = req.params.id;
        const { vlan, initial_range, end_range, getway, description, number_of_ips } = req.body;
        try {
            const updatedSubnet = await SubnetService.updateSubnetById(id, vlan, initial_range, end_range, getway, description, number_of_ips);
            res.status(200).json({ updatedSubnet });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Eliminar una subred por ID
    static async deleteSubnetById(req, res) {
        const id = req.params.id;
        try {
            const success = await SubnetService.deleteSubnet(id);
            if (!success) return res.status(404).json({ error: "Subred no encontrada." });
            res.status(200).json({ message: "Subred eliminada." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Crear una nueva reserva de IP
    static async createIpReservation(req, res) {
        const { subnet_id, assigned_ip, serial_id, mac_address, equipment_type, udg_id, responsible, location } = req.body;
        try {
            const newReservation = await SubnetService.createIpReservation(subnet_id, assigned_ip, serial_id, mac_address, equipment_type, udg_id, responsible, location);
            res.status(201).json({ newReservation });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Obtener todas las reservas de IP
    static async getAllIpReservations(req, res) {
        try {
            const getAllReservations = await SubnetService.getAllIpReservations();
            res.status(200).json({ getAllReservations });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Eliminar una reserva de IP por ID
    static async deleteIpReservationById(req, res) {
        const id = req.params.id;
        try {
            const success = await SubnetService.deleteIpReservationById(id);
            if (!success) return res.status(404).json({ error: "Reserva de IP no encontrada." });
            res.status(200).json({ message: "Reserva de IP eliminada." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
