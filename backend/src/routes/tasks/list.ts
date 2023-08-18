import { Router } from 'express'
import Task, { TaskDocument } from '../../models/task.model'

const router = Router()

router.get('/', async (req, res) => {
    try {

        const tasks: Array<TaskDocument> | null = await Task.find({}) 

        if(!tasks){
            return res.status(404).send({ message: 'Nenhuma tarefa foi encontrada.' })
        }

        return res.status(200).send({ tasks })
    } catch {
        return res.status(500).send({ message: 'Erro ao listar tarefas' })
    }
})

export default router