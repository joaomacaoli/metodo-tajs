

npm pkg set type=module engines.node=$(node -v) author:joaomacaoli
npm i -D jest@29

npx jest --init
-- yes
-- no
-- node
-- no
-- v8
-- yes


  "scripts": {
    "test": "NODE_OPTIONS=--experimental-vm-modules npx jest --runInBand test/",
    "test:dev": "NODE_OPTIONS=--experimental-vm-modules npx jest --runInBand --watchAll test/",
    "test:debug": "node --experimental-vm-modules --inpect-brk node_modules/.bin/jest --runInBand --watchAll test/"
    }

npm i -g ntl
-- ntl ou nt no terminal




