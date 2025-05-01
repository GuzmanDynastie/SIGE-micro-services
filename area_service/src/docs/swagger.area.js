/**
 * @swagger
 * tags:
 *   name: Area
 *   description: API RESTful
 */

/**
 * @swagger
 * /api/area:
 *   post:
 *     summary: Crea una area
 *     tags: [area]
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
 *         description: Area creada exitosamente
 *       400:
 *         description: Datos inválidos
 */

/**
 * @swagger
 * /api/area:
 *   get:
 *     summary: Obtiene todos las areas
 *     tags: [Area]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de areas obtenida exitosamente
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
 * /api/area/{id}:
 *   put:
 *     summary: Actualiza un area por ID
 *     tags: [Area]
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
 *         description: Area actualizada exitosamente
 *       404:
 *         description: Area no encontrada
 */

/**
 * @swagger
 * /api/area/{id}:
 *   delete:
 *     summary: Elimina un area por ID
 *     tags: [Area]
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
 *         description: Area eliminada exitosamente
 *       404:
 *         description: Area no encontrada
 */