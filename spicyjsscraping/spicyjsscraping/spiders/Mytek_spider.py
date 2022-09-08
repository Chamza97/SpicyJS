import scrapy
import time
from scrapy.selector import Selector
from scrapy_selenium import SeleniumRequest
from selenium.webdriver.common.keys import Keys
from ..items import MytekscrappingItem


class MyTekSpider(scrapy.Spider):
    name = 'mytek'

    def remove_characters(self, value):
        return value.strip('\xa0TND')

    def start_requests(self):
        yield SeleniumRequest(
            url='https://www.mytek.tn/',
            wait_time=9,
            screenshot=True,
            callback=self.parse
        )

    def parse(self, response):

        items = MytekscrappingItem()

        driver = response.meta['driver']
        search_input = driver.find_element_by_xpath(
            "//input[@id='search-mobile']")

        listeproduits = ["ecran", "clavier", "souris", "smartphone",
                         "pc portable", "pc gamer", "carte graphique", "carte mere"]

        for produit in listeproduits:
            search_input.clear()
            search_input.send_keys(produit)

            search_input.send_keys(Keys.ENTER)

            html = driver.page_source
            response_obj = Selector(text=html)

            all_div_prod = response_obj.css('div.product-item-info')
            for quotes in all_div_prod:
                title = quotes.css('a.product-item-link::text')[
                    0].extract().strip()  # strip to remove [u'\n\n\n thiis_went_to_scrpe \n\n\n']
                price = quotes.css('span.price::text')[0].extract()
                cleanprice = price.replace('\n', '').replace('TND', '').replace(',', '.').replace('.000', '').replace(
                    u'\xa0', u'')
                image = quotes.css(
                    '.product-image-photo ::attr(src)')[0].extract()
                url = quotes.css(
                    'a.product-item-link ::attr(href)')[0].extract()

                items['name'] = title
                items['price'] = float(cleanprice)
                items['image'] = image
                items['onStock'] = bool(True)
                items['description'] = title
                items['url'] = url
                items['trackedBy'] = []
                items['usersTargetPrices'] = []

                yield items

            next_page = response_obj.xpath(
                "(//div[@class='toolbar toolbar-products']/div[@class='pages']/ul[@class='items pages-items']/li/a[@class='action  next']/@href)[2]").get()

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

                    all_div_prod = response_obj.css('div.product-item-info')
                    for quotes in all_div_prod:
                        title = quotes.css('a.product-item-link::text')[
                            0].extract().strip()  # strip to remove [u'\n\n\n thiis_went_to_scrpe \n\n\n']
                        price = quotes.css('span.price::text')[0].extract()
                        cleanprice = price.replace('\n', '').replace('TND', '').replace(',', '.').replace('.000',
                                                                                                          '').replace(
                            u'\xa0', u'').replace('00', '')
                        image = quotes.css(
                            '.product-image-photo ::attr(src)')[0].extract()
                        url = quotes.css(
                            'a.product-item-link ::attr(href)')[0].extract()

                        items['name'] = title
                        items['price'] = float(cleanprice)
                        items['image'] = image
                        items['onStock'] = bool(True)
                        items['description'] = title
                        items['url'] = url
                        items['trackedBy'] = []
                        items['usersTargetPrices'] = []

                        yield items

                    next_page = response_obj.xpath(
                        "(//div[@class='toolbar toolbar-products']/div[@class='pages']/ul[@class='items pages-items']/li/a[@class='action  next']/@href)[2]").get()

                    if next_page is None:
                        next_page = ""
                        driver = response.meta['driver']
                        search_input = driver.find_element_by_xpath(
                            "//input[@id='search-mobile']")
                        break
