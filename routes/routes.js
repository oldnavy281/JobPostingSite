const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const assert = require('assert');
const res = require('express/lib/response');
const { Router } = require('routes');
const { Console } = require('console');
const { stringify } = require('querystring');

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

let jobSchema = mongoose.Schema ({
    jobTitle: String,
    jobSalary: Number,
    jobDescription: String
});



// need to refactor so that login info and signup info can be passed to DB

let User = mongoose.model('people_collection', userSchema);
let Job = mongoose.model('job_collection', jobSchema);


let applySchema = mongoose.Schema ({
    applier: {type: mongoose.Schema.Types.ObjectId, ref: User},
    applyJob: {type: mongoose.Schema.Types.ObjectId, ref: Job},
});

let Applied = mongoose.model('applied_collection', applySchema);
// exports.home = (req, res) => {
//     User.find((err, person) => {
//         if(err) return console.error(err);
//         res.render('index', {
//             title: 'People List',
//             people: person
//         });
//     })
// };
exports.home = async (req, res) => {
    // Job.find(function(err, docs) {
    //     var jobChunks = [];
    //     var chunkSize = 2;
    //     for (var i = 0; i < docs.length; i += chunkSize) {
    //         jobChunks.push(docs.slice(i, i + chunkSize));
    //     }
  
    //     // log the `productChunks` variable to the console in order to verify the format of the data
    //     console.log(jobChunks);
  
    //     return res.render('home', {jobChunks});
    //   });
    var jobList = await Job.find({});
    //console.log(jobList);
    res.render('home', {jobList})
}


exports.signin = (req, res) => {
    res.render('signin');
}

exports.signupPage = (req,res) => {
    res.render('signup');
}

exports.jobs = (req, res) => {
    res.render('job');
}

exports.create = (req, res) => {
    res.render('create', {
        title: 'Create User'
    });
};

var currentUser = new User();

exports.apply = async (req, res) => {
    const jobID = req.params.id;

    var apply = await new Applied ({
        applier: currentUser._id,
        applyJob: jobID
    })
    
    //console.log(apply);
    apply.save().then(a => console.log(currentUser.username + ' has applied for ' + jobID)).catch(err => console.log(err));
    res.redirect('/');
    
}

exports.login = async (req, res) => {
    // model.findOne({name: new RegExp('^'+tempUser.username+'$', "i")}, (req, res) => {
    //     console.log(user.username + ' has logged in.').catch(err => console.log(err));
    // });

    User.findOne({
        username: req.body.username,
        password: req.body.password
    }).then(tempUser => alert(tempUser.username + ' has logged in.')).catch(err => console.log(err));
    currentUser = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });
    // console.log(await User.findOne({
    //     username: req.body.username,
    //     password: req.body.password
    // }));
    // console.log(currentUser);
    res.redirect('/');
}

exports.userProfile = async (req, res) => {
    var appliedList = await Applied.find({
        applier: currentUser._id
    });
    var jobList = [];
    for(const a of appliedList) {
            var j = await Job.find ({
            _id: a.applyJob
            });
            jobList.push(j[0]); 
    }
    console.log(jobList);
    console.log(appliedList);
    res.render('userProfile', {currentUser, jobList});
}

exports.fillTable = (req, res) => {
    Job.find(function(err, docs) {
        var jobChunks = [];
        var chunkSize = 2;
        for (var i = 0; i < docs.length; i += chunkSize) {
            jobChunks.push(docs.slice(i, i + chunkSize));
        }
  
        // log the `productChunks` variable to the console in order to verify the format of the data
        //console.log(jobChunks);
        
  
        return res.render('home', {jobChunks});
      });

    // Job.find({}).toArray(function(err, jobList){
    //         console.log(jobList.length())
    //         res.render('home', { 'home': jobList });
    //     })
    // var jobList = Job.find({});
    // Console.log(jobList);
    // res.render('home', {jobList})
}

exports.addJobs = (req, res) => {
    let job = new Job ({
        jobTitle: req.body.jobTitle,
        jobSalary: req.body.jobSalary,
        jobDescription: req.body.jobDescription
    });
    job.save().then(job => console.log(job.jobTitle + ' has been posted.')).catch(err => console.log(err));
    res.redirect('/');
}


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