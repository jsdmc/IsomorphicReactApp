var shakaBrahAppCtrl = ['$scope', 'ItemsService', function($scope, ItemsService) {
        $scope.items = [];

        ItemsService.query({searchTerm: ''}, function(data) {
            $scope.items = data;
        });
    }];

module.exports = shakaBrahAppCtrl;