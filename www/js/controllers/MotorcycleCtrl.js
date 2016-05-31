// public/js/controllers/NerdCtrl.js
angular.module('MotorcycleCtrl', []).controller('MotorcycleController', function ($scope, Motorcycle) {

    Motorcycle.get().
        success(function (data, status, headers, config) {
            $scope.motorcycles = data;
            console.log(data);
        }).
        error(function (data, status, headers, config) {
            // log error
        });
});