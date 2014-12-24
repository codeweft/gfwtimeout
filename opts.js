angular.module('todoApp', [])
    .controller('TodoController', ['$scope', function($scope) {
        $scope.todos = [
            {text:'use.typekit.net', done:true},
            {text:'googleapis.com', done:false}];

        $scope.addTodo = function() {
            $scope.todos.push({text:$scope.todoText, done:false});
            $scope.todoText = '';
        };

        $scope.remaining = function() {
            var count = 0;
            angular.forEach($scope.todos, function(todo) {
                count += todo.done ? 0 : 1;
            });
            return count;
        };

        $scope.archive = function() {
            var oldTodos = $scope.todos;
            $scope.todos = [];
            angular.forEach(oldTodos, function(todo) {
                if (!todo.done) $scope.todos.push(todo);
            });
        };

        $scope.checkUrl = function() {
            var count = 0;
            var string2 = 'a';
            var regex = new RegExp( string2, 'g' );
            angular.forEach($scope.todos, function(todo) {
                if(todo.done) {
                    if (url.match("/.*"+ todo.text +".*/")){
                        count = count + 1
                    }
                }
            });
            if (count > 0) return true;
            return false;
        };
    }]);



chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        return {cancel: checkUrl(details.url) != null};
    },
    {urls: ["<all_urls>"]},
    ["blocking"]);