from __future__ import unicode_literals
import json
import requests


from flask import Flask, request, Response, render_template, session, redirect, url_for

app = Flask(__name__)

@app.route('/scoop')
def scrapescoop():

    params = {
        'spider_name': 'scoop',
        'start_requests': True,
     
    }
    response = requests.get('http://localhost:9080/crawl.json', params)

    return "Scoop Spider has has been run successfully"


@app.route('/mytek')
def scrapemytek():
    params = {
        'spider_name': 'mytek',
        'start_requests': True,

    }
    response = requests.get('http://localhost:9080/crawl.json', params)

    return "Mytek Spider has has been run successfully"


@app.route('/tunisianet')
def scrapetunisianet():
    params = {
        'spider_name': 'tunisianet',
        'start_requests': True,

    }
    response = requests.get('http://localhost:9080/crawl.json', params)

    return "tunisianet Spider has has been run successfully"


@app.route('/sbs')
def scrapesbs():
    params = {
        'spider_name': 'sbs',
        'start_requests': True,

    }
    response = requests.get('http://localhost:9080/crawl.json', params)

    return "sbs Spider has has been run successfully"

if __name__ == '__main__':
    app.run(debug=True, port=1234)