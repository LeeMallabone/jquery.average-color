/**
 * @venus-fixture fixtures/image.html
 * @venus-include zepto.min.js
 * @venus-include ../jquery.average-color.js
 */
describe("something", function () {
    it("should return the right color on a single color image", function () {
        expect($('img').averageColor).toBeDefined();
        expect($('img').averageColorAsString).toBeDefined();
        expect($('img').averageColor()).toBe("rgb(1,2,3)");
    });

    it("should return the default on a different-origin image");
});
