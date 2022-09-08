import scrapy
from ..items import TunisianetscrappingItem


class QuotesSpider(scrapy.Spider):
    name = 'tunisianet'


    def start_requests(self):
        urls = [
            'https://www.tunisianet.com.tn/recherche?controller=search&orderby=price&orderway=asc&s=ecran+msi&submit_search=',
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):

        items = TunisianetscrappingItem()

        all_div_prod = response.css('div.thumbnail-container')

        for quotes in all_div_prod:
            title = quotes.css('h2 a::text')[0].extract().strip()
            price = quotes.css('span.price::text')[0].extract().strip()
            cleanprice = price.replace(' ', '').replace('\n', '').replace('DT', '').replace(',', '.').replace(' ', '')
            image = quotes.css('.img-responsive ::attr(src)')[0].extract().strip()
            description = quotes.css('div.listds a::text')[0].extract().strip()
            url = quotes.css('h2.h3.product-title a::attr(href)')[0].extract()

            items['name'] = title
            items['price'] = cleanprice
            items['image'] = image
            items['description'] = description
            items['onStock'] = bool(True)
            items['url'] = url

            yield items
            # for scrapping the other page in pagination
        next_page = response.css('a.next::attr(href)').get()

        if next_page is not None:
            yield response.follow(next_page, callback=self.parse)