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
    }



  }
})
