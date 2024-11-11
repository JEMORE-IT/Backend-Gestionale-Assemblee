import * as express from 'express';
import { Request, Response } from 'express';
import { router_test } from './routes/test';
import { logMiddleware } from './middleware/middleware';
import { myDataSource } from './database/DataSource';
import { TestRepository } from './database/entities/Test/Test.repository';
import { router_authentication } from './routes/authentication';
const cookieParser = require('cookie-parser');

var app = express();
const PORT: number = 3000;

app.use(cookieParser());

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


app.use('/test', router_test)
app.use('/authentication', router_authentication)

app.listen(PORT, () => {
    console.log("Server listening on PORT", PORT);
})