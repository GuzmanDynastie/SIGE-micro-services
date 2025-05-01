import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet'; 
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerDocs from './docs/swagger.config.js';
import StateRoute from './routes/real_state.routes.js';

const app = express();
const PORT = 5500;

app.use(cors({origin: '*', credentials: true}));

app.use('/api/docs/real_state', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use("/api/real_state", StateRoute);

app.listen(PORT, () => {
    console.log(`Server iniciado en http://localhost:${PORT}`);
});