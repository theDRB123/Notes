# Notemon | Simple Markdown Host


To Run notemon, just install docker and execute the following command:
```
docker compose up -d
```

### Running the github webhooks:

just start the webserver, and it will listen to the webhooks, it simply executes a git pull 

## Usage with Obsidian

the base directory used is /Notes/Hosted, so any obsidian vault should be created in this directory for hosting easily.
Folder scanning is recursive, so any subfolder will be scanned and hosted as well.
Use git extention for obsidian to keep vaults in sync

