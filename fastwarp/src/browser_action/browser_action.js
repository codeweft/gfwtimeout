angular.module('todoApp', [])
    .controller('TodoController', ['$scope', function ($scope) {
        $scope.todos = [
            {text: 'use.typekit.net', done: true},
            {text: 'googleapis.com', done: false}];

        $scope.addTodo = function () {
            $scope.todos.push({text: $scope.todoText, done: false});
            $scope.todoText = '';
            setItem("todoitems", $scope.todos)
        };

        $scope.remaining = function () {
            var count = 0;
            angular.forEach($scope.todos, function (todo) {
                count += todo.done ? 0 : 1;
            });
            return count;
        };

        $scope.archive = function () {
            var oldTodos = $scope.todos;
            $scope.todos = [];
            angular.forEach(oldTodos, function (todo) {
                if (!todo.done) $scope.todos.push(todo);
            });
        };
    }]);

logging = true;
function setItem(key, value) {
    try {
        log("Storing [" + key + ":" + value + "]");
        window.localStorage.removeItem(key);      // <-- Local storage!
        window.localStorage.setItem(key, value);  // <-- Local storage!
    } catch (e) {
        log("Error inside setItem");
        log(e);
    }
    log("Return from setItem" + key + ":" + value);
}

// Gets item from local storage with specified key.
function getItem(key) {
    var value;
    log('Retrieving key [' + key + ']');
    try {
        value = window.localStorage.getItem(key);  // <-- Local storage!
    } catch (e) {
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
    if (logging) {
        console.log(txt);
    }
}

//for communication with opts.js
var port = chrome.extension.connect({name: "Sample Communication"});
port.postMessage("Hi BackGround");
port.onMessage.addListener(function (msg) {
    console.log("message recieved" + msg);
});