/**
 * @swagger
 * tags:
 *   name: Ticket
 *   description: API RESTful
 */

/**
 * @swagger
 * /api/ticket:
 *   post:
 *     summary: Crea un ticket
 *     tags: [Ticket]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tuition:
 *                 type: string
 *               name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ticket creado exitosamente
 *       400:
 *         description: Datos inválidos
 */

/**
 * @swagger
 * /api/ticket:
 *   get:
 *     summary: Obtiene todos los tickets
 *     tags: [Ticket]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tickets obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 usuarios:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       last_name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       role:
 *                         type: string
 */

/**
 * @swagger
 * /api/ticket/{id}:
 *   put:
 *     summary: Actualiza un ticket por ID
 *     tags: [Ticket]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tuition:
 *                 type: string
 *               name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               status:
 *                 type: boolean
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ticket actualizado exitosamente
 *       404:
 *         description: Ticket no encontrado
 */

/**
 * @swagger
 * /api/ticket/{id}:
 *   delete:
 *     summary: Elimina un ticket por ID
 *     tags: [Ticket]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ticket eliminado exitosamente
 *       404:
 *         description: Ticket no encontrado
 */