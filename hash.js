const bcrypt = require('bcrypt');

const password = process.argv[2];

if (!password) {
    console.error('Per favore, fornisci una password come parametro.');
    process.exit(1);
}

bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
        console.error('Errore durante la generazione dell\'hash:', err);
        process.exit(1);
    }
    console.log('Password hashata:', hash);
});