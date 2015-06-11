angular.module("site").controller("NavCtrl", ["$location", "$rootScope", "Scroll", function($location, $rootScope, Scroll)
{
    var lastPage = "";

    // scroll content to selected section when route is one of main page categories (work, profile, contact)
    $rootScope.$on("$routeChangeSuccess", function(event)
    {
        var path = $location.path();
        path = path.substring(path.indexOf("/") + 1);
        var currentPage = Scroll.getCurrentPage();

        // returning from work desc needs bg removed
        if (lastPage !== currentPage && lastPage.indexOf(HEATHER.WORK_PAGE) !== -1 && currentPage.indexOf(HEATHER.WORK_PAGE) !== -1)
        {
            $(".workItemDesc").removeClass("fade-in").addClass("fade-out");
            setTimeout(function(){$(".workItemDesc").removeClass("fade-out").hide();}, 500);
        }

        if (path !== currentPage)
        {
            console.log("route change from " + currentPage + " to " + path);

            if (path == "") path = HEATHER.INTRO_PAGE;
            if (path === HEATHER.INTRO_PAGE || path === HEATHER.WORK_PAGE || path === HEATHER.PROFILE_PAGE || path === HEATHER.CONTACT_PAGE)
            {
                Scroll.setCurrentPage(path);
            }
        }

        lastPage = path;
    });
}]);