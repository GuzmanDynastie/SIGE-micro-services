import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from "body-parser";
import swaggerUI from 'swagger-ui-express';
import swaggerDocs from './docs/swagger.config.js';
import ticketRoute from './routes/area.routes.js';

const app = express();
const PORT = 5200;

app.use('/api/docs/area', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, '*');
        return callback(null, origin);
    },
    credentials: true
}));

app.use("/api/area", ticketRoute);

app.listen(PORT, () => {
    console.log(`Server iniciando en http://localhost:${PORT}`);
});