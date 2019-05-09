const express = require('express');
const router = express.Router();
const uuid = require('uuid');

const cars = require('../../entities/Cars');
const travelLogs = require('../../entities/TravelLogs');
const borrowLogs = require('../../entities/BorrowLogs');
const users = require('../../entities/Users');

const version = 36;
const chaincodeURL = "https://hyperledger-fabric.cfapps.eu10.hana.ondemand.com/api/v1/chaincodes/9ec9875c-45c2-4ae7-abca-714bb83c57e5-Second1/" + version
const accestoken = 'eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vcDIwMDExNzMwOTB0cmlhbC5hdXRoZW50aWNhdGlvbi5ldTEwLmhhbmEub25kZW1hbmQuY29tL3Rva2VuX2tleXMiLCJraWQiOiJrZXktaWQtMSIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhMmE1NzllNmQwMDg0ZTAyYTY4YmZlY2I4NzBiZDM4OSIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJ6ZG4iOiJwMjAwMTE3MzA5MHRyaWFsIiwic2VydmljZWluc3RhbmNlaWQiOiI4OTU1NTlkNi04MTQ1LTRlODAtOGIzNy1hZTY5N2Y1MjM4MWEifSwic3ViIjoic2ItODk1NTU5ZDYtODE0NS00ZTgwLThiMzctYWU2OTdmNTIzODFhIWIxMjA0NnxuYS00MjBhZGZjOS1mOTZlLTQwOTAtYTY1MC0wMzg2OTg4YjY3ZTAhYjE4MzYiLCJhdXRob3JpdGllcyI6WyJ1YWEucmVzb3VyY2UiXSwic2NvcGUiOlsidWFhLnJlc291cmNlIl0sImNsaWVudF9pZCI6InNiLTg5NTU1OWQ2LTgxNDUtNGU4MC04YjM3LWFlNjk3ZjUyMzgxYSFiMTIwNDZ8bmEtNDIwYWRmYzktZjk2ZS00MDkwLWE2NTAtMDM4Njk4OGI2N2UwIWIxODM2IiwiY2lkIjoic2ItODk1NTU5ZDYtODE0NS00ZTgwLThiMzctYWU2OTdmNTIzODFhIWIxMjA0NnxuYS00MjBhZGZjOS1mOTZlLTQwOTAtYTY1MC0wMzg2OTg4YjY3ZTAhYjE4MzYiLCJhenAiOiJzYi04OTU1NTlkNi04MTQ1LTRlODAtOGIzNy1hZTY5N2Y1MjM4MWEhYjEyMDQ2fG5hLTQyMGFkZmM5LWY5NmUtNDA5MC1hNjUwLTAzODY5ODhiNjdlMCFiMTgzNiIsImdyYW50X3R5cGUiOiJjbGllbnRfY3JlZGVudGlhbHMiLCJyZXZfc2lnIjoiNjZhNzcwYjkiLCJpYXQiOjE1NTc0MDQwMjksImV4cCI6MTU1NzQ0NzIyOSwiaXNzIjoiaHR0cDovL3AyMDAxMTczMDkwdHJpYWwubG9jYWxob3N0OjgwODAvdWFhL29hdXRoL3Rva2VuIiwiemlkIjoiYTYxY2RmNmQtMDc3OS00NWZmLTkxZDItMmE3YTlmN2E4YWMyIiwiYXVkIjpbInNiLTg5NTU1OWQ2LTgxNDUtNGU4MC04YjM3LWFlNjk3ZjUyMzgxYSFiMTIwNDZ8bmEtNDIwYWRmYzktZjk2ZS00MDkwLWE2NTAtMDM4Njk4OGI2N2UwIWIxODM2IiwidWFhIl19.dca4TWDeJqjNUdX6vCSviT1z_QvODZyhsZA7Jj-KgfDYahu9EoqnGpMoripVDJWDiMjJXjPNxhnNXKcpKOHCwzOOujJ-BuOr3UAFkzsgRSEUFYTDuTSDWUMejxCdqzp31lYi5tQ9jbK9AoraW5vzp2DYWHpDVRGv_vrFnEHyXGT_w3puqLwm8RXnXGTt4Gnj5tB5PXjZsxXkX9y5axxQ2DJbAn6tJXDPgJ3PQ0HvHkEC96rDwwtx5nnnXArCXcMbfvGRoFTA8xA25R-S36zt608vA2PLMlVlM7FRQxsAaeCFwmNtFt21Np03eQLZMshZsdSJKL9yM9KFQ2bQi2014VO7T1dXKk8DJn0wNbgJCgdkum9NaqQmjCKQW38XoC6BlUw21LQjKexRr1HudoVqqxoles4qXI6pGrQ-Jg8FtFMjp-yYkN7xrSOfm7ulh5tlpY454hgP8hYoYjKgyBwKIXwBV7Pc9Y7adb9I7oPBuyvF6jRTXy1wvaU9zshLETQsYpekZ3cpodt9lRfmy-0Rol927ZPEaRm94xPr2mAEJrxooxCTFVGaViIsTtG9HsJUI3MwmOPC9xwkpAbVDYk2IQEmBi6j6XeL6M4nek6uDAO-iXJ4Xczn218LOtMgap-aA4xmlM7svgWrLiLO04jlqpElSpjSDyotkv_y7GUWEuw'

//=========================GET ALL CARS==================
//STAND: fertig aber redirect geht noch nicht. = Liste wird nicht automatisch geupdated
router.get('/cars', (req, res) => {
  console.log('GETALLCARS --> /cars  clicked');
  url = chaincodeURL + "/cars"

  //empty whole Cars file first 
  cars.splice(0, cars.length);

  const request = require('request');
  request({
    url: url,
    headers: {
      'Authorization': 'Bearer ' + accestoken
    },
    rejectUnauthorized: false
  }, function (err, res) {
    if (err) {
      console.error(err);
    } else {

      //if you get a result, split it for each new line.
      //First and last line are [ and ].
      //All other lines are a String in JSON and can be added locally to cars
      var arr = String(res.body).split("\n");

      for (var i = 1; i < arr.length - 1; i++) {
        arr[i] = arr[i].substring(0, arr[i].length - 1);
        var carArr = JSON.parse(arr[i]);

        cars.push(carArr)

      }
    }
  });
  res.redirect('/');
})

//=========================GET ALL USERS==================
//STAND: fertig aber redirect geht noch nicht. = Liste wird nicht automatisch geupdated
router.get('/users', (req, res) => {
  console.log('GETALLUSERS --> /users  clicked');
  url = chaincodeURL + "/users"

  //empty whole Users file first 
  users.splice(0, users.length);

  const request = require('request');
  request({
    url: url,
    headers: {
      'Authorization': 'Bearer ' + accestoken
    },
    rejectUnauthorized: false
  }, function (err, res) {
    if (err) {
      console.error(err);
    } else {
      //if you get a result, split it for each new line.
      //First and last line are [ and ].
      //All other lines are a String in JSON and can be added locally to cars
      var arr = String(res.body).split("\n");

      for (var i = 1; i < arr.length - 1; i++) {
        arr[i] = arr[i].substring(0, arr[i].length - 1);
        var userArr = JSON.parse(arr[i]);
        users.push(userArr)

      }
    }
  });
  res.redirect('/');
})

//=========================GET ALL TRAVELLOGS==================
//STAND: fertig aber redirect geht noch nicht. = Liste wird nicht automatisch geupdated
router.get('/travelLogs', (req, res) => {
  console.log('GETTRAVELLOGS clicked ---> /travelLogs  + ' + req.body.travelLogID);

  const url = chaincodeURL + "/travelLogs"

  //empty whole TravelLogs file first 
  travelLogs.splice(0, travelLogs.length);

  const request = require('request');
  request({
    url: url,
    method: "GET",
    headers: {
      'Authorization': 'Bearer ' + accestoken
    },
    rejectUnauthorized: false
  }, function (err, res) {
    if (err) {
      console.error(err);
    } else {
      var arr = String(res.body).split("\n");

      for (var i = 1; i < arr.length - 1; i++) {
        arr[i] = arr[i].substring(0, arr[i].length - 1);
        var travelLogArr = JSON.parse(arr[i]);

        travelLogs.push(travelLogArr);

      }
    }
  });
  res.redirect('/');
})

//=========================GET ALL BORROWLOGS==================
//STAND: fertig aber redirect geht noch nicht. = Liste wird nicht automatisch geupdated
router.get('/borrowLogs', (req, res) => {
  console.log('GETBORROWLOGS  clicked ---> /borrowLogs');

  const url = chaincodeURL + "/borrowLogs"

  borrowLogs.splice(0, borrowLogs.length);

  const request = require('request');
  request({
    url: url,
    headers: {
      'Authorization': 'Bearer ' + accestoken
    },
    rejectUnauthorized: false
  }, function (err, res) {
    if (err) {
      console.error(err);
    } else {
      var arr = String(res.body).split("\n");

      for (var i = 1; i < arr.length - 1; i++) {
        arr[i] = arr[i].substring(0, arr[i].length - 1);
        var borrowLogsArr = JSON.parse(arr[i]);

        borrowLogs.push(borrowLogsArr);

      }
    }
    res.resume;
  });
  res.redirect('/');
});

//=========================POST A CAR==================
//STAND: 
router.post('/cars', (req, res) => {
  // res.send(req.body);


  const newCar = {
    id: req.body.id,
    km: req.body.km,
    borrowId: req.body.borrowId,
  }

  var car = JSON.stringify(newCar);
  console.log("IN POST A CAR " + newCar);

  /*
  if(!newCar.id || !newCar.km){
      res.status(400).json({
          msg: ' Plese include id and km'
      });
  }
*/

  const url = chaincodeURL + "/cars/" + newCar.id;
  console.log(url);

  const request = require('request');
  request({
    url: url,
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accestoken,

    },
    body: car,

    //rejectUnauthorized: false
  }, function (err, res) {
    if (err) {
      console.error(err);
    } else {
      console.log(res.body);

    }
  });

  cars.push(newCar);
  //res.json(members);
  res.redirect('/');

});


//GETS ALL MEMBERS
/*
router.get('/api/members', (req, res) => {
    console.log("IN GET ALL MEMBERS")
    res.json(cars);
})
*/

//GETS ONE MEMBER
router.get('/api/members:id', (req, res) => {
  const found = members.some(member => member.id == parseInt(req.params.id))

  if (found) {
    res.json(members.filter(member => member.id == parseInt(req.params.id)));
  } else {
    res.status(400).json({
      msg: 'No such user with id: ' + req.params.id + ' found'
    })
  }
})


//GETS ALL CARS
router.get('/cars:id', (req, res) => {
  console.log("pressed CAR with Id:" + req.body)
  /*
  const url ="https://hyperledger-fabric.cfapps.eu10.hana.ondemand.com/api/v1/chaincodes/9ec9875c-45c2-4ae7-abca-714bb83c57e5-Second1/15/cars/4"

  const request = require('request');
  request({
      url: url,
      headers: {
         'Authorization': 'Bearer '+accestoken
      },
      rejectUnauthorized: false
    }, function(err, res) {
          if(err) {
            console.error(err);
          } else {
            console.log(res.body);
            var car = JSON.parse(res.body);
            cars.push(car);
          }
      });
      res.redirect('/');
  */
});


module.exports = router;