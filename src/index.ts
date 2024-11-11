import * as express from 'express';
import { Request, Response } from 'express';
import { router_test } from './routes/test';
import { logMiddleware } from './middleware/middleware';
import { myDataSource } from './database/DataSource';
import { TestRepository } from './database/entities/Test/Test.repository';

var app = express();
const PORT: number = 3000;


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

app.get('/add-get-row', async (req: Request, res: Response) => {
  // getting all the rows
  const rows = await TestRepository.getTest()
  return res.json(rows)
})

app.use('/test', router_test)

app.listen(PORT, () => {
    console.log("Server listening on PORT", PORT);
})