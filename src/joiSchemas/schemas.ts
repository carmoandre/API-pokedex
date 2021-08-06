import joi from "joi";

const signUpSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.any().equal(joi.ref("password")).required(),
});

const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
});

export { signUpSchema, signInSchema };
