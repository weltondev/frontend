const parametros = new URLSearchParams(window.location.search); // Busca informações contidas na URL do navegador
const id = parametros.get('id');
const matricula = parametros.get('matricula');
const observacao = parametros.get('observacao');
const dataFormatada = new Date(parametros.get('data')); // Pega a data via URL
const dataCorreta = dataFormatada.toLocaleDateString('pt-BR', {timeZone: 'UTC', year: 'numeric', month:'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'});
const tabela = document.querySelector('#tabela');

const buscaMatricula = async () => {
try {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
  };
  const resposta = await fetch(`https://conecta.cyclic.app/matriculas/${matricula}`, requestOptions)
  const conteudo = await resposta.json();

  // Coloca as informações vindas da requisação dentro da tabela do HTML;
  tabela.innerHTML = `
  <tr>
      <th colspan="4" style="text-align: center;">Informações do acesso</th>
  </tr>
  <tr>
    <th scope="col">Matrícula</th>
    <th scope="col">Data</th>
    <th scope="col">Observação</th>
    <th scope="col">-</th>
  </tr>
  <tr>
    <td>${matricula}</td>
    <td>${dataCorreta}</td>
    <td>${observacao}</td>
    <td>-</td>
  </tr>
  <tr>
    <th colspan="4" style="text-align: center;">Informações da matricula</th>
  </tr>
  <tr>
    <th scope="col">Matrícula</th>
    <th scope="col">Nome</th>
    <th scope="col">RG</th>
    <th scope="col">CPF</th>
  </tr>
  <tr>
    <td>${conteudo.infos.matricula}</td>
    <td>${conteudo.infos.nome}</td>
    <td>${conteudo.infos.rg}</td>
    <td>${conteudo.infos.cpf}</td>
  </tr>
  `
  
} catch (error) {
  console.log(error);
}
}

buscaMatricula();