var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $http) {  

$scope.user = {};
$scope.disabled = false;

$scope.fetch = function() {
	
		
	$http({
        url: 'http://localhost:8080/api',
        method: 'GET'      
    }).then(function (httpResponse) {
        console.log('response:', httpResponse);
		
		if (httpResponse.data) {
		
		var data = httpResponse.data;
		
		$scope.users = data;		
		$scope.user_options = Object.keys(data[0]);
		console.log($scope.user_options);
		}
		
    })
   }
   
$scope.add = function() {
	   
	$("#myModal").modal();   	   
	   
   }
   
$scope.addUser = function() {
	
	$scope.disabled = true;  
	console.log($scope.user);	
	
		var check = true;
	
	if ( ($scope.user_options.length - 1) != (Object.keys($scope.user)).length ) {
			check = false;
		}
	

    if (check) {
	
	$http({
        url: 'http://localhost:8080/add',
        method: 'POST' ,
        data    : $scope.user,
        headers : { 'Content-Type': 'application/json' } 		
    }).then(function (httpResponse) {
		
		$scope.user = {};
		
        console.log('Success response:', httpResponse);	

var data = httpResponse.data;
if (data.affectedRows == '1') {
	
	$scope.message = 'User number ' + data.insertId + ' has been inserted';
	$scope.fetch();
				
    }
	
	$scope.disabled  = false;
	},
	
	function (httpResponse) {
		
        console.log('Error response:', httpResponse);	
		
		$scope.message = 'Error occurred while inserting';
		$scope.disabled  = false;		
    }
	)	
	   
   }
   
else {
	$scope.disabled  = false;
	$scope.message = 'All of the fields should be filled in';
}

}   	
	


$scope.change = function(user) {
	
	$scope.changeUser = angular.copy(user);
	$("#myChangeModal").modal();  	
	
}

$scope.sendUserData = function() {
	
	console.log($scope.changeUser);
	
	
	$scope.disabled = true;  
		
		var check = true;
		
		var obj_keys = $scope.user_options;
	
	    console.log(obj_keys);
	
	    for (var i=0; i < obj_keys.length; i++) {
			
			var key = obj_keys[i];
			
			console.log($scope.changeUser[key]);
			
			if (!$scope.changeUser[key]) {
				console.log('Invalid option: ' +  obj_keys[i]);
			    check = false;	
			}
		}	
	

    if (check) {
	
	$http({
        url: 'http://localhost:8080/change',
        method: 'POST' ,
        data    : $scope.changeUser,
        headers : { 'Content-Type': 'application/json' } 		
    }).then(function (httpResponse) {
		
				
        console.log('Success response:', httpResponse);	

var data = httpResponse.data;
if (data.changedRows == '1') {
	
	$scope.message = 'User has been updated';
	$scope.fetch();
				
    }
	
	$scope.disabled  = false;
	},
	
	function (httpResponse) {
		
        console.log('Error response:', httpResponse);	
		
		$scope.message = 'Error occurred while updating';
		$scope.disabled  = false;		
    }
	)	
	   
   }
   
else {
	$scope.disabled  = false;
	$scope.message = 'All of the fields should be filled in';
}
	
}



$scope.delete = function(user) {
	$scope.deleteUser = angular.copy(user);
	$("#myDeleteModal").modal();  	
	
}


$scope.removeUser = function() {
	
	console.log($scope.deleteUser);
	$scope.dis = true;
	
	$http({
        url: 'http://localhost:8080/delete',
        method: 'POST' ,
        data    : $scope.deleteUser,
        headers : { 'Content-Type': 'application/json' } 		
    }).then(function (httpResponse) {
		
				
        console.log('Success response:', httpResponse);	

var data = httpResponse.data;
if (data.affectedRows == '1') {
	
	$scope.message = 'User has been deleted';
	$scope.fetch();
				
    }
	
	},
	
	function (httpResponse) {
		
        console.log('Error response:', httpResponse);	
		
		$scope.message = 'Error occurred while deleting';
		$scope.dis  = false;		
    }
	)	
	   
   }
   


$('#myModal').on('hidden.bs.modal', function (e) {
  $scope.message = '';
  $scope.disable  = false;
  $scope.dis  = false;
})

$('#myChangeModal').on('hidden.bs.modal', function (e) {
  $scope.message = '';
  $scope.disable  = false;
  $scope.dis  = false;
})

$('#myDeleteModal').on('hidden.bs.modal', function (e) {
  $scope.message = '';
  $scope.disable  = false;
  $scope.dis  = false;
})

});	
	




	
