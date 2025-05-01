import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet'; 
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerDocs from './docs/swagger.config.js';
import ticketRoute from './routes/ticket.routes.js';
import { connectLavinMQ } from './utils/lavinmq.js';

const app = express();
const PORT = 5100;

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, '*');
        return callback(null, origin);
    },
    credentials: true
}));

app.use('/api/docs/ticket', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use("/api/ticket", ticketRoute);

const startServer = async () => {
    try {
        await connectLavinMQ();
        app.listen(PORT, () => {
            console.log(`Server iniciando en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error al iniciar el servidor:", error.message);
        process.exit(1);
    }
};

startServer();