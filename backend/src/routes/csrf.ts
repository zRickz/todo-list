import { Router } from 'express'

const router = Router()

router.get('/', async (req, res) => {
    return res.send({ token: req.csrfToken() });
})

export default router