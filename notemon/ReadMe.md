# Notemon | Simple Markdown Host

## Notemon Client

- add the server url to the .env file
`VITE_SERVER_URL=http://HOST:PORT`

- run the client
```bash
npm install
npm run dev
```


## Notemon Server

- add the server host & port to the .env file

`HOST=localhost`
`PORT=3000`

- run the server
```bash
npm install
node index.js
```

## Usage with Obsidian

the base directory used is /Notes/Hosted, so any obsidian vault should be created in this directory for hosting easily.
Folder scanning is recursive, so any subfolder will be scanned and hosted as well.
Use git extention for obsidian to keep vaults in sync

