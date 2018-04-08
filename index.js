class User {
    constructor(name) {
        this.name = name;
        this.events = [];
    }
}

class Event {
    //I change the Event from (naem, start, end) to this:
    constructor(date, start, end) {
        this.date = date;
        this.start = start;
        this.end = end;
    }
}

//a new class for chosen date in calendar, which contains the date and an array of 96 time slots (quarters) during the day
class DateChosen{
    constructor(date, alltimeslot){
        this.date = date;
        this.alltimeslot = alltimeslot;
    }
}


var users = [];
var dates = [];

// previous codes by Andrew:
/*for (var i = 0; i < 3; i++) {
    var u = new User("Name");
    
    for (var j = 0; j < 3; j++) {
        var start = new Date();
        var end = new Date();

        start.setHours(start.getHours() + j * 2 + i);
        end.setHours(start.getHours() + 2);

        u.events.push(new Event("name", start, end));
    }
    users.push(u);
}
*/


function addEvent() {
    var name = document.getElementById("name");

    // previous codes by Andrew:
    /*
    var time1 = document.getElementById("time1");
    var time2 = document.getElementById("time2");

    var date1 = new Date(time1.value);
    var date2 = new Date(time2.value);
    */

    //Choose time
    var date = document.getElementById("datepicker").value;
    console.log(date);//need to test if the date pick works good???
    var timeslot = new Array(96); // an array of quarters for a day

    var timesel1 = document.getElementById("timeList1");
    var timesel2 = document.getElementById("timeList2");
    var timesel3 = document.getElementById("timeList3");
    // ending time
    var timesel4 = document.getElementById("timeList4");
    var timesel5 = document.getElementById("timeList5");
    var timesel6 = document.getElementById("timeList6");

    // starting time
    var time1 = timesel1.value;
    var time2 = timesel2.value;
    var time3 = timesel3.value;
    // ending time
    var time4 = timesel4.value;
    var time5 = timesel5.value;
    var time6 = timesel6.value;

    //use option[selectedIndex] to get the actual option
    var from = timesel1.options[timesel1.selectedIndex].text + ":" + timesel2.options[timesel2.selectedIndex].text + " " + timesel3.options[timesel3.selectedIndex].text;
    var to = timesel4.options[timesel4.selectedIndex].text + ":" + timesel5.options[timesel5.selectedIndex].text + " " + timesel6.options[timesel6.selectedIndex].text;
    
    // create a new event with starting time and ending time
    var e = new Event(date, from, to);
    var userNumber = -1; // Set to -1 so it's easy to judge if the user's name already exists or not

    //check if the name exists in the users list
    for (var i = 0; i < users.length; i ++){
        if(name.value === users[i].name){
            userNumber = i;
        }
    }

    if(userNumber !== -1){
        users[userNumber].events.push(e);
    } else{
        // if the user not exists, add the user and then add the event
        var user = new User(name.value);

        users.push(user);

        user.events.push(e);
    }
    updateUI();

    // not only display the time period, we also need to save all these information into a global variable so we can check for free time slots in the check function
    var timeslotbusyfrom = time1 * 4 + time2 + time3;//calculate which quarter during a day
    var timeslotbusyto = time4 * 4 + time5 + time6;

    // store all entered time slots into the array with the name of the user.
    for (var j = timeslotbusyfrom; j < timeslotbusyto; j++){
        if(timeslot[j] !== undefined){
            timeslot[j].push(name.value);
        }
        else{
            timeslot[j] = [];
            timeslot[j].push(name.value);
        }
    }

    //need to do the same thing with username - to check if the date is already added to decide how to push the new date.
    dates.push(new DateChosen(date, timeslot));//add a new chosen date into the global array "dates" to save
}

function check(){

}

function updateUI() {
    var events = document.getElementById("events");
    events.innerHTML = "";

    for (var i = 0; i < users.length; i++) {
        var currentUser = users[i];

        var userName = document.createElement("span");
        userName.innerHTML = currentUser.name;


        events.appendChild(userName);
        events.appendChild(document.createElement("br"));

        for (var j = 0; j < currentUser.events.length; j++) {
            var event = currentUser.events[j];

            var element = document.createElement("span");
            element.innerHTML = event.date + ": " + event.start + ", " + event.end;
            
            events.appendChild(element);
            events.appendChild(document.createElement("br"));
        }
        events.appendChild(document.createElement("hr"));
    }
}