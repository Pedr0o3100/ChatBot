from flask import Flask, render_template, request, jsonify
import spacy

app = Flask(__name__)
nlp = spacy.load("en_core_web_sm")

# Dicionário de perguntas frequentes e respostas
faqs = {
    "Qual é o horário de funcionamento?": "Nosso horário de funcionamento é de segunda a sexta-feira, das 8h às 17h.",
    "Como faço um pedido?": "Para fazer um pedido, basta acessar nossa loja online e adicionar os produtos desejados ao carrinho. Depois, siga as instruções de checkout para concluir o pedido.",
    # ... adicione mais perguntas e respostas aqui
}

def get_answer_nlp(question):
    doc = nlp(question)
    for token in doc:
        for key in faqs.keys():
            if token.text.lower() in key.lower():
                return faqs[key]
    return "Desculpe, não tenho uma resposta para isso no momento."

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_answer', methods=['POST'])
def get_answer():
    question = request.form['question']
    answer = get_answer_nlp(question)
    return jsonify({"answer": answer})

if __name__ == '__main__':
    app.run(debug=True)
