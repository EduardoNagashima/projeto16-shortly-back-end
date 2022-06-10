import db from "../db.js";

export async function authMiddleware(req, res, next){
    const {authorization} = req.headers;
    if (!authorization) return res.sendStatus(422);

    const token = authorization.replace('Bearer ', "");
    if(!token) return res.sendStatus(401);
    const session = await db.query(`
        SELECT * FROM sessions
        WHERE token = $1
    `,[token]);
    if (session.rowCount === 0){
        return res.sendStatus(401);
    }
    const user = await db.query(`
        SELECT * FROM users
        WHERE id = $1
    `,[session.rows[0].userId]);
    if (user.rowCount === 0 ){
        return res.sendStatus(401);
    }

    res.locals.user = user;
    next();
}