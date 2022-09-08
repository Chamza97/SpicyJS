import scrapy
from ..items import WebscrappingItem

class QuotesSpider(scrapy.Spider):
    name = 'quotes'
    start_urls = [
        'http://quotes.toscrape.com/'
    ]
    def parse(self, response):

        items = WebscrappingItem()

        all_div_quotes =response.css('div.quote')

        for quotes in all_div_quotes:
            yield {
                'title' : quotes.css('span.text::text').extract(),
                'author' : quotes.css('.author::text').extract(),
                'tag' : quotes.css('.tag::text').extract()
            }