
import express from "express";
import type { Router } from "express";
// import 
import authController from "./auth.controller.js";

export const authRouter:Router=express.Router()

authRouter.post('/register', authController.register)

authRouter.post('/login',authController.login)


