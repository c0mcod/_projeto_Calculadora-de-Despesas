const nameNote = document.querySelector('.name-despesa');
const valor = document.querySelector('.valor');
const salarioInput = document.querySelector('.salario'); // Campo de input do salário
const buttonSubmit = document.querySelector('.enviar-despesa');
const tableBody = document.querySelector('.table-body');

let id = 1; // Contador para a coluna de número (para aumentar a lista)
let salarioRestante = 0; // Variável global para o restante do salário

buttonSubmit.addEventListener("click", () => {
    const nameInput = nameNote.value.trim();
    const valorInput = valor.value.trim();

    if (valorInput !== '' && nameInput !== '') {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <th scope="row">${id}</th>
            <td>${nameInput}</td>
            <td class="valor-despesa">R$ ${valorInput}</td>
            <td><button class="btn btn-danger btn-sm remover-despesa">Remover</button></td>
        `;

        newRow.querySelector('.remover-despesa').addEventListener('click', () => {
            newRow.remove();
            calcularTotal();
            salvarDespesas(); // Salva após remover
        });

        tableBody.appendChild(newRow);
        id++;
        nameNote.value = '';
        valor.value = '';
        calcularTotal();

    } else {
        alert('Preencha todos os campos');
    }
});
// Função para calcular o total das despesas
function calcularTotal() {
    const valores = document.querySelectorAll('.valor-despesa');

    let totalDespesas = 0;
    valores.forEach(celula => {
        const valor = parseFloat(celula.textContent.replace('R$', '').trim());
        totalDespesas += valor;
    });

    // Obtém o valor do salário (uma única vez, na primeira chamada)
    if (salarioRestante === 0) {
        salarioRestante = parseFloat(salarioInput.value.trim());
    }

    // Calcula o restante do salário
    const restante = salarioRestante - totalDespesas;

    // Atualiza o HTML com o total e o restante do salário
    const totalContainer = document.querySelector('.totalPay');
    totalContainer.innerHTML = `
        <h3 class="text-center mt-5 p-3">Total das despesas: R$ ${totalDespesas.toFixed(2)}</h3>
        <h3 class="text-center  p-3">Restante do salário: R$ ${restante.toFixed(2)}</h3>
    `;
}
