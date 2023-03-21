
### Features
- Basic Login/Register uses (Json web token) with Authentication Middleware
- Simple Role Based Access Control in frontend (admin,user)
- CRUD Posts
- Send Emails via mailtrap.io
- Customizable Beautiful Sidebar

# Installation
Steps to run this project:

### Setup
copy .env.example to a new .env file and modify your personel info (db, mailtrap).

### Server

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command

### Client

1. Run `npm i` command
2. Run `npm run dev` command



# Configuration

### Nodemailer
to test emails, add your credentials after setting up `.env` file

### Build
the project's backend is written in typescript-express, so to deploy this application you must build it with the following command ``` npm run build ```

### Typeorm
TypeORM is an ORM that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms and can be used with TypeScript and JavaScript (ES5, ES6, ES7, ES8). By default, we use Mysql, but you can change it to your favorite DB driver.
