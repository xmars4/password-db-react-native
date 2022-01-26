const t = require(".");

const DB_USER = "admin";
const DB_PASSWORD = "admin";
const DB_URL = "cluster0.c7k47.mongodb.net";
const DB_NAME = "myFirstDatabase";
const SECRET_KEY = "something_secret";
const DB_CONNECTION_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_URL}/${DB_NAME}`;

let conn = t.helper.connect_to_db(DB_CONNECTION_URL);

(async () => {
    try {
        let user_coll = await t.info_coll.initialize_collection();
        let password = t.helper.hash_password("admin");
        console.log("after hash ", password);
        let data = await t.helper.insert_one(user_coll, { title: 1, content: "Trueeeeeeeeeeeeeeeeeeeeeeeeeeeee", user_id: "tatata", password: "lam j ma phai xoan" });
        console.log(data);
        process.exit(1);
    } catch (e) {
        // Deal with the fact the chain failed
        console.log(e);
    }
})();
