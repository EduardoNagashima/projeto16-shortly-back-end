import db from "../db.js";

export async function getUsers(req, res){
    const {user} = res.locals;

    try {
        const userInfo = await db.query(`
            SELECT u.*, SUM(ul.views) AS "totalViews"
            FROM users u 
            JOIN "usersLinks" ul ON ul."userId" = u.id
            WHERE u.id = $1
            GROUP BY u.id
        `,[user.rows[0].id]);

        const urls = await db.query(`
        SELECT * FROM "usersLinks" ul
        WHERE ul."userId" = $1
        `,[user.rows[0].id]);

        const urlArr = urls.rows.map(el=>{
            const obj = {
                "id": el.id,
                "shortUrl": el.shortLink,
                "url": el.fullLink,
                "visitCount": el.views
            }
            return obj;
        });
    const obj = {
        "id": user.rows[0].id,
          "name": user.rows[0].name,
          "visitCount": userInfo.rows[0].totalViews,
          "shortenedUrls": urlArr
      }

      res.status(200).send(obj);
    } catch (e) {
        console.log(e);
        return res.status(500).send('Não foi possível se conectar com o BD');
    }
}

export async function getRanking(req, res){
    try{
        const ranking = await db.query(`
            SELECT u.id, u.name, COUNT(ul.id) as "linksCount", SUM(ul.views) AS "visitCount" 
            FROM "usersLinks" ul
            JOIN users u ON u.id = ul."userId"
            GROUP BY u.id
            ORDER BY "visitCount" DESC
            LIMIT 10
        `);
        res.status(200).send(ranking.rows);
    }catch (e){
        console.log(e);
        return res.status(500).send('Não foi possível se conectar com o BD');
    }
}