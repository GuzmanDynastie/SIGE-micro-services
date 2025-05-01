import dotenv from "dotenv";
import amqplib from "amqplib";
dotenv.config();

let channel;

export async function connectLavinMQ() {
    try {
        const connection = await amqplib.connect(process.env.LAVINMQ_UR);
        channel = await connection.createChannel();
        await channel.assertExchange("ticket_created", "direct", { durable: true });
        console.log("Conexión a LavinMQ establecida correctamente.");
    } catch (err) {
        console.error("Error al conectar con LavinMQ:", err.message);
        throw err;
    }
}

export async function sendTicketNotification(user_id, message, title) {
    if (!channel) throw new Error("LavinMQ no está conectado");

    const content = JSON.stringify({ user_id, message, title });
    channel.publish("ticket_created", "", Buffer.from(content), { persistent: true, });
    console.log(`Notificación enviada a la cola para el usuario ${user_id}`);
}