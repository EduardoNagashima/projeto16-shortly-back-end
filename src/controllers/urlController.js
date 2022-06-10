import db from "../db.js";
import { customAlphabet } from 'nanoid';

export async function postUrl(req, res){
    const {user} = res.locals;
    const {url} = req.body;
    const nanoid = customAlphabet('1234567890abcdef', 8);
    const shortUrl = nanoid();
    try{
        await db.query(`
        INSERT INTO "usersLinks" ("fullLink","shortLink", "userId") VALUES ($1, $2, $3);
        `,[url, shortUrl, user.rows[0].id]);
        const obj = {
            "shortUrl": shortUrl
        }
        res.status(201).send(obj);
    } catch (e){
        console.log(e);
        return res.status(500).send('Não foi possível se conectar com o BD')
    }
}

export async function getUrlId(req, res){
    const {id} = req.params;

    try{
        const url = await db.query(`
            SELECT * FROM "usersLinks" 
            WHERE id = $1
        `,[id]);

        if (url.rowCount === 0) return res.sendStatus(404);

        const obj = {
            "id": id,
            "shortUrl": url.rows[0].shortLink,
            "url": url.rows[0].fullLink
        }
        return res.status(200).send(obj);
    } catch (e) {
        console.log(e);
        return res.status(500).send('Não foi possível se conectar com o BD')
    }
}

export async function convertUrl(req, res){
    const {shortUrl} = req.params;
    
    try{
        const linkInfo = await db.query(`
        SELECT * FROM "usersLinks"
        WHERE "shortLink" = $1
        `,[shortUrl]);

        if (linkInfo.rowCount === 0) return res.sendStatus(404);
        
        await db.query(`
            UPDATE "usersLinks"
            SET "views"= $1
            WHERE ID= $2
        `,[(parseInt(linkInfo.rows[0].views) + 1),linkInfo.rows[0].id]);

        return res.redirect(linkInfo.rows[0].fullLink);
    } catch (e) {
        console.log(e);
        return res.status(500).send('Não foi possível se conectar com o BD');
    }
}

export async function deleteUrl(req, res){
    const {id} = req.params;
    const {user} = res.locals;
    try{
        const url = await db.query(`
        SELECT * FROM "usersLinks"
        WHERE id = $1
        `,[id]);

        if (url.rowCount === 0 || url.rows[0].userId !==  user.rows[0].id) {
            return res.sendStatus(404);
        }

        await db.query(`
            DELETE FROM "usersLinks" 
            WHERE id = $1
        `,[id]);
        
        return res.sendStatus(204);
    } catch (e){
        console.log(e);
        return res.status(500).send('Não foi possível se conectar com o BD');
    }
}