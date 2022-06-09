import Joi from 'joi';

const registerValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().max(255).lowercase().email(),
    password: Joi.string().required().min(8),
    lastname: Joi.string().required(),
    firstname: Joi.string().required(),
    userclass: Joi.string().required(),
    username: Joi.string().required(),
  });
  console.log('register validated');
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().lowercase(true).required(true).max(255).email(),
    password: Joi.string().required(true).min(8).password(),
  });
  return schema.validate(data);
};

export { loginValidation, registerValidation };
