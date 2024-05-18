import joi from "joi";

const registerValidator = joi.object({
  email: joi.string().email().required(),
  first_name: joi.string().required(),
  last_name: joi.string().required(),
  password: joi.string().min(9).max(12).required(),
  // other fields...
});

const validateUserMiddleWare = async (req, res, next) => {
  const userPayload = req.body;
  try {
    await registerValidator.validateAsync(userPayload);
    next();
  } catch (error) {
    console.log(error);
    return res.status(406).send(error.details[0].message);
  }
};

export default validateUserMiddleWare;
