export const globalErrorMiddleware= (err,req,res,next)=>{
    let code = err.statusCode || 500;
    res.status(code).json({status:code,err:err.message,stack:err.stack})
    }