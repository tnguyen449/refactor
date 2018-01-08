(function() {
    'use strict';

    angular.module('BlurAdmin.pages')
        .directive('infoSlideshow', infoSlideshow);

    function infoSlideshow() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/components/Carousel/carousel.html',
            controller: 'CarouselController',
            controllerAs: 'carousel'
        }
    }
})();