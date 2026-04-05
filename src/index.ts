import createExpressApplication from './app/index.js'
import connectDB from './db/index.js'
import dotenv from 'dotenv'
dotenv.config()

async function main(){
    try {
        await connectDB()
        const app=createExpressApplication()
        app.listen(3000,()=>{
            console.log("http server running on port 3000")
        })
    } catch (error) {
        console.log
    }
}

main()

