angular.module("site").factory("Work", ["$http", function WorkFactory($http)
{
    var workJsonGetReq;

    return {
        all: function()
        {
            if (!workJsonGetReq) workJsonGetReq = $http.get("json/work.json");
            return workJsonGetReq;
        }
    };
}]);