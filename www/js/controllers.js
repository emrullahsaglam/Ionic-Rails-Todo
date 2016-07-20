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

});
