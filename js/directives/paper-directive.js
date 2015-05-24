angular.module("site").directive("paper", function()
{
    return {
        restrict: "E",
        templateUrl: "templates/paper-template.html",
        scope: {
            title: "@",
            content: "@",
            colour: "@"
        },
        transclude: true
    };
});