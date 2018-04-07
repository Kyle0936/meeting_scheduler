class User {
    constructor(name) {
        this.name = name;
        this.events = [];
    }
}

class Event {
    constructor(name, start, end) {
        this.name = name;
        this.start = start;
        this.end = end;
    }
}


var users = [];

// users[name.value] = { event1, event2 };

// var currentUser = users["abc"];
// if (currentUser !== undefined)


// for (var i = 0; i < 3; i++) {
//     var u = new User("Name");
    
//     for (var j = 0; j < 3; j++) {
//         var start = new Date();
//         var end = new Date();

//         start.setHours(start.getHours() + j * 2 + i);
//         end.setHours(start.getHours() + 2);

//         u.events.push(new Event("name", start, end));
//     }
//     users.push(u);
// }

// var user = new User("Joe");
// users.push(user);

updateUI();

function addEvent() {
    // console.log(users[0].name);
    // if(name === users[0].name){
    //         console.log("5");
    //     }
    var name = document.getElementById("name");

    // var timeList1 = document.getElementById("timeList1").value;

    // //var hours = timeList1.options[timeList1.selectedIndex].text;
    // console.log(timeList1);

    var time1 = document.getElementById("time1");
    var time2 = document.getElementById("time2");

    var date1 = new Date(time1.value);
    var date2 = new Date(time2.value);

    var e = new Event("Busy", date1, date2);
    var exist = false;
    var userNumber = -1;

    for (var i = 0; i < users.length; i ++){
        if(name.value === users[i].name){
            userNumber = i;
        }
    }

    if(userNumber !== -1){
        users[userNumber].events.push(e);
        //updateUI();
    } else{

        var user = new User(name.value);

        users.push(user);

        user.events.push(e);

        //updateUI();
    }
    updateUI();
}

var alltimeslot = new Array(96);

function check(){
    var time1 = document.getElementById("timeList1").value;
    var time2 = document.getElementById("timeList2").value;
    var time3 = document.getElementById("timeList3").value;
    var timeslotbusyfrom = time1 * 4 + time2 + time3;
    var timeslotbusyto = time4 * 4 + time5 + time6;
    for(int j = timeslotbusyfrom; j < timeslotbusyto; j++){
        alltimeslot[j].push(document.getElementById("name"));
    }
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
            element.innerHTML = event.name + ": " + event.start + ", " + event.end;
            
            events.appendChild(element);
            events.appendChild(document.createElement("br"));
        }
        events.appendChild(document.createElement("hr"));
    }
}