import fs from 'fs';
import path from 'path';
import { Command } from 'commander';
import trataErros from './erros/funcoesErro.js';
import { contaPalavras } from './index.js';
import { montaSaidaArquivo } from './helpers.js';
import chalk from 'chalk';

const program = new Command();

program
  .version('0.0.1')
  .option('-t, --texto <string>', 'caminho do texto a ser processado')
  .option('-d, --destino <string>', 'caminho da pasta onde salvar o arquivo de resultados')
  .action(async (options) => {
    const { texto, destino } = options;

    if (!texto || !destino) {
      console.error('Erro: Favor inserir caminho de origem e destino.');
      program.help();
      return;
    }

    const caminhoTexto = path.resolve(texto);
    const caminhoDestino = path.resolve(destino);

    try {
      await processaArquivo(caminhoTexto, caminhoDestino);
      console.log(chalk.green('Texto processado com sucesso.'));
    } catch (erro) {
      console.error(chalk.red('Ocorreu um erro no processamento:', erro.message));
    }
  });

program.parse();

async function processaArquivo(caminhoTexto, caminhoDestino) {
  try {
    const texto = await fs.promises.readFile(caminhoTexto, 'utf-8');
    const resultado = contaPalavras(texto);

    if (!fs.existsSync(caminhoDestino)) {
      fs.promises.mkdir(caminhoDestino, { recursive: true });
    }

    await criaESalvaArquivo(resultado, caminhoDestino);
  } catch (erro) {
    trataErros(erro);
  }
}

async function criaESalvaArquivo(listaPalavras, endereco) {
  const arquivoNovo = `${endereco}/resultado.txt`;
  const textoPalavras = montaSaidaArquivo(listaPalavras);

  try {
    await fs.promises.writeFile(arquivoNovo, textoPalavras);
    console.log('Arquivo criado com sucesso.');
  } catch (erro) {
    throw new Error('Erro ao salvar o arquivo.');
  }
}


// function criaESalvaArquivo(listaPalavras, endereco) {
//     const arquivoNovo = `${endereco}/resultado.txt`;
//     const textoPalavras = JSON.stringify(listaPalavras);
   
//     fs.promises.writeFile(arquivoNovo, textoPalavras)
//       .then(() => {
//         console.log('arquivo criado');
//       })
//       .catch((erro) => {
//         throw erro
//       })
//       .finally(() => console.log('operação finalizada'))
//   }
 

