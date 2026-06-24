import type { CourseModule } from "./types";

export const modules: CourseModule[] = [
  {
    id: "plano-guerra",
    title: "Plano de guerra de 1 dia",
    difficulty: "Fácil",
    estimatedTime: "15 min",
    iconKey: "map",
    objective: "Montar uma rota de estudo para sobreviver à prova sem tentar decorar tudo.",
    explanation: [
      "Antes de calcular, você precisa reconhecer o tipo da questão. Estatística de prova costuma ser mais tradução do que conta.",
      "A ordem boa é: símbolos, probabilidade básica, condicional, variável aleatória, esperança, variância e distribuições."
    ],
    formulas: ["Diagnóstico: frase da questão -> símbolo -> fórmula -> conta -> interpretação"],
    symbols: ["P(A)", "P(X = k)", "E(X)", "V(X)"],
    examples: [
      {
        level: "Fácil",
        title: "Rota mínima",
        problem: "Você tem 2 horas. O que estudar primeiro?",
        solution: "Comece por traduções: pelo menos, no máximo, dado que, em média. Isso destrava quase todos os exercícios."
      },
      {
        level: "Médio",
        title: "Questão de distribuição",
        problem: "A questão fala em 10 peças, defeituosa ou perfeita, probabilidade 5%.",
        solution: "Isso cheira a Binomial: n fixo, sucesso/fracasso e p constante."
      },
      {
        level: "Difícil",
        title: "Questão com pegadinha",
        problem: "Mais de 20% de 10 pessoas têm erro.",
        solution: "20% de 10 = 2. Mais de 2 significa 3 ou mais: P(X >= 3)."
      }
    ],
    macetes: ["Leia a última frase do enunciado primeiro: ela diz o que a questão quer.", "Circule palavras como exatamente, pelo menos, no máximo, dado que e média."],
    pegadinhas: ["Tentar aplicar fórmula antes de traduzir costuma fazer você errar o sinal.", "Mais de 2 não inclui o 2."],
    quiz: [
      {
        question: "Qual é o primeiro passo em uma questão de Estatística?",
        choices: ["Escolher a fórmula", "Traduzir o que a questão pede", "Multiplicar tudo", "Chutar a distribuição"],
        answerIndex: 1,
        explanation: "A tradução vem antes da fórmula. Ela decide o símbolo e o caminho."
      }
    ]
  },
  {
    id: "guia-simbolos",
    title: "Guia dos sinais e símbolos",
    difficulty: "Fácil",
    estimatedTime: "25 min",
    iconKey: "symbols",
    objective: "Ler fórmulas sem travar nos sinais.",
    explanation: [
      "Símbolo é abreviação. P(X >= 2) não é ameaça: significa probabilidade de X ser pelo menos 2.",
      "Quando você traduz cada pedaço, a fórmula fica parecida com uma frase curta."
    ],
    formulas: ["P(A|B) = probabilidade de A acontecer sabendo que B aconteceu", "∑x p(x) = somar cada valor vezes sua probabilidade"],
    symbols: ["=", "≥", "≤", "∑", "λ", "σ²"],
    examples: [
      {
        level: "Fácil",
        title: "Exatamente",
        problem: "Exatamente 2 caras.",
        solution: "Tradução: P(X = 2). O sinal de igual significa que só vale 2."
      },
      {
        level: "Médio",
        title: "Pelo menos",
        problem: "Pelo menos 2 defeitos.",
        solution: "Tradução: P(X >= 2). Conta 2, 3, 4..."
      },
      {
        level: "Difícil",
        title: "Complementar",
        problem: "Algum erro em 8 bits.",
        solution: "Algum quer dizer 1 ou mais. Muitas vezes é mais fácil fazer 1 - P(X = 0)."
      }
    ],
    macetes: ["Pelo menos = maior ou igual.", "No máximo = menor ou igual.", "Dado que = barra vertical: P(A|B)."],
    pegadinhas: ["Ou em probabilidade geralmente vira união.", "E geralmente vira interseção."],
    quiz: [
      {
        question: "Como traduzir 'no máximo 3'?",
        choices: ["X < 3", "X = 3", "X <= 3", "X >= 3"],
        answerIndex: 2,
        explanation: "No máximo inclui o limite. Então vale 0, 1, 2 e 3."
      }
    ]
  },
  {
    id: "probabilidade-basica",
    title: "Probabilidade básica",
    difficulty: "Fácil",
    estimatedTime: "35 min",
    iconKey: "dice",
    objective: "Entender experimento, espaço amostral, evento, complementar, união e interseção.",
    explanation: [
      "Experimento aleatório é algo cujo resultado você não sabe antes: jogar moeda, escolher peça, atender chamada.",
      "Espaço amostral é a lista de resultados possíveis. Evento é o pedaço dessa lista que interessa."
    ],
    formulas: ["P(A) = casos favoráveis / casos possíveis", "P(Ac) = 1 - P(A)", "P(A ∪ B) = P(A) + P(B) - P(A ∩ B)"],
    symbols: ["Ω", "A", "Ac", "A ∩ B", "A ∪ B"],
    examples: [
      {
        level: "Fácil",
        title: "Moeda",
        problem: "Qual a probabilidade de sair cara em uma moeda justa?",
        solution: "Espaço amostral: {cara, coroa}. Favorável: {cara}. Resultado: 1/2."
      },
      {
        level: "Médio",
        title: "Dado",
        problem: "Probabilidade de sair número par em um dado.",
        solution: "Pares: {2,4,6}. Possíveis: 6. Então P = 3/6 = 1/2."
      },
      {
        level: "Difícil",
        title: "União",
        problem: "Em um dado, sair par ou maior que 4.",
        solution: "Par = {2,4,6}; maior que 4 = {5,6}; união = {2,4,5,6}. Probabilidade = 4/6."
      }
    ],
    macetes: ["Complementar é o que falta para dar 1.", "Se os eventos não podem acontecer juntos, a interseção é zero."],
    pegadinhas: ["Não some probabilidades de A e B sem verificar se existe repetição.", "Em porcentagem, 40% vira 0,40 na conta."],
    quiz: [
      {
        question: "Se P(A) = 0,30, quanto vale P(Ac)?",
        choices: ["0,30", "0,70", "1,30", "0"],
        answerIndex: 1,
        explanation: "Complementar é 1 - P(A), então 1 - 0,30 = 0,70."
      }
    ]
  },
  {
    id: "condicional",
    title: "Probabilidade condicional",
    difficulty: "Médio",
    estimatedTime: "35 min",
    iconKey: "route",
    objective: "Entender o que muda quando a questão diz 'dado que' ou 'sabendo que'.",
    explanation: [
      "P(A|B) significa: agora o universo ficou menor. Você só olha os casos em que B aconteceu.",
      "P(A|B) e P(B|A) geralmente são números diferentes. A ordem muda a pergunta."
    ],
    formulas: ["P(A|B) = P(A ∩ B) / P(B)", "P(B|A) = P(A ∩ B) / P(A)"],
    symbols: ["|", "A ∩ B", "P(B)"],
    examples: [
      {
        level: "Fácil",
        title: "Cartas simplificadas",
        problem: "De 10 alunos, 4 estudam à noite e 2 estudam à noite e trabalham. Qual P(trabalha | noite)?",
        solution: "O universo virou os 4 que estudam à noite. Desses, 2 trabalham. P = 2/4."
      },
      {
        level: "Médio",
        title: "Tabela",
        problem: "30 peças são defeituosas, 12 são do fornecedor A e defeituosas, 40 são do fornecedor A. Qual P(defeituosa | A)?",
        solution: "Olhe só as 40 do fornecedor A. Defeituosas dentro de A: 12. P = 12/40."
      },
      {
        level: "Difícil",
        title: "Inverter a barra",
        problem: "P(A|B) = 0,8. Isso quer dizer que P(B|A) = 0,8?",
        solution: "Não. A informação depois da barra define o universo. Trocar muda o universo."
      }
    ],
    macetes: ["Depois da barra vem o mundo novo.", "Em tabela, comece pelo total da condição."],
    pegadinhas: ["Confundir P(A|B) com P(B|A).", "Usar total geral quando deveria usar só o grupo dado."],
    quiz: [
      {
        question: "Em P(A|B), qual evento vira o universo?",
        choices: ["A", "B", "A ou B", "Nenhum"],
        answerIndex: 1,
        explanation: "A barra se lê 'dado B'. Então você fica dentro de B."
      }
    ]
  },
  {
    id: "bayes",
    title: "Probabilidade total e Bayes",
    difficulty: "Difícil",
    estimatedTime: "45 min",
    iconKey: "brain",
    objective: "Usar pistas indiretas para descobrir a origem provável de um evento.",
    explanation: [
      "Probabilidade total soma caminhos diferentes que chegam ao mesmo resultado.",
      "Bayes inverte a pergunta: em vez de P(resultado | causa), ele pede P(causa | resultado)."
    ],
    formulas: ["P(B) = P(B|A)P(A) + P(B|Ac)P(Ac)", "P(A|B) = P(B|A)P(A) / P(B)"],
    symbols: ["P(A|B)", "P(B|A)", "P(A)", "P(B)"],
    examples: [
      {
        level: "Fácil",
        title: "Caixas",
        problem: "Caixa 1 tem 10% defeito, caixa 2 tem 30%. Escolhe uma caixa ao acaso. Qual chance de defeito?",
        solution: "P(defeito) = 0,5*0,10 + 0,5*0,30 = 0,20."
      },
      {
        level: "Médio",
        title: "Astronauta",
        problem: "Um sensor acerta 90% quando há falha e apita 5% sem falha. Falha é rara: 2%.",
        solution: "Use total para P(apito) e Bayes para P(falha | apito)."
      },
      {
        level: "Difícil",
        title: "Origem de uma peça",
        problem: "Uma peça defeituosa apareceu. Qual fornecedor é mais provável?",
        solution: "Compare P(fornecedor | defeito), não apenas a taxa de defeito."
      }
    ],
    macetes: ["Bayes aparece quando a questão quer descobrir a causa depois de ver o efeito.", "Desenhe uma árvore: caminho, probabilidade do caminho, soma."],
    pegadinhas: ["Usar só a taxa de acerto e esquecer que a causa pode ser rara.", "Ignorar o denominador P(B)."],
    quiz: [
      {
        question: "Bayes normalmente serve para...",
        choices: ["Somar médias", "Inverter uma probabilidade condicional", "Calcular fatorial", "Medir desvio padrão"],
        answerIndex: 1,
        explanation: "Ele transforma informações do tipo P(resultado | causa) em P(causa | resultado)."
      }
    ]
  },
  {
    id: "variaveis-aleatorias",
    title: "Variáveis aleatórias",
    difficulty: "Fácil",
    estimatedTime: "30 min",
    iconKey: "target",
    objective: "Entender X como um número que resume o resultado de um experimento.",
    explanation: [
      "Variável aleatória é um placar. Em duas moedas, X pode ser o número de caras.",
      "Discreta conta valores separados: 0, 1, 2. Contínua mede em escala: peso, tempo, altura."
    ],
    formulas: ["X = número de sucessos", "p(x) = P(X = x)"],
    symbols: ["X", "x", "P(X = k)"],
    examples: [
      {
        level: "Fácil",
        title: "Uma moeda",
        problem: "X = número de caras em uma moeda.",
        solution: "X pode ser 0 ou 1."
      },
      {
        level: "Médio",
        title: "Duas moedas",
        problem: "X = número de caras em duas moedas.",
        solution: "X pode ser 0, 1 ou 2."
      },
      {
        level: "Difícil",
        title: "Defeitos",
        problem: "X = número de peças defeituosas em 20 peças.",
        solution: "X pode ir de 0 até 20, mas cada valor tem uma probabilidade."
      }
    ],
    macetes: ["Pergunte: que número a questão está contando?", "X maiúsculo é a variável; x minúsculo é um valor possível."],
    pegadinhas: ["Confundir resultado do experimento com valor de X.", "Tratar variável discreta como se pudesse ter qualquer decimal."],
    quiz: [
      {
        question: "Se X é número de caras em duas moedas, X pode valer...",
        choices: ["Apenas 0", "0, 1 ou 2", "0,5", "Qualquer número real"],
        answerIndex: 1,
        explanation: "Com duas moedas, o número de caras pode ser 0, 1 ou 2."
      }
    ]
  },
  {
    id: "funcao-probabilidade",
    title: "Função de probabilidade",
    difficulty: "Médio",
    estimatedTime: "35 min",
    iconKey: "table",
    objective: "Montar e conferir uma tabela p(x).",
    explanation: [
      "A função de probabilidade diz a chance de cada valor de X.",
      "Em variável discreta, a soma de todas as probabilidades precisa dar 1."
    ],
    formulas: ["p(x) = P(X = x)", "∑ p(x) = 1"],
    symbols: ["p(x)", "∑", "P(X = x)"],
    examples: [
      {
        level: "Fácil",
        title: "Uma moeda",
        problem: "X = número de caras. Monte p(x).",
        solution: "p(0)=0,5 e p(1)=0,5. Soma = 1."
      },
      {
        level: "Médio",
        title: "Duas moedas",
        problem: "X = número de caras em duas moedas.",
        solution: "p(0)=1/4, p(1)=2/4, p(2)=1/4."
      },
      {
        level: "Difícil",
        title: "Peças defeituosas",
        problem: "Duas peças, cada uma defeituosa com 40%. X = número de defeitos.",
        solution: "p(0)=0,6², p(1)=2*0,4*0,6, p(2)=0,4²."
      }
    ],
    macetes: ["No fim, some tudo. Se não der 1, algo escapou.", "Valores impossíveis têm probabilidade zero."],
    pegadinhas: ["Esquecer que X=1 em duas moedas tem dois caminhos: cara-coroa e coroa-cara."],
    quiz: [
      {
        question: "Uma tabela p(x) válida precisa somar...",
        choices: ["0", "0,5", "1", "100"],
        answerIndex: 2,
        explanation: "Todas as probabilidades possíveis juntas formam 100%, que em decimal é 1."
      }
    ]
  },
  {
    id: "funcao-acumulada",
    title: "Função acumulada",
    difficulty: "Médio",
    estimatedTime: "35 min",
    iconKey: "line",
    objective: "Diferenciar p(x) de F(x) e somar probabilidades até um ponto.",
    explanation: [
      "F(x) é a probabilidade acumulada: P(X <= x).",
      "p(x) olha um valor exato. F(x) soma todos os valores até aquele limite."
    ],
    formulas: ["F(x) = P(X <= x)", "P(a < X <= b) = F(b) - F(a)"],
    symbols: ["F(x)", "≤", "P(X <= x)"],
    examples: [
      {
        level: "Fácil",
        title: "Tabela simples",
        problem: "p(0)=0,2, p(1)=0,5, p(2)=0,3. Quanto é F(1)?",
        solution: "F(1)=P(X<=1)=p(0)+p(1)=0,7."
      },
      {
        level: "Médio",
        title: "Amostra de 3 peças",
        problem: "X = defeitos em 3 peças. O que é F(2)?",
        solution: "É a chance de ter no máximo 2 defeitos: P(0)+P(1)+P(2)."
      },
      {
        level: "Difícil",
        title: "Intervalo",
        problem: "Quer P(1 < X <= 4).",
        solution: "Use F(4)-F(1), porque F(1) inclui tudo até 1."
      }
    ],
    macetes: ["Acumulada sempre olha para a esquerda na reta.", "No máximo é linguagem de F(x)."],
    pegadinhas: ["Confundir P(X=2) com P(X<=2).", "Subtrair F(a) errado quando o intervalo inclui a."],
    quiz: [
      {
        question: "F(3) significa...",
        choices: ["P(X = 3)", "P(X >= 3)", "P(X <= 3)", "P(X != 3)"],
        answerIndex: 2,
        explanation: "A função acumulada soma tudo até 3."
      }
    ]
  },
  {
    id: "valor-esperado",
    title: "Valor esperado",
    difficulty: "Médio",
    estimatedTime: "40 min",
    iconKey: "coins",
    objective: "Calcular a média de longo prazo de uma variável aleatória.",
    explanation: [
      "Valor esperado não é promessa de resultado. É a média se o experimento fosse repetido muitas vezes.",
      "Multiplique cada valor pela probabilidade dele e some tudo."
    ],
    formulas: ["E(X) = ∑ x p(x)", "E(aX + b) = aE(X) + b"],
    symbols: ["E(X)", "∑", "x", "p(x)"],
    examples: [
      {
        level: "Fácil",
        title: "Moeda premiada",
        problem: "Ganha R$ 10 com chance 0,5 e R$ 0 com chance 0,5.",
        solution: "E(X)=10*0,5 + 0*0,5 = R$ 5."
      },
      {
        level: "Médio",
        title: "Lucro",
        problem: "Lucro 100 com chance 0,2 e prejuízo 20 com chance 0,8.",
        solution: "E(X)=100*0,2 + (-20)*0,8 = 4."
      },
      {
        level: "Difícil",
        title: "Rifa",
        problem: "Bilhete custa R$ 3, prêmio R$ 100 com chance 1/50.",
        solution: "Ganho líquido: 97 com chance 1/50 e -3 com chance 49/50. E(X) = -1."
      }
    ],
    macetes: ["Esperança é média ponderada.", "Probabilidade entra como peso."],
    pegadinhas: ["Em jogo pago, use lucro líquido: prêmio menos custo.", "Esperança pode ser decimal mesmo que X só tenha valores inteiros."],
    quiz: [
      {
        question: "E(X) representa...",
        choices: ["O resultado garantido", "A média de longo prazo", "A maior probabilidade", "O risco máximo"],
        answerIndex: 1,
        explanation: "É uma média ponderada pelos cenários possíveis."
      }
    ]
  },
  {
    id: "variancia-desvio",
    title: "Variância e desvio padrão",
    difficulty: "Médio",
    estimatedTime: "45 min",
    iconKey: "activity",
    objective: "Medir dispersão, risco e espalhamento dos resultados.",
    explanation: [
      "Variância mede o quanto os valores se afastam da média.",
      "Desvio padrão é a raiz da variância e volta para a unidade original."
    ],
    formulas: ["V(X) = E(X²) - [E(X)]²", "σ = √V(X)"],
    symbols: ["V(X)", "σ²", "σ", "√"],
    examples: [
      {
        level: "Fácil",
        title: "Sem variação",
        problem: "X sempre vale 5.",
        solution: "A média é 5 e a variância é 0. Nada espalha."
      },
      {
        level: "Médio",
        title: "Dois valores",
        problem: "X vale 0 ou 10 com chance 0,5 cada.",
        solution: "E(X)=5. E(X²)=50. V(X)=50-25=25. σ=5."
      },
      {
        level: "Difícil",
        title: "Comparar risco",
        problem: "Duas propostas têm mesma esperança, mas variâncias diferentes.",
        solution: "A menor variância é mais estável; a maior tem mais risco."
      }
    ],
    macetes: ["Calcule E(X) e E(X²). Depois faça E(X²) - E(X)².", "Desvio padrão é a raiz no final."],
    pegadinhas: ["Desvio padrão não soma direto.", "Variância nunca deve ser negativa na resposta final."],
    quiz: [
      {
        question: "Para somar variáveis independentes, o que soma direto?",
        choices: ["Desvios padrão", "Variâncias", "Raízes", "Porcentagens sempre"],
        answerIndex: 1,
        explanation: "Com independência, variâncias somam. Desvio padrão só vem depois da raiz."
      }
    ]
  },
  {
    id: "bernoulli",
    title: "Bernoulli",
    difficulty: "Fácil",
    estimatedTime: "25 min",
    iconKey: "toggle",
    objective: "Reconhecer um experimento com apenas sucesso ou fracasso.",
    explanation: [
      "Bernoulli é a distribuição de uma única tentativa com dois resultados: sucesso ou fracasso.",
      "O sucesso é aquilo que a questão quer contar, não necessariamente algo bom."
    ],
    formulas: ["P(X=1)=p", "P(X=0)=1-p", "E(X)=p", "V(X)=p(1-p)"],
    symbols: ["p", "q", "X=0", "X=1"],
    examples: [
      {
        level: "Fácil",
        title: "Peça defeituosa",
        problem: "Uma peça tem 5% de chance de defeito. X=1 se tiver defeito.",
        solution: "P(X=1)=0,05 e P(X=0)=0,95."
      },
      {
        level: "Médio",
        title: "Cliente inadimplente",
        problem: "Um cliente tem 12% de chance de inadimplência.",
        solution: "É Bernoulli se estamos olhando só um cliente."
      },
      {
        level: "Difícil",
        title: "Sucesso ruim",
        problem: "Sucesso = bit com erro.",
        solution: "Mesmo sendo algo ruim, pode ser chamado de sucesso porque é o evento contado."
      }
    ],
    macetes: ["Uma tentativa só: pense em Bernoulli.", "q é o complemento: q = 1 - p."],
    pegadinhas: ["Sucesso não significa coisa boa; significa evento de interesse."],
    quiz: [
      {
        question: "Bernoulli tem quantas tentativas?",
        choices: ["Uma", "Duas", "n fixo", "Infinitas"],
        answerIndex: 0,
        explanation: "Uma tentativa com sucesso ou fracasso."
      }
    ]
  },
  {
    id: "binomial",
    title: "Binomial",
    difficulty: "Médio",
    estimatedTime: "50 min",
    iconKey: "boxes",
    objective: "Resolver n tentativas independentes com sucesso/fracasso e p constante.",
    explanation: [
      "Binomial é Bernoulli repetida n vezes.",
      "Use quando há número fixo de tentativas, duas possibilidades, independência e mesma probabilidade."
    ],
    formulas: ["P(X=k)=C(n,k)p^k(1-p)^(n-k)", "E(X)=np", "V(X)=np(1-p)"],
    symbols: ["n", "k", "p", "q", "C(n,k)"],
    examples: [
      {
        level: "Fácil",
        title: "10 peças",
        problem: "10 peças, 5% defeituosas. Probabilidade de exatamente 1 defeito.",
        solution: "P(X=1)=C(10,1)0,05¹0,95⁹."
      },
      {
        level: "Médio",
        title: "Pelo menos um",
        problem: "20 itens, 5% defeituosos. P(pelo menos um defeito).",
        solution: "Use complementar: 1 - P(X=0) = 1 - 0,95²⁰."
      },
      {
        level: "Difícil",
        title: "Mais de 20%",
        problem: "Mais de 20% de 10 clientes inadimplentes.",
        solution: "20% de 10 = 2. Mais de 2 é P(X>=3)."
      }
    ],
    macetes: ["n fixo + p constante + independência = Binomial.", "Pelo menos um quase sempre vira 1 - P(0)."],
    pegadinhas: ["Amostragem sem reposição em população pequena não é Binomial.", "Mais de k vira k+1 ou mais."],
    quiz: [
      {
        question: "Qual condição não pode faltar na Binomial?",
        choices: ["p muda a cada tentativa", "n é fixo", "não existe sucesso", "não há tentativas"],
        answerIndex: 1,
        explanation: "A Binomial precisa de número fixo de tentativas."
      }
    ]
  },
  {
    id: "poisson",
    title: "Poisson",
    difficulty: "Médio",
    estimatedTime: "45 min",
    iconKey: "timer",
    objective: "Contar ocorrências raras ou aleatórias por intervalo de tempo, área ou espaço.",
    explanation: [
      "Poisson aparece quando a questão dá uma média por intervalo: mensagens por minuto, chamadas por hora, defeitos por metro quadrado.",
      "O parâmetro λ é a média esperada no intervalo usado."
    ],
    formulas: ["P(X=k)=e^-λ λ^k / k!", "E(X)=λ", "V(X)=λ"],
    symbols: ["λ", "e", "k", "!"],
    examples: [
      {
        level: "Fácil",
        title: "Mensagens",
        problem: "Servidor recebe média de 3 mensagens por minuto. P(exatamente 2 em 1 minuto).",
        solution: "λ=3. P(X=2)=e^-3*3²/2!."
      },
      {
        level: "Médio",
        title: "Ajuste de tempo",
        problem: "2 chamadas por minuto. Qual λ para 5 minutos?",
        solution: "λ=2*5=10."
      },
      {
        level: "Difícil",
        title: "Defeitos por área",
        problem: "0,4 defeitos por m². Em 3 m², P(nenhum defeito).",
        solution: "λ=1,2. P(X=0)=e^-1,2."
      }
    ],
    macetes: ["Média por tempo, área ou espaço: pense em Poisson.", "Antes da fórmula, ajuste λ para o intervalo pedido."],
    pegadinhas: ["Usar λ de 1 minuto em uma pergunta de 5 minutos.", "Confundir λ com probabilidade p."],
    quiz: [
      {
        question: "Poisson usa qual parâmetro principal?",
        choices: ["p", "λ", "σ", "C(n,k)"],
        answerIndex: 1,
        explanation: "λ é a média de ocorrências no intervalo."
      }
    ]
  },
  {
    id: "hipergeometrica",
    title: "Hipergeométrica",
    difficulty: "Difícil",
    estimatedTime: "45 min",
    iconKey: "layers",
    objective: "Resolver amostragem sem reposição de uma população limitada.",
    explanation: [
      "Hipergeométrica aparece quando você retira itens sem devolver.",
      "Como não há reposição, a probabilidade muda a cada retirada."
    ],
    formulas: ["P(X=k)=C(K,k)C(N-K,n-k)/C(N,n)"],
    symbols: ["N", "K", "n", "k", "C(n,k)"],
    examples: [
      {
        level: "Fácil",
        title: "Placas",
        problem: "10 placas, 3 defeituosas. Escolhe 2 sem reposição. P(1 defeituosa).",
        solution: "C(3,1)C(7,1)/C(10,2)."
      },
      {
        level: "Médio",
        title: "Lote",
        problem: "200 unidades, 20 ruins. Amostra 5 sem reposição.",
        solution: "População limitada e sem reposição: Hipergeométrica."
      },
      {
        level: "Difícil",
        title: "Com reposição",
        problem: "Se a peça volta para o lote depois de testada, muda?",
        solution: "Sim. Com reposição e p constante, o caso fica Binomial."
      }
    ],
    macetes: ["Sem reposição + população pequena: Hipergeométrica.", "A parte boa e a parte ruim são combinadas separadamente."],
    pegadinhas: ["Usar Binomial quando a probabilidade muda depois de cada retirada.", "Confundir n da amostra com N da população."],
    quiz: [
      {
        question: "A palavra que mais denuncia Hipergeométrica é...",
        choices: ["Com reposição", "Sem reposição", "Por minuto", "Em média"],
        answerIndex: 1,
        explanation: "Sem reposição em população limitada é o sinal clássico."
      }
    ]
  },
  {
    id: "soma-independentes",
    title: "Soma de variáveis independentes",
    difficulty: "Difícil",
    estimatedTime: "40 min",
    iconKey: "merge",
    objective: "Somar médias e variâncias sem somar desvios padrão direto.",
    explanation: [
      "Para variáveis independentes, médias somam ou subtraem conforme a operação.",
      "Variâncias somam tanto na soma quanto na subtração. O desvio padrão vem depois."
    ],
    formulas: ["E(X+Y)=E(X)+E(Y)", "V(X±Y)=V(X)+V(Y)", "σ = √V"],
    symbols: ["E(X)", "V(X)", "σ"],
    examples: [
      {
        level: "Fácil",
        title: "Pesos",
        problem: "Produto pesa média 100g e embalagem 20g.",
        solution: "Média total = 120g."
      },
      {
        level: "Médio",
        title: "Conserva",
        problem: "Produto σ=4 e lata σ=2.",
        solution: "Variância total = 4² + 2² = 20. Desvio = √20."
      },
      {
        level: "Difícil",
        title: "Armazém",
        problem: "Estoque inicial menos demanda.",
        solution: "Média subtrai, mas variância soma se forem independentes."
      }
    ],
    macetes: ["Desvio padrão vira variância antes de combinar.", "Na subtração, variância também soma."],
    pegadinhas: ["Fazer σ1 + σ2 direto.", "Subtrair variância quando a variável é subtraída."],
    quiz: [
      {
        question: "Na variável X - Y, com independência, a variância é...",
        choices: ["V(X)-V(Y)", "V(X)+V(Y)", "σX-σY", "Zero"],
        answerIndex: 1,
        explanation: "A incerteza das duas variáveis aumenta a dispersão total."
      }
    ]
  },
  {
    id: "propostas-valor-esperado",
    title: "Propostas comerciais e valor esperado",
    difficulty: "Médio",
    estimatedTime: "35 min",
    iconKey: "briefcase",
    objective: "Comparar propostas usando lucro esperado.",
    explanation: [
      "Quando pagamentos dependem de cenários, compare pelo valor esperado.",
      "Se duas propostas têm esperança parecida, olhe também risco e variância."
    ],
    formulas: ["Lucro esperado = ∑ lucro do cenário * probabilidade do cenário", "Custo fixo entra em todos os cenários"],
    symbols: ["E(X)", "p(x)", "V(X)"],
    examples: [
      {
        level: "Fácil",
        title: "Bônus simples",
        problem: "Recebe 1000 com chance 0,4 ou 200 com chance 0,6.",
        solution: "E=1000*0,4 + 200*0,6 = 520."
      },
      {
        level: "Médio",
        title: "Proposta com custo",
        problem: "Ganha 5000 se aprovar, chance 0,3, mas gasta 800.",
        solution: "Lucro líquido esperado = (5000-800)*0,3 + (-800)*0,7."
      },
      {
        level: "Difícil",
        title: "Risco",
        problem: "Proposta A e B têm mesma esperança.",
        solution: "Escolha depende do risco: compare a variância."
      }
    ],
    macetes: ["Sempre transforme em lucro líquido.", "Cenários precisam cobrir 100% das possibilidades."],
    pegadinhas: ["Comparar receita sem descontar custo.", "Esquecer cenário de perda."],
    quiz: [
      {
        question: "Em proposta comercial, o custo fixo deve...",
        choices: ["Ser ignorado", "Entrar só no sucesso", "Entrar no lucro líquido", "Virar probabilidade"],
        answerIndex: 2,
        explanation: "A comparação precisa usar lucro líquido, não só receita."
      }
    ]
  },
  {
    id: "detector-distribuicao",
    title: "Detector de distribuição",
    difficulty: "Médio",
    estimatedTime: "20 min",
    iconKey: "radar",
    objective: "Escolher a distribuição certa antes de calcular.",
    explanation: [
      "A distribuição é escolhida pelas pistas do enunciado.",
      "O detector pergunta sobre tentativas, independência, reposição, média por intervalo e palavras-chave."
    ],
    formulas: ["n fixo + p constante -> Binomial", "média por intervalo -> Poisson", "sem reposição -> Hipergeométrica"],
    symbols: ["n", "p", "λ", "N"],
    examples: [
      {
        level: "Fácil",
        title: "Sucesso ou fracasso",
        problem: "Uma transmissão falha ou não falha.",
        solution: "Uma tentativa: Bernoulli."
      },
      {
        level: "Médio",
        title: "Pacotes",
        problem: "100 pacotes independentes, chance fixa de erro.",
        solution: "Binomial."
      },
      {
        level: "Difícil",
        title: "Placas sem reposição",
        problem: "Retira 4 placas de um lote de 12 sem devolver.",
        solution: "Hipergeométrica."
      }
    ],
    macetes: ["Distribuição é diagnóstico.", "Se aparecer média por tempo, procure λ."],
    pegadinhas: ["Aplicar Poisson só porque fala em número de ocorrências, mas sem média por intervalo.", "Ignorar 'sem reposição'."],
    quiz: [
      {
        question: "Média por hora é pista forte de...",
        choices: ["Poisson", "Hipergeométrica", "Bayes", "Variância apenas"],
        answerIndex: 0,
        explanation: "Poisson conta ocorrências por intervalo."
      }
    ]
  },
  {
    id: "exercicios-lista",
    title: "Exercícios da lista",
    difficulty: "Boss",
    estimatedTime: "60 min",
    iconKey: "sword",
    objective: "Treinar a tradução completa de enunciados de prova.",
    explanation: [
      "Exercício não é só resposta final. A resolução boa mostra assunto, tradução, fórmula, substituição e pegadinha.",
      "Marque acertos e erros para o dashboard mostrar seu progresso real."
    ],
    formulas: ["Tradução -> fórmula -> substituição -> conta -> resposta"],
    symbols: ["P(X=k)", "P(X>=k)", "E(X)", "V(X)"],
    examples: [
      {
        level: "Fácil",
        title: "Cara em moeda",
        problem: "Número de caras em duas moedas.",
        solution: "Monte o espaço amostral e conte."
      },
      {
        level: "Médio",
        title: "Servidor",
        problem: "Mensagens por minuto com média dada.",
        solution: "Use Poisson e ajuste o intervalo."
      },
      {
        level: "Difícil",
        title: "Sem reposição",
        problem: "Placas escolhidas sem reposição.",
        solution: "Use Hipergeométrica."
      }
    ],
    macetes: ["Errou? Escreva qual pista você deixou passar.", "A melhor revisão é refazer só a tradução."],
    pegadinhas: ["Ver resolução cedo demais dá sensação falsa de domínio."],
    quiz: [
      {
        question: "Uma resolução boa deve começar por...",
        choices: ["Resposta final", "Tradução do enunciado", "Decorar a fórmula", "Arredondar"],
        answerIndex: 1,
        explanation: "A tradução é a ponte entre texto e matemática."
      }
    ]
  },
  {
    id: "simulado-boss",
    title: "Simulado Boss Final",
    difficulty: "Boss",
    estimatedTime: "35 min",
    iconKey: "crown",
    objective: "Misturar assuntos para testar se você reconhece a questão sem dica.",
    explanation: [
      "O simulado força troca de contexto: uma questão pode ser Bayes, a próxima Binomial.",
      "O feedback imediato explica por que a alternativa correta faz sentido."
    ],
    formulas: ["Pontuação = acertos em 10", "Recorde salvo no Supabase"],
    symbols: ["A", "B", "C", "D"],
    examples: [
      {
        level: "Fácil",
        title: "Símbolo",
        problem: "Pelo menos um.",
        solution: "P(X>=1) ou 1-P(X=0)."
      },
      {
        level: "Médio",
        title: "Diagnóstico",
        problem: "n fixo, p constante.",
        solution: "Binomial."
      },
      {
        level: "Difícil",
        title: "Recorde",
        problem: "Fez 8 e depois 6.",
        solution: "O melhor placar continua 8."
      }
    ],
    macetes: ["Antes de responder, diga mentalmente o assunto.", "Elimine alternativas com sinal errado."],
    pegadinhas: ["Chutar distribuição pela aparência da fórmula sem ler o enunciado."],
    quiz: [
      {
        question: "O simulado mistura assuntos para treinar...",
        choices: ["Memorização cega", "Reconhecimento de pistas", "Digitação rápida", "Desenho de gráficos"],
        answerIndex: 1,
        explanation: "A prova cobra reconhecer a pista certa."
      }
    ]
  },
  {
    id: "revisao-10",
    title: "Revisão de 10 minutos",
    difficulty: "Fácil",
    estimatedTime: "10 min",
    iconKey: "zap",
    objective: "Revisar fórmulas, traduções e pegadinhas antes da prova.",
    explanation: [
      "A revisão rápida não tenta ensinar tudo de novo. Ela ativa os atalhos que mais caem.",
      "Use quando estiver sem tempo ou pouco antes de fazer exercícios."
    ],
    formulas: ["Pelo menos um = 1 - P(nenhum)", "Desvio padrão: transforme em variância primeiro", "Poisson: média por intervalo"],
    symbols: ["≥", "≤", "λ", "σ"],
    examples: [
      {
        level: "Fácil",
        title: "No máximo 2",
        problem: "Traduza no máximo 2.",
        solution: "P(X<=2)."
      },
      {
        level: "Médio",
        title: "Mais de 2",
        problem: "Traduza mais de 2.",
        solution: "P(X>2), que para X inteiro é P(X>=3)."
      },
      {
        level: "Difícil",
        title: "Central telefônica",
        problem: "Média de 10 ligações por minuto e capacidade 10.",
        solution: "Ultrapassar capacidade é X>=11."
      }
    ],
    macetes: ["Quando aparecer 'pelo menos um', pense no complementar.", "Antes de calcular, descubra o tipo da questão."],
    pegadinhas: ["No máximo inclui o número.", "Mais que não inclui o número."],
    quiz: [
      {
        question: "Pelo menos um geralmente fica mais fácil como...",
        choices: ["P(X=1)", "1 - P(X=0)", "P(X<0)", "E(X)"],
        answerIndex: 1,
        explanation: "O complementar de 'pelo menos um' é 'nenhum'."
      }
    ]
  }
];

export function getModuleById(moduleId: string) {
  return modules.find((module) => module.id === moduleId);
}
