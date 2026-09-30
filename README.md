# Ingresso Dev Paraná 2026

Projeto acadêmico de front-end desenvolvido para o desafio **Gerador de Ingresso para Conferência**.

## Identificação acadêmica

- **Estudante:** Pedro Augusto Araújo do Santos
- **RA:** 60023719

## Sobre o projeto

Uma página em português para inscrição no evento fictício Encontro Dev Paraná 2026. Depois de preencher os dados e enviar uma foto, a página gera um ingresso personalizado. O layout usa fundo claro com padrões decorativos e uma paleta em tons de vermelho.

## Funcionalidades

- Formulário responsivo para nome, e-mail, usuário do GitHub e foto de perfil.
- Validação de campos obrigatórios, formato de e-mail e nome de usuário do GitHub.
- Upload de foto JPG ou PNG de até 500 KB, por clique ou arrastar e soltar.
- Prévia da foto, com opção para remover ou trocar a imagem.
- Ingresso personalizado com nome, usuário, avatar e número aleatório.
- Mensagens de erro acessíveis, navegação por teclado e estados de foco.
- HTML, CSS e JavaScript puros, sem etapa de compilação ou instalação de pacotes.

## Abrir no VS Code

1. No VS Code, acesse **Arquivo → Abrir Pasta…**.
2. Selecione a pasta `gerador-de-ingressos-pedro`.
3. Abra `index.html` no navegador ou use uma extensão como Live Server.

A fonte Manrope é carregada pelo Google Fonts; sem internet, o navegador usa uma fonte sans-serif local.

## Estrutura

```text
gerador-de-ingressos-pedro/
├── assets/
├── index.html
├── script.js
├── styles.css
└── README.md
```

## Publicar no GitHub

Crie um repositório público vazio no GitHub. No terminal do VS Code, aberto nesta pasta, execute os comandos abaixo e substitua `SEU-USUARIO` pelo nome de usuário do GitHub do estudante:

```bash
git init
git add .
git commit -m "feat: criar gerador de ingressos Dev Paraná"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/gerador-de-ingressos-pedro.git
git push -u origin main
```

Para publicar o site, abra **Settings → Pages**, selecione **Deploy from a branch**, escolha `main` e a pasta `/(root)`, e salve.

## Referência

Desafio e materiais da turma: [ADS-Unipar — Gerador de Ingresso para Conferência](https://github.com/ADS-Unipar/desafios-frontend/tree/main/conference-ticket-generator-main).
