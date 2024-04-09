document.addEventListener('DOMContentLoaded', function () {
    const homensInput = document.getElementById('homens');
    const homensValor = document.getElementById('homensValor');

    const mulheresInput = document.getElementById('mulheres');
    const mulheresValor = document.getElementById('mulheresValor');

    const criancasInput = document.getElementById('criancas');
    const criancasValor = document.getElementById('criancasValor');

    const alcoolInput = document.getElementById('alcool');
    const alcoolValor = document.getElementById('alcoolValor');

    const listaDeItens = document.getElementById('listaDeItens');

    const formularioCadastro = document.getElementById('formularioCadastro');
    const formularioPessoas = document.getElementById('formularioPessoas');

    homensInput.addEventListener('input', function () {
        homensValor.textContent = homensInput.value;
        updateAlcoolMax();
        updateQuantidades();
    });

    mulheresInput.addEventListener('input', function () {
        mulheresValor.textContent = mulheresInput.value;
        updateAlcoolMax();
        updateQuantidades();
    });

    criancasInput.addEventListener('input', function () {
        criancasValor.textContent = criancasInput.value;
        updateQuantidades();
    });

    alcoolInput.addEventListener('input', function () {
        alcoolValor.textContent = alcoolInput.value;
    });

    formularioCadastro.addEventListener('submit', function (event) {
        event.preventDefault();
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const cpf = document.getElementById('cpf').value;
        const cep = document.getElementById('cep').value;

        localStorage.setItem('nome', nome);
        localStorage.setItem('email', email);
        localStorage.setItem('cpf', cpf);
        localStorage.setItem('cep', cep);

        formularioCadastro.style.display = 'none';
        formularioPessoas.style.display = 'flex';
    });

    if (localStorage.getItem('nome')) {
        document.getElementById('nome').value = localStorage.getItem('nome');
        document.getElementById('email').value = localStorage.getItem('email');
        document.getElementById('cpf').value = localStorage.getItem('cpf');
        document.getElementById('cep').value = localStorage.getItem('cep');
    }


    formularioPessoas.addEventListener('submit', function (event) {
        event.preventDefault();
        const homens = document.getElementById('homens').value;
        const mulheres = document.getElementById('mulheres').value;
        const criancas = document.getElementById('criancas').value;
        const alcool = document.getElementById('alcool').value;

        localStorage.setItem('homens', homens);
        localStorage.setItem('mulheres', mulheres);
        localStorage.setItem('criancas', criancas);
        localStorage.setItem('alcool', alcool);

        formularioPessoas.style.display = 'none';
        listaDeItens.style.display = 'block';
    });

    function updateAlcoolMax() {
        const maxAlcool = parseInt(homensInput.value) + parseInt(mulheresInput.value);
        alcoolInput.max = maxAlcool;
    }

    function updateQuantidades() {
        const alcool = localStorage.getItem('alcool')
        const carneQuantidade = (0.4 * parseInt(homensInput.value)) + (0.32 * parseInt(mulheresInput.value)) + (0.20 * parseInt(criancasInput.value));
        const paoDeAlhoQuantidade = (2 * parseInt(homensInput.value)) + parseInt(criancasInput.value);
        const carvaoQuantidade = parseInt(homensInput.value) + parseInt(mulheresInput.value) + parseInt(criancasInput.value);
        const salQuantidade = 0.04 * (parseInt(homensInput.value) + parseInt(mulheresInput.value) + parseInt(criancasInput.value));
        const geloQuantidade = Math.ceil((parseInt(homensInput.value) + parseInt(mulheresInput.value) + parseInt(criancasInput.value)) / 10) * 5;
        const refrigeranteQuantidade = Math.ceil((parseInt(homensInput.value) + parseInt(mulheresInput.value) + parseInt(criancasInput.value)) / 5);
        const aguaQuantidade = Math.ceil((parseInt(homensInput.value) + parseInt(mulheresInput.value) + parseInt(criancasInput.value)) / 5);
        const cervejaQuantidade = 3 * parseInt(alcool);

        const rows = listaDeItens.getElementsByTagName('tr');
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const itemName = row.cells[0].textContent.toLowerCase();
            switch (itemName) {
                case 'carne':
                    row.cells[1].textContent = carneQuantidade.toFixed(2) + ' KG';
                    row.cells[2].textContent = 'R$ ' + (carneQuantidade * 30).toFixed(2);
                    break;
                case 'pão de alho':
                    row.cells[1].textContent = paoDeAlhoQuantidade + ' unidades';
                    row.cells[2].textContent = 'R$ ' + (paoDeAlhoQuantidade * 2).toFixed(2);
                    break;
                case 'carvão':
                    row.cells[1].textContent = carvaoQuantidade + ' KG';
                    row.cells[2].textContent = 'R$ ' + (carvaoQuantidade * 5).toFixed(2);
                    break;
                case 'sal grosso':
                    row.cells[1].textContent = salQuantidade.toFixed(2) + ' KG';
                    row.cells[2].textContent = 'R$ ' + (salQuantidade * 1).toFixed(2);
                    break;
                case 'gelo':
                    row.cells[1].textContent = geloQuantidade + ' KG';
                    row.cells[2].textContent = 'R$ ' + (geloQuantidade * 0.5).toFixed(2);
                    break;
                case 'refrigerante':
                    row.cells[1].textContent = refrigeranteQuantidade + ' garrafas';
                    row.cells[2].textContent = 'R$ ' + (refrigeranteQuantidade * 5).toFixed(2);
                    break;
                case 'água':
                    row.cells[1].textContent = aguaQuantidade + ' garrafas';
                    row.cells[2].textContent = 'R$ ' + (aguaQuantidade * 2).toFixed(2);
                    break;
                case 'cerveja':
                    row.cells[1].textContent = cervejaQuantidade + ' garrafas';
                    row.cells[2].textContent = 'R$ ' + (cervejaQuantidade * 10).toFixed(2);
                    break;
                default:
                    break;
            }
        }
    }


});
