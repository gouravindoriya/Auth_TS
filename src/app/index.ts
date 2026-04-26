import express from 'express'
import type { Express } from 'express'
import {authRouter} from '../auth/auth.routes.js'
import {isauthenticated} from '../comman/auth.middleware/auth.middlerware.js'
import cors from 'cors'
function createExpressApplication():Express{
    const app=express()
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use('/auth/',authRouter)
    app.get('/dashboard',isauthenticated,(req,res)=>{
        res.json(req.body)
    })
    return  app

}

export default createExpressApplication