describe("hmrLaceRibbons", function() {

    var $compile;

    var scope,
        element;


    beforeEach(module("site", "templates/lace-ribbons-template.html"));

    beforeEach(inject(function(_$compile_, $rootScope) {
        $compile = _$compile_;
        scope = $rootScope.$new();

        element = angular.element("<hmr-lace-ribbons ribbons='style1'></hmr-lace-ribbons>");
        $compile(element)(scope);
        scope.$digest();
    }));


    it("should have class lacebreak", function() {
        var elClassName = element.find("div")[0].className;
        var classes = elClassName.split(/\s+/g);

        expect(classes).toContain("lacebreak");
    });

    it ("should add value passed in as 'ribbons' attribute as a class", function() {
        var elClassName = element.find("div")[0].className;
        var classes = elClassName.split(/\s+/g);

        expect(classes).toContain("style1");
    });

    it("should insert any child html into the directive's main div", function() {
        element = angular.element("<hmr-lace-ribbons ribbons='style1'><h1>Ratchet</h1></hmr-lace-ribbons>");
        $compile(element)(scope);
        scope.$digest();
        var h1El = element.find("div").eq(0).find("h1");

        expect(h1El.text()).toEqual("Ratchet");
    });
});