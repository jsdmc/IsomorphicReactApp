var ItemsService = ['$resource', function($resource) {
    return $resource("/api/items/:id");
}];

module.exports = ItemsService;