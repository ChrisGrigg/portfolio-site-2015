describe("hmrWorkItem", function() {

    var $compile,
        $location,
        $window,
        PAGES;

    var scope,
        element;

    var work = {
        id: "123",
        name: "Ratchet",
        tag: "a cute little chinchilla who loves a good sniff",
        imgs: {
            thumb: "ratchet.png"
        }
    };


    beforeEach(module("site", "templates/work-item-template.html"));

    beforeEach(inject(function (_$compile_, _$location_, _$window_, _PAGES_, $rootScope) {
        $compile = _$compile_;
        $location = _$location_;
        $window = _$window_;
        PAGES = _PAGES_;

        scope = $rootScope.$new();
        scope.work = work;

        element = angular.element("<hmr-work-item work='work'></hmr-work-item>");

        $compile(element)(scope);
        scope.$digest();
    }));


    it("should have class workItem on main div", function() {
        var elClassName = element.find("div")[0].className;
        var classes = elClassName.split(/\s+/g);

        expect(classes).toContain("workItem");
    });

    it("should have class workItemMain on child div", function() {
        var elClassName = element.find("div").eq(0).find("div")[0].className;
        var classes = elClassName.split(/\s+/g);

        expect(classes).toContain("workItemMain");
    });

    it("should append '/work/workid' to path when item clicked", function() {
        var mainEl = element.find("div").eq(0);
        mainEl.triggerHandler("click");
        var path = $location.path();

        expect(path).toEqual("/" + PAGES.WORK + "/" + work.id);
    });

    it("should set src of img to work.imgs.thumb", function() {
        var img = element.find("div").eq(0).find("img")[0];

        expect(img.src).toContain("/assets/imgs/" + work.imgs.thumb);
    });

    it("should set alt of img to work.name", function() {
        var img = element.find("div").eq(0).find("img")[0];

        expect(img.alt).toEqual(work.name);
    });

    it("should set text of h3 element to work.name", function() {
        var h3 = element.find("div").eq(0).find("h3");

        expect(h3.text()).toEqual(work.name);
    });

    it("should set text of p element to work.tag", function() {
        var p = element.find("div").eq(0).find("p");

        expect(p.text()).toEqual(work.tag);
    });

    it("should set href of anchor tag to '#/work/workid'", function() {
        var a = element.find("div").eq(0).find("a")[0];

        expect(a.href).toContain("#/" + PAGES.WORK + "/" + work.id);
    });
});