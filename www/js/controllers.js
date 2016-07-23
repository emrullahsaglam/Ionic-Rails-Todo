angular.module('Controllers', [])

.controller('AppCtrl', function($scope, TodoHandler) {


  $scope.$root.todoNew = "";

  $scope.getTodos = function() {
    TodoHandler.getTodos(function(response) {
      $scope.todos = response;
    } , function(errorData) {})
  };

  $scope.getTodos();

  $scope.postTodo = function() {
    if ($scope.$root.todoNew) {
      $scope.data = {title: $scope.$root.todoNew, state : false};
      TodoHandler.postTodo($scope.data, function(data) {
        $scope.todos.push(data);
      })
      $scope.$root.todoNew = "";
    }
  };

  $scope.patchTodos = function(key){
    TodoHandler.patchTodos($scope.todos[key]);
  };

  $scope.deleteTodos = function() {
    
    if (angular.forEach($scope.todos, function(value, key) {

      if (value.state) {
        TodoHandler.deleteTodos($scope.todos[key], function(response) {
          console.log("Silinen : " + JSON.stringify(response));
        }, function() {
          console.log(value.id + " idli kayıt için bağlantı hatası.");
        })
      }

    })) {
      $scope.getTodos();
    }

  };

});
