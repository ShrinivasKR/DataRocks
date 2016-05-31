// public/js/controllers/NerdCtrl.js
angular.module('MotorcycleCtrl', []).controller('MotorcycleController', function ($scope, Motorcycle) {

    Motorcycle.get().
        success(function (data, status, headers, config) {
            $scope.motorcycles = data;
            
            $scope.brands = [];
            angular.forEach($scope.motorcycles, function (motorcycle) {
                $scope.brands.push(motorcycle.BrandName);
            });
            $scope.brands = $scope.brands.filter(function(item, i, ar){ return ar.indexOf(item) === i; })

            $scope.models = [];
            angular.forEach($scope.motorcycles, function (motorcycle) {
                $scope.models.push(motorcycle.ModelName);
            });
            $scope.models = $scope.models.filter(function(item, i, ar){ return ar.indexOf(item) === i; })
            
            $scope.sizes = [];
            angular.forEach($scope.motorcycles, function (motorcycle) {
                $scope.sizes.push(motorcycle.SizeName);
            });
            $scope.sizes = $scope.sizes.filter(function(item, i, ar){ return ar.indexOf(item) === i; })
            
            $scope.purposes = [];
            angular.forEach($scope.motorcycles, function (motorcycle) {
                $scope.purposes.push(motorcycle.PurposeName);
            });
            $scope.purposes = $scope.purposes.filter(function(item, i, ar){ return ar.indexOf(item) === i; })
            
            console.log(data);
        }).
        error(function (data, status, headers, config) {
            // log error
        });
});