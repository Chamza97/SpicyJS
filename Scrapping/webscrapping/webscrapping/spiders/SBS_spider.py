import scrapy
from ..items import SBSscrappingItem


class QuotesSpider(scrapy.Spider):
    name = 'sbs'
    #sbs can't get image from site because sbs use lazy loading
    def start_requests(self):
        urls = [
            'https://www.sbsinformatique.com/recherche?poscats=0&s=ecran+msi',
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):

        items = SBSscrappingItem()

        all_div_prod = response.css('div.product_thumb')

        for quotes in all_div_prod:
            title = quotes.css('a.product_name::text')[0].extract().strip()
            price = quotes.css('span.price::text')[0].extract().strip()
            cleanprice = price.replace(' ', '').replace('\n', '').replace('TND', '').replace(',', '.').replace(' ', '')
            items['title'] = title
            items['price'] = cleanprice

            yield items
            # for scrapping the other page in pagination
        next_page = response.css('a.next::attr(href)').get()

        if next_page is not None:
            yield response.follow(next_page, callback=self.parse)
