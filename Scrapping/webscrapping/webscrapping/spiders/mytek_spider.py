import scrapy
from ..items import MytekscrappingItem


class MytekSpider(scrapy.Spider):
    name = 'mytek'

    def start_requests(self):
        urls = [
            'https://www.mytek.tn/catalogsearch/result/?cat=&q=ecran',
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)
    #this for pass paramtre in url
    #start_urls = ['https://www.mytek.tn/catalogsearch/result/?q=']
    #def start_requests(self):
        # self points to the spider instance
        # that was initialized by the scrapy framework when starting a crawl
        #
        # spider instances are "augmented" with crawl arguments
        # available as instance attributes,
        # self.ip has the (string) value passed on the command line
        # with `-a ip=somevalue`
        #for url in self.start_urls:
            #yield scrapy.Request(url + self.ip + '+' + self.iip, dont_filter=True)

    def parse(self, response):

        items = MytekscrappingItem()

        all_div_prod = response.css('div.product-item-info')

        for quotes in all_div_prod:
            title = quotes.css('a.product-item-link::text')[
                0].extract().strip()  # strip to remove [u'\n\n\n thiis_went_to_scrpe \n\n\n']
            price = quotes.css('span.price::text')[0].extract()
            cleanprice = price.replace(' ', '').replace('\n', '').replace('TND', '').replace(',', '.').replace(' ', '')
            image = quotes.css('.product-image-photo ::attr(src)')[0].extract()
            url = quotes.css('a.product-item-link ::attr(href)')[0].extract()

            items['name'] = title
            items['price'] = cleanprice
            items['image'] = image
            items['onStock'] = bool(True)
            items['description'] = title
            items['url'] = url

            yield items
            #for scrapping the other page in pagination
        next_page = response.css('li.item.pages-item-next a::attr(href)').get()

        if next_page is not None:
            yield response.follow(next_page, callback=self.parse)