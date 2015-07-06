Modernizr.load([
    {
        load: [
            "libs/jquery-1.11.2.min.js",
            "//cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.1/angular.min.js",
            "libs/angular-route.min.js"
        ],
        complete: function()
        {
            console.log("JS libraries loaded!");
        }
    },
    {
        load: [
            "js/site.min.js"

            //"js/app.js",
            //"js/services/work-service.js",
            //"js/services/scroll-service.js",
            //"js/controllers/intro-controller.js",
            //"js/controllers/nav-controller.js",
            //"js/controllers/profile-controller.js",
            //"js/controllers/work-controller.js",
            //"js/controllers/work-description-controller.js",
            //"js/directives/paper-directive.js",
            //"js/directives/work-item-directive.js",
            //"js/directives/lace-ribbons-directive.js",
            //"js/directives/flowers-directive.js"
        ],
        complete: function()
        {
            console.log("site files loaded!");
            angular.element(document).ready(function() {
                console.log("initialise angular");
                angular.bootstrap(document, ['site']);
            });

            $("#preloader").hide();
            $("#site").show();
        }
    }
]);