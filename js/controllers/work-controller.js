angular.module("site").controller("WorkController", ["$location", "Work", function($location, Work)
{
    var that = this;

    Work.all()
        .success(function(data)
        {
            console.log("work.json loaded!");
            that.workItems = data.data;
        })
        .error(function()
        {
            alert("error loading work json");
        });
}]);