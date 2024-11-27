# Biblioteca Node.js - Processamento de Palavras Duplicadas

Esta biblioteca processa arquivos de texto, identifica palavras duplicadas em cada parágrafo e salva o resultado em um novo arquivo.

## Instalação

```bash
git clone https://github.com/seu-usuario/nome-repositorio.git
cd nome-repositorio
npm install
```

Uso
```bash
node src/cli.js -t <caminho-do-arquivo> -d <caminho-destino>
```
Exemplo:
```bash
node src/cli.js -t arquivos/arquivostexto-kanban.txt -d ./resultados
```

Estrutura do Projeto

    src/: Código principal.
    helpers/: Funções auxiliares.
    erros/: Tratamento de erros.
    arquivos/: Exemplos de arquivos de entrada.

Contribuição

Sinta-se à vontade para contribuir enviando pull requests ou abrindo issues.