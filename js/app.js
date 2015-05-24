/**
 * Created by Heather Roberts on 13/03/2015
 */

var HEATHER = HEATHER || {};

(function()
{
    $(".workItemDesc").hide();

    console.log("width " + $(window).width() + " height " + $(window).height());
    $(window).resize(function()
    {
        console.log("width " + $(window).width() + " height " + $(window).height());
    });
})();



