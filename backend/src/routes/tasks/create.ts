import { Router } from 'express'
import Task, { TaskDocument } from '../../models/task.model'

const router = Router()

router.post('/create', async (req, res) => {
    if(!req.body.title){
        return res.status(422).send({ message: 'Por favor, configure um título.' })
    }
    
    try{
        const new_task: TaskDocument = new Task({
            title: req.body.title,
            done: false,
            created_at: new Date()
        })
        await new_task.save()
        return res.status(200).send({ message: 'Tarefa criada com sucesso!' })
    } catch {
        return res.status(500).send({ message: 'Erro ao criar tarefa.' })
    }
})

export default router