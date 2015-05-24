angular.module("site").directive("laceRibbons", function()
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