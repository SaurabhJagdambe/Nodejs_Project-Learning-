var fs = require('fs')
var os = require('os')
const notes = require('./notes' )
var _ = require('lodash');

var user = os.userInfo();
console.log(user)

fs.appendFile("Name.txt",'Hi '+ user.username + '!\n', ()=>{console.log("File created")})