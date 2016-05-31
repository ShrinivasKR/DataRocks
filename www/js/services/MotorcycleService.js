// www/js/services/MotorcycleService.js
angular.module('MotorcycleService', []).factory('Motorcycle', ['$http', function ($http) {

    return {
        // call to get all motorcycles
        get: function () {
            return $http.get('/api/motorcycles');
        },


        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new motorcycle
        create: function (motorcycleData) {
            return $http.post('/api/motorcycles', motorcycleData);
        }
    }

}]);