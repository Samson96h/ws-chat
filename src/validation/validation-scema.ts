import * as Joi from "joi";

export const validationSchema = Joi.object({
    PORT: Joi.number().required(),
    JWT_TEMP_SECRET: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRES_IN: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),
    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().required(),
    DATABASE_USER: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 9b84eb2 (update 13.2)
    ACCSESSKEYID: Joi.string().required(),
    SECRETACCESSKEY: Joi.string().required(),
    REGION: Joi.string().required(),
    BUCKET: Joi.string().required()
<<<<<<< HEAD
=======
>>>>>>> 839eab0532715c825f0a57dc1f31e79991e8080f
=======
>>>>>>> 9b84eb2 (update 13.2)
})