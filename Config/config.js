require('dotenv').config();

module.exports =  {
 key: process.env.JWT_SECRET,
 database_url: process.env.DATABASE_URL
}