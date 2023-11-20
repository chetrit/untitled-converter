# untitled-converter

Official untitled-converter app github repository.

## Frontend

React typescript frontend for untitled-converter web app.

For development on local machine, it could easily be build with command ``npm build`` and run with command ``npm start`` at the root of the ``frontend``folder, with the necessary .env file present as well.

## Backend

Express typescript backend for untitled-converter web app.

For development on local machine, just run dockers using the ``docker-compose.yml`` file in the ``backend`` folder for development with the proper ``.env`` file.

```
docker-compose up --build -d
```

## Linter configuration

To make linter works properly for both frontend and backend, add the current settings to your vscode user ``settings.json`` file.
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

## Backend Unit Tests

To run the unit tests on the backend (located in the ``backend/tests``folder), you can just run the ``run-unit-tests`` script (It will run the postgres docker for having a mock database and launch tests locally using ``npm run test``).

```
./run-unit-tests
```

Coverage will automatically generated in different formats in the ``coverage`` folder.

## API Documentation

Api documentation gets generated automatically each time the backend gets launched in the ``swagger.yaml`` at the root of the ``backend`` folder.

## Authors
- [@Alexandre Chetrit](https://github.com/chetrit)
<!-- - [@Arnaud Issoire](https://github.com/username)
- [@Richard TBC](https://github.com/username)-->
- [Rasmus Wittrock](https://github.com/rwittrock) 
