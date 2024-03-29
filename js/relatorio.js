  const logo = document.querySelector('#logo');
  const relatorios = async()=>{
    document.querySelector('#loading').style.display = 'block';
    try {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    const resposta = await fetch(`https://conecta.cyclic.app/entradas`, requestOptions)
    const conteudo = await resposta.json();
    console.log(conteudo)
    if(conteudo.entradas == []){
      document.querySelector('#loading').style.display = 'none';
      document.querySelector('#vazio').style.display = 'block';
      return console.log('vazio!');
    }
    

    conteudo.entradas.reverse().forEach((entrada)=>{
      const dataFormatada = new Date(entrada.data);
      const dataCorreta = dataFormatada.toLocaleDateString('pt-BR', {timeZone: 'UTC',weekday:'long', year: 'numeric', month:'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'});
      const tabela = document.querySelector('#tabela');
      const tr = document.createElement('tr');
      tr.innerHTML = `

      <td>${entrada.matricula}</td>
      <td>${dataCorreta}</td>
      <td>${entrada.observacao}</td>
      <td>
          <a href="baixar.html?id=${entrada._id}&matricula=${entrada.matricula}&observacao=${entrada.observacao}&data=${entrada.data}" class="btn btn-primary mb-1"><i class="bi bi-file-earmark-arrow-down"></i></a>
          <a href="editar.html?id=${entrada._id}&matricula=${entrada.matricula}" class="btn btn-secondary mb-1"><i class="bi bi-pencil"></i></a>
          <a href="apagar.html?matricula=${entrada.matricula}&id=${entrada._id}&data=${entrada.data}" class="btn btn-danger mb-1"><i class="bi bi-trash"></i></a>
          <a href="info.html?id=${entrada.matricula}" class="btn btn-outline-secondary mb-1"><i class="bi bi-three-dots-vertical"></i></a>
      </td>
      `
      tabela.appendChild(tr)
      document.querySelector('#vazio').style.display = 'none';
      document.querySelector('#loading').style.display = 'none';

    })
    } catch (error) {
      console.log(error);
    }
  }
  relatorios();