/**
 * Created by Heather Roberts on 13/03/2015
 */

angular.module("site", ["ngRoute"])
    .constant("PAGES", {
        INTRO: "intro",
        WORK: "work",
        PROFILE: "profile",
        CONTACT: "contact"
    })
    .config(function($routeProvider, PAGES)
    {
        console.log("adding routes");
        $routeProvider
            .when("/", {})
            .when("/" + PAGES.WORK, {})
            .when("/" + PAGES.PROFILE, {})
            .when("/" + PAGES.CONTACT, {})
            .when("/" + PAGES.WORK + "/:id", {
                templateUrl: "templates/work-description-template.html",
                controller: "WorkDescriptionController",
                controllerAs: "workDescCtrl"
            })
            .otherwise({ redirectTo: "/" });
    });