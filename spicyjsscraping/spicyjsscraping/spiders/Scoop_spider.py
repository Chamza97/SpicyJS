import scrapy
from scrapy.selector import Selector
from scrapy_selenium import SeleniumRequest
from selenium.webdriver.common.keys import Keys
from ..items import ScoopscrappingItem

class ScoopSpider(scrapy.Spider):
    name = 'scoop'

    def remove_characters(self, value):
        return value.strip('\xa0TND')

    def start_requests(self):
        yield SeleniumRequest(
            url='https://www.scoop.com.tn/',
            wait_time=9,
            screenshot=True,
            callback=self.parse
        )

    def parse(self, response):

        items = ScoopscrappingItem()
        # img = response.meta['screenshot']

        # with open('screenshot.png', 'wb') as f:
        #     f.write(img)
        driver = response.meta['driver']
        search_input = driver.find_element_by_css_selector(".spr-query.ac_input")
        #search_input = driver.find_element_by_xpath(
        #    "//*[contains(concat( ' ', @class, ' ' ), concat( ' ', 'ac_input', ' ' ))]")
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

        all_div_prod = response_obj.css('li.ajax_block_product')

        for quotes in all_div_prod:
            title = quotes.css('div.right-block h5.product-name').css('::text')[1].extract().strip()
            price = quotes.css('span.price::text')[0].extract().strip()
            cleanprice = price.replace(' ', '').replace('\n', '').replace('DT', '').replace(',', '.').replace(' ', '').replace('.000', '').replace(u'\xa0', u'')
            image = quotes.css('.img_1 ::attr(src)')[0].extract()
            description = quotes.css('p.product-desc::text')[0].extract().strip()

            items['name'] = title
            items['price'] = cleanprice
            items['image'] = image
            items['description'] = description

            yield items
            # for scrapping the other page in pagination
            next_page = response.css('li.pagination_next_bottom a::attr(href)').get()

            if next_page is not None:
                yield response.follow(next_page, callback=self.parse)
