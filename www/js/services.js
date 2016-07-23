angular.module('Services', [])

.factory('TodoHandler', function($http) {

  var jobsUrl = "http://localhost:3000/jobs";

  return {
    getTodos : function(success, error) {
      $http({
        url : jobsUrl + ".json",
        method: "GET"
      }).success(function(data) {
        console.log("Veri çekildi");
        success(data);
      })
      .error(function(data) {
        console.log("Veri çekilemedi !");
        error(data);
      })
    },

    postTodo : function(todo, success) {
      $http({
        method : 'POST',
        url: jobsUrl + ".json",
        data : todo
      }).then(function successCallBack(response) {
        if (response.data.id) {
          console.log("Post başarılı");
          success({id: response.data.id, title: response.data.title, state : false});
        }
        else {
          console.log("Rails tarafında hata");
        }
      },
      function errorCallBack(response) {
        console.log("Hata");
      })
    },

    patchTodos : function(todo){
      $http({
        method : 'PATCH',
        url : jobsUrl + "/" + todo.id + ".json",
        data : todo
      }).then(function successCallBack(response) {
        console.log("Patch başarılı.");
        if (!response.data.id) {
          console.log("Veri işlenemedi.");
        }
      },
      function errorCallBack(response) {
        console.log("Veri gönderilemedi !");
      }
    );
  },

  deleteTodos : function(todo, success, error) {
    $http({
      method : "DELETE",
      url : jobsUrl + "/" + todo.id + ".json",
      data : {id: todo.id}
    }).then(function successCallBack(response) {
      success(response);
    },
    function errorCallBack(response) {
      error();
    });

  }



}
})
