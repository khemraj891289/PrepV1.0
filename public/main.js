var mainApp = angular.module("prepApp", []);


mainApp.controller('uploadController', ['$scope','$http', function($scope, $http){
     $scope.update = function() {
        $http.post('/uploadfile',$scope.formData).
        success(function(response) {
            $scope.uploadstatus = response.data;
        }).error(function(response) {
            $scope.uploadstatus = "error in posting";
        })
    };
}]);

mainApp.controller('searchController', ['$scope','$http', function($scope, $http){
    var results = ' ';
    $scope.find = function(){
         $http.post('/searchfile', $scope.formData)
        .then(
          function (response) {
              $scope.results = JSON.stringify(response.data);
              console.log(JSON.stringify(response.data));
          },
          function (response) {
              $scope.getstatus = "No data found";
          });
        // $http.post('/searchfile',$scope.formData).
        // success(function(response) {
        //     results = JSON.stringify(response);
        //     console.log(JSON.stringify(response));
        // }).error(function(response) {
        //     $scope.getstatus = "No data found";
        // })
    };
}]);
