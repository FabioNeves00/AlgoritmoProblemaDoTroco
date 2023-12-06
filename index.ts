function encontrarMinMoedas(moedas: number[], quantias: number[]): string[] {
  // Criar uma tabela para armazenar o resultado de subproblemas
  const maxQuantia = Math.max(...quantias);
  const tabelaMinMoedas: number[] = [0].concat(
    Array(maxQuantia).fill(Infinity)
  );

  // Preencher a tabela de programação dinâmica
  for (let i = 1; i <= maxQuantia; i++) {
    for (const moeda of moedas) {
      if (moeda <= i) {
        const subResultado = tabelaMinMoedas[i - moeda];
        if (
          subResultado !== Infinity &&
          subResultado + 1 < tabelaMinMoedas[i]
        ) {
          tabelaMinMoedas[i] = subResultado + 1;
        }
      }
    }
  }

  // Construir a resposta para cada quantia
  const respostas: string[] = [];
  for (const quantiaOriginal of quantias) {
    let quantia = quantiaOriginal;
    const moedasUsadas: number[] = [];
    while (quantia > 0) {
      for (let j = moedas.length - 1; j >= 0; j--) {
        const moeda = moedas[j];
        if (tabelaMinMoedas[quantia - moeda] === tabelaMinMoedas[quantia] - 1) {
          moedasUsadas.push(moeda);
          quantia -= moeda;
          break;
        }
      }
    }
    respostas.push(
      `${quantiaOriginal}: [${moedasUsadas.length}] ` + moedasUsadas.join(" ")
    );
  }

  return respostas;
}

// Exemplo de uso:
const moedas: number[] = []; // Valores das moedas
const quantias: number[] = []; // Quantias a serem trocadas
while(true) {
  const moeda = parseInt(prompt("Digite o valor da moeda: (digite 0 para finalizar)")!);
  if (moeda === 0) break;
  moedas.push(moeda);
}

while(true) {
  const quantia = parseInt(prompt("Digite a quantia a ser trocada: (digite 0 para finalizar)")!);
  if (quantia === 0) break;
  quantias.push(quantia);
}

const respostas = encontrarMinMoedas(moedas, quantias);
console.log(respostas.join("\n"));