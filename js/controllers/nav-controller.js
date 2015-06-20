angular.module("site").controller("NavCtrl", ["$location", "$rootScope", "$timeout", "Scroll", "PAGES",
    function($location, $rootScope, $timeout, Scroll, PAGES)
{
    var lastPage = "";

    // scroll content to selected section when route is one of main page categories (work, profile, contact)
    $rootScope.$on("$routeChangeSuccess", function(event)
    {
        var path = $location.path();
        path = path.substring(path.indexOf("/") + 1);
        var currentPage = Scroll.getCurrentPage();

        // returning from work desc needs bg removed
        if (lastPage !== currentPage && lastPage.indexOf(PAGES.WORK) !== -1 && currentPage.indexOf(PAGES.WORK) !== -1)
        {
            $(".workItemDesc").removeClass("fade-in").addClass("fade-out");
            $timeout(function(){$(".workItemDesc").removeClass("fade-out").hide();}, 500);
        }

        if (path !== currentPage)
        {
            console.log("route change from " + currentPage + " to " + path);

            if (path == "") path = PAGES.INTRO;
            if (path === PAGES.INTRO || path === PAGES.WORK || path === PAGES.PROFILE || path === PAGES.CONTACT)
            {
                Scroll.setCurrentPage(path);
            }
        }

        lastPage = path;
    });
}]);