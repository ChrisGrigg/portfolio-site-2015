angular.module("site").directive("hmrLaceRibbons", function()
{
    return {
        restrict: "E",
        templateUrl: "templates/lace-ribbons-template.html",
        scope: {
            ribbons: "@"
        },
        transclude: true
    };
});