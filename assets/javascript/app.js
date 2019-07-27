$(document).ready(function() {

    var firebaseConfig = {
        apiKey: "AIzaSyDHn0H2n_SxLIKTmyHx4GWtzYWapvPzFxs",
        authDomain: "train-scheduler-9e82a.firebaseapp.com",
        databaseURL: "https://train-scheduler-9e82a.firebaseio.com",
        projectId: "train-scheduler-9e82a",
        storageBucket: "",
        messagingSenderId: "37214109688",
        appId: "1:37214109688:web:8e7e86e76111b537"
        };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();
  
    //on submit click
    
    $("#submitButton").on("click", function(event) {
    
    
      var name = $("#Tname").val().trim();
      var destination = $("#Tdestination").val().trim();
      var firstTrainTime = $("#TfirstTrainTime").val().trim();
      var frequency = $("#Tfrequency").val().trim();
    
      //clear the form after submitting the train
    
      $("#Tname").val("");
      $("#Tdestination").val("");
      $("#TfirstTrainTime").val("");
      $("#Tfrequency").val("");
    
      database.ref().push({
          name: name,
          destination: destination,
          firstTrainTime: firstTrainTime,
          frequency: frequency
      });
    
    });
    
    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());
    
    
    //new variables to get data from firebase
    
    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var time = childSnapshot.val().firstTrainTime;
    var frequency = childSnapshot.val().frequency;
    
    var firstTrainTimeConvert = moment(time, "hh:mm").subtract(1, "years");
    console.log(firstTrainTimeConvert);
    
    //var for timedifference bw current time and first train time
    var timeDiff = moment().diff(moment(firstTrainTimeConvert), "minutes");
    console.log("Difference in Time: " + timeDiff);
    
    //remainder 
    
    var timeRemainder = timeDiff % frequency;
    console.log (timeRemainder);
    
    //minutes until next train
    
    var nextTrainMin = frequency - timeRemainder;
    console.log ("Minutes until next train: " + nextTrainMin );
    
    //Next train time
     var nextTrainAdd = moment().add(nextTrainMin, "minutes");
     var nextArrivalTime = moment(nextTrainAdd).format("hh:mm");
     console.log ("Arrival Time: " + nextArrivalTime);
    
    //send all info to table
    
    $("#schedule").prepend("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrivalTime + "</td><td>" + nextTrainMin + "</td><td>");
    
    
    });
   
   });