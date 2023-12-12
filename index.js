var Express = require('express')
const { MongoClient, Long } = require('mongodb');
var cors = require('cors');
const multer = require('multer')
const bcrypt = require('bcrypt');
const saltRounds = 10;


var app = Express()
var ObjectID = require('mongodb').ObjectId;
app.use(cors())

var CONNECTION_STRING = "mongodb+srv://waleed:waleed@cluster0.kflhdiz.mongodb.net/?retryWrites=true&w=majority"
var DATABASENAME = "test"
var database;

app.listen(5038, () => {

    MongoClient.connect(CONNECTION_STRING, (erorr, client) => {
        database = client.db(DATABASENAME);
        console.log('Mongo');



    })

})


app.get('/api/airbnb/GetProps', (req, res) => {
    if (req?.query.id) {
        database.collection('Listing').findOne({ _id: new ObjectID(req.query.id) }).then((result) => {
            // console.log(result)
            res.send(result);
        })
    } else {
        database.collection('Listing').find({}).toArray((error, result) => {

            res.send(result.slice(0, req.query.page));
        })
    }
})

app.post('/api/airbnb/AddProps', multer().none(), (req, res) => {
    database.collection('Listing').count({}, function (error, num) {
        database.collection('Listing').insertOne({
            title: req.body.title,
            description: req.body.description,
            imageSrc: req.body.imageSrc,
            createdAt: new Date(),
            roomCount: Long.fromInt(parseInt(req.body.roomCount)),
            category: req.body.category,
            bathroomCount: Long.fromInt(parseInt(req.body.bathroomCount)),
            locationValue: req.body.locationValue,
            guestCount: Long.fromInt(parseInt(req.body.guestCount)),
            price: Long.fromInt(parseInt(req.body.price)),
            userId: new ObjectID(req.body.userId),



        });
        res.json('Added Succesfully')

    })
})

app.patch('/api/airbnb/UpdateProps', multer().none(), (req, res) => {
    console.log(req.body.id)
    database.collection('Listing').count({}, function (error, num) {
        database.collection('Listing').updateOne(
            { "_id": new ObjectID(req.body.id) },
            {
                $set: {
                    title: req.body.title,
                    description: req.body.description,
                    imageSrc: req.body.imageSrc,
                    roomCount: Long.fromInt(parseInt(req.body.roomCount)),
                    category: req.body.category,
                    bathroomCount: Long.fromInt(parseInt(req.body.bathroomCount)),
                    locationValue: req.body.locationValue,
                    guestCount: Long.fromInt(parseInt(req.body.guestCount)),
                    price: Long.fromInt(parseInt(req.body.price)),




                }
            });
        res.json('Added Succesfully')

    })
})


app.delete('/api/airbnb/DeleteProp', async (req, res) => {
    await database.collection('Listing').deleteOne({
        _id: new ObjectID(req.query.id)

    })
    res.json('deleted Succesfully')

})


app.get('/api/airbnb/GetUsers', (req, res) => {
    if (req?.query.id) {
        database.collection('User').findOne({ _id: new ObjectID(req.query.id) }).then((result) => {
            // console.log(result)
            res.send(result);
        })
    } else {
        database.collection('User').find({}).toArray((error, result) => {

            res.send(result);
        })
    }
})

app.post('/api/airbnb/AddUsers', multer().none(), (req, res) => {

    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.hashedpassword, salt).then(function (hash) {

            database.collection('User').count({}, function (error, num) {
                database.collection('User').insertOne({
                    name: req.body.name,
                    email: req.body.email,
                    hashedpassword: hash,
                    createdAt: new Date(),
                    updatedAt: new Date(),





                });
                res.json('Added Succesfully')

            })
        });
    });
})

app.patch('/api/airbnb/UpdateUsers', multer().none(), (req, res) => {
    database.collection('User').count({}, function (error, num) {
        database.collection('User').updateOne(
            { "_id": new ObjectID(req.body.id) },{

            $set: {
            name: req.body.name,
            email: req.body.email,
            // hashedpassword: req.body.hashedpassword,
            updatedAt: new Date(),




        }}
        );
        res.json('Updated Succesfully')

    })
})


app.delete('/api/airbnb/DeleteUser', async (req, res) => {
    await database.collection('User').deleteOne({
        _id: new ObjectID(req.query.id)

    })
    res.json('deleted Succesfully')

})
