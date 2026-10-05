/* As Quatro Vontades · Capítulo III · O Cavaleiro
   Roteiro gerado a partir do texto aprovado (PT e EN), sem nenhuma palavra alterada.
   k: "m" = fala da menina (nítida, sem voz). */
window.CAP3 = {
 "id": "cap03",
 "ui": {
  "pt": {
   "livro": "As Quatro Vontades · Livro I",
   "cap": "Capítulo III",
   "titulo": "O Cavaleiro",
   "sub": "O Homem Sem Passado e Sem Futuro",
   "entrar": "Entrar na névoa",
   "continuar": "Continuar",
   "recomecar": "Começar de novo",
   "fones": "Melhor com fones de ouvido.",
   "prox": "Próxima",
   "volt": "Voltar",
   "som": "Som",
   "andar": "Andar",
   "andarDica": "Toque para dar cada passo",
   "corrDica": "Dois corredores",
   "esq": "À esquerda",
   "dir": "À direita",
   "esperar": "Esperar",
   "esperarDica": "Segure",
   "porta": "Abrir a porta",
   "portaDica": "Arraste devagar",
   "vidro": "O vidro embaçado",
   "vidroDica": "Passe o dedo no vidro",
   "espada": "Desembainhar",
   "espadaDica": "Arraste devagar: quanto mais devagar, mais luz",
   "postura": "Corrigir a postura",
   "posturaDica": "Mão no ombro, nunca na arma",
   "maoEsq": "a mão esquerda",
   "maoDir": "a mão direita",
   "pes": "os pés",
   "ombro": "o ombro",
   "coberta": "Puxar a coberta",
   "cobertaDica": "Arraste para cima",
   "rosto": "Guardar o rosto",
   "rostoDica": "Segure para guardá-lo",
   "fim": "Fim do Capítulo III",
   "ficou": "O que ficou",
   "presenca": "Presença",
   "jornada": "Jornada (Capítulos I, II e III)",
   "posicao": "{p}º de {n} leitores",
   "reler": "Reler o capítulo",
   "prox4": "Capítulo IV · em breve",
   "semJornada": "Jogue os capítulos anteriores neste navegador para somar a jornada."
  },
  "en": {
   "livro": "The Four Wills · Book I",
   "cap": "Chapter III",
   "titulo": "The Knight",
   "sub": "The Man Without a Past or a Future",
   "entrar": "Enter the mist",
   "continuar": "Continue",
   "recomecar": "Start over",
   "fones": "Best with headphones.",
   "prox": "Next",
   "volt": "Back",
   "som": "Sound",
   "andar": "Walk",
   "andarDica": "Tap to take each step",
   "corrDica": "Two corridors",
   "esq": "Left",
   "dir": "Right",
   "esperar": "Wait",
   "esperarDica": "Hold",
   "porta": "Open the door",
   "portaDica": "Drag slowly",
   "vidro": "The misted glass",
   "vidroDica": "Run your finger over the glass",
   "espada": "Draw the sword",
   "espadaDica": "Drag slowly: the slower, the more light",
   "postura": "Correct her stance",
   "posturaDica": "A hand on her shoulder, never on the weapon",
   "maoEsq": "her left hand",
   "maoDir": "her right hand",
   "pes": "her feet",
   "ombro": "her shoulder",
   "coberta": "Pull up the blanket",
   "cobertaDica": "Drag upward",
   "rosto": "Hold on to her face",
   "rostoDica": "Hold to keep it",
   "fim": "End of Chapter III",
   "ficou": "What remained",
   "presenca": "Presence",
   "jornada": "Journey (Chapters I, II and III)",
   "posicao": "#{p} of {n} readers",
   "reler": "Read again",
   "prox4": "Chapter IV · coming soon",
   "semJornada": "Play the earlier chapters in this browser to add up the journey."
  }
 },
 "cap2fim": {
  "agitado": {
   "pt": "Deito de lado, depois do outro, depois de costas. Quando o sino bate longe, meus olhos já estão fechando.",
   "en": "I lie on one side, then the other, then on my back. When the bell rings far away, my eyes are already closing."
  },
  "leve": {
   "pt": "Deito sem tirar a poeira dos pés e durmo antes de o sino bater.",
   "en": "I lie down without brushing the dust off my feet and fall asleep before the bell."
  },
  "meio": {
   "pt": "Deito de costas e fico olhando o teto até os olhos fecharem sozinhos.",
   "en": "I lie on my back and watch the ceiling until my eyes close on their own."
  }
 },
 "paginas": [
  {
   "id": "limiar",
   "limiar": true,
   "fundo": {
    "img": "assets/images/quarto-cadeira.jpg",
    "foco": "40% 55%"
   },
   "som": "quarto-vela-loop",
   "nevoa": 0.55,
   "part": "po",
   "gelo": 0.1,
   "luz": "azul"
  },
  {
   "id": "caminho",
   "fundo": {
    "video": "assets/video/corredor-caminhada.mp4",
    "img": "assets/images/corredor-noite.jpg"
   },
   "som": "corredor-noite-loop",
   "nevoa": 0.5,
   "part": "po",
   "gelo": 0.55,
   "luz": "azul",
   "itens": [
    {
     "t": {
      "pt": "Caminho pela madrugada gelada da Capital Branca. Não consigo lembrar de ontem, nem me interesso pelo amanhã. Meu dever é claro como as muralhas de Redom: encontrar a pequena garota. Nada mais importa até que isso esteja feito.",
      "en": "I walk through the cold pre-dawn of the White Capital. I can't remember yesterday, and tomorrow doesn't concern me. My duty is as plain as Redom's walls: find the small girl. Nothing else matters until it's done."
     },
     "voz": {
      "src": "assets/audio/narration/line1.mp3",
      "dur": 18.83
     },
     "passos": true
    }
   ]
  },
  {
   "id": "corredores",
   "fundo": {
    "video": "assets/video/corredores.mp4",
    "img": "assets/images/corredor-noite.jpg"
   },
   "som": "corredor-noite-loop",
   "nevoa": 0.6,
   "part": "po",
   "gelo": 0.55,
   "luz": "azul",
   "itens": [
    {
     "t": {
      "pt": "Não sei dizer há quanto tempo ando, nem por que os corredores deste castelo me são estranhos e ao mesmo tempo sei exatamente onde vão dar. As pedras, sob os pés, guardam o frio da noite inteira.",
      "en": "I couldn't say how long I've been walking, or why these castle corridors feel foreign to me and yet I know exactly where each one leads. The stones under my feet hold the whole night's cold."
     },
     "voz": {
      "src": "assets/audio/voz/cav-corredores.mp3",
      "dur": 16.77
     }
    },
    {
     "gesto": "corredores"
    }
   ]
  },
  {
   "id": "patio",
   "fundo": {
    "img": "assets/images/patio-cao.jpg",
    "foco": "60% 50%"
   },
   "som": "patio-loop",
   "nevoa": 0.45,
   "part": "neve",
   "gelo": 0.45,
   "luz": "azul",
   "itens": [
    {
     "t": {
      "pt": "O som da minha armadura ecoa pelo pátio vazio, metal contra as lajes, e um cão solitário levanta a cabeça na sombra dos estábulos. Não late.",
      "en": "The sound of my armor echoes across the empty courtyard, metal against flagstone, and a lone dog lifts its head in the shadow of the stables. It doesn't bark."
     },
     "voz": {
      "src": "assets/audio/voz/cav-patio.mp3",
      "dur": 15.96
     }
    },
    {
     "gesto": "esperar"
    }
   ]
  },
  {
   "id": "jardim",
   "fundo": {
    "img": "assets/images/jardim-ronda.jpg",
    "foco": "50% 40%"
   },
   "som": "jardim-noite-loop",
   "nevoa": 0.5,
   "part": "neve",
   "gelo": 0.4,
   "luz": "azul",
   "itens": [
    {
     "t": {
      "pt": "Atravesso um jardim, contornando uma estátua alta de mulher com uma balança nas mãos. De novo a sensação de já ter passado por ali — não lembrança, algo mais raso, mas familiar. No fim do corredor, uma porta entreaberta deixa escapar um fio de luz de vela.",
      "en": "I cross a garden, skirting a tall statue of a woman holding a set of scales. Again that sense of having walked this way before — not memory, something thinner, but familiar all the same. At the end of the hall, a door stands ajar, a thread of candlelight slipping through."
     },
     "voz": {
      "src": "assets/audio/narration/line2.mp3",
      "dur": 22.36
     }
    }
   ]
  },
  {
   "id": "porta",
   "fundo": {
    "video": "assets/video/porta-abrindo.mp4",
    "img": "assets/images/porta-entreaberta.jpg",
    "scrub": [
     0.4,
     9.6
    ]
   },
   "som": "corredor-noite-loop",
   "nevoa": 0.45,
   "part": "po",
   "gelo": 0.5,
   "luz": "azul",
   "auto": true,
   "itens": [
    {
     "gesto": "porta"
    }
   ]
  },
  {
   "id": "quarto",
   "fundo": {
    "img": "assets/images/menina-janela.jpg",
    "foco": "70% 45%"
   },
   "som": "quarto-vela-loop",
   "nevoa": 0.3,
   "part": "po",
   "gelo": 0.15,
   "luz": "dourada",
   "itens": [
    {
     "t": {
      "pt": "Dentro, uma cadeira virada para a janela, e nela uma criança de cabelo louro, iluminada pelo luar, cera escorrendo pelo castiçal ao lado. Não é qualquer criança.",
      "en": "Inside, a chair turned toward the window, and in it a child with fair hair, lit by moonlight, wax dripping down the candlestick beside her. Not just any child."
     },
     "voz": {
      "src": "assets/audio/narration/line3.mp3",
      "dur": 13.71
     }
    },
    {
     "gesto": "vidro"
    },
    {
     "t": {
      "pt": "— Eu não quero ter que ser rainha — ela fala para o vidro escuro, a voz embaçada de quem chorou até a garganta doer. — Isso é injusto.",
      "en": "\"I don't want to have to be queen,\" she says to the dark glass, her voice thick from crying until her throat hurt. \"It isn't fair.\""
     },
     "k": "m"
    },
    {
     "t": {
      "pt": "Encosto na parede, ao lado da janela, sem me anunciar.",
      "en": "I lean against the wall by the window, without announcing myself."
     },
     "voz": {
      "src": "assets/audio/voz/cav-parede.mp3",
      "dur": 6.11
     }
    }
   ]
  },
  {
   "id": "espada",
   "fundo": {
    "img": "assets/images/cavaleiro-sombra.jpg",
    "foco": "55% 45%"
   },
   "som": "quarto-vela-loop",
   "nevoa": 0.28,
   "part": "po",
   "gelo": 0.12,
   "luz": "dourada",
   "itens": [
    {
     "t": {
      "pt": "— Por que é injusto?",
      "en": "\"Why isn't it fair?\""
     },
     "voz": {
      "src": "assets/audio/voz/cav-injusto.mp3",
      "dur": 1.96
     }
    },
    {
     "t": {
      "pt": "Minha voz sai firme, do jeito que sai sempre, mesmo falando com uma criança que mal me alcança a cintura. Ela se vira depressa, mas não grita. Os olhos, vermelhos de chorar, vão direto para a espada na minha cintura e ficam ali.",
      "en": "My voice comes out steady, the way it always does, even speaking to a child who barely reaches my waist. She turns quickly, but doesn't cry out. Her eyes, red from crying, go straight to the sword at my hip and stay there."
     },
     "voz": {
      "src": "assets/audio/voz/cav-voz.mp3",
      "dur": 18.29
     }
    },
    {
     "t": {
      "pt": "— Porque eu quero ser igual a você.",
      "en": "\"Because I want to be like you.\""
     },
     "k": "m"
    },
    {
     "t": {
      "pt": "— Você sabe o que faz alguém como eu?",
      "en": "\"Do you know what someone like me does?\""
     },
     "voz": {
      "src": "assets/audio/voz/cav-sabe.mp3",
      "dur": 3.0
     }
    },
    {
     "gesto": "desembainhar",
     "fundo": {
      "video": "assets/video/espada-desembainhando.mp4",
      "img": "assets/images/cavaleiro-sombra.jpg",
      "scrub": [
       0,
       5.9
      ]
     }
    },
    {
     "t": {
      "pt": "Ela não responde e parece que por não ter uma resposta a faz querer chorar. Desembainho a espada devagar, só para que ela veja, e a lâmina pega a luz da vela e devolve um risco branco no teto.",
      "en": "She doesn't answer, and not having an answer seems to make her want to cry again. I draw the sword slowly, just so she can see it, and the blade catches the candlelight and throws a white line across the ceiling."
     },
     "voz": {
      "src": "assets/audio/voz/cav-desembainho.mp3",
      "dur": 16.35
     }
    },
    {
     "t": {
      "pt": "— É a espada mais legal que eu já vi de perto — ela diz, e não há medo nenhum na voz.",
      "en": "\"That's the coolest sword I've ever seen up close,\" she says, and there's no fear at all in her voice."
     },
     "k": "m"
    },
    {
     "t": {
      "pt": "— Alguém como eu combate as injustiças.",
      "en": "\"Someone like me fights injustice.\""
     },
     "voz": {
      "src": "assets/audio/voz/cav-injustica.mp3",
      "dur": 3.47
     }
    },
    {
     "t": {
      "pt": "— Com essa espada?",
      "en": "\"With that sword?\""
     },
     "k": "m"
    },
    {
     "t": {
      "pt": "— Com coragem.",
      "en": "\"With courage.\""
     },
     "voz": {
      "src": "assets/audio/voz/cav-coragem.mp3",
      "dur": 1.31
     }
    }
   ]
  },
  {
   "id": "segurar",
   "fundo": {
    "img": "assets/images/quarto-vela.jpg",
    "foco": "55% 50%"
   },
   "som": "quarto-vela-loop",
   "nevoa": 0.28,
   "part": "po",
   "gelo": 0.1,
   "luz": "dourada",
   "itens": [
    {
     "t": {
      "pt": "Ela vence a própria hesitação — vejo o instante exato em que decide, o corpo inteiro se inclinando pra frente antes da boca se abrir.",
      "en": "She fights down her own hesitation — I see the exact instant she decides, her whole body leaning forward before her mouth opens."
     }
    },
    {
     "t": {
      "pt": "— Posso segurar ela um pouco?",
      "en": "\"Can I hold it? Just a little?\""
     },
     "k": "m"
    },
    {
     "t": {
      "pt": "— Só um pouco. Logo preciso ir.",
      "en": "\"Just a little. I have to leave soon.\""
     },
     "voz": {
      "src": "assets/audio/voz/cav-pouco.mp3",
      "dur": 2.51
     }
    },
    {
     "t": {
      "pt": "Ponho a espada nas duas mãos dela, o peso maior do que ela espera — os braços descem um dedo antes de ela travar o cotovelo e segurar firme. Retiro sua mão esquerda do pomo, orientando a segurar a empunhadura somente com uma das mãos, e corrijo a direita, que aperta forte demais o suficiente pra tremer.",
      "en": "I set the sword across both her hands, heavier than she expects — her arms drop an inch before she locks her elbows and holds firm. I lift her left hand off the pommel, guiding her to hold the grip with only one hand, and correct the right, which grips hard enough to shake."
     },
     "fundo": {
      "img": "assets/images/maos-empunhadura.jpg",
      "foco": "35% 55%"
     }
    },
    {
     "t": {
      "pt": "— Papai e mamãe nunca deixaram eu segurar uma espada — ela sussurra.",
      "en": "\"Mother and Father never let me hold a sword,\" she whispers."
     },
     "k": "m"
    }
   ]
  },
  {
   "id": "entre-nos",
   "fundo": {
    "img": "assets/images/maos-empunhadura.jpg",
    "foco": "35% 55%"
   },
   "som": "quarto-vela-loop",
   "nevoa": 0.22,
   "part": "po",
   "gelo": 0.08,
   "luz": "dourada",
   "nome": true,
   "itens": [
    {
     "t": {
      "pt": "— Isso fica entre nós, Laura.",
      "en": "\"This stays between us, Laura.\""
     },
     "voz": {
      "src": "assets/audio/voz/cav-entre-nos.mp3",
      "dur": 3.08
     }
    },
    {
     "t": {
      "pt": "O nome sai antes de eu decidir dizê-lo, familiar demais para alguém que nunca vi.",
      "en": "The name leaves me before I decide to say it, too familiar for someone I've never met."
     }
    }
   ]
  },
  {
   "id": "postura",
   "fundo": {
    "video": "assets/video/espada-laura.mp4",
    "img": "assets/images/quarto-vela.jpg"
   },
   "som": "quarto-vela-loop",
   "nevoa": 0.25,
   "part": "po",
   "gelo": 0.08,
   "luz": "dourada",
   "itens": [
    {
     "t": {
      "pt": "Deixo-a movimentar a lâmina devagar, os pés bem plantados, o quadril virado do jeito certo. Corrijo a postura algumas vezes, com a mão no ombro dela, nunca na arma. Ela obedece cada ajuste sem perguntar o porquê.",
      "en": "I let her move the blade slowly, feet planted, hips turned just so. I correct her stance a few times, my hand on her shoulder, never on the weapon. She follows every correction without asking why."
     }
    },
    {
     "gesto": "postura"
    }
   ]
  },
  {
   "id": "dormir",
   "fundo": {
    "img": "assets/images/quarto-vela.jpg",
    "foco": "55% 50%"
   },
   "som": "quarto-vela-loop",
   "nevoa": 0.3,
   "part": "po",
   "gelo": 0.12,
   "luz": "dourada",
   "itens": [
    {
     "t": {
      "pt": "Depois de alguns minutos, o peso vence o entusiasmo e ela me devolve a espada com as duas mãos, com cuidado.",
      "en": "After a few minutes, the weight wins out over the excitement, and she hands the sword back to me with both hands, carefully."
     }
    },
    {
     "t": {
      "pt": "— Você é o melhor cavaleiro que existe.",
      "en": "\"You're the best knight there is.\""
     },
     "k": "m"
    },
    {
     "t": {
      "pt": "— Vai conseguir dormir agora?",
      "en": "\"Will you be able to sleep now?\""
     },
     "voz": {
      "src": "assets/audio/voz/cav-dormir.mp3",
      "dur": 2.12
     }
    },
    {
     "gesto": "coberta",
     "fundo": {
      "img": "assets/images/menina-dormindo.jpg",
      "foco": "70% 55%"
     }
    },
    {
     "t": {
      "pt": "Ela faz que sim, um bocejo interrompendo o gesto no meio. Levanto-a — leve demais, um peso que mal registro nos braços — e a deito, puxando a coberta até o queixo.",
      "en": "She nods, a yawn breaking the motion in half. I lift her — too light, a weight I barely register in my arms — and lay her down, pulling the blanket up to her chin."
     }
    },
    {
     "t": {
      "pt": "— Você é amigo do meu pai? — pergunta, a voz já afundando no sono.",
      "en": "\"Are you friends with my father?\" she asks, her voice already sinking into sleep."
     },
     "k": "m"
    },
    {
     "t": {
      "pt": "Penso na pergunta mais do que deveria. Não conheço homem nenhum a quem chamar de amigo, nem lembro de ter tido um pai, e mesmo assim a pergunta não me soa estranha — soa apenas incompleta, como uma resposta que existe em algum lugar que não consigo alcançar.",
      "en": "I think about the question longer than I should. I know no man I'd call a friend, and I don't remember having had a father, and still the question doesn't strike me as strange — only incomplete, like an answer that exists somewhere I can't reach."
     },
     "voz": {
      "src": "assets/audio/voz/cav-pensa.mp3",
      "dur": 21.71
     }
    },
    {
     "t": {
      "pt": "— Sou apenas um cavaleiro. Durma bem, Laura.",
      "en": "\"I'm only a knight. Sleep well, Laura.\""
     },
     "voz": {
      "src": "assets/audio/voz/cav-durma.mp3",
      "dur": 3.47
     }
    }
   ]
  },
  {
   "id": "portao",
   "fundo": {
    "video": "assets/video/portao-saida.mp4",
    "img": "assets/images/jardim-ronda.jpg"
   },
   "som": "vento-jardim",
   "nevoa": 0.6,
   "part": "neve",
   "gelo": 0.5,
   "luz": "azul",
   "itens": [
    {
     "t": {
      "pt": "Ela já dorme antes que eu termine de falar. Refaço o caminho — o jardim, a estátua da mulher com a balança, o pátio onde o cão agora dorme. Ao sair pelo portão, tento reter o rosto da criança, e já não consigo. Fica só uma palavra, um nome que não lembro ter aprendido e que, mesmo assim, soube de cor.",
      "en": "She's asleep before I finish speaking. I retrace my path — the garden, the statue of the woman with the scales, the courtyard where the dog now sleeps. Stepping through the gate, I try to hold onto the child's face, and already I can't. Only a word remains, a name I don't remember learning and, even so, knew by heart."
     },
     "voz": {
      "src": "assets/audio/voz/cav-portao.mp3",
      "dur": 31.56
     }
    },
    {
     "gesto": "rosto",
     "fim": {
      "pt": "Laura.",
      "en": "Laura."
     }
    }
   ]
  }
 ],
 "postura": {
  "sprites": {
   "menina-1": {
    "w": 244,
    "h": 567,
    "base": 562,
    "alt": 558
   },
   "menina-2": {
    "w": 329,
    "h": 571,
    "base": 566,
    "alt": 562
   },
   "menina-3": {
    "w": 239,
    "h": 573,
    "base": 568,
    "alt": 564
   },
   "menina-4": {
    "w": 361,
    "h": 664,
    "base": 659,
    "alt": 655
   },
   "mao-cavaleiro": {
    "w": 1138,
    "h": 982,
    "base": 977,
    "alt": 973
   }
  },
  "passos": [
   {
    "pose": "menina-1",
    "ponto": [
     0.58,
     0.15
    ],
    "parte": "maoEsq",
    "espada": [
     [
      0.45,
      0.22,
      0.32,
      0.76
     ]
    ]
   },
   {
    "pose": "menina-2",
    "ponto": [
     0.34,
     0.55
    ],
    "parte": "maoDir",
    "espada": [
     [
      0.42,
      0.58,
      0.58,
      0.42
     ],
     [
      0,
      0.38,
      0.3,
      0.14
     ]
    ]
   },
   {
    "pose": "menina-3",
    "ponto": [
     0.4,
     0.95
    ],
    "parte": "pes",
    "espada": [
     [
      0.55,
      0.12,
      0.3,
      0.86
     ]
    ]
   },
   {
    "pose": "menina-4",
    "ponto": [
     0.3,
     0.35
    ],
    "parte": "ombro",
    "espada": [
     [
      0.48,
      0,
      0.52,
      0.48
     ],
     [
      0.4,
      0.48,
      0.22,
      0.16
     ]
    ]
   }
  ],
  "mao": {
   "img": "assets/images/postura/mao-cavaleiro.webp",
   "dedos": [
    0.86,
    0.95
   ],
   "altura": 0.42
  }
 },
 "passos": [
  [
   0.31,
   0.85
  ],
  [
   1.49,
   0.9
  ],
  [
   3.69,
   0.9
  ],
  [
   4.83,
   0.9
  ],
  [
   7.09,
   0.9
  ],
  [
   8.29,
   0.6
  ]
 ]
};
