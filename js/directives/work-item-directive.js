angular.module("site").directive("workItem", function()
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
                $location.path("/" + HEATHER.WORK_PAGE + "/" + work.id);
            };
        }
    };
});