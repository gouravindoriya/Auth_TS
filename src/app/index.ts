import express from 'express'
import type { Express } from 'express'

 function createExpressApplication():Express{
    const app=express()


    // Middleware

   


    //routes

    app.get('/',(req,res)=>{
        res.json({
            success: true,
            message: 'Fake data response',
            data: {
                id: 1,
                name: 'John Doe',
                email: 'john.doe@example.com',
                role: 'user'
            }
        })
    })

    //export
    return  app

}

export default createExpressApplication