// db.js
const { Pool } = require('pg');
require('dotenv').config();


const config = {
    user: process.env.DB_USER, // avnadmin
    password: process.env.DB_PASSWORD, // your password
    host: process.env.DB_HOST, // tele-app-tele-app.f.aivencloud.com
    port: process.env.DB_PORT, // 21947
    database: process.env.DB_NAME, // defaultdb
    ssl: {
        rejectUnauthorized: true,
        ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUO6/JcsCm0h8iiZBXn5aOfUc3FpswDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvMDAxM2NjMzEtODExNi00Nzc0LTkwNWUtNTBkOGJhNzY2
MTUyIFByb2plY3QgQ0EwHhcNMjQxMDA5MTgxOTU2WhcNMzQxMDA3MTgxOTU2WjA6
MTgwNgYDVQQDDC8wMDEzY2MzMS04MTE2LTQ3NzQtOTA1ZS01MGQ4YmE3NjYxNTIg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAKq7DLEo
qGzKunp4tJAz8HIGqY8g7/POZFvdbX28Y8+m2t8pAzkYHJlFFAk+8/fd7vTwUDRL
QW1JLLcURTMexsZjp445qSkShDZNLbDppMFyMvz0zeiZZfJWeLYEWKZtMYIa7Qqq
Fytifm/JqKczYSi12ZZ3kn7+SOPDUoRFbBaBOnKhW0sci72Gsr0vWXE5oLPCQIgo
Z3rXIo2KSIlM3SjgN+C2StqC+jKczoKQauCYZKMonNJCaT8IvJKiPRodgmf27Chp
sXKImBDbTGrEZhyyitE1+I3vByX2/F3P/hfXupdQOm4HJAuZlq3qLj8zGYsEo821
jW2T0zGv3OypDZUSnYh0UWt1rtFG7pjCWp/RLwoVdD+BTvYhaFMUIuXmRot8PY0o
sAMq8Z//QPl7WxVWWqRYYUJw4afpjbbYFhafNEBhkAnyjDJ7CwiTD8STWAJCJxfK
thKcipfnu40uQsYVfDTKW35/EgXIa1TVcNQd6QEF8mJFzCHGROO0WBIzMQIDAQAB
oz8wPTAdBgNVHQ4EFgQUl97EmZ59SzxBVQBaGnJ0WSfI9XMwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAHjjvaEU18a+g5yB
B5J9ipyqlBp+0RokG/qjhJyDcwjbLHJhBtWvDJ0uXsLyNVy4H/NjdGWf0HCXshsk
Qr/l5jKaDfdbVGg4Fr9d6uRz6EzPwHt1hZhWSnhyKfg2uAlTKtlM6KPetsF9CdQ3
Y7Y9fl2vrTxSjA7SDl//tzfFYh5Y3UphvP9uM9k/0Vvl76p4o1NfEy5zVteiI+EY
ngKnYUQJyjbZ+LvvS3H4uLrJVT4ylGzJEvhtXZD5leivmEXVFbIj48ouhiHyeLlZ
sHzyDqCzXEHOHc+Q79d6hWtFgj2Rq0GDgm06cm+aInDmOYeN0AOAliDOrxAB97+4
ivby3rf6x79PagwuZY9o//10vH+drpvX3CrOgu6UbVPWIN/prG5VoRAmvMRDHaT2
SxdKXJ4Lxbg7AbN14Xyoc8W92micUMJ1ZL5QDV6yr9SkXYn49bcsSPHc/WL+7sKx
TM9EUIGUtvp87ccmBDJO0HZkDE1nFRgS+Rf/Q95Pux/tM352uw==
-----END CERTIFICATE-----`,
    },
};

// Create a new Pool instance
const pool = new Pool(config);

// Test PostgreSQL Connection
pool.connect((err) => {
    if (err) {
        console.error('Database connection error:', err.stack);
    } else {
        console.log('Connected to the database');
    }
});




// Export the pool for use in other files
module.exports = pool;

