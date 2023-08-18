import app from './app'
import { Request, Response, NextFunction } from 'express'

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.code === 'EBADCSRFTOKEN') {
      return res.status(403).send({ message: 'CSRF Inválido' });
    }
    return next(err);
  });

app.listen(8080, () => {
    console.log('Servidor ligado em http://localhost:8080')
})