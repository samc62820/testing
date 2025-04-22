const Joi =  require('joi');

const schema = Joi.object({
    userName: Joi.string().alphanum().min(3).max(30).required(),
   profile: {
    firstName : Joi.string().alphanum().min(3).max(30).required(),
    lastName : Joi.string().alphanum().min(3).max(30),
    age: Joi.number().integer().min(1900).max(2013),
   }
});

module.exports = schema;
