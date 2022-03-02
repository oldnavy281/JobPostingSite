const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017/data';
mongoose.connect(url);
// Database Name
//const dbName = 'jobposting';

// Use connect method to connect to the server
// mongoose.connect(url, function(err, client) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");

  //});

  //client.close();
// const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;
//
// mongoose.connect('mongodb://localhost/data');
// {
//     useUnifiedTopology: true,
//     useNewUrlParser: true 
// }
//mongoose.set('useCreateIndex', true);
//mongoose.set('useFindAndModify', false);

let mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error'));
mdb.once('open', callback => {});

//await mongoose.createConnection(uri).asPromise();

let userSchema = mongoose.Schema ({
    firstName: String,
    lastName: String,
    dateOfBirth: String,
    gender: String,
    username: String,
    password: String
});

// need to refactor so that login info and signup info can be passed to DB

let User = mongoose.model('people_collection', userSchema);

// exports.home = (req, res) => {
//     User.find((err, person) => {
//         if(err) return console.error(err);
//         res.render('index', {
//             title: 'People List',
//             people: person
//         });
//     })
// };
exports.home = (req,res) => {
    res.render('home');
}

exports.signupPage = (req,res) => {
    res.render('signup');
}

exports.create = (req, res) => {
    res.render('create', {
        title: 'Create User'
    });
};

exports.signup = (req, res) => {
    let user = new User ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        username: req.body.username,
        password: req.body.password
    });
    user.save().then(user => console.log(user.firstName + ' ' + user.lastName + ' added.')).catch(err => console.log(err));
    // user.save((err, user) => {
    //     if(err) return console.error(err);
    //     console.log(req.body.firstName + ' ' + req.body.lastName + ' added.');
    // });
    res.redirect('/');
};

exports.edit = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if(err) return console.error(err);
        res.render('edit', {
            title: 'Edit User Profile',
            user
        })
    });
};

exports.editPerson = (req, res) =>{
    Person.findById(req.params.id, (err, person) => {
        if(err) return console.error(err);
        person.name = req.body.name;
        person.age = req.body.age;
        person.species = req.body.species;
        person.image = req.body.image;
        person.save((err, person) => {
            if(err) return consol.error(err);
            console.log(req.body.name + ' updated.');
        });
        res.redirect('/');
    })
};

exports.details = (req, res) => {
    Person.findById(req.params.id, (err, person) => {
        if(err) return console.error(err);
        person.name = req.body.name;
        person.age = req.body.age;
        person.species = req.body.species;
        person.image = req.body.image;
        res.redirect('/');
    }); 
};

exports.delete = (req, res) => {
    Person.findByIdAndDelete(req.params.id, (err, person) => {
        if(err) return console.error(err);
    });
    res.redirect('/');
};