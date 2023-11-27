import Joi from "joi";

export const memberValidator = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required()
})