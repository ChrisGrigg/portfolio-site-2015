angular.module("site").factory("Scroll", ["$location", function($location)
{
    var scrollObj = {},
        basePath = window.location.href;

    if (basePath.indexOf(".html") != -1) basePath = basePath.substring(0, basePath.indexOf(".html") + 5) + "#/";
    else if (basePath.indexOf(".net") != -1) basePath = basePath.substring(0, basePath.indexOf(".net") + 4) + "#/";

    $("#content").on("scroll", contentScrollHandler);


    /* Public functions */

    function getCurrentPage()
    {
        var currentPage;

        var scrollPos = $("#content")[0].scrollTop + $("#content")[0].offsetTop;
        var maxScrollPos = $("#content")[0].scrollHeight - $("#content")[0].clientHeight;

        //console.log("scrollPos " + scrollPos + " maxScrollPos " + maxScrollPos);

        if (scrollPos > 0 && scrollPos >= maxScrollPos - 100)
            currentPage = HEATHER.CONTACT_PAGE;
        else if (scrollPos >= $("#" + HEATHER.PROFILE_PAGE)[0].offsetTop - 100 && scrollPos < $("#" + HEATHER.CONTACT_PAGE)[0].offsetTop)
            currentPage = HEATHER.PROFILE_PAGE;
        else if (scrollPos >= $("#" + HEATHER.WORK_PAGE)[0].offsetTop - 100 && scrollPos < $("#" + HEATHER.PROFILE_PAGE)[0].offsetTop - 100)
            currentPage = HEATHER.WORK_PAGE;
        else
            currentPage = "";

        return currentPage;
    }

    function setCurrentPage(page)
    {
        // temporarily disable scroll listener
        $("#content").off("scroll");

        var selectedSection = $("#" + page)[0];

        // if loaded site with route set ie. www.heather-roberts.net/work, there won't be a value for offsetParent yet
        if (selectedSection.offsetParent)
            scrollToPage(selectedSection);
        else
            setTimeout(scrollToPage, 1000, selectedSection);
    }

    /* Private functions */

    function scrollToPage(selectedSection)
    {
        var newPage = $location.path();
        newPage = newPage.substring(newPage.indexOf("/") + 1);

        // set nav btn to selected state
        $("header nav a").removeClass("selected");
        $("." + newPage + "Btn").addClass("selected");

        // scroll page to start of selected section

        var offsetParent = selectedSection.offsetParent.offsetTop;
        var contentOffset = $("#content")[0].offsetTop;

        var scrollPos;
        if (selectedSection.id === HEATHER.INTRO_PAGE) scrollPos = 0;
        else scrollPos = selectedSection.offsetTop - contentOffset - offsetParent;
        var maxScrollPos = $("#content")[0].scrollHeight - $("#content")[0].clientHeight;
        scrollPos = Math.min(scrollPos, maxScrollPos);

        scrollTo($("#content")[0], scrollPos, 750,
            function()
            {
                setTimeout(function(){$("#content").on("scroll", contentScrollHandler)}, 200);
            });
    }

    function scrollTo(element, to, duration, callback)
    {
        if (duration < 0) return;

        scrollObj[element.id] = {element: element, to: to, duration: duration, callback: callback};
        scrollObj[element.id].interval = setInterval(scrollToElement, 10, element.id);
    }

    function scrollToElement(elementID)
    {
        var thisScrollObj = scrollObj[elementID];
        var element = thisScrollObj.element,
            to = thisScrollObj.to,
            duration = thisScrollObj.duration;

        var difference = to - element.scrollTop;
        var perTick = difference / duration * 10;
        element.scrollTop = element.scrollTop + perTick;

        thisScrollObj.duration -= 10;

        if (duration == 0)
        {
            clearInterval(thisScrollObj.interval);
            element.scrollTop = to;

            if (thisScrollObj.callback)
                thisScrollObj.callback.call();
        }
    }

    function contentScrollHandler()
    {
        // check if new section has scrolled into place
        var lastPage = $location.path();
        lastPage = lastPage.substring(lastPage.indexOf("/") + 1);
        var currentPage = getCurrentPage();

        // scrolled into new page, set path
        if (currentPage !== lastPage)
        {
            console.log("new route " + currentPage);
            window.location.href = basePath + currentPage;

            // set nav btn to selected state
            $("header nav a").removeClass("selected");
            if (currentPage == "") $(".navbar-brand").focus();
            else $("." + currentPage + "Btn").addClass("selected").focus();
        }
    }


    return {
        getCurrentPage: getCurrentPage,
        setCurrentPage: setCurrentPage
    };
}]);