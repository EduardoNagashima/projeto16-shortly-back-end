import joi from "joi";

const userSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.ref('password')
});

export async function validationMiddleware (req, res, next){
    const user = req.body;

    const {error} = userSchema.validate(user);

    if (error) {
        return res.status(422).send(error.details);
    }

    res.locals.user = user;
    next();
}