import { Router } from 'express'
import Task, { TaskDocument } from '../../models/task.model' 

const router = Router()

router.delete('/delete/:id', async (req, res) => {
    if (!req.params.id) {
        return res.status(422).send({ message: 'Por favor, indique o ID.' })
    }

    try {
        const taskID = req.params.id

        const task_to_delete: TaskDocument | null = await Task.findByIdAndDelete(taskID)

        if(!task_to_delete){
            return res.status(404).send({ message: 'Tarefa não encontrada.' })
        }

        return res.status(200).send({ message: 'Tarefa excluída com sucesso!' })
    } catch {
        return res.status(500).send({ message: 'Erro ao deletar tarefa.' })
    }
})

export default router