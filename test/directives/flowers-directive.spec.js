describe("hmrFlowers", function() {

    var scope,
        element;


    beforeEach(module("site", "templates/flowers-template.html"));

    beforeEach(inject(function($rootScope, $compile) {
        scope = $rootScope.$new();

        element = angular.element("<hmr-flowers pos='left'></hmr-flowers>");

        $compile(element)(scope);
        scope.$digest();
    }));


    it("should have class background-flowers", function() {
        var elClassName = element.find("div")[0].className;
        var classes = elClassName.split(/\s+/g);
        expect(classes).toContain("background-flowers");
    });

    it ("should add value passed in as 'pos' attribute as a class", function() {
        var elClassName = element.find("div")[0].className;
        var classes = elClassName.split(/\s+/g);
        expect(classes).toContain("left");
    });
});