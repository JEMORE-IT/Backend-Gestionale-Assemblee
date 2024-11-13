import * as express from 'express';
import { Request, Response } from 'express';
import { logMiddleware } from './middleware/middleware';
import { myDataSource } from './database/DataSource';
import { router_authentication } from './routes/authentication';
import { router_assembly } from './routes/assembly';
import { router_member } from './routes/member';
import { router_presence } from './routes/presence';
const cookieParser = require('cookie-parser');

var app = express();
const PORT: number = 3000;

app.use(cookieParser());
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


app.use('/member', router_member)
app.use('/assembly', router_assembly)
app.use('/presence', router_presence)
app.use('/authentication', router_authentication)

app.listen(PORT, () => {
    console.log("Server listening on PORT", PORT);
})