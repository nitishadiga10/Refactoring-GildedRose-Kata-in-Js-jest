const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", function () {
  const items = [new Item("foo", 0, 0)];
  const gildedRose = new Shop(items);
  gildedRose.updateQuality();
  it("Should have a name", function () {
    expect(items[0].name).toBe("foo");
  });
  it("Should have a Quality value", function () {
    expect(items[0].quality).toBe(0);
  });
  it("Should have a SellIn Value", function () {
    expect(items[0].sellIn).toBe(-1);
  });
});

describe("Gilded Rose Items", function () {
  const items = [
    new Item("+5 Dexterity Vest", 4, 4),
    new Item("Elixir of the Mongoose", 0, 5),
    new Item("foo", 0, 0),
  ];
  const gildedRose = new Shop(items);
  gildedRose.updateQuality();
  it("should reduce sellIn and quality  by 1", function () {
    expect(items[0].quality).toBe(3);
    expect(items[0].sellIn).toBe(3);
  });
  it("should reduce Quality twice as fast Once the sell by date has passed", function () {
    expect(items[1].quality).toBe(3);
  });
  it("should never reduce The Quality of an item beyond zero", function () {
    expect(items[2].quality).toBe(0);
  });
  it("should reduce The SellIn of an item beyond zero, if sell by date has passed", function () {
    expect(items[2].sellIn).toBe(-1);
  });
});
describe("Gilded Rose Aged brie", function () {
  const items = [new Item("Aged Brie", 0, 0), new Item("Aged Brie", 3, 50)];
  const gildedRose = new Shop(items);
  gildedRose.updateQuality();
  it("should increase the quality of Aged Brie as it gets older and reduce the sellIn value", function () {
    expect(items[0].quality).toBe(1);
    expect(items[0].sellIn).toBe(-1);
  });
  it("should never increase The Quality of an Aged Brie beyond 50", function () {
    expect(items[1].quality).toBe(50);
  });
});
describe("Gilded Rose Sulfuras", function () {
  const items = [new Item("Sulfuras, Hand of Ragnaros", -1, 80)];
  const gildedRose = new Shop(items);
  gildedRose.updateQuality();
  it("should never alter quality or sellIn values", function () {
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(-1);
  });
});
describe("Gilded Rose Conjured", function () {
  const items = [new Item("Conjured Mana Cake", 3, 6)];
  const gildedRose = new Shop(items);
  gildedRose.updateQuality();
  it("should degrade in Quality twice and reduce the sellIn value by 1", function () {
    expect(items[0].quality).toEqual(4);
    expect(items[0].sellIn).toEqual(2);
  });
});
describe("Gilded Rose Backstage passes", function () {
  const items = [
    new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
    new Item("Backstage passes to a TAFKAL80ETC concert", 10, 46),
    new Item("Backstage passes to a TAFKAL80ETC concert", 5, 42),
    new Item("Backstage passes to a TAFKAL80ETC concert", 0, 40),
    new Item("Backstage passes to a TAFKAL80ETC concert", 4, 49),
  ];
  const gildedRose = new Shop(items);
  gildedRose.updateQuality();
  it("should increase the quality as it gets older and reduce the sellIn value by 1", function () {
    expect(items[0].quality).toEqual(21);
    expect(items[0].sellIn).toEqual(14);
  });
  it("should increase the quality by 2 if sellIn value is 10 days or less", function () {
    expect(items[1].quality).toEqual(48);
    expect(items[1].sellIn).toEqual(9);
  });
  it("should increase the quality by 3 if sellIn value is 5 days or less", function () {
    expect(items[2].quality).toEqual(45);
    expect(items[2].sellIn).toEqual(4);
  });
  it("should Quality drops to 0 after the concert", function () {
    expect(items[3].quality).toEqual(0);
    expect(items[3].sellIn).toEqual(-1);
  });
  it("should never increase The Quality of a Back Stage Passes beyond 50", function () {
    expect(items[4].quality).toBe(50);
  });
});
