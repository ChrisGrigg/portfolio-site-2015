angular.module("site", ["ngRoute"]).config(function($routeProvider)
{
    console.log("adding routes");
    $routeProvider
        .when("/", {})
        .when("/" + HEATHER.WORK_PAGE, {})
        .when("/" + HEATHER.PROFILE_PAGE, {})
        .when("/" + HEATHER.CONTACT_PAGE, {})
        .when("/" + HEATHER.WORK_PAGE + "/:id", {
            templateUrl: "templates/work-description-template.html",
            controller: "WorkDescriptionController",
            controllerAs: "workDescCtrl"
        })
        .otherwise({ redirectTo: "/" });
});