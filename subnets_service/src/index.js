import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet'; 
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerDocs from './docs/swagger.config.js';
import subnetRoute from './routes/subnet.routes.js';

const app = express();
const PORT = 5400;

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, '*');
        return callback(null, origin);
    },
    credentials: true
}));

app.use('/api/docs/subnet', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use("/api/subnet", subnetRoute);

app.listen(PORT, () => {
    console.log(`Server iniciado en http://localhost:${PORT}`);
});