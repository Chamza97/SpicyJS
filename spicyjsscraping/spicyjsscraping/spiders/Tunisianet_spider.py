import scrapy
import time
from scrapy.selector import Selector
from scrapy_selenium import SeleniumRequest
from selenium.webdriver.common.keys import Keys
from ..items import TunisianetscrappingItem


class TunisianetSpider(scrapy.Spider):
    name = 'tunisianet'

    def remove_characters(self, value):
        return value.strip('\xa0TND')

    def start_requests(self):
        yield SeleniumRequest(
            url='https://www.tunisianet.com.tn/',
            wait_time=9,
            screenshot=True,
            callback=self.parse
        )

    def parse(self, response):

        items = TunisianetscrappingItem()

        driver = response.meta['driver']
        search_input = driver.find_element_by_xpath(
            "//input[@id='search_query_top']")

        listeproduits = ["ecran", "clavier", "souris", "smartphone",
                         "pc portable", "pc gamer", "carte graphique", "carte mere"]

        for produit in listeproduits:
            search_input.clear()
            search_input.send_keys(produit)

            search_input.send_keys(Keys.ENTER)

            html = driver.page_source
            response_obj = Selector(text=html)

            all_div_prod = response_obj.css('div.thumbnail-container')

            for quotes in all_div_prod:
                title = quotes.css('h2 a::text')[0].extract().strip()
                price = quotes.css('span.price::text')[0].extract().strip()
                cleanprice = price.replace(' ', '').replace('\n', '').replace('DT', '').replace(
                    ',', '.').replace(' ', '').replace('.000', '').replace(u'\xa0', u'')
                image = quotes.css(
                    '.img-responsive ::attr(src)')[0].extract().strip()
                description = quotes.css('div.listds a::text')[
                    0].extract().strip()
                url = quotes.css(
                    'h2.h3.product-title a::attr(href)')[0].extract()

                items['name'] = title
                items['price'] = cleanprice
                items['image'] = image
                items['description'] = description
                items['onStock'] = bool(True)
                items['url'] = url
                items['trackedBy'] = []
                items['usersTargetPrices'] = []

                yield items
                # for scrapping the other page in pagination
            next_page = response_obj.xpath(
                "(//ul[@class='page-list clearfix']/li/a[@class='next js-search-link']/@href)").get()

            # print(next_page)

            while next_page is not None:

                if next_page:
                    absolute_url = next_page
                    yield SeleniumRequest(
                        url=absolute_url,
                        wait_time=3,
                        callback=self.parse
                    )

                    print(absolute_url)
                    print("inside next page")

                    driver.get(next_page)
                    time.sleep(3)
                    html = driver.page_source
                    response_obj = Selector(text=html)

                    all_div_prod = response_obj.css('div.thumbnail-container')
                    for quotes in all_div_prod:
                        title = quotes.css('h2 a::text')[0].extract().strip()
                        price = quotes.css('span.price::text')[
                            0].extract().strip()
                        cleanprice = price.replace(' ', '').replace('\n', '').replace('DT', '').replace(',', '.').replace(
                            ' ', '').replace('.000', '').replace(u'\xa0', u'').replace('00', '')
                        image = quotes.css(
                            '.img-responsive ::attr(src)')[0].extract().strip()
                        description = quotes.css('div.listds a::text')[
                            0].extract().strip()
                        url = quotes.css(
                            'h2.h3.product-title a::attr(href)')[0].extract()

                        items['name'] = title
                        items['price'] = float(cleanprice)
                        items['image'] = image
                        items['description'] = description
                        items['onStock'] = bool(True)
                        items['url'] = url
                        items['trackedBy'] = []
                        items['usersTargetPrices'] = []

                        yield items
                        # for scrapping the other page in pagination
                    next_page = response_obj.xpath(
                        "(//ul[@class='page-list clearfix']/li/a[@class='next js-search-link']/@href)").get()

                    if next_page is None:
                        next_page = ""
                        driver = response.meta['driver']
                        search_input = driver.find_element_by_xpath(
                            "//input[@id='search_query_top']")
                        break