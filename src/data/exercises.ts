import type { Exercise, ExerciseCategory } from "./types";

export const exerciseCategories: ExerciseCategory[] = [
  "Probabilidade básica",
  "Condicional",
  "Bayes",
  "Variável aleatória",
  "Valor esperado",
  "Variância",
  "Binomial",
  "Poisson",
  "Hipergeométrica"
];

export const exercises: Exercise[] = [
  {
    id: "moeda-uma-cara",
    title: "Número de caras em uma moeda",
    difficulty: "Fácil",
    category: "Variável aleatória",
    statement: "Uma moeda justa é lançada uma vez. Seja X o número de caras. Monte a distribuição de X.",
    answer: "P(X=0)=0,5 e P(X=1)=0,5.",
    hint: "Liste os resultados possíveis: cara ou coroa.",
    solution: {
      subject: "Variável aleatória discreta",
      translation: "X conta quantas caras aparecem em um lançamento.",
      formula: "p(x)=P(X=x)",
      why: "X só pode assumir valores separados: 0 ou 1.",
      substitution: "P(X=0)=P(coroa); P(X=1)=P(cara).",
      calculation: "Cada lado tem chance 1/2.",
      finalAnswer: "P(X=0)=0,5 e P(X=1)=0,5.",
      trap: "Não escreva X=cara. X é número, então vale 0 ou 1."
    }
  },
  {
    id: "duas-moedas",
    title: "Número de caras em duas moedas",
    difficulty: "Fácil",
    category: "Probabilidade básica",
    statement: "Duas moedas justas são lançadas. Qual é a distribuição do número de caras?",
    answer: "P(0)=1/4, P(1)=2/4, P(2)=1/4.",
    hint: "Espaço amostral: CC, CK, KC, KK, pensando C=cara e K=coroa.",
    solution: {
      subject: "Espaço amostral",
      translation: "X conta 0, 1 ou 2 caras.",
      formula: "P(A)=casos favoráveis/casos possíveis",
      why: "Todos os quatro resultados são igualmente prováveis.",
      substitution: "X=0: KK; X=1: CK ou KC; X=2: CC.",
      calculation: "1/4, 2/4, 1/4.",
      finalAnswer: "P(X=0)=0,25; P(X=1)=0,50; P(X=2)=0,25.",
      trap: "X=1 tem dois caminhos, não um."
    }
  },
  {
    id: "defeituosas-40",
    title: "Peças defeituosas com 40%",
    difficulty: "Médio",
    category: "Binomial",
    statement: "Duas peças são avaliadas independentemente. Cada peça tem 40% de chance de ser defeituosa. Qual a probabilidade de exatamente uma defeituosa?",
    answer: "0,48.",
    hint: "Exatamente uma pode acontecer em duas ordens: defeituosa/perfeita ou perfeita/defeituosa.",
    solution: {
      subject: "Binomial",
      translation: "n=2, p=0,40, k=1.",
      formula: "P(X=k)=C(n,k)p^k(1-p)^(n-k)",
      why: "Há número fixo de tentativas, sucesso/fracasso, independência e p constante.",
      substitution: "C(2,1)*0,40^1*0,60^1.",
      calculation: "2*0,40*0,60=0,48.",
      finalAnswer: "48%.",
      trap: "Não faça só 0,40*0,60; existem duas ordens."
    }
  },
  {
    id: "funcao-acumulada",
    title: "Função acumulada",
    difficulty: "Médio",
    category: "Variável aleatória",
    statement: "Uma variável X tem p(0)=0,2, p(1)=0,5 e p(2)=0,3. Calcule F(1).",
    answer: "0,7.",
    hint: "F(1) quer dizer P(X≤1).",
    solution: {
      subject: "Função acumulada",
      translation: "Somar todos os valores até 1.",
      formula: "F(x)=P(X≤x)",
      why: "A acumulada não olha só para x; ela junta tudo até x.",
      substitution: "F(1)=p(0)+p(1).",
      calculation: "0,2+0,5=0,7.",
      finalAnswer: "F(1)=0,7.",
      trap: "Não responda p(1)=0,5. Isso é probabilidade exata."
    }
  },
  {
    id: "lucro-esperado",
    title: "Valor esperado do lucro",
    difficulty: "Médio",
    category: "Valor esperado",
    statement: "Uma proposta dá lucro de R$ 1000 com chance 30% e prejuízo de R$ 200 com chance 70%. Qual o lucro esperado?",
    answer: "R$ 160.",
    hint: "Multiplique cada cenário pela sua probabilidade.",
    solution: {
      subject: "Valor esperado",
      translation: "Média de lucro em muitas propostas iguais.",
      formula: "E(X)=∑x p(x)",
      why: "Os cenários têm valores e probabilidades diferentes.",
      substitution: "1000*0,30 + (-200)*0,70.",
      calculation: "300 - 140 = 160.",
      finalAnswer: "Lucro esperado de R$ 160.",
      trap: "Prejuízo entra como número negativo."
    }
  },
  {
    id: "peso-conserva",
    title: "Peso bruto da conserva",
    difficulty: "Difícil",
    category: "Variância",
    statement: "O conteúdo tem média 500g e desvio 8g. A lata tem média 60g e desvio 3g. Se são independentes, qual a média e o desvio padrão do peso bruto?",
    answer: "Média 560g e desvio √73 ≈ 8,54g.",
    hint: "Some médias. Para desvio, transforme em variância.",
    solution: {
      subject: "Soma de variáveis independentes",
      translation: "Peso bruto = conteúdo + lata.",
      formula: "E(X+Y)=E(X)+E(Y); V(X+Y)=V(X)+V(Y)",
      why: "As variáveis são independentes.",
      substitution: "Média=500+60; Variância=8²+3².",
      calculation: "560; 64+9=73; σ=√73≈8,54.",
      finalAnswer: "Média 560g e desvio padrão aproximadamente 8,54g.",
      trap: "Não faça 8+3=11 para o desvio."
    }
  },
  {
    id: "lote-20-5",
    title: "Lote com 20 itens e 5% defeituosos",
    difficulty: "Médio",
    category: "Binomial",
    statement: "Um lote tem 20 itens testados independentemente, cada um com 5% de chance de defeito. Qual a probabilidade de pelo menos um defeito?",
    answer: "1 - 0,95^20 ≈ 0,6415.",
    hint: "Pelo menos um é mais fácil pelo complementar.",
    solution: {
      subject: "Binomial e complementar",
      translation: "P(X≥1), com n=20 e p=0,05.",
      formula: "P(X≥1)=1-P(X=0)",
      why: "Somar de 1 até 20 dá trabalho; o complementar tem um caso só.",
      substitution: "1 - C(20,0)0,05^0 0,95^20.",
      calculation: "1 - 0,95^20 ≈ 0,6415.",
      finalAnswer: "Aproximadamente 64,15%.",
      trap: "Pelo menos um inclui 1, 2, 3... não só exatamente 1."
    }
  },
  {
    id: "servidor-poisson",
    title: "Mensagens no servidor",
    difficulty: "Médio",
    category: "Poisson",
    statement: "Um servidor recebe em média 4 mensagens por minuto. Qual a probabilidade de receber exatamente 2 mensagens em um minuto?",
    answer: "e^-4 * 4² / 2! ≈ 0,1465.",
    hint: "Média por minuto é pista de Poisson.",
    solution: {
      subject: "Poisson",
      translation: "λ=4 e k=2.",
      formula: "P(X=k)=e^-λ λ^k/k!",
      why: "A questão conta ocorrências por intervalo de tempo.",
      substitution: "e^-4*4²/2!.",
      calculation: "0,0183*16/2≈0,1465.",
      finalAnswer: "Aproximadamente 14,65%.",
      trap: "λ não é 0,04; é a média de mensagens."
    }
  },
  {
    id: "bits-erro",
    title: "Bits com erro",
    difficulty: "Médio",
    category: "Binomial",
    statement: "Cada bit tem probabilidade 0,01 de erro, independentemente. Em 100 bits, qual a probabilidade de nenhum erro?",
    answer: "0,99^100 ≈ 0,3660.",
    hint: "Nenhum erro significa k=0.",
    solution: {
      subject: "Binomial",
      translation: "n=100, p=0,01, k=0.",
      formula: "P(X=0)=C(n,0)p^0(1-p)^n",
      why: "Há 100 tentativas independentes com p constante.",
      substitution: "C(100,0)*0,01^0*0,99^100.",
      calculation: "0,99^100≈0,3660.",
      finalAnswer: "Aproximadamente 36,60%.",
      trap: "Não use p=1; o sucesso aqui é erro."
    }
  },
  {
    id: "armazem-demanda",
    title: "Armazém com abastecimento e demanda",
    difficulty: "Difícil",
    category: "Variância",
    statement: "O abastecimento diário tem média 120 e desvio 10. A demanda tem média 100 e desvio 12. Supondo independência, qual a média e o desvio da sobra abastecimento - demanda?",
    answer: "Média 20 e desvio √244 ≈ 15,62.",
    hint: "Média subtrai, mas variância soma.",
    solution: {
      subject: "Diferença de variáveis independentes",
      translation: "Sobra = abastecimento - demanda.",
      formula: "E(X-Y)=E(X)-E(Y); V(X-Y)=V(X)+V(Y)",
      why: "Mesmo subtraindo valores, incertezas independentes se somam.",
      substitution: "Média=120-100; Variância=10²+12².",
      calculation: "20; 100+144=244; σ=√244≈15,62.",
      finalAnswer: "Média 20 unidades e desvio aproximadamente 15,62.",
      trap: "Não faça 10-12 para o desvio."
    }
  },
  {
    id: "clientes-inadimplentes",
    title: "Clientes inadimplentes",
    difficulty: "Médio",
    category: "Binomial",
    statement: "Cada cliente tem 12% de chance de inadimplência. Em 10 clientes independentes, qual a probabilidade de no máximo 1 inadimplente?",
    answer: "0,88^10 + 10*0,12*0,88^9 ≈ 0,6583.",
    hint: "No máximo 1 significa X=0 ou X=1.",
    solution: {
      subject: "Binomial acumulada",
      translation: "P(X≤1), com n=10 e p=0,12.",
      formula: "P(X≤1)=P(X=0)+P(X=1)",
      why: "No máximo inclui 0 e 1.",
      substitution: "0,88^10 + C(10,1)0,12 0,88^9.",
      calculation: "≈0,2785 + 0,3798 = 0,6583.",
      finalAnswer: "Aproximadamente 65,83%.",
      trap: "No máximo 1 não é exatamente 1."
    }
  },
  {
    id: "transmissao-dados",
    title: "Transmissão de dados",
    difficulty: "Médio",
    category: "Binomial",
    statement: "Um pacote é transmitido corretamente com probabilidade 0,98. Em 5 transmissões independentes, qual a probabilidade de todas corretas?",
    answer: "0,98^5 ≈ 0,9039.",
    hint: "Todas corretas significa 5 sucessos em 5 tentativas.",
    solution: {
      subject: "Binomial",
      translation: "n=5, p=0,98, k=5.",
      formula: "P(X=5)=C(5,5)0,98^5 0,02^0",
      why: "Há número fixo de transmissões independentes.",
      substitution: "0,98^5.",
      calculation: "≈0,9039.",
      finalAnswer: "Aproximadamente 90,39%.",
      trap: "Se sucesso for erro, p muda. Defina sucesso antes."
    }
  },
  {
    id: "propostas-comerciais",
    title: "Propostas comerciais",
    difficulty: "Médio",
    category: "Valor esperado",
    statement: "Uma empresa pode enviar proposta A: ganha R$ 3000 com chance 20% e gasta R$ 200 sempre. Qual o valor esperado líquido?",
    answer: "R$ 400.",
    hint: "Se perder, ainda gastou R$ 200.",
    solution: {
      subject: "Valor esperado líquido",
      translation: "Cenário sucesso: 3000-200. Cenário fracasso: -200.",
      formula: "E(X)=∑x p(x)",
      why: "A proposta tem cenários de lucro/prejuízo.",
      substitution: "2800*0,20 + (-200)*0,80.",
      calculation: "560 - 160 = 400.",
      finalAnswer: "Valor esperado líquido de R$ 400.",
      trap: "Não esqueça o custo no fracasso."
    }
  },
  {
    id: "transformadores",
    title: "Transformadores",
    difficulty: "Médio",
    category: "Poisson",
    statement: "Em uma rede, ocorrem em média 0,6 falhas de transformadores por mês. Qual a probabilidade de nenhuma falha em 2 meses?",
    answer: "e^-1,2 ≈ 0,3010.",
    hint: "Ajuste λ para 2 meses.",
    solution: {
      subject: "Poisson com ajuste de intervalo",
      translation: "λ mensal=0,6; em 2 meses λ=1,2; k=0.",
      formula: "P(X=0)=e^-λ",
      why: "Conta ocorrências por intervalo de tempo.",
      substitution: "e^-1,2.",
      calculation: "≈0,3010.",
      finalAnswer: "Aproximadamente 30,10%.",
      trap: "Não use λ=0,6 se o intervalo pedido é 2 meses."
    }
  },
  {
    id: "pacotes-mensagem",
    title: "Pacotes de mensagem",
    difficulty: "Difícil",
    category: "Poisson",
    statement: "Um sistema recebe média de 8 pacotes por segundo. Qual a probabilidade de receber mais de 10 pacotes em um segundo?",
    answer: "1 - P(X≤10) com λ=8.",
    hint: "Mais de 10 é 11 ou mais.",
    solution: {
      subject: "Poisson acumulada",
      translation: "P(X>10) = 1 - P(X≤10).",
      formula: "P(X>10)=1-∑(e^-λ λ^k/k!), k=0 até 10",
      why: "Somar 11 até infinito é difícil; use o complementar.",
      substitution: "1 - ∑ e^-8 8^k/k!, k=0..10.",
      calculation: "Use a calculadora Poisson da página de calculadoras.",
      finalAnswer: "1 - P(X≤10), aproximadamente 0,1841.",
      trap: "Mais de 10 não inclui 10."
    }
  },
  {
    id: "central-telefonica",
    title: "Central telefônica",
    difficulty: "Difícil",
    category: "Poisson",
    statement: "Uma central recebe em média 10 ligações por minuto. A capacidade é 10 ligações por minuto. Qual a probabilidade de a capacidade ser ultrapassada?",
    answer: "P(X≥11) = 1 - P(X≤10), com λ=10.",
    hint: "Ultrapassar 10 começa em 11.",
    solution: {
      subject: "Poisson e tradução de limite",
      translation: "Capacidade ultrapassada significa X>10, ou X≥11.",
      formula: "P(X≥11)=1-P(X≤10)",
      why: "Poisson conta ligações por minuto e o complementar é finito.",
      substitution: "1 - ∑ e^-10 10^k/k!, k=0..10.",
      calculation: "Aproximadamente 0,4170.",
      finalAnswer: "Cerca de 41,70%.",
      trap: "X=10 ainda está dentro da capacidade."
    }
  },
  {
    id: "piso-ceramico",
    title: "Piso cerâmico",
    difficulty: "Médio",
    category: "Poisson",
    statement: "Um piso tem média de 0,2 defeitos por m². Em 5 m², qual a probabilidade de nenhum defeito?",
    answer: "e^-1 ≈ 0,3679.",
    hint: "Multiplique a média pela área.",
    solution: {
      subject: "Poisson por área",
      translation: "λ=0,2*5=1 e k=0.",
      formula: "P(X=0)=e^-λ",
      why: "Conta defeitos por unidade de área.",
      substitution: "e^-1.",
      calculation: "≈0,3679.",
      finalAnswer: "Aproximadamente 36,79%.",
      trap: "Não use λ=0,2 para 5 m²."
    }
  },
  {
    id: "placas-sem-reposicao",
    title: "Placas com e sem reposição",
    difficulty: "Difícil",
    category: "Hipergeométrica",
    statement: "Há 12 placas, 4 defeituosas. São escolhidas 3 sem reposição. Qual a probabilidade de exatamente 1 defeituosa?",
    answer: "C(4,1)C(8,2)/C(12,3) ≈ 0,5091.",
    hint: "Sem reposição em população limitada: Hipergeométrica.",
    solution: {
      subject: "Hipergeométrica",
      translation: "N=12, K=4 defeituosas, n=3 escolhidas, k=1 defeituosa.",
      formula: "P(X=k)=C(K,k)C(N-K,n-k)/C(N,n)",
      why: "A probabilidade muda depois de cada retirada porque não há reposição.",
      substitution: "C(4,1)C(8,2)/C(12,3).",
      calculation: "4*28/220=112/220≈0,5091.",
      finalAnswer: "Aproximadamente 50,91%.",
      trap: "Se fosse com reposição, seria Binomial."
    }
  },
  {
    id: "placa-plastica",
    title: "Placa plástica",
    difficulty: "Médio",
    category: "Poisson",
    statement: "Uma placa plástica apresenta em média 1,5 bolhas por unidade. Qual a probabilidade de exatamente 2 bolhas?",
    answer: "e^-1,5 * 1,5² / 2! ≈ 0,2510.",
    hint: "Bolhas por unidade é contagem por área/peça.",
    solution: {
      subject: "Poisson",
      translation: "λ=1,5 e k=2.",
      formula: "P(X=k)=e^-λ λ^k/k!",
      why: "Conta ocorrências com média por unidade.",
      substitution: "e^-1,5*1,5²/2!.",
      calculation: "≈0,2510.",
      finalAnswer: "Aproximadamente 25,10%.",
      trap: "λ é média, não probabilidade."
    }
  },
  {
    id: "lote-200",
    title: "Lote de 200 unidades",
    difficulty: "Difícil",
    category: "Hipergeométrica",
    statement: "Um lote tem 200 unidades, 10 defeituosas. Uma amostra de 5 é retirada sem reposição. Qual a probabilidade de nenhuma defeituosa?",
    answer: "C(190,5)/C(200,5).",
    hint: "Escolher 5 boas entre 190 boas.",
    solution: {
      subject: "Hipergeométrica",
      translation: "N=200, K=10 defeituosas, n=5, k=0 defeituosas.",
      formula: "C(K,k)C(N-K,n-k)/C(N,n)",
      why: "Amostra sem reposição de população limitada.",
      substitution: "C(10,0)C(190,5)/C(200,5).",
      calculation: "C(190,5)/C(200,5).",
      finalAnswer: "C(190,5)/C(200,5), aproximadamente 0,7728.",
      trap: "Não troque 190 por 200*0,95 sem pensar na reposição."
    }
  },
  {
    id: "rolhas-ab",
    title: "Rolhas categoria A e B",
    difficulty: "Difícil",
    category: "Hipergeométrica",
    statement: "Uma caixa tem 30 rolhas, 18 categoria A e 12 categoria B. Selecionam-se 4 sem reposição. Qual a probabilidade de exatamente 3 serem A?",
    answer: "C(18,3)C(12,1)/C(30,4).",
    hint: "Separe escolhas de A e de B.",
    solution: {
      subject: "Hipergeométrica",
      translation: "N=30, K=18 A, n=4, k=3 A.",
      formula: "P(X=k)=C(K,k)C(N-K,n-k)/C(N,n)",
      why: "Seleciona sem reposição de uma população com categorias.",
      substitution: "C(18,3)C(12,1)/C(30,4).",
      calculation: "816*12/27405≈0,3573.",
      finalAnswer: "Aproximadamente 35,73%.",
      trap: "Depois de escolher 3 A, falta escolher 1 B."
    }
  },
  {
    id: "requisicoes-sistema",
    title: "Requisições no sistema",
    difficulty: "Médio",
    category: "Poisson",
    statement: "Um sistema recebe média de 30 requisições por minuto. Qual a média esperada em 10 segundos?",
    answer: "λ=5.",
    hint: "10 segundos é 1/6 de minuto.",
    solution: {
      subject: "Ajuste de λ",
      translation: "A média precisa estar no mesmo intervalo da pergunta.",
      formula: "λ novo = taxa * intervalo",
      why: "Poisson usa λ do intervalo analisado.",
      substitution: "30 por minuto * (10/60) minuto.",
      calculation: "30/6=5.",
      finalAnswer: "λ=5 requisições em 10 segundos.",
      trap: "Não use λ=30 se a pergunta é sobre 10 segundos."
    }
  },
  {
    id: "bayes-caixas",
    title: "Caixas e peça defeituosa",
    difficulty: "Difícil",
    category: "Bayes",
    statement: "A caixa A fornece 60% das peças e tem 2% de defeito. A caixa B fornece 40% e tem 5% de defeito. Se uma peça é defeituosa, qual a probabilidade de ter vindo de B?",
    answer: "0,02/(0,012+0,02)=0,625.",
    hint: "Quer origem dado defeito: use Bayes.",
    solution: {
      subject: "Bayes",
      translation: "P(B|D), não P(D|B).",
      formula: "P(B|D)=P(D|B)P(B)/P(D)",
      why: "A questão dá defeito por caixa e pede a caixa depois de observar defeito.",
      substitution: "P(D)=0,02*0,60 + 0,05*0,40 = 0,032; numerador B=0,05*0,40=0,02.",
      calculation: "0,02/0,032=0,625.",
      finalAnswer: "62,5%.",
      trap: "Não responda 5%; isso é P(defeito|B), não P(B|defeito)."
    }
  },
  {
    id: "condicional-tabela",
    title: "Tabela de condicional",
    difficulty: "Médio",
    category: "Condicional",
    statement: "Em uma turma, 40 alunos estudam à noite. Desses, 18 trabalham. Qual a probabilidade de um aluno trabalhar sabendo que estuda à noite?",
    answer: "18/40 = 0,45.",
    hint: "Depois da barra vem o universo: estudar à noite.",
    solution: {
      subject: "Probabilidade condicional",
      translation: "P(trabalha | noite).",
      formula: "P(A|B)=P(A∩B)/P(B)",
      why: "A informação 'sabendo que estuda à noite' reduz o universo.",
      substitution: "18/40.",
      calculation: "0,45.",
      finalAnswer: "45%.",
      trap: "Não divida pelo total da turma se ele nem foi pedido."
    }
  }
];
