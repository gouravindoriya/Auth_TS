import type { Response,Request } from "express";
import {registerPayloadModal,loginPayloadModal} from './zod/zod.modals.js'
import ApiErrorResponse from '../comman/utils/api.errors.response.js'
import ApiResponse from "../comman/utils/api.response.js";
import User from './auth.modal.js'
import { generateAccessToken } from '../comman/utils/jwt.utils.js';
const register=async (req:Request,res:Response)=>{
    try {
        const validationResult= await registerPayloadModal.safeParseAsync(req.body)
        
        if(!validationResult.success){
            return ApiErrorResponse.badRequest(res,"validation failed")
        }

        const { firstName, lastName, email, password } = validationResult.data

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return ApiErrorResponse.badRequest(res, 'Email already exists')
        }

        const name = [firstName, lastName].filter(Boolean).join(' ')
        const user = await User.create({
            name,
            email,
            password,
            role:"student"
        })

        return ApiResponse.created(res,"register user", {
            name: user.name,
            email: user.email,
            role: user.role,
        })
    } catch (error) {
        return ApiErrorResponse.internal(res)
    }

}


const login=async (req:Request,res:Response)=>{
     try {
        const validationResult= await loginPayloadModal.safeParseAsync(req.body)
        
        if(!validationResult.success){
            return ApiErrorResponse.badRequest(res,"validation failed in login modal, ensure you would send correct data")
        }
        
        const {email, password} = validationResult.data

        const user = await User.findOne({ email }).select("+password");
        if (!user) throw ApiErrorResponse.unauthorized(res,"Invalid Email");
        
        const isMatched=await user.comparePassword(password)
        if (!isMatched) throw ApiErrorResponse.unauthorized(res,"Invalid password");
        const { password: _password,createdAt:_createdAt,updatedAt:_updatedAt, ...safeUser } = user.toObject()
        
        const token=generateAccessToken(safeUser)

        return ApiResponse.ok(res,"login successfully",token)

 } catch (error) {
        return ApiErrorResponse.internal(res)
    }
}



export default{
register,
login
}
