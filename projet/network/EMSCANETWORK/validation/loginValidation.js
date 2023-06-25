import Joi from "joi";

export function loginValidation(body) {
  const LoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required(),
  });

  return LoginSchema.validate(body);
}
