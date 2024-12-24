import express, { Request, Response } from 'express';
import { logMiddleware } from './middleware/middleware';
import { myDataSource } from './database/DataSource';
import { router_authentication } from './routes/authentication';
import { router_assembly } from './routes/assembly';
import { router_member } from './routes/member';
import { router_presence } from './routes/presence';
import { router_delegation } from './routes/delegation';
import { router_riga } from './routes/riga';
import { router_vote } from './routes/vote';
const cookieParser = require('cookie-parser');
import cors from 'cors'
import { router_download } from './routes/download';

var app = express();
const PORT: number = 80;

app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000', // Domini permessi per le richieste
  credentials: true, // Permetti l'invio di cookie
  exposedHeaders: ['Content-Disposition'], // Esponi l'intestazione 'Content-Disposition'
}));
app.use(express.json())

myDataSource
  .initialize()
  .then(() => {
      console.log("Data Source has been initialized!")
  })
  .catch((err) => {
      console.error("Error during Data Source initialization:", err)
  })


app.get('/', [logMiddleware] ,function(req: Request, res: Response) {
  res.send('Welcome to the backend!');
});


app.use('/vote', router_vote)
app.use('/line', router_riga)
app.use('/member', router_member)
app.use('/assembly', router_assembly)
app.use('/presence', router_presence)
app.use('/download', router_download)
app.use('/delegation', router_delegation)
app.use('/authentication', router_authentication)

app.listen(PORT, () => {
    console.log("Server listening on PORT", PORT);
})