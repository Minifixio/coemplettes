import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Backend CoEmplettes');
});

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});