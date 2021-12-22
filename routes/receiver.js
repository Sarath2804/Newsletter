const User = require("../models/user");
const csv = require("csv-parser");
const fs = require("fs");
const router = require("express").Router();
const results = [];
var array = [];
const amqp = require('amqplib/callback_api');
var nodemailer = require('nodemailer');
const Logs = require("../models/logs");
const Errorlogs = require("../models/errorlogs");
 

// Step 1: Create Connection
amqp.connect('amqp://localhost', (connError, connection) => {
    if (connError) {
        throw connError;
    }
    // Step 2: Create Channel
    connection.createChannel((channelError, channel) => {
        if (channelError) {
            throw channelError;
        }
        // Step 3: Assert Queue
        const QUEUE = 'codingtest'
        channel.assertQueue(QUEUE);
        // Step 4: Receive Messages
        channel.consume(QUEUE, (msg) => {
            // console.log(`Message received: ${msg.content.toString()}`) // check whether message received
            //to get the corresponding mail_ids
            fs.createReadStream("news.csv")
            .pipe(csv({}))
            .on("data",(data)=> results.push(data))
            .on("end",() =>{
                var myObjEmail = (str) =>{
                    for(const res in results){
                        if(results[res].newsletterContent === str){
                        return results[res].email;
                        }
                    }}
                var myObjName = (str) =>{
                    for(const res in results){
                        if(results[res].newsletterContent === str){
                        return results[res].newsletterName;
                        }
                    }
                }
                    // console.log(myObjEmail(`${msg.content.toString()}`)); -- mailid
                    // console.log(myObjName(`${msg.content.toString()}`));  -- NewslettetContent
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                          user: 'pawarsarath@gmail.com',
                          pass: 'Chandysar@321'
                        }
                      });
                    
                      var mailOptions = {
                        from: 'pawarsarath@gmail.com',
                        to: myObjEmail(`${msg.content.toString()}`),     // toemail from csv
                        subject: myObjName(`${msg.content.toString()}`), // Newsletter Name from csv
                        text: `${msg.content.toString()}`
                      };

                      transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                        //   console.log(error); //ACK for mails not sent
                          var myObj = {
                            fromemail : mailOptions.from , toemail: mailOptions.to , content : mailOptions.text ,
                             errorcode: error.code, errorcommand:error.command,response:error.response
                        }
                        const newLogs = new Errorlogs(myObj).save();
                        } else { 
                          console.log('Email sent: ' + info.response); //ACK for email sent
                          var myObj = {
                              fromemail : mailOptions.from , toemail: mailOptions.to , response: info.response
                          }
                         const newLogs = new Logs(myObj).save();
                        }
                      });


             })
            // myObj(`${msg.content.toString()}`)

        }, {
            noAck: true
        })
    })
})




