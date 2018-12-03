//=============================== Global Variables ===========================================

// create an array called trains
const trains = [];










//=============================== Functions ===================================================

function displayCurrentTime() {
    //time from moment js
    const now = moment().format('LT');
    // grab the time div on html and display it
    $('#current-time').text(`Current time: ${now}`);
};

function getTrain() {
    // prevent the button from reloading the page
    event.preventDefault();

    // this creates an object for each train the user adds
    let train = {};
    // this updates the object with the user input from the form
    train.trainName = $('#train-name').val().trim();
    train.destination = $('#train-destination').val().trim();
    train.trainTime = $('#train-time').val().trim();
    train.frequency = $('#train-frequency').val().trim();
    // this deletes anything the user typed in the form after values were grabbed
    $('.form-control').val('');
    // this adds the train into the trains array
    trains.push(train);
    //This block of code will create the table and fill the values with the user input, prepending it to the table
    let newTrain = ('<tbody>');
    for (let i = 0; i < trains.length; i++) {
        newTrain += '<tr>';
        newTrain += '<td>' + train.trainName + '</td>';
        newTrain += '<td>' + train.destination + '</td>';
        newTrain += '<td>' + train.trainTime+ '</td>';
        newTrain += '<td>' + train.frequency + '</td>';
        newTrain += '</tr>';        
    }
    newTrain += '</tbody>';
    $('#trains-table').prepend(newTrain);
};







//=============================== Main Process ==============================================

//this displays the current time on load
displayCurrentTime();
//this will update the current time every 60 seconds
setInterval(displayCurrentTime, 60000);


$(document).on('click', '#trainSubmit', getTrain);
