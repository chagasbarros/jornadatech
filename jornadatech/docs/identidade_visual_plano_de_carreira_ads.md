# Identidade Visual --- Plano de Carreira ADS

**Referência visual:**
`a_clean_modern_infographic_dashboard_style_image.png`\
**Objetivo:** documentar a identidade visual usada no último layout do
resultado do plano de carreira.

> **Observação:** as cores abaixo foram definidas/estimadas a partir da
> imagem de referência para servir como **tokens de design**. Para
> implementação em CSS, Figma ou outro sistema visual, recomenda-se
> manter os mesmos valores em toda a aplicação.

---

## 1. Paleta principal

---

Token Cor HEX Uso

---

**Verde Verde petróleo `#0B5A48` Cor principal,
Primário** títulos, ícones,
cabeçalhos e
elementos de
destaque

**Verde Escuro** Verde profundo `#073D35` Fundos escuros,
rodapé e áreas de
maior contraste

**Roxo Roxo sofisticado `#4A4165` Detalhes, áreas
Secundário** secundárias e
transições

**Roxo Médio** Roxo complementar `#73519A` Bordas, detalhes
e partes dos
gradientes

**Laranja** Laranja quente `#F58E52` Destaques,
indicadores,
chamadas e
elementos de
atenção

**Laranja Claro** Pêssego `#F6B06A` Fundos suaves,
badges e detalhes
secundários

**Fundo** Off-white `#F8F7F3` Fundo geral da
página

**Cartão** Branco suave `#FFFFFF` Cards e áreas de
conteúdo

**Texto Azul petróleo `#123F45` Títulos e textos
principal** escuro de maior
importância

**Texto Azul acinzentado `#456A70` Descrições e
secundário** textos auxiliares

**Linhas** Cinza esverdeado `#D7DDD8` Divisórias,
bordas e
separadores

---

---

## 2. Gradientes

### Gradiente principal --- Verde → Roxo

Usado principalmente no cabeçalho, cards de destaque e áreas
estruturais.

```css
background: linear-gradient(135deg, #0b5a48 0%, #155f50 42%, #4a4165 100%);
```

### Gradiente de compatibilidade --- Laranja → Roxo

Usado na barra de porcentagem de compatibilidade.

```css
background: linear-gradient(90deg, #f58e52 0%, #e87872 48%, #73519a 100%);
```

### Gradiente decorativo --- Verde → Roxo → Laranja

Para detalhes gráficos, cantos, linhas e elementos decorativos.

```css
background: linear-gradient(135deg, #0b5a48 0%, #4a4165 68%, #f58e52 100%);
```

---

## 3. Hierarquia das cores

### Cor primária --- Verde

O **verde** deve ser a cor dominante da identidade.

Usar em:

- Cabeçalhos;
- Títulos principais;
- Ícones;
- Botões principais;
- Indicadores de seleção;
- Cards de maior destaque;
- Bordas e elementos estruturais;
- Áreas de resultado.

**Proporção visual sugerida:** aproximadamente 55--65% das cores de
destaque.

### Cor secundária --- Roxo

O **roxo** funciona como contraste sofisticado do verde.

Usar em:

- Gradientes;
- Ícones secundários;
- Detalhes decorativos;
- Bordas;
- Estados alternativos;
- Elementos relacionados a tecnologia e carreira.

**Proporção visual sugerida:** aproximadamente 20--30%.

### Cor de destaque --- Laranja

O **laranja** deve aparecer em menor quantidade para chamar atenção sem
dominar o layout.

Usar em:

- Percentual de compatibilidade;
- Barras de progresso;
- Badges;
- Alertas e dicas;
- Pequenos detalhes decorativos;
- Ícones de destaque;
- Cantos e linhas gráficas.

**Proporção visual sugerida:** aproximadamente 5--15%.

---

## 4. Fundo e cartões

### Fundo da página

```css
background: #f8f7f3;
```

O fundo deve permanecer claro para criar contraste com os cards verdes e
com os gradientes.

### Cards

```css
background: #ffffff;
border: 1px solid #d7ddd8;
border-radius: 16px;
```

### Sombra

```css
box-shadow: 0 4px 18px rgba(18, 63, 69, 0.08);
```

A sombra deve ser discreta. O layout deve transmitir uma aparência
profissional e limpa.

---

## 5. Tipografia

### Títulos

Preferência por uma fonte serifada elegante, semelhante ao estilo
apresentado na imagem.

Características:

- Peso: `600–700`;
- Cor: `#123F45`;
- Títulos grandes com bastante espaço;
- Evitar excesso de texto em caixa alta.

### Textos e informações

Preferência por fonte sans-serif limpa.

Características:

- Peso: `400–500`;
- Cor principal: `#123F45`;
- Cor secundária: `#456A70`;
- Boa distância entre linhas.

### Números das seções

Os números `01`, `02`, `03` etc. devem aparecer dentro de círculos ou
badges.

Exemplo:

```css
background: #0b5a48;
color: #ffffff;
border-radius: 50%;
font-weight: 700;
```

---

## 6. Elemento de compatibilidade

O card da **Área profissional compatível** é o principal elemento de
destaque da página.

### Estrutura

- Fundo predominantemente verde;
- Mesclagem gradual com roxo;
- Detalhes finos em laranja;
- Título da área em branco;
- Percentual em destaque;
- Barra de compatibilidade em laranja → roxo.

### Percentual

Exemplo:

**85%**

O número deve ser grande, branco e visualmente destacado.

### Barra

```css
background: linear-gradient(90deg, #f58e52, #e87872, #73519a);
```

O fundo da barra pode utilizar um verde escuro/transparente.

---

## 7. Estados e indicadores

### Competência muito desenvolvida

```text
● ● ● ● ●
```

Usar predominantemente verde.

### Competência em desenvolvimento

```text
● ● ● ○ ○
```

Pode utilizar roxo e verde.

### Competência que precisa desenvolver

Utilizar tons mais claros e indicadores em laranja quando houver
prioridade.

### Prioridade alta

```text
#F58E52
```

### Prioridade média

```text
#E9B24D
```

### Prioridade baixa

```text
#0B5A48
```

---

## 8. Elementos decorativos

Os elementos decorativos devem ser discretos e seguir a mesma
identidade.

Podem ser usados:

- Linhas curvas;
- Ondas;
- Pequenos pontos;
- Cantos coloridos;
- Formas abstratas;
- Gradientes suaves.

### Regra importante

O laranja deve aparecer como **detalhe**, não como cor dominante.

Evitar grandes áreas completamente laranjas.

---

## 9. Ícones

Os ícones devem ter estilo:

- Minimalista;
- Linear;
- Arredondado;
- Tecnológico;
- Consistente entre todos os cards.

Cores preferenciais:

1.  Verde;
2.  Roxo;
3.  Laranja para destaque.

Exemplo:

```css
.icon-primary {
  color: #0b5a48;
}

.icon-secondary {
  color: #4a4165;
}

.icon-highlight {
  color: #f58e52;
}
```

---

## 10. Componentes principais do resultado

A página deve manter os seguintes blocos:

1.  **Quem sou eu?**
2.  **Áreas de interesse**
3.  **Área profissional compatível**
4.  **Competências atuais**
5.  **Competências a desenvolver**
6.  **Objetivo profissional**
7.  **Áreas de interesse**
8.  **Experiências e projetos**
9.  **Portfólio**
10. **Network**
11. **Metas a curto prazo**
12. **Metas a longo prazo**

---

## 11. Regras de composição

- Manter todos os cards perfeitamente alinhados;
- Utilizar uma grade consistente;
- Manter espaçamento uniforme entre os componentes;
- Evitar excesso de elementos decorativos;
- Priorizar legibilidade;
- Usar o verde como identidade dominante;
- Usar o roxo para sofisticação e contraste;
- Usar o laranja somente como destaque;
- Manter fundo claro para facilitar a leitura;
- Usar gradientes apenas nos pontos estratégicos;
- Não utilizar gradientes em excesso;
- Manter os mesmos raios de borda entre componentes semelhantes.

---

## 12. Resumo da identidade

```text
PRIMÁRIA
Verde petróleo
#0B5A48

SECUNDÁRIA
Roxo sofisticado
#4A4165

DESTAQUE
Laranja
#F58E52

FUNDO
Off-white
#F8F7F3

TEXTO
Azul petróleo
#123F45
```

### Conceito visual

**Tecnologia + profissionalismo + crescimento + modernidade.**

A combinação de **verde + roxo** cria a identidade tecnológica e
sofisticada, enquanto o **laranja** funciona como ponto de energia e
destaque visual. O fundo claro mantém o resultado organizado,
profissional e fácil de visualizar.
