const User = require("../models/user");
const Logs = require("../models/logs");
const csv = require("csv-parser");
const fs = require("fs");
const router = require("express").Router();
const results = [];
var array = [];
const amqp = require('amqplib/callback_api');


fs.createReadStream("news.csv")
.pipe(csv({}))
.on("data",(data)=> results.push(data))
.on("end",() =>{ 
  var messageArray = results.map((item) => {
    return item.newsletterContent;
  });
//   for(const res in results){
//     if(results[res].newsletterContent === 'Welcome to Marvel'){
//     console.log(results[res].email);
//     }
// }
//   console.log(results[0].email);




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
        // Step 4: Send message to queue
        
        results.forEach((item) => {
            channel.sendToQueue(QUEUE, Buffer.from(item.newsletterContent));
            // console.log(`Message send ${QUEUE}`); 
        })
        // channel.sendToQueue(QUEUE, Buffer.from('hello from its coding time'));
        // console.log(`Message send ${QUEUE}`);
    })
})

// emailArray.forEach((item) => {
//   User.findOne({email:item}, (error,data) => {
//     if(error){
//       console.log(error);
//     }else{
//     //   console.log(item);
//     //   console.log(data.firstname);
//     //   console.log(data.lastname);
//     }
//   })
// });
});


// amqp.connect('amqp://localhost', (connError, connection) => {
//     if (connError) {
//         throw connError;
//     }
//     // Step 2: Create Channel
//     connection.createChannel((channelError, channel) => {
//         if (channelError) {
//             throw channelError;
//         }
//         // Step 3: Assert Queue
//         const QUEUE = 'codingtest'
//         channel.assertQueue(QUEUE);
//         // Step 4: Send message to queue
//         channel.sendToQueue(QUEUE, Buffer.from('hello from its coding time'));
//         console.log(`Message send ${QUEUE}`);
//     })
// })


// fs.createReadStream("news.csv")
// .pipe(csv({}))
// .on("data",(data)=> results.push(data))
// .on("end",() =>{ 
//   var messageArray = results.map((item) => {
//     return item.newsletterContent;
//   });
//   console.log(messageArray);


// });

