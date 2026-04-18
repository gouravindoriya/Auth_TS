import express from 'express'
import type { Express } from 'express'
import {authRouter} from '../auth/auth.routes.js'
import {isauthenticated} from '../comman/auth.middleware/auth.middlerware.js'
function createExpressApplication():Express{
    const app=express()


    // Middleware
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

   


    //routes
    app.use('/auth/',authRouter)
    
    app.get('/dashboard',isauthenticated,(req,res)=>{
        res.json(req.body)
    })

    //export
    return  app

}

export default createExpressApplication