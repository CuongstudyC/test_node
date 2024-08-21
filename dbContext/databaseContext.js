const { Client } = require("pg");
const { database_url } = require("../Config/config");

const client = new Client(database_url);

client.connect().then(() => console.log("success")).catch(() => console.log(e));

module.exports = client;
