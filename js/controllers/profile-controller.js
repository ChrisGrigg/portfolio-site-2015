angular.module("site").controller("ProfileCtrl", ["$http", function($http)
{
    var that = this;

    $http.get("json/profile.json")
        .success(function(data)
        {
            console.log("profile.json loaded!")
            that.profile = data.data;
        })
        .error(function()
        {
            alert("error loading profile json");
        });

    this.onViewCV = function()
    {
        window.open("assets/pdfs/Heather_Roberts_CV.pdf", "_blank");
    };
}]);