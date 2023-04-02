import Joi from "joi";

export const signUpSchema=Joi.object({
    name:Joi.string().min(3).max(80).required(),
    email:Joi.string().email().required(),
    password:Joi.string().pattern(/^[A-Z][a-z0-9]{3,30}$/).required(),
    rePassword:Joi.ref('password'),
})

export const signInSchema=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().pattern(/^[A-Z][a-z0-9]{3,30}$/).required()
})

export const UpdateSchema=Joi.object({
    name:Joi.string().min(3).max(80).required(),
    email:Joi.string().email().required(),
    password:Joi.string().pattern(/^[A-Z][a-z0-9]{3,30}$/).required(),
    _id:Joi.string().hex().length(24).required(),
})

export const DeleteSchema=Joi.object({
    _id:Joi.string().hex().length(24).required()
})

export const userLogoutSchema=Joi.object({
    _id:Joi.string().hex().length(24).required(),
})
