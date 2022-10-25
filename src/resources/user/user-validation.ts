import Joi from 'joi';

const userSchemaValidator = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  phoneNumber: Joi.string().optional(),
});

export default userSchemaValidator;
