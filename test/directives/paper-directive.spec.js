describe("hmrPaper", function() {

    var $compile;

    var scope,
        element;


    beforeEach(module("site", "templates/paper-template.html"));

    beforeEach(inject(function (_$compile_, $rootScope) {
        $compile = _$compile_;
        scope = $rootScope.$new();

        element = angular.element("<hmr-paper title='Ratchet' content='a cute little chinchilla' colour='green'></hmr-paper>");

        $compile(element)(scope);
        scope.$digest();
    }));

    it("should have class content on main div", function() {
        var elClassName = element.find("div")[0].className;
        var classes = elClassName.split(/\s+/g);

        expect(classes).toContain("content");
    });

    it("should add class 'x-paper' to main div using value passed in as 'colour' attribute", function() {
        var elClassName = element.find("div")[0].className;
        var classes = elClassName.split(/\s+/g);

        expect(classes).toContain("green-paper");
    });

    it("should set text of h2 element equal to value of 'title' attribute", function() {
        var h2El = element.find("div").eq(0).find("h2");

        expect(h2El.text()).toEqual("Ratchet");
    });

    it("should set text of p element equal to value of 'content' attribute", function() {
        var h2El = element.find("div").eq(0).find("p");

        expect(h2El.text()).toEqual("a cute little chinchilla");
    });

    it("should insert any child html into div container after the title and content", function() {
        element = angular.element("<hmr-paper title='Ratchet' content='a cute little chinchilla' colour='green'><h3>Kumi is a bit grumpy</h3></hmr-paper>");
        $compile(element)(scope);
        scope.$digest();
        var h3El = element.find("div").eq(0).find("div").eq(0).find("h3");

        expect(h3El.text()).toEqual("Kumi is a bit grumpy");
    });
});