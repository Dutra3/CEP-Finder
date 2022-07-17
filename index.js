const cep = document.querySelector('#cep')
const search = document.querySelector('#search')
const clean = document.querySelector('#clean')
const response = document.querySelector('#response')

const fillAddress = (address) => {
    response.classList.remove('hide')
    document.getElementById('street').value = address.logradouro;
    document.getElementById('city').value = address.localidade;
    document.getElementById('state').value = address.uf;
}

cep.addEventListener('input', (newCep) => cepMask(newCep.target.value))

const cepMask = (newCep) => {
    newCep = newCep.replace(/\D/g, "")
    newCep = newCep.replace(/(\d{5})(\d{1})/,'$1-$2')
    cep.value = newCep
}

const validCep = (cep) => cep.length == 8 && /^[0-9]+$/.test(cep);

search.addEventListener('click', async() => {
    const cepValue = cep.value.replace('-', '');
    const url = `https://viacep.com.br/ws/${cepValue}/json/`;
    if (validCep(cepValue)) {
        const data = await fetch(url);
        const address = await data.json();
        if(address.hasOwnProperty('erro')) {
            alert('CEP incorreto')
        } else {
            fillAddress(address);
        }
    } else {
        alert('CEP inválido')
    }
})

clean.addEventListener('click', () => {
    document.getElementById('cep').value = '';
    document.getElementById('street').value = '';
    document.getElementById('city').value = '';
    document.getElementById('state').value = '';
    response.classList.add('hide')
})
