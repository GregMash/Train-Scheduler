//=============================== Global Variables ===========================================

// create an array called trains
let trains = [];
//time from moment js
const now = moment().format('LT');


//=============================== Functions ===================================================

function displayCurrentTime() {
    const time = now;
    // grab the time div on html and display it
    $('#current-time').text(`Current time (MST): ${time}`);
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
        time(train);
        storage(trains);
        displayTrain(train);   
};


function checkFrequency(x) {
    const isnum = /^[0-9]+$/.test(x);
    return isnum;
};


function time(x) {
    //takes the train time and subtracts 1 year to come before current time
    x.firstTimeConverted = moment(x.trainTime, "hh:mm");
    //this gives the difference in minutes from the first time converted and now
    x.diffTime = moment().diff(moment(x.firstTimeConverted), "minutes");
    console.log(x.diffTime);
    // this will give the time since last arrival
    x.tRemain = x.diffTime % x.frequency;
    console.log(x.tRemain);
    // this will give the remaining minutes left until next arrival
    x.minutesAway = x.frequency - x.tRemain;
    console.log(x.minutesAway);
    // this will give the time of the next arrival
    x.nextArrival = moment().add(x.minutesAway, "minutes").format("hh:mm a");
    console.log(x.nextArrival);
};


function displayTrain(x) {
    // this deletes anything the user typed in the form after values were grabbed
    $('.form-control').val('');
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

function storage(x) {
    localStorage.setItem('train', JSON.stringify(x)) || [];
};


//=============================== Main Process ==============================================

//this displays the current time on load
displayCurrentTime();
//this will update the current time every second
setInterval(displayCurrentTime, 1000);

trains = (JSON.parse(localStorage.getItem("train")));
if (!Array.isArray(trains)) {
    trains = [];
}

for (let i = 0; i < trains.length; i++) {
    displayTrain(trains[i]);
}
//console.log(list);
console.log(trains);

//localStorage.clear();

$(document).on('click', '#trainSubmit', getTrain);
