var shakaBraCtrl = require('../controllers/shakaBrahCtrl');

var ShakaView = function () {
    return {
        replace: true,
        restrict: 'E',
        template: angular.element(document.getElementById('shaka-view-template')).html(),
        link: function link(scope, element, attributes) {
            
        },
        controller: shakaBraCtrl
    };
};

module.exports = ShakaView;