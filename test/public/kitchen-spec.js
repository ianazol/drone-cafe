var KitchenPage = require('../public/page-objects/kitchen-page');

describe("Kitchen page: ", function () {
    var kitchenPage = {};

    beforeEach(function () {
        kitchenPage = new KitchenPage();
        kitchenPage.get();
    });

    describe("when click the start button", function () {
        it("dish should be removed from the first list", function () {
            var firstList = kitchenPage.getFirstList();

            kitchenPage.getFirstDish(firstList)
                .then(function (firstDishName) {
                    var countBefore = kitchenPage.getDishCount(firstList, firstDishName);
                    kitchenPage.getFirstBtn(firstList).click();
                    var countAfter = kitchenPage.getDishCount(firstList, firstDishName);

                    expect(countAfter).toBeLessThan(countBefore);
                });
        });

        it("dish should be added to the second list", function () {
            var firstList = kitchenPage.getFirstList();
            var secondList = kitchenPage.getSecondList();

            kitchenPage.getFirstDish(firstList)
                .then(function (firstDishName) {
                    var countBefore = kitchenPage.getDishCount(secondList, firstDishName);
                    kitchenPage.getFirstBtn(firstList).click();
                    var countAfter = kitchenPage.getDishCount(secondList, firstDishName);

                    expect(countAfter).toBeGreaterThan(countBefore);
                });
        });
    });

    describe("when click the stop button", function () {
        it("dish should be removed from the second list", function () {
            var secondList = kitchenPage.getSecondList();

            kitchenPage.getFirstDish(secondList)
                .then(function (firstDishName) {
                    var countBefore = kitchenPage.getDishCount(secondList, firstDishName);
                    kitchenPage.getFirstBtn(secondList).click();
                    var countAfter = kitchenPage.getDishCount(secondList, firstDishName);

                    expect(countAfter).toBeLessThan(countBefore);
                });
        })
    })
});