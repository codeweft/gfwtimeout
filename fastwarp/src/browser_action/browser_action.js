angular.module('todoApp', [])
    .controller('TodoController', ['$scope', function ($scope) {
        $scope.todos = [
            {text:'use.typekit.net', done:true},
            {text:'googleapis.com', done:false}];

        $scope.addTodo = function () {
            $scope.todos.push({text: $scope.todoText, done: false});
            $scope.todoText = '';
            var todoJSON = JSON.stringify($scope.todos);
            console.log("Local Storage SET");
            console.log(todoJSON);
            chrome.runtime.sendMessage({method:"setStorage", newData:todoJSON});
            console.log("Local Storage SET DONE");
        };

        $scope.remaining = function () {
            var count = 0;
            angular.forEach($scope.todos, function (todo) {
                count += todo.done ? 0 : 1;
            });
            return count;
        };

        $scope.getItems = function() {
            console.log("Local Storage GET");
            var response = {};
            chrome.runtime.sendMessage({method:"getStorage",extensionSettings:"storage"}, function(resp) {
                console.log(resp.extdata);
                response = resp.extdata;
            });
            console.log(response);

            var items = JSON.stringify(response);
            console.log(items);
            console.log("Local Storage GET DONE");
            return response;
        }

        $scope.archive = function () {
            var oldTodos = $scope.todos;
            $scope.todos = [];
            angular.forEach(oldTodos, function (todo) {
                if (!todo.done) $scope.todos.push(todo);
            });
        };
    }]);

