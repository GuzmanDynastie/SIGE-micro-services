import { master } from '../configuration/connection.js';

export default class AreaService {

    // Crear una nueva area
    static async createArea(type_space, sede, building, floor, division, coordination, classroom_lab, image, equipment, classroom) {
        try {
            if (!Array.isArray(equipment)) {
                if (typeof equipment === "string") {
                    equipment = equipment.split(",").map(e => e.trim());
                } else {
                    throw new Error("El campo 'equipment' debe ser un array o una cadena separada por comas.");
                }
            }

            const result = await master.query(`
                INSERT INTO sige.area 
                (type_space, sede, building, floor, division, coordination, classroom_lab, image, equipment, classroom)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                RETURNING *;`,
                [type_space, sede, building, floor, division, coordination, classroom_lab, image, equipment, classroom]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(`Ha ocurrido un error al crear una nueva área: ${error.message}`);
        }
    }

    // Obtener todos las areas
    static async getAllAreas() {
        try {
            const result = await master.query(`
                    SELECT * FROM sige.area
                    WHERE status = true
                `);
            return result.rows;
        } catch (error) {
            throw new Error(`Ha ocurrido un error al obtener las areas: ${error.message}`);
        }
    }

    // Obtener area por ID
    static async getAreaById(id) {
        try {
            const result = await master.query(`
                SELECT * FROM sige.area
                WHERE id_area = $1`,
                [id]);
            if (result.rows.length === 0) {
                throw new Error("Area no encontrada.");
            }
            return result.rows[0];
        } catch (error) {
            throw new Error(`Ha ocurrido un error al obtener la area: ${error.message}`);
        }
    }

    // Obtener equipo de area por ID
    static async getEquipmentAreaById(id) {
        try {
            const result = await master.query(`
                SELECT * FROM sige."view_area_equipment"
                WHERE area = $1`,
                [id]);
            if (result.rows.length === 0) {
                throw new Error("Area no encontrada.");
            }
            return result.rows;
        } catch (error) {
            throw new Error(`Ha ocurrido un error al obtener los equipos: ${error.message}`);
        }
    }

    // Actualizar un area por su ID
    static async updateAreaById(id, type_space, sede, building, floor, division, coordination, classroom_lab, image, equipment, classroom) {
        try {
            const result = await master.query(`
                UPDATE sige.area
                SET type_space = $2, sede = $3, building = $4, floor = $5, division = $6, coordination = $7, classroom_lab = $8,  image = $9, equipment = $10, classroom = $11
                WHERE id_area = $1
                RETURNING *`,
                [id, type_space, sede, building, floor, division, coordination, classroom_lab, image, equipment, classroom]
            );
            if (result.rowCount === 0) {
                throw new Error(`Area no encontrada con el ID: ${id}`);
            }
            return result.rows[0];
        } catch (error) {
            throw new Error(`Ha ocurrido un error al actualizar el area: ${error.message}`);
        }
    }

    // Eliminar un area por su ID
    static async deleteArea(id) {
        try {
            const result = await master.query(`
                UPDATE sige.user
                SET status = false
                WHERE id_area = $1`,
                [id]
            );
            if (result.rows.length === 0) {
                throw new Error(`Area no encontrada con el ID: ${id}`);
            }
            return result.rows[0];
        } catch (error) {
            throw new Error(`Ha ocurrido un error al eliminar el area: ${error.message}`);
        }
    }

}