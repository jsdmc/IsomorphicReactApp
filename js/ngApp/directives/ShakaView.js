var ShakaView = function() {
    return {
        replace: true,
        restrict: 'E',
        template: angular.element(document.getElementById('shaka-view-template')).html(),
        link: function link() {
        },
    };
};

module.exports = ShakaView;