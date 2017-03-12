

  // var config = {
  //   apiKey: "AIzaSyDMUgV9hm5G80sB6E0VQabUWhsOo20nNiU",
  //   authDomain: "train-times-44d3b.firebaseapp.com",
  //   databaseURL: "https://train-times-44d3b.firebaseio.com",
  //   storageBucket: "train-times-44d3b.appspot.com",
  //   messagingSenderId: "333547846904"
  // };

  // firebase.initializeApp(config);


var trainData = new Firebase("https://train-times-44d3b.firebaseio.com")


$('#submitButton').on('click', function(){

  var trainName = $('#trainNameInput').val().trim();
  var destination = $('#destinationInput').val().trim();
  var firstTime = moment($('#timeInput').val().trim(), "HH:mm").format("");
  var frequency = $('#frequencyInput').val().trim();

  
  var newTrains = {
    name: trainName,
    tdestination: destination,
    tFirst: firstTime,
    tfreq: frequency,
  }

 
  trainData.push(newTrains);



  alert("Train successfully added!");


  $('#trainNameInput').val("");
  $('#destinationInput').val("");
  $('#timeInput').val("");
  $('#frequencyInput').val("");

  return false;
});

trainData.on("child_added", function(childSnapshot, prevChildKey){


  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().tdestination;
  var firstTime = childSnapshot.val().tFirst;
  var frequency = childSnapshot.val().tfreq;

  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");


  var currentTime = moment();


  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

  
  var tRemainder = diffTime % frequency;


  
  var tMinutesTillTrain = frequency - tRemainder;

  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  var nextTrainConverted = moment(nextTrain).format("hh:mm a");
  // 
  $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + "Every " + frequency + " minutes" + "</td><td>" + nextTrainConverted + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});

