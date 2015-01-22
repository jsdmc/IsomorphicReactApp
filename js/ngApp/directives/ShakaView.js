var ShakaView = function() {
    return {
        link: function(scope, element, attributes) {

        },
        restrict: "A",
        scope: true,
        template: function() {
            return angular.element(document.querySelector("#shaka-view-template")).html();
        }
    };
};

module.exports = ShakaView;