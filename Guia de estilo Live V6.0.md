# **Sistema de Design e Padrão Técnico Unificado – Live Consultoria (V6.0)**

Versão: 6.0 (Elite & AI-Driven Update)  
Data: Dezembro 2025  
Status: Vigente  
Mantra: "A perfeição está nos detalhes invisíveis."  
Este documento é a fonte da verdade absoluta para a criação de interfaces digitais da Live Consultoria. Ele substitui todas as versões anteriores, integrando Psicologia de UX, Física de Interface, Otimização Mobile e Personalização via IA.

## **1\. Núcleo da Identidade Visual (Brand Core)**

A identidade visual transcende o estático. Ela é cinética, semântica e adaptável.

### **1.1. Paleta de Cores & Tokens (CSS Variables)**

A paleta suporta transparências refrativas e gradientes semânticos.

:root {  
    /\* \--- Atmosfera (Backgrounds) \--- \*/  
    \--live-deep: \#06192a;       /\* Fundo Absoluto \*/  
      
    /\* \--- Superfícies (Refractive Glass) \--- \*/  
    \--live-glass: rgba(10, 36, 61, 0.70);   
    \--live-glass-hover: rgba(15, 45, 75, 0.85);  
    /\* Distorção simulada para refração \*/  
    \--glass-blur: blur(16px) saturate(180%);

    /\* \--- Luz & Ação \--- \*/  
    \--live-accent: \#00e800;     /\* Verde Laser \*/  
    \--live-accent-dim: rgba(0, 232, 0, 0.15);   
    /\* Gradiente Cinético para Títulos \*/  
    \--kinetic-gradient: linear-gradient(90deg, \#ffffff 0%, \#cccccc 50%, \#00e800 100%);  
      
    /\* \--- Física de Animação (Micro-Springs) \--- \*/  
    \--spring-bounce: cubic-bezier(0.34, 1.56, 0.64, 1); /\* Efeito elástico \*/  
    \--ease-fluid: cubic-bezier(0.4, 0.0, 0.2, 1);       /\* Fluidez natural \*/

    /\* \--- Bordas Inteligentes \--- \*/  
    \--border-subtle: rgba(255, 255, 255, 0.08);  
    \--border-active: rgba(0, 232, 0, 0.4);  
}

### **1.2. Tipografia Cinética e Adaptativa**

A tipografia não é fixa; ela reage ao comportamento do usuário e ao scroll.

* **Família Primária (Interface):** Poppins (Sans-serif).  
* **Família Analítica (Leitura Profunda):** Merriweather (Serif). *Ativada via IA quando detectado padrão de leitura analítico.*

**Comportamento Cinético:**

* **H1 (Títulos):** Devem utilizar o token \--kinetic-gradient. Conforme o usuário rola a página, o tracking (espaçamento) deve oscilar sutilmente e o gradiente deve se deslocar, sugerindo progresso.

### **1.3. Ativos Digitais (Assets Obrigatórios)**

Para garantir consistência e performance (Critical CSS \< 50ms), utilize estritamente os links diretos:

* **Logo Oficial:** https://raw.githubusercontent.com/Clebito2/ConsultoriaLive/main/Logo%20live%20oficial-21.png  
* **Textura de Fundo:** https://www.transparenttextures.com/patterns/cubes.png

## **2\. Atmosfera e Física (Environment)**

O ambiente digital simula leis da física para criar exclusividade tátil.

### **2.1. O Sistema de Camadas e Refração**

1. **Camada Base (Z \-3):** Cor sólida \#06192a. Deve carregar no *Critical CSS* (inline).  
2. **Camada Textura (Z \-2):** Imagem cubes.png.  
3. **Camada Luz Dinâmica (Z \-1):**  
   * **Desktop:** Efeito "Flashlight" com **Distorção de Refração**. A luz não apenas ilumina, ela distorce levemente a textura de cubos abaixo dos cards de vidro, simulando a espessura de um cristal.  
   * **Mobile:** Aurora Boreal suave (CSS puro).

## **3\. Componentes e Microinterações (Sensory Feedback)**

Respeitamos o **Limiar de Doherty** (\<400ms). Toda interação deve parecer uma extensão do pensamento.

### **3.1. Cards "Halo" com Física**

* **Desktop:** Ao hover, o card utiliza uma física de mola (--spring-bounce) para elevar-se. A luz interna segue a posição exata do cursor (Matrix effect).  
* **Mobile:** Estado estático limpo para leitura.

### **3.2. Botões "Ghost Neon" com Inércia**

Botões não são lineares. Eles possuem peso.

* **Clique/Toque:** Deve acionar uma animação de scale(0.95) usando *spring physics*. O retorno ao tamanho original tem um leve "rebote".  
* **Feedback:** O estado ativo deve ser instantâneo.

## **4\. Inteligência e Personalização (AI-Driven UI)**

O sistema deve ler o usuário tanto quanto o usuário lê o sistema.

### **4.1. Adaptação em Tempo Real**

Integração via API com LLMs para análise comportamental:

1. **Modo Executivo (Padrão):** Fontes Sans-serif, KPIs resumidos, foco em ação.  
2. **Modo Analítico (Detectado):** Se o usuário permanece \>30s em textos ou expande detalhes, o sistema transita suavemente a tipografia de corpo para Merriweather (Serif) e expande a densidade de dados dos gráficos.

## **5\. Diretrizes Mobile (Mobile Intelligence)**

Otimização rigorosa para a "Thumb Zone" (Lei de Fitts).

### **5.1. Navegação e Layout**

* **Abas:** Sempre deslizantes horizontalmente (overflow-x: auto), com barra de rolagem oculta. Jamais empilhadas.  
* **Grid:** Coluna única. Margens reduzidas (p-4) para maximizar a área de conteúdo.  
* **Desativação de Scripts:** Efeitos de mouse (Flashlight/Refração) devem ser encapsulados em @media (hover: hover) para não drenar bateria.

## **6\. Engenharia e Performance (Architecture)**

Rigor técnico para uma experiência de elite.

### **6.1. Performance Sustentável**

* **Critical CSS:** O estilo da "Camada Base" e o Logo devem estar *inline* no HTML para garantir *First Contentful Paint (FCP)* abaixo de 50ms.  
* **Lazy Loading:** Obrigatório para todas as imagens e iframes abaixo da dobra.  
* **Formatos:** Priorizar WebP para ativos pesados.

### **6.2. Arquitetura Modular (Atomic Design)**

Evite "puxadinhos". O código deve ser organizado em:

* **Átomos:** Botões, Inputs, Ícones.  
* **Moléculas:** Cards de KPI, Itens de Lista.  
* **Organismos:** Seção de Dashboard, Header, Footer.

### **6.3. Acessibilidade Absoluta**

* **Contraste Inteligente:** Não dependa apenas da cor verde. Use ícones (Lucide) e variações de peso de fonte para indicar status (sucesso/erro), garantindo usabilidade para daltônicos.  
* **Focus Visible:** Navegação via teclado deve ter indicadores claros (Borda Neon).

## **7\. Checklist de Validação (O Teste Elite V6.0)**

Antes do deploy, a validação é mandatória:

1. \[ \] **Física:** Os botões têm "peso" e inércia ao clicar? (Micro-springs).  
2. \[ \] **Refração:** O efeito de vidro distorce sutilmente o fundo no Desktop?  
3. \[ \] **Mobile:** O scroll horizontal das abas é fluido e invisível? O "Flashlight" está desligado?  
4. \[ \] **Performance:** O FCP (First Contentful Paint) é \< 50ms?  
5. \[ \] **Acessibilidade:** Consigo entender o status sem ver a cor verde?  
6. \[ \] **Inteligência:** A tipografia se adapta ao modo de leitura (se implementado o módulo AI)?

Live Consultoria – Design System Team  
Inovação, Elegância e Performance Absoluta.

O rodapé das páginas devem conter uma ₢ Powered by Cléber Donato. como link para “mailto: cleberdonato@ecossistemalive.com.br