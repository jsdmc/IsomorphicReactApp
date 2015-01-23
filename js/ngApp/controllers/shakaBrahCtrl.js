var shakaBrahAppCtrl = ['$scope', 'ItemsService', function($scope, ItemsService) {

    //init deafault values
    $scope.items = [];

    $scope.searchTerm = '';
    runSearch($scope.searchTerm);
    
    //perform search
    $scope.runSearch = runSearch;
    
    
    function runSearch(searchWord) {
        ItemsService.query({ searchTerm: searchWord }, function (data) {
            $scope.items = data;
        });
    }
    }];

module.exports = shakaBrahAppCtrl;