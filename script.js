
async function buscaEndereco(cep) {
    let mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";
    try {

        let consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        let consultCEPConvertida = await consultaCEP.json();
        if (consultCEPConvertida.erro) {
            throw Error('CEP não existente!')
        }

        let endereco = document.getElementById('endereco');
        let bairro = document.getElementById('bairro');
        let cidade = document.getElementById('cidade');
        let estado = document.getElementById('estado');

        endereco.value = consultCEPConvertida.logradouro;
        bairro.value = consultCEPConvertida.bairro;
        cidade.value = consultCEPConvertida.localidade;
        estado.value = consultCEPConvertida.uf;

        console.log(consultCEPConvertida);
        return consultCEPConvertida;
    } catch (erro) {mensagemErro.innerHTML = `<p>CEP inválido, tente novamente!!</p>`
        
        console.log(erro)
    }
}
// .then(resposta => resposta.json())
// .then(r => {
//     if(r.erro){
//         throw Error('Esse cep não existe!')
// } else 
//     console.log(r)
// })
// .catch(erro => console.log(erro))
// .finally(mensagem => console.log('Processamento concluído!'))

// let ceps = ['01001000', '01001001'];
// let conjuntoCeps = ceps.map(valores => buscaEndereco(valores));
// Promise.all(conjuntoCeps).then(r => console.log(r));

let cep = document.getElementById('cep');


cep.addEventListener('focusout', () => buscaEndereco(cep.value));