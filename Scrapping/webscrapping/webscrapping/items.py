# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html
# Extracted data -> Temporary containers (items) -> storing in database

import scrapy


class WebscrappingItem(scrapy.Item):
    # define the fields for your item here like:
    title = scrapy.Field()
    author = scrapy.Field()
    tag = scrapy.Field()

class MytekscrappingItem(scrapy.Item):
    name = scrapy.Field()
    price = scrapy.Field()
    image = scrapy.Field()
    onStock = scrapy.Field()
    description = scrapy.Field()
    url = scrapy.Field()

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