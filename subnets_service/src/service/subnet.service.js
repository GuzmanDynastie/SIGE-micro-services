import { master } from '../configuration/connection.js';

export default class SubnetService {

    // Crear una nueva subred
    static async createSubnet(vlan, intial_range, end_range, getway, description, number_of_ips) {
        try {
            const result = await master.query(`
                INSERT INTO sige.subnets (vlan, initial_range, end_range, getway, description, number_of_ips)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *;`,
                [vlan, intial_range, end_range, getway, description, number_of_ips]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error al crear una nueva subred: ${error.message}`);
        }
    }

    // Obtener todas las subredes
    static async getAllSubnets() {
        try {
            const result = await master.query(`SELECT * FROM sige.subnets;`);
            return result.rows;
        } catch (error) {
            throw new Error(`Error al obtener las subredes: ${error.message}`);
        }
    }

    // Actualizar una subred por ID
    static async updateSubnetById(id, vlan, initial_range, end_range, getway, description, number_of_ips) {
        try {
            const result = await master.query(`
                UPDATE sige.subnets
                SET vlan = $2, initial_range = $3, end_range = $4, getway = $5, description = $6, number_of_ips = $7
                WHERE id = $1
                RETURNING *;`,
                [id, vlan, initial_range, end_range, getway, description, number_of_ips]
            );
            if (result.rowCount === 0) {
                throw new Error(`Subred no encontrada con el ID: ${id}`);
            }
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error al actualizar la subred: ${error.message}`);
        }
    }

    // Eliminar una subred por ID
    static async deleteSubnet(id) {
        try {
            const result = await master.query(`
                DELETE FROM sige.subnets
                WHERE id = $1
                RETURNING *;`,
                [id]
            );
            if (result.rowCount === 0) {
                throw new Error(`Subred no encontrada con el ID: ${id}`);
            }
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error al eliminar la subred: ${error.message}`);
        }
    }

    // Crear una nueva reserva de IP
    static async createIpReservation(subnet_id, assigned_ip, serial_id, mac_address, equipment_type, udg_id, responsible, location) {
        try {
            const result = await master.query(`
                INSERT INTO sige.reservations_subnets (subnet_id, assigned_ip, serial_id, mac_address, equipment_type, udg_id, responsible, location)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING *;`,
                [subnet_id, assigned_ip, serial_id, mac_address, equipment_type, udg_id, responsible, location]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error al crear la reserva de IP: ${error.message}`);
        }
    }

    // Obtener todas las reservas de IP
    static async getAllIpReservations() {
        try {
            const result = await master.query(`SELECT * FROM sige.reservations_subnets;`);
            return result.rows;
        } catch (error) {
            throw new Error(`Error al obtener las reservas de IP: ${error.message}`);
        }
    }

    // Eliminar una reserva de IP por ID
    static async deleteIpReservationById(id) {
        try {
            const result = await master.query(`
                DELETE FROM sige.reservations_subnets
                WHERE id = $1
                RETURNING *;`,
                [id]
            );
            if (result.rowCount === 0) {
                throw new Error(`Reserva de IP no encontrada con el ID: ${id}`);
            }
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error al eliminar la reserva de IP: ${error.message}`);
        }
    }
}
