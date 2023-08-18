import { Router } from 'express'
import Task, { TaskDocument } from '../models/task.model'


const router = Router()
router.get('/test', async (req, res) => {
    const task: TaskDocument = new Task({title: 'Teste', done: false, created_at: new Date()})
    await task.save()
    return res.status(200).send('Feito!')
});

export default router