var ViewItem = function () {
    return {
        replace: true,
        restrict: 'A',
        template: angular.element(document.getElementById('view-item-template')).html(),
        scope: {
            item: '='
        },
        link: function link() {
        },
        controller: function controller() {
        }
    };
};

module.exports = ViewItem;