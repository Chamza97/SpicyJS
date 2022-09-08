import scrapy
from scrapy.selector import Selector
from scrapy_selenium import SeleniumRequest
from selenium.webdriver.common.keys import Keys
from ..items import SBSscrappingItem

class SBSSpider(scrapy.Spider):
    name = 'sbs'

    def remove_characters(self, value):
        return value.strip('\xa0TND')

    def start_requests(self):
        yield SeleniumRequest(
            url='https://www.sbsinformatique.com/',
            wait_time=9,
            screenshot=True,
            callback=self.parse
        )

    def parse(self, response):

        items = SBSscrappingItem()
        # img = response.meta['screenshot']

        # with open('screenshot.png', 'wb') as f:
        #     f.write(img)
        driver = response.meta['driver']
        search_input = driver.find_element_by_xpath(
            "//input[@id='pos_query_top']")
        search_input.send_keys('ecran msi')

        search_input.send_keys(Keys.ENTER)

        html = driver.page_source
        response_obj = Selector(text=html)

        # driver.save_screenshot('enter.png')

        # 5ademt beha l'image barka
        # images = response_obj.xpath(
        #     "//span/span[@class='product-image-wrapper']")
        # for image in images:
        #     yield {
        #         'IMG': image.xpath(".//@src").get()
        #     }

        all_div_prod = response_obj.css('div.product_thumb')

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
