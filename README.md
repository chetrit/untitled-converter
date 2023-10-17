# untitled-converter

Official untitled-converter app github repository.

## Frontend

React typescript frontend for untitled-converter web app.

For development on local machine, it could easily be build with command ``npm build`` and run with command ``npm start`` at the root of the ``frontend``folder, with the necessary .env file present as well.

## Backend

To develop on the backend, just run the ``docker-compose.yml`` file in the ``backend`` folder for development with the proper ``.env`` file.

## Linter configuration

Please add the current settings to your vscode user ``settings.json`` file to make eslint work properly for both frontend and backend.
```json
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact"
    ],
```

## Authors
- [@Alexandre Chetrit](https://github.com/chetrit)
<!-- - [@Arnaud Issoire](https://github.com/baptisteauduge)
- [@Richard TBC](https://github.com/emilegurgand)
- [@Rasmus TBC](https://github.com/orgs/monaliza-epargne/people/jeremyelalouf) -->
