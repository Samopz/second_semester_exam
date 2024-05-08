import Joi from "joi";

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  password: Joi.string().min(6).required(),
  // other fields...
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export function validateUser(user) {
  const { error } = registerSchema.validate(user);
    if (error) throw new Error(error.details[0].message);
}

export function validateLogin(user) {
  const { error } = loginSchema.validate(user);
  if (error) throw new Error(error.details[0].message);
}

export { registerSchema, loginSchema };