angular.module("site").controller("WorkDescriptionController", ["$routeParams", "$scope", "$location", "$timeout", "Work", "PAGES",
    function($routeParams, $scope, $location, $timeout, Work, PAGES)
    {
        var that = this;
        var work_id = $routeParams.id;
        console.log("load details for " + work_id);

        // plays css anim
        $(".workItemDesc").show().addClass("fade-in");

        // mouse down outside closes description popup
        $timeout(function()
        {
            $(document).click(function(event)
            {
                $(document).off("click");
                $(".workItemDesc button").trigger("click");
            });
        }, 200);

        Work.all()
            .success(function(data)
            {
                var workItems = data.data;
                $.each(workItems, function(idx, val)
                {
                    if (val.id === work_id)
                    {
                        $scope.work = val;
                    }
                });
            })
            .error(function()
            {
                alert("error loading work json");
            });

        this.closeDesc = function()
        {
            $(".workItemDesc").removeClass("fade-in").addClass("fade-out");
            $timeout(function(){$(".workItemDesc").removeClass("fade-out").hide();}, 500);
            $location.path(PAGES.WORK);
        };
    }]);