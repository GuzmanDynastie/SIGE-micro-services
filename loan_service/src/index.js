import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet'; 
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerDocs from './docs/swagger.config.js';
import loanRoute from './routes/loan.routes.js';

const app = express();
const PORT = 5300;

app.use(cors({origin: '*', credentials: true}));

app.use('/api/docs/loan', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use("/api/loan", loanRoute);

app.listen(PORT, () => {
    console.log(`Server iniciado en http://localhost:${PORT}`);
});