// IDs dos elementos de bônus e preço
const bonusIds = ['bonus1', 'bonus2', 'bonus3', 'bonus4', 'bonus5'];
let totalBonus = 0;

// Função para calcular o total dos bônus
function calcularTotalBonus() {
    totalBonus = 0;

    bonusIds.forEach(id => {
        const valorTexto = document.getElementById(id).textContent.replace(',', '.');
        const valor = parseFloat(valorTexto);

        if (!isNaN(valor)) {
            totalBonus += valor;
        }
    });

    // Formata o total no estilo BRL e exibe
    const totalFormatado = totalBonus.toFixed(2).replace('.', ',');
    document.getElementById('bonustotal').textContent = `R$${totalFormatado}`;
}

// Função para calcular o percentual de desconto e os outros valores
function calcularDesconto() {
    // Pega o preço original do ebook
    const precoOriginal = parseFloat(document.getElementById("preco").textContent.replace(',', '.'));

    // Calcula o preço total somando o preço do ebook com o total dos bônus
    const precoTotal = precoOriginal + totalBonus;

    // Calcula o percentual de desconto
    let percentualDesconto = 0;
    if (precoTotal > 0 && totalBonus > 0) {
        percentualDesconto = (totalBonus / precoTotal) * 100; // Percentual de desconto correto
    }

    // Arredonda o percentual de desconto para o número inteiro mais próximo
    document.getElementById("desconto").textContent = `${Math.round(percentualDesconto)}% OFF`;

    // Formata o preço total no estilo BRL e exibe
    document.getElementById("bonustotal").textContent = `De R$${precoTotal.toFixed(2).replace('.', ',')}`;
}

// Chama as funções para calcular e exibir o total dos bônus e o desconto
calcularTotalBonus();
calcularDesconto();