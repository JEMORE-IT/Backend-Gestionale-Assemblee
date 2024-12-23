# Template Backend

## Setup

1. Clona il repository:
    ```sh
    git clone <repository-url>
    ```

2. Installa le dipendenze:
    ```sh
    npm install
    ```

3. Configura le variabili d'ambiente:
    Crea un file `.env` nella directory principale e aggiungi le seguenti variabili:
    ```env
    DATABASE_HOST=<your-database-host>
    DATABASE_PORT=<your-database-port>
    DATABASE_USER=<your-database-user>
    DATABASE_PASSWORD=<your-database-password>
    DATABASE_NAME=<your-database-name>
    USERNAME_LOGIN=<your-username>
    PASSWORD=<your-hashed-password>
    ```

    Per generare la password hashata, puoi utilizzare il file `hash.js` presente nel progetto:
    ```sh
    node hash.js <your-password>
    ```

4. Avvia il server:
    ```sh
    npm start
    ```

## Documentazione delle API

### Autenticazione

- **POST /authentication/login**
    - Descrizione: Effettua il login di un utente.
    - Parametri:
        - `username` (string)
        - `password` (string)
    - Risposta:
        - `200 OK`: Token JWT
        - `401 Unauthorized`: Credenziali non valide

- **GET /authentication/verify-token**
    - Descrizione: Verifica la validità del token JWT.
    - Risposta:
        - `200 OK`: Token valido
        - `401 Unauthorized`: Token non valido

### Assemblee

- **GET /assembly/**
    - Descrizione: Ottiene tutte le assemblee.
    - Risposta:
        - `200 OK`: Lista delle assemblee

- **GET /assembly/:id**
    - Descrizione: Ottiene i dettagli di una specifica assemblea.
    - Parametri:
        - `id` (number): ID dell'assemblea
    - Risposta:
        - `200 OK`: Dettagli dell'assemblea
        - `404 Not Found`: Assemblea non trovata

- **POST /assembly/**
    - Descrizione: Crea una nuova assemblea.
    - Parametri:
        - `date` (string): Data dell'assemblea
    - Risposta:
        - `201 Created`: Assemblea creata
        - `400 Bad Request`: Parametri non validi

- **PUT /assembly/:id**
    - Descrizione: Aggiorna i dettagli di una specifica assemblea.
    - Parametri:
        - `id` (number): ID dell'assemblea
        - `luogo` (string): Luogo dell'assemblea
        - `scopo` (string): Scopo dell'assemblea
        - `orarioCostituzione` (string): Orario di costituzione
        - `orarioScioglimento` (string): Orario di scioglimento
    - Risposta:
        - `200 OK`: Assemblea aggiornata
        - `404 Not Found`: Assemblea non trovata

- **DELETE /assembly/:id**
    - Descrizione: Elimina una specifica assemblea.
    - Parametri:
        - `id` (number): ID dell'assemblea
    - Risposta:
        - `200 OK`: Assemblea eliminata
        - `404 Not Found`: Assemblea non trovata

### Presenze

- **GET /presence/**
    - Descrizione: Ottiene tutte le presenze.
    - Risposta:
        - `200 OK`: Lista delle presenze

- **GET /presence/:id**
    - Descrizione: Ottiene i dettagli di una specifica presenza.
    - Parametri:
        - `id` (number): ID della presenza
    - Risposta:
        - `200 OK`: Dettagli della presenza
        - `404 Not Found`: Presenza non trovata

- **GET /presence/assembly/:id**
    - Descrizione: Ottiene tutte le presenze per una specifica assemblea.
    - Parametri:
        - `id` (number): ID dell'assemblea
    - Risposta:
        - `200 OK`: Lista delle presenze
        - `404 Not Found`: Assemblea non trovata

- **POST /presence/**
    - Descrizione: Crea una nuova presenza.
    - Parametri:
        - `presenza` (string): Tipo di presenza
        - `assembly` (number): ID dell'assemblea
        - `member` (number): ID del socio
    - Risposta:
        - `201 Created`: Presenza creata
        - `400 Bad Request`: Parametri non validi

- **DELETE /presence/:id**
    - Descrizione: Elimina una specifica presenza.
    - Parametri:
        - `id` (number): ID della presenza
    - Risposta:
        - `200 OK`: Presenza eliminata
        - `404 Not Found`: Presenza non trovata

- **POST /presence/bulk-create**
    - Descrizione: Crea più presenze in blocco.
    - Parametri:
        - `body` (array): Array di presenze
    - Risposta:
        - `201 Created`: Presenze create
        - `400 Bad Request`: Parametri non validi

### Membri

- **GET /member/**
    - Descrizione: Ottiene tutti i membri.
    - Risposta:
        - `200 OK`: Lista dei membri

- **GET /member/:id**
    - Descrizione: Ottiene i dettagli di un specifico membro.
    - Parametri:
        - `id` (number): ID del membro
    - Risposta:
        - `200 OK`: Dettagli del membro
        - `404 Not Found`: Membro non trovato

- **POST /member/**
    - Descrizione: Crea un nuovo membro.
    - Parametri:
        - `name` (string): Nome del membro
        - `surname` (string): Cognome del membro
    - Risposta:
        - `201 Created`: Membro creato
        - `400 Bad Request`: Parametri non validi

- **DELETE /member/:id**
    - Descrizione: Elimina un specifico membro.
    - Parametri:
        - `id` (number): ID del membro
    - Risposta:
        - `200 OK`: Membro eliminato
        - `404 Not Found`: Membro non trovato

### Deleghe

- **GET /delegation/**
    - Descrizione: Ottiene tutte le deleghe.
    - Risposta:
        - `200 OK`: Lista delle deleghe

- **GET /delegation/:id**
    - Descrizione: Ottiene i dettagli di una specifica delega.
    - Parametri:
        - `id` (number): ID della delega
    - Risposta:
        - `200 OK`: Dettagli della delega
        - `404 Not Found`: Delega non trovata

- **POST /delegation/**
    - Descrizione: Crea una nuova delega.
    - Parametri:
        - `delegante` (number): ID del delegante
        - `delegato` (number): ID del delegato
    - Risposta:
        - `201 Created`: Delega creata
        - `400 Bad Request`: Parametri non validi

- **DELETE /delegation/:id**
    - Descrizione: Elimina una specifica delega.
    - Parametri:
        - `id` (number): ID della delega
    - Risposta:
        - `200 OK`: Delega eliminata
        - `404 Not Found`: Delega non trovata

- **POST /delegation/bulk-create**
    - Descrizione: Crea più deleghe in blocco.
    - Parametri:
        - `body` (array): Array di deleghe
    - Risposta:
        - `201 Created`: Deleghe create
        - `400 Bad Request`: Parametri non validi

### Voti

- **GET /vote/**
    - Descrizione: Ottiene tutti i voti.
    - Risposta:
        - `200 OK`: Lista dei voti

- **GET /vote/:id**
    - Descrizione: Ottiene i dettagli di un specifico voto.
    - Parametri:
        - `id` (number): ID del voto
    - Risposta:
        - `200 OK`: Dettagli del voto
        - `404 Not Found`: Voto non trovato

- **POST /vote/**
    - Descrizione: Crea un nuovo voto.
    - Parametri:
        - `assembly` (number): ID dell'assemblea
        - `member` (number): ID del socio
        - `vote` (string): Voto espresso
    - Risposta:
        - `201 Created`: Voto creato
        - `400 Bad Request`: Parametri non validi

- **DELETE /vote/:id**
    - Descrizione: Elimina un specifico voto.
    - Parametri:
        - `id` (number): ID del voto
    - Risposta:
        - `200 OK`: Voto eliminato
        - `404 Not Found`: Voto non trovato

- **POST /vote/bulk-create**
    - Descrizione: Crea più voti in blocco.
    - Parametri:
        - `body` (array): Array di voti
    - Risposta:
        - `201 Created`: Voti creati
        - `400 Bad Request`: Parametri non validi