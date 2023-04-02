import Joi from "joi";



export const addPostSchema=Joi.object({
    _id:Joi.string().hex().length(24).required(),
    post:Joi.string().min(3).max(1000),
})

export const UpdateSchema=Joi.object({
    email:Joi.string().email().required(),
    post:Joi.string().min(3).max(1000),
    _id:Joi.string().hex().length(24).required(),
})

export const DeleteSchema=Joi.object({
    _id:Joi.string().hex().length(24).required(),
    email:Joi.string().email().required()
})

export const getpostSchema=Joi.object({
    _id:Joi.string().hex().length(24).required()
})

export const addcommentSchema=Joi.object({
    _id:Joi.string().hex().length(24).required(),
    comment:Joi.string().min(3).max(1000),
})

export const deletecommentSchema=Joi.object({
    _id:Joi.string().hex().length(24).required(),
    comment:Joi.string().min(3).max(1000),
    email:Joi.string().email().required()
})

export const likeSchema=Joi.object({
    postId:Joi.string().hex().length(24).required(),
    userId:Joi.string().hex().length(24).required()
})

export const dislikeSchema=Joi.object({
    postId:Joi.string().hex().length(24).required(),
    userId:Joi.string().hex().length(24).required()
})

export const publicSchema=Joi.object({
    _id:Joi.string().hex().length(24).required(),
})

export const privateSchema=Joi.object({
    _id:Joi.string().hex().length(24).required(),
})

