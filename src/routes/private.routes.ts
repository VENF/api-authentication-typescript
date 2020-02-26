import { Router } from 'express'
import passport from 'passport'
const router = Router();

router.get('/home', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('welcome')
})

export default router;