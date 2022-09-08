import scrapy
from ..items import ScoopscrappingItem


class QuotesSpider(scrapy.Spider):
    name = 'scoop'


    def start_requests(self):
        urls = [
            'https://www.scoop.com.tn/module/spsearchpro/catesearch?fc=module&module=spsearchpro&controller=catesearch&orderby=name&orderway=desc&cat_id=2%2C70%2C77%2C16%2C97%2C99%2C98%2C267%2C103%2C111%2C176%2C116%2C117%2C121%2C123%2C124%2C129%2C132%2C134%2C142%2C82%2C113%2C154%2C155%2C156%2C157%2C159%2C163%2C164%2C167%2C175%2C181%2C269%2C189%2C197%2C202%2C204%2C205%2C206%2C213%2C214%2C215%2C216%2C218%2C220%2C225%2C226%2C227%2C228%2C229%2C230%2C231%2C232%2C235%2C236%2C237%2C240%2C243%2C245%2C246%2C247%2C248%2C249%2C250%2C251%2C252%2C254%2C255%2C256%2C258%2C259%2C262%2C263%2C264%2C265%2C268%2C187%2C273%2C276%2C279%2C284%2C286%2C287%2C289%2C292%2C50%2C209%2C208%2C293%2C51%2C2067%2C52%2C283%2C114%2C73%2C94%2C36%2C102%2C104%2C105%2C109%2C110%2C282%2C130%2C131%2C135%2C143%2C174%2C177%2C288%2C191%2C281%2C2094%2C2080%2C2089%2C297%2C298%2C299%2C212%2C210%2C211%2C9%2C2076%2C301%2C302%2C303%2C305%2C306%2C309%2C314%2C317%2C318%2C319%2C320%2C300%2C321%2C46%2C192%2C194%2C193%2C316%2C307%2C2081%2C199%2C200%2C127%2C2063%2C294%2C54%2C118%2C119%2C120%2C125%2C126%2C190%2C219%2C278%2C280%2C122%2C221%2C222%2C223%2C224%2C2078%2C308%2C128%2C310%2C138%2C2064%2C296%2C285%2C2065%2C238%2C239%2C241%2C266%2C2124%2C2066%2C106%2C108%2C290%2C2068%2C2082%2C312%2C2121%2C149%2C150%2C148%2C151%2C152%2C165%2C183%2C2083%2C315%2C2122%2C158%2C160%2C161%2C166%2C184%2C277%2C2091%2C2092%2C2084%2C313%2C2118%2C153%2C2123%2C182%2C271%2C2116%2C2069%2C295%2C62%2C185%2C2070%2C234%2C2071%2C2072%2C2073%2C2077%2C311%2C139%2C168%2C169%2C170%2C179%2C180%2C253%2C140%2C261%2C272%2C2079%2C2085%2C2074%2C291%2C49%2C195%2C198%2C196%2C96%2C2086%2C2088%2C2087%2C2098%2C2099%2C2105%2C2110%2C2115%2C2095%2C2106%2C2096%2C2097%2C2117%2C2107%2C2109%2C2113%2C2125%2C2100%2C2102%2C2104%2C2108%2C2101%2C2103%2C2111%2C2114%2C2112%2C201&search_query=ecran+msi&spr_submit_search=Rechercher&n=30',
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):

        items = ScoopscrappingItem()

        all_div_prod = response.css('li.ajax_block_product')

        for quotes in all_div_prod:
            title = quotes.css('div.right-block h5.product-name').css('::text')[1].extract().strip()
            price = quotes.css('span.price::text')[0].extract().strip()
            cleanprice = price.replace(' ', '').replace('\n', '').replace('DT', '').replace(',', '.').replace(' ', '')
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
