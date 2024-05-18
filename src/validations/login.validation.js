import joi from "joi";

const loginValidator = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(9).max(120).required(),
});

const validateLoginMiddleWare = async (req, res, next) => {
  const loginPayload = req.body;
  try {
    await loginValidator.validateAsync(loginPayload);
    next();
  } catch (error) {
    console.log(error);
    return res.status(406).send(error.details[0].message);
  }
};

export default validateLoginMiddleWare;
