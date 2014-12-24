var defaultColor = "blue";

function loadOptions() {
    var favColor = localStorage["favColor"];

    // valid colors are red, blue, green and yellow
    if (favColor == undefined || (favColor != "red" && favColor != "blue" && favColor != "green" && favColor != "yellow")) {
        favColor = defaultColor;
    }

    var select = document.getElementById("color");
    for (var i = 0; i < select.children.length; i++) {
        var child = select.children[i];
        if (child.value == favColor) {
            child.selected = "true";
            break;
        }
    }
}

function saveOptions() {
    var select = document.getElementById("color");
    var color = select.children[select.selectedIndex].value;
    localStorage["favColor"] = color;
}

function eraseOptions() {
    localStorage.removeItem("favColor");
    location.reload();
}


//localstorage

// Store item in local storage:
function setItem(key, value) {
    try {
        log("Storing [" + key + ":" + value + "]");
        window.localStorage.removeItem(key);      // <-- Local storage!
        window.localStorage.setItem(key, value);  // <-- Local storage!
    } catch(e) {
        log("Error inside setItem");
        log(e);
    }
    log("Return from setItem" + key + ":" +  value);
}

// Gets item from local storage with specified key.
function getItem(key) {
    var value;
    log('Retrieving key [' + key + ']');
    try {
        value = window.localStorage.getItem(key);  // <-- Local storage!
    }catch(e) {
        log("Error inside getItem() for key:" + key);
        log(e);
        value = "null";
    }
    log("Returning value: " + value);
    return value;
}

// Clears all key/value pairs in local storage.
function clearStrg() {
    log('about to clear local storage');
    window.localStorage.clear(); // <-- Local storage!
    log('cleared');
}

function log(txt) {
    if(logging) {
        console.log(txt);
    }
}