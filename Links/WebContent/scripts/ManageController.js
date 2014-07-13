linksApp.controller('ManageController', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
    document.title = 'Entries';
    
	var url = '/dirigible/js/Links/entries.js';
	
	$http.get(url)
	.success(function(data){
		$scope.data = data;
        $scope.data = convertToSafeHtml($scope.data, $sce);
	});
	
	$scope.selectedEntry;
    $scope.operation = 'show';
    $scope.newEntry = null;
    $scope.errorMessage = null;
	
	$scope.showInfoForEntry = function(entry) {
		if($scope.operation==='show'){
			if($scope.selectedEntry === entry){
				$scope.showEntry = false;
				$scope.selectedEntry = null;
				entry._selected_ = false;
			}else{
				for(var i = 0 ; i < $scope.data.length; i ++){
					$scope.data[i]._selected_ = false;
				}
				entry._selected_ = true;
				$scope.showEntry = true;
				$scope.selectedEntry = entry;
			}
		}
	}
			
	$scope.setOperation = function(operation){
        switch(operation){
            case 'new':
              if($scope.operation != 'new'){
                  $scope.operation = 'new';
              }else{
                  $scope.operation = 'show';
              }
              
            changeFormState();
            break;
          case 'update':
            if($scope.operation != 'update'){
               if($scope.selectedEntry){
                   $scope.operation = 'update';
                   changeFormState();
               }else{
                   alert("Please select an entry to be updated");
                   $scope.operation = 'show';
               }
            }else{
              $scope.operation = 'show';
            }
            break;
          case 'delete':
            if($scope.operation != 'delete'){
              $scope.operation = 'delete';
            }else{
              $scope.operation = 'show';
            }
            break;
          default:
            $scope.operation = 'show';
            break;
        }
    }
            
    $scope.confirmAction = function(){
        switch($scope.operation){
            case 'show':
                changeFormState();
                break;
            case 'new':
                if(checkRecordValidity($scope.newEntry)) {
                    newEntry($scope.newEntry);
                    changeFormState();
                }
                break;
            case 'update':
                $scope.selectedEntry.value = $('#new-record-fields .row .col-xs-6:first-child .form-control').val();
                $scope.selectedEntry.description = $('#new-record-fields .row .col-xs-6:nth-child(2) .form-control').val();
                
                if(checkRecordValidity($scope.selectedEntry)) {
                    updateEntry($scope.selectedEntry);
                    changeFormState();
                }   
                break;
        }
    }

    $scope.cancelAction = function(){
        refreshData();
        
        changeFormState();
    }

   $scope.delete = function(){
        if($scope.selectedEntry){
             var confirmed = confirm('Do you realy want to delete the selected entry?');
        if(confirmed){
            delete $scope.selectedEntry._selected_;
            deleteEntry($scope.selectedEntry);
            $scope.operation = 'show';
        }
       }else{
           alert('Please select row from the table.');
       }
   }
            
	function newEntry(entry) {
		delete $scope.newEntry._selected_;
		$http.post(url, entry)
		.success(function(){
			refreshData();
			$scope.selectedEntry = null;
            $scope.operation = 'show';
            $scope.newEntry = null;
            $scope.errorMessage = null;
		})
		.error(function(response){
			$scope.errorMessage = response.err.message;
		});
	}
	
	function updateEntry(entry){                
		delete $scope.selectedEntry._selected_;
		$http.put(url, entry)
		.success(function(){
			refreshData();
            $scope.operation = 'show';
            $scope.errorMessage = null;
		})
		.error(function(response){
			$scope.errorMessage = response.err.message;
		});
	}
			
	function deleteEntry(entry){
		var primaryKey;
		primaryKey = "entry_id";
		var deleteUrl = url+"?"+primaryKey+"="+entry[primaryKey];
		$http.delete(deleteUrl)
		.success(function(){
			refreshData();
            $scope.selectedEntry = null;
			$scope.errorMessage = null;
		})
		.error(function(response){
			$scope.errorMessage = response.err.message;
		})
	}
            
	function refreshData(){
		$http.get(url)
		.success(function(data){
			$scope.data = data;
            $scope.data = convertToSafeHtml($scope.data, $sce);
            $scope.newEntry = null;
            $scope.selectedEntry = null;
            $scope.operation = 'show';
            $scope.errorMessage = null;
		})
		.error(function(response){
			$scope.errorMessage = response.err.message;
		});
	}
}]);
