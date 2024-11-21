const nameNote = document.querySelector('.name-despesa');
const valor = document.querySelector('.valor');
const buttonSubmit = document.querySelector('.enviar-despesa');
const tableBody = document.querySelector('.table-body');

let id = 1; // Contador para a coluna de número(para aumentar a lista)

buttonSubmit.addEventListener("click", () => {
    const nameInput = nameNote.value.trim();
    const valorInput = valor.value.trim();
    
    if (valorInput !== '' && nameInput !== '') {
        // Cria uma nova linha
        const newRow = document.createElement('tr');

        // Adiciona o conteúdo à linha
        newRow.innerHTML = `
            <th scope="row">${id}</th>
            <td>${nameInput}</td>
            <td class="valor-despesa">R$ ${valorInput}</td>
        `;

        // Adiciona a nova linha ao corpo da tabela
        tableBody.appendChild(newRow);

        // Incrementa o ID para a próxima linha
        id++;

        // Limpa os campos de input
        nameNote.value = '';
        valor.value = '';

        // Atualiza o total
        calcularTotal();
    } else {
        alert('Preencha todos os campos');
    }
});

// Função para calcular o total das despesas
function calcularTotal() {
    const valores = document.querySelectorAll('.valor-despesa');

    let total = 0;
    valores.forEach(celula => {
        const valor = parseFloat(celula.textContent.replace('R$', '').trim());
        total += valor;
    });

    const totalContainer = document.querySelector('.totalPay');
    totalContainer.innerHTML = `<h3 class="text-center mt-5 p-3">Total das despesas: R$ ${total.toFixed(2)}</h3>`;
}
