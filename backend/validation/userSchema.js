const Joi = require('joi');

const joiUserSchema = Joi.object({
    username: Joi.string().alphanum().min(5).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*\\.])[A-Za-z\\d!@#$%^&*\\.]{8,}$')).required().messages({
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        'string.min': 'Password must be at least {#limit} characters long',
        'any.required': 'Password is required',
      }),
});

module.exports = joiUserSchema;