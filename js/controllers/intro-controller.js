angular.module("site").controller("IntroCtrl", ["$http", function($http)
{
    var that = this;

    $http.get("json/intro.json")
        .success(function(data)
        {
            console.log("intro.json loaded!")
            that.intro = data.data;
        })
        .error(function()
        {
            alert("error loading intro json");
        });
}]);