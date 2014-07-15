linksApp.controller('LoginController', ['$scope', '$http', function($scope, $http) {
    document.title = 'Login';
        
// 	var url = '/dirigible/js/Links/users3.js';
	
// 	$http.get(url)
// 	.success(function(data){
// 		$scope.data = data;
//         console.log($scope.data);
// 	});
	
// 	$scope.selectedEntry;
//     $scope.operation = 'show';
//     $scope.newEntry = null;
//     $scope.errorMessage = null;
    
//     $scope.newEntry = function (entry){
//     	delete $scope.newEntry._selected_;
// 		$http.post(url, entry)
// 		.success(function(){
// 			$scope.selectedEntry = null;
//             $scope.operation = 'show';
//             $scope.newEntry = null;
//             $scope.errorMessage = null;
// 		})
// 		.error(function(response){
// 			$scope.errorMessage = response.err.message;
// 		});
// 	}
			
// 	$scope.deleteEntry = function (entry){
// 		var primaryKey;
// 		primaryKey = "user_id";
// 		var deleteUrl = url+"?"+primaryKey+"="+entry[primaryKey];
// 		$http.delete(deleteUrl)
// 		.success(function(){
//             $scope.selectedEntry = null;
// 			$scope.errorMessage = null;
// 		})
// 		.error(function(response){
// 			$scope.errorMessage = response.err.message;
// 		})
// 	}
            
//     $scope.refreshData = function (){
// 		$http.get(url)
// 		.success(function(data){
// 			$scope.data = data;
//             $scope.newEntry = null;
//             $scope.selectedEntry = null;
//             $scope.operation = 'show';
//             $scope.errorMessage = null;
// 		})
// 		.error(function(response){
// 			$scope.errorMessage = response.err.message;
// 		});
// 	}
    
//     $scope.loginAction = function () {
//         var entry = {name: "",
//                         pass: ""};
        
//         if(ensureLoginIsFilled() === null)
//             return;
            
//         entry.name = $('#name-field').val();
//         entry.pass = $('#name-field').val();
        
//         if(isAlreadyInDb($scope.data, entry) !== null) {
//             alert(1);
//             return;
//         }
            
//         $scope.newEntry(entry);
        
//         $scope.refreshData();
//     }
}]);
