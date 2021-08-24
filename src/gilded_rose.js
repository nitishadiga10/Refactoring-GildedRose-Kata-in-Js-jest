class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const sulfuras = "Sulfuras, Hand of Ragnaros";
const agedBrie = "Aged Brie";
const conjured = "Conjured Mana Cake";
const backstagePasses = "Backstage passes to a TAFKAL80ETC concert";

incrementQuality = (item) => {
  item.quality < 50 ? item.quality++ : item.quality;
};
decrementQuality = (item, number) => {
  item.quality = item.quality > 0 ? item.quality - number : item.quality;
};

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    this.items.map((item) => {
      if (item.name === sulfuras) return;
      item.sellIn--;
      switch (item.name) {
        case agedBrie:
          incrementQuality(item);
          break;
        case conjured:
          decrementQuality(item, 2);
          break;
        case backstagePasses:
          incrementQuality(item);
          if (item.sellIn < 11) incrementQuality(item);
          if (item.sellIn < 6) incrementQuality(item);
          if (item.sellIn < 0) item.quality = 0;
          break;
        default:
          decrementQuality(item, item.sellIn < 0 ? 2 : 1);
          break;
      }
    });
  }
}

module.exports = {
  Item,
  Shop,
};
