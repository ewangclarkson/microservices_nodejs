const mongoose = require('mongoose');
const config = require('config');


main()
    .then(() => console.log('Connected to the database'))
    .catch((err) => console.error("Could not connect to the database", err));


async function main() {
    const hostUri = config.get('db.host') + '/' + config.get('db.dbName');
    await mongoose.connect(hostUri);
}