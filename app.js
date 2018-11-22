/*
 * (C) Copyright 2014-2015 Kurento (http://kurento.org/)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

var path = require('path');
var url = require('url');
//var cookieParser = require('cookie-parser')
var express = require('express');
//var session = require('express-session')
var minimist = require('minimist');
//var ws = require('ws');
//var fs    = require('fs');
var https = require('https');

var argv = minimist(process.argv.slice(2), {
    default: {
        as_uri: 'https://0.0.0.0:8080/', // application server address
        ws_uri: 'ws://18.220.89.40:8888/kurento' // life saver! kurento media server
    }
});


var app = express();


/*
 * Server startup
 */
var asUrl = url.parse(argv.as_uri);
var port = asUrl.port;
//app.listen(process.env.PORT, process.env.IP);
app.listen(3000, "localhost");
//app.listen(3000, "127.0.0.1");
// routes
app.get('/camera',function(req,res){
	console.log("camera page sent");
  res.sendFile(path.join(__dirname + '/public/camera.html'));
});



app.get('/',function(req,res){
	console.log("tutorial page sent");
  res.sendFile(path.join(__dirname + '/public/tutorial.html'));
});


app.use(express.static(path.join(__dirname, 'public')));
