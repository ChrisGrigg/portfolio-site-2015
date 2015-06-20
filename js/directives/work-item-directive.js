angular.module("site").directive("hmrWorkItem", function(PAGES)
{
    return {
        restrict: "E",
        templateUrl: "templates/work-item-template.html",
        scope: {
            work: "="
        },
        controller: function($scope, $location)
        {
            $scope.loadWorkDesc = function(work)
            {
                $location.path("/" + PAGES.WORK + "/" + work.id);
            };
        }
    };
});