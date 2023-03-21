import nodemailer from 'nodemailer';
import 'dotenv/config';
import handlebars from "handlebars";
import path from 'path';
import fs from 'fs';

class ExpressMailer{
    public async initTransporter(){
        try {

            const transporter = await nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT) || 2525,
                auth:{
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
                logger: process.env.NODE_ENV === 'dev' ? true : false,
                debug: process.env.NODE_ENV === 'dev' ? true : false,
            })

            return transporter;
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Send an email in an appropriate way
     * @param from
     * @param to
     * @param subject
     * @param text raw text
     * @param type template name to send. see `@/views/`
     * @param DynamicData json data
     */
    public async sendMessage(from,to,subject,text,type,DynamicData){
        try {
            const transporter = await this.initTransporter();
            const emailType = type;
            const filePath = path.join(__dirname, `../views/${emailType}.html`);
            const source = fs.readFileSync(filePath, 'utf-8').toString();
            const template = handlebars.compile(source);
            const replacements: Object = DynamicData;
            const htmlToSend = template(replacements);
            transporter.sendMail({from,to,subject,text,html: htmlToSend}, (err,info) => {
                if(err){
                    console.log(err)
                }
            });
        } catch (error) {
            console.log(error)
        }
    }
}

export default ExpressMailer
