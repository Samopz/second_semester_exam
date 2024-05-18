import joi from "joi";

const validateBlogMiddleWare = async (req, res, next) => {
  const blogPayload = req.body;
  try {
    await blogValidator.validateAsync(blogPayload);
    next();
  } catch (error) {
    console.log(error);
    return res.status(406).send(error.details[0].message);
  }
};

const blogValidator = joi.object({
  title: joi.string().min(5).max(255).required(),
  description: joi.string().min(5).max(255).optional(),
  body: joi.string().min(5).max(2000).optional(),
  tags: joi.array().items(joi.string()).min(1).max(5).required(),
  author: joi.string().required(),
  timestamp: joi.date().default(Date.now()),
  state: joi.string().required(),
  read_count: joi.number().default(0),
  reading_time: joi.number().required(),
  createAt: joi.date().default(Date.now()),
  lastUpdateAt: joi.date().default(Date.now()),
});

export default validateBlogMiddleWare;
