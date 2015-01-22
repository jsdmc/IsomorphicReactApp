var shakaBrahAppCtrl = ['$scope', 'ItemsService', function($scope, ItemsService) {
        $scope.items = [];

        ItemsService.query(function(data) {
            $scope.items = data;
        });
    }];

module.exports = shakaBrahAppCtrl;