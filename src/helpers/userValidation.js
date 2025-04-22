const Joi =  require('joi');

const createUserSchema = Joi.object({
    userName: Joi.string().alphanum().min(3).max(30).required(),
   profile: {
    firstName : Joi.string().alphanum().min(3).max(30).required(),
    lastName : Joi.string().alphanum().min(3).max(30),
    age: Joi.number().integer().min(1900).max(2013),
   }
});

  // middlewares/validateUser.js
  module.exports = function validateUserSchema(req, res, next) {
    const { error } = createUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };

const updateUserSchema = Joi.object({
    userName: Joi.string().alphanum().min(3).max(30),
   profile: {
    firstName : Joi.string().alphanum().min(3).max(30),
    lastName : Joi.string().alphanum().min(3).max(30),
    age: Joi.number().integer().min(1900).max(2013),
   }
});
// Middleware
module.exports = function validateUpdateUser(req, res, next) {
    const { error } = updateUserSchema.validate(req.body, { abortEarly: false });
  
    if (error) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        details: error.details.map(detail => detail.message),
      });
    }
  
    next();
  }


