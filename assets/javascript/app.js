//=============================== Global Variables ===========================================

// create an array called trains
let trains = [];



//=============================== Functions ===================================================

function displayCurrentTime() {
    //time from moment js
    const now = moment().format('LT');
    // grab the time div on html and display it
    $('#current-time').text(`Current time (MST): ${now}`);
};


function getTrain() {
    // prevent the button from reloading the page
    event.preventDefault();
    // this creates an object for each train the user adds
    let train = {};
    // this updates the object with the user input from the form
    train.trainName = $('#train-name').val().trim();
    train.destination = $('#train-destination').val().trim();
    train.trainTime = $('#hours').val().trim() + ':' + $('#minutes').val().trim();
    train.frequency = $('#train-frequency').val().trim();
    //this function will ensure that a number was entered for the frequency
    if (!checkFrequency(train.frequency)) {
        return;
    }
    // this adds the train into the trains array
    trains.push(train);
    //call necessary functions
    time(train);
    storage(trains);
    displayTrain(train);
};

// checks to see if the userInput for frequency are actually numbers
function checkFrequency(x) {
    const isnum = /^[0-9]+$/.test(x);
    return isnum;
};


function time(x) {
    //takes the train time
    x.firstTimeConverted = moment(x.trainTime, "hh:mm");
    //console.log(x.firstTimeConverted);
    //this gives the difference in minutes from the first time converted and now
    x.diffTime = Math.abs(moment().diff(moment(x.firstTimeConverted), "minutes"));
    //console.log(x.diffTime);
    // this will give the time since last arrival
    x.tRemain = x.diffTime % x.frequency;
    //console.log(x.tRemain);
    // this will give the remaining minutes left until next arrival
    x.minutesAway = x.frequency - x.tRemain;
    //console.log(x.minutesAway);
    // this will give the time of the next arrival
    x.nextArrival = moment().add(x.minutesAway, "minutes").format("hh:mm a");
    //console.log(x.nextArrival);
};


function displayTrain(x) {
    //This block of code will create the table and fill the values with the user input, prepending it to the table
    let newTrain = '<tr>';
    newTrain += `<th scope= "row"> ${x.trainName} </th>`;
    newTrain += `<td> ${x.destination} </td>`;
    newTrain += `<td> ${x.frequency} </td>`;
    newTrain += `<td> ${x.nextArrival} </td>`;
    newTrain += `<td> ${x.minutesAway} </td>`;
    newTrain += '</tr>';
    $('#trains-table').prepend(newTrain);
};

// this deletes anything the user typed in the form after values were grabbed
function eraseForm() {
    $('.form-control').val('');
};

//this will set any new trains to local storage
function storage(x) {
    localStorage.setItem('train', JSON.stringify(x)) || [];
};

//this updates the next time of arrival and minutes away
function updateTrains() {
    $('#trains-table').text('');
    for (let i = 0; i < trains.length; i++) {
        time(trains[i]);
        $('#trains-table').text(displayTrain(trains[i]));
    }
};


//=============================== Main Process ==============================================


//this will update the current time every second
setInterval(displayCurrentTime, 1000);

//this gets the objects in local storage and displays them to the table
//if there is nothing in local storage it sets equal to an empty array
trains = (JSON.parse(localStorage.getItem("train")));
if (!Array.isArray(trains)) {
    trains = [];
}

//initially update the times of all the trains in the table
updateTrains();

//this updates the time of arrival every second
setInterval(updateTrains, 1000);

//this will add new trains to the table and erase the user input on the form
$(document).on('click', '#trainSubmit', getTrain);
$(document).on('click', '#trainSubmit', eraseForm);