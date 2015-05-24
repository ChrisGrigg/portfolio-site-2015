angular.module("site").directive("flowers", function()
{
   return {
       restrict: "E",
       templateUrl: "templates/flowers-template.html",
       scope: {
           pos: "@"
       }
   } ;
});