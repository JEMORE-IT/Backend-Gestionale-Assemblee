const fs = require('fs');
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

    // Leggi il file .env
    fs.readFile('.env', 'utf8', (err, data) => {
        if (err) {
            console.error('Errore durante la lettura del file .env:', err);
            process.exit(1);
        }

        let updatedEnv;
        if (data.includes('PASSWORD=')) {
            // Sostituisci il valore della variabile PASSWORD
            updatedEnv = data.replace(/PASSWORD=.*/, `PASSWORD=${hash}`);
        } else {
            // Aggiungi la variabile PASSWORD
            updatedEnv = `${data}\nPASSWORD=${hash}`;
        }

        // Scrivi il file .env aggiornato
        fs.writeFile('.env', updatedEnv, 'utf8', (err) => {
            if (err) {
                console.error('Errore durante la scrittura del file .env:', err);
                process.exit(1);
            }
            console.log('File .env aggiornato con successo.');
        });
    });
});