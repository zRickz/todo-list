import { Router } from 'express'
import Task, { TaskDocument } from '../../models/task.model'

interface toUpdate {
    title?: string;
    done?: boolean
}


const router = Router()

router.put('/update/:id', async (req, res) => {
    if (!req.params.id) {
        return res.status(422).send({ message: 'Por favor, indique o ID.' })
    }

    const toUpdate: toUpdate = {
        title: req.body.title,
        done: req.body.done
    }

    if (!toUpdate) {
        return res.status(422).send({ message: 'Por favor, indique um título ou estado para ser atualizado.' })
    }

    const taskID = req.params.id
    
    const updated_task: TaskDocument | null = await Task.findByIdAndUpdate(taskID, toUpdate)

    if (!updated_task) {
        console.log('Tarefa não encontrada')
        return res.status(404).send({ message: 'Tarefa não encontrada.' })
    }

    return res.status(200).send({ message: 'Tarefa atualizada com sucesso!' })

})

export default router