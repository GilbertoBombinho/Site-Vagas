function renderVagas(vagas){
  const listavagas = document.querySelector('.ul_container')
  
  vagas.forEach(vaga =>{

    const card = createCard(vaga)
  
    listavagas.appendChild(card)
  })
}

function createCard(vaga){

  const vagaContainer = document.createElement('li')
  const title = document.createElement('p')
  const divEnterpriseLocation = document.createElement('div')
  const enterprise = document.createElement('p')
  const location = document.createElement('p')
  const descrition = document.createElement('p')
  const divModalities = document.createElement('div')
  const modalities = document.createElement('p')
  const botaoCandidatar = document.createElement('button')

  botaoCandidatar.id = vaga.id
  vagaContainer.classList.add('vaga__container')
  title.classList.add('title')
  divEnterpriseLocation.classList.add('enterprise_location')
  enterprise.classList.add('enterprise')
  location.classList.add('location')
  descrition.classList.add('descrition')
  divModalities.classList.add('modalities_container')
  modalities.classList.add('modalities')
  botaoCandidatar.classList.add('botao_candidatar')
  
  const searchCart = cart.find(element =>{
    return element.title  == vaga.title
  })
  if(searchCart){
    botaoCandidatar.innerText = "Remover"
  } else {
    botaoCandidatar.innerText = "Candidatar"
  }
  
  botaoCandidatar.addEventListener('click', ()=>{

    if(botaoCandidatar.innerText == 'Candidatar'){
      botaoCandidatar.innerText = 'Remover'
      cart.push(vaga)
      renderVagasSelecionadas(cart)
      localStorage.setItem('vaga', JSON.stringify(cart))
      
    } else {
      botaoCandidatar.innerText = 'Candidatar'
      const cartFilter = cart.filter((element) =>{
       return element.id != vaga.id
      }) 
      cart = cartFilter
      renderVagasSelecionadas(cartFilter)
      localStorage.setItem('vaga', JSON.stringify(cartFilter))
    }  
  })

  title.innerText = vaga.title
  enterprise.innerText = vaga.enterprise
  location.innerText = vaga.location
  descrition.innerText = vaga.descrition
  modalities.innerText = vaga.modalities

  divEnterpriseLocation.append(enterprise, location)
  divModalities.append(modalities)
  vagaContainer.append(title, divEnterpriseLocation, descrition, divModalities, botaoCandidatar)

  return vagaContainer
}


function renderVagasSelecionadas(vagasSelecionadas){
  const listaVagasSelecionadas = document.querySelector('.ul_vagas_selecionadas')
  listaVagasSelecionadas.innerHTML = ""
  vagasSelecionadas.forEach(vagaSelecionada =>{
    const cardSelecionada = createCardSelecionada(vagaSelecionada)
    listaVagasSelecionadas.appendChild(cardSelecionada)
  })
}

function createCardSelecionada (vagaSelecionada){
  const vagaContainerSelecionada = document.createElement('li')
  const divTitleImg = document.createElement('div')
  const titleSelecionada = document.createElement('p')
  const botaoLixeira = document.createElement('img')
  const divEnterpriseLocationSelecionada = document.createElement('div')
  const enterpriseSelecionada = document.createElement('p')
  const locationSelecionada = document.createElement('p')
  
  vagaContainerSelecionada.classList.add('vaga_selecionada_card')
  divTitleImg.classList.add('divTitleImg')
  divEnterpriseLocationSelecionada.classList.add('enterprise_location_aside')
  titleSelecionada.classList.add('title_selecionada')
  
  titleSelecionada.innerText = vagaSelecionada.title
  enterpriseSelecionada.innerText = vagaSelecionada.enterprise
  locationSelecionada.innerText = vagaSelecionada.location
  botaoLixeira.src = "./Src/assets/img/Button Options.png"
  botaoLixeira.id = vagaSelecionada.id

  botaoLixeira.addEventListener('click', ()=>{
    
    const btn = document.querySelectorAll('.botao_candidatar')

    btn.forEach(button => {
      if(button.id == botaoLixeira.id){
        button.innerText = 'Candidatar'
      }
    })

    const cartFilter = cart.filter((element) =>{
      return element.id != vagaSelecionada.id
     }) 
     cart = cartFilter
    vagaContainerSelecionada.remove()
    localStorage.setItem('vaga', JSON.stringify(cartFilter))
    //btn.innerText = 'Candidatar'
    
  })
  
  divTitleImg.append(titleSelecionada, botaoLixeira)
  divEnterpriseLocationSelecionada.append(enterpriseSelecionada, locationSelecionada)
  vagaContainerSelecionada.append(divTitleImg, divEnterpriseLocationSelecionada)
  
  return vagaContainerSelecionada
}


renderVagas(jobsData)

renderVagasSelecionadas(cart)
