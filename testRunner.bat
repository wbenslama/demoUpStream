cd   C:\demoUpStream
echo Please select one of this environement iteg , Rec or dynam below
set /p ENV=Enter a value for ENV:

npx cypress run --browser chrome --spec  "cypress/e2e/src/Utils/basePage.js"  --env ENV=%ENV%s