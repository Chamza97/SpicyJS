from chatterbot import ChatBot, filters
from chatterbot.response_selection import get_random_response
from flask import Flask, request
from flask_cors import CORS, cross_origin
from chatterbot.trainers import ChatterBotCorpusTrainer
import requests

app = Flask('__name__')
CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

bot = ChatBot('chatterbot', filters=[filters.get_recent_repeated_responses], logic_adapters=[
    {
        'import_path': 'chatterbot.logic.BestMatch',
        'default_response': 'I am sorry, but I do not understand.',
        'maximum_similarity_threshold': 3
    }
], storage_adapter="chatterbot.storage.SQLStorageAdapter", response_selection_method=get_random_response)

trainer = ChatterBotCorpusTrainer(bot)
trainer.train(
    "./DataSet/pc.yml",
    "./DataSet/ecran.yml",
    "./DataSet/ai.yml",
    "./DataSet/computers.yml",
    "./DataSet/ecran.yml",
    "./DataSet/conversation.yml",
    "./DataSet/emotion.yml",
    "./DataSet/botprofile.yml",
    "./DataSet/greating.yml",
    "./DataSet/humor.yml",
    "./DataSet/food.yml",
    "./DataSet/gossip.yml",
    "./DataSet/health.yml",
    "./DataSet/history.yml",
    "./DataSet/literature.yml",
    "./DataSet/money.yml",
    "./DataSet/movies.yml",
    "./DataSet/politics.yml",
    "./DataSet/psychology.yml",
    "./DataSet/science.yml",
    "./DataSet/sports.yml",
    "./DataSet/trivia.yml",
    "./DataSet/souris.yml",
    "./DataSet/smartphone.yml",
    "./DataSet/clavier.yml",
    "./DataSet/cartemere.yml",
    "./DataSet/cartegraphique.yml",

)


# routes
@app.route('/')
@cross_origin()
def Home():
    return str('Welcome Home')


@app.route('/user', methods=['POST'])
@cross_origin()
def user():
    jsony = request.json
    data = jsony['msg']
    return str(bot.get_response(data))


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


app.run()
