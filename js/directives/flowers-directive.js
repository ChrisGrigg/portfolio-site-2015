angular.module("site").directive("hmrFlowers", function()
{
   return {
       restrict: "E",
       templateUrl: "templates/flowers-template.html",
       scope: {
           pos: "@"
       }
   } ;
});