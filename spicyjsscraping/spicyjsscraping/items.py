# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class SpicyjsscrapingItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    pass
class MytekscrappingItem(scrapy.Item):
    name = scrapy.Field()
    price = scrapy.Field()
    image = scrapy.Field()
    onStock = scrapy.Field()
    description = scrapy.Field()
    url = scrapy.Field()
    trackedBy = scrapy.Field()
    usersTargetPrices = scrapy.Field()

class SBSscrappingItem(scrapy.Item):
    title = scrapy.Field()
    price = scrapy.Field()

class ScoopscrappingItem(scrapy.Item):
    name = scrapy.Field()
    price = scrapy.Field()
    image = scrapy.Field()
    description = scrapy.Field()

class TunisianetscrappingItem(scrapy.Item):
    name = scrapy.Field()
    price = scrapy.Field()
    image = scrapy.Field()
    onStock = scrapy.Field()
    description = scrapy.Field()
    url = scrapy.Field()
    trackedBy = scrapy.Field()
    usersTargetPrices = scrapy.Field()