import joi from "joi";

export function signupValidation(body){
    const SignupSchema = joi.object({
        username : joi.string().min(3).max(100).trim().required(),
        email : joi.string().email().required(),
        password : joi.string().min(8).max(30).required()
    })

    return SignupSchema.validate(body)
}