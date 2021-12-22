# Newsletter

TASK 1:
    1. Created a mongoDB database cluster and connect it to the NodeJS application.
    2. Created a model user.js and a table in database and done the CRUD elements for that.
    3. Used Postman for the GET and POST methods and saved in the database.
    4. Works completely fine.

Postman Links.
1. Create - localhost:5000/api/users/create - POST
2. ReadAll - localhost:5000/api/users/getall - GET
3. Update - localhost:5000/api/users/update/:id - PUT
4. Delete - localhost:5000/api/users/delete/:id - DELETE


TASK 2:
    1. Created a csv file with email,content,name(header) and read the csv file and get the elements in 
       it.
    2. Used RabbitMQ to create a queue to send and consume the content.
    3. After consuming the content with seperate mail for seperate content we are sneding the mail with the corresponding header.
    4. Works completely fine.

Technology used:
    1. NodeJS
    2. mongoDB
    3. ExpressJS
    4. Postman
    5. RabbitMQ
    6. Nodemailer

Dependencies:
    1. amqplib
    2. csv-parser
    3. dotenc
    4. express
    5. jsonwebtoken
    6. mongoose
    7. nodemailer
    8. nodemon
    9. request

Database:
    1. USER SCHEMA
        1.firstname
        2.lastname
        3.email
        4.age

    2. LOGS SCHEMA
        1.fromemail
        2.toemail
        3.newsletterName
        4.response

    3. ERRORLOGS SCHEMA
        1.fromemail
        2.toemail
        3.content
        4.errorcode
        5.errorcommand
        6.response





