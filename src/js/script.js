//Inserindo vitrine de forma dinamica

const vitrine = document.getElementById("vitrine")

zerarVitrine()

function zerarVitrine() {

    vitrine.innerHTML = ""
}

produtos.forEach( renderizarProdutosVitrine )

function renderizarProdutosVitrine( produto ) {

    criarInteiroCard( produto )
}

function criarInteiroCard( produto ) {

    const card = criarCard( produto )

    const blocoImagem = criarImagem( produto )

    const nomeProduto = criarNome( produto )

    card.append( blocoImagem, nomeProduto )

    criarInformacoesAdicionais( produto, card )

    const botaoComprar = criarBotaoComprar( produto )

    card.appendChild( botaoComprar )
}

function criarCard( { id } ) {

    const card = document.createElement("div")
    card.classList.add("produtos__produtoVitrine")
    card.id = id

    vitrine.appendChild(card)

    return card
}

function criarImagem( { nome, img }) {

    const blocoImagem = document.createElement("figure")
    blocoImagem.classList.add("produtos__blocoImagem")

    const imagem = document.createElement("img")
    imagem.classList.add("produtoVitrine__imagem")
    imagem.src = img
    imagem.alt = nome

    blocoImagem.appendChild(imagem)

    return blocoImagem
}

function criarNome( { nome } ) {

    const nomeProduto = document.createElement("h2")
    nomeProduto.classList.add("produtos__nome")
    nomeProduto.innerText = nome

    return nomeProduto
}

function criarInformacoesAdicionais( produto, card ) {

    const { id, nome, img, descontoAtivo, imgBotao, ...produtos } = produto

    for( const chave in produtos ){

        if( chave != "valor" && chave != "desconto"){

            const texto = document.createElement("p")
            texto.classList.add(`produtos__${chave}`)
            texto.innerText = `${ chave }: ${ produtos[chave] }`

            card.appendChild(texto)
        }
        if( chave == "valor"|| chave == "desconto"){

            const texto = document.createElement("p")
            texto.classList.add(`produtos__${chave}`)
            texto.innerText = `R$ ${ produtos[chave].toFixed(2) }`

            card.appendChild(texto)
        }
    }

}

function criarBotaoComprar( { nome, imgBotao } ) {

    const botao = document.createElement("button")
    botao.classList.add("produtos__enviarCarrinho")

    const imagem = document.createElement("img")
    imagem.src = imgBotao
    imagem.alt = nome

    botao.appendChild(imagem)

    return botao
}

        //fazer bloco blotoes funcionar

const botaoLinksSite = document.getElementById("botaoLinksSite")

const botoesLinkSuspenco = document.getElementById("botoesLinkSuspenco")

botaoLinksSite.addEventListener("click", acionarBotoesSuspenco )

function acionarBotoesSuspenco() {

    botoesLinkSuspenco.classList.toggle("bloco-botoesPart1__Botoes")

    if( botoesLinkSuspenco.classList.contains( "bloco-botoesPart1__Botoes" ) ){

        zerarBlocoBotoes()

        criarMenuSuspenco()

        fecharBotaoPesquisa( "bloco-botoesPar2__barraPesquisa" )

        fecharBotaoCarrinho( "bloco-botoesPar2__carrinhoCompras" )
    }
    if( !botoesLinkSuspenco.classList.contains( "bloco-botoesPart1__Botoes" ) ){

        zerarBlocoBotoes()
    }
}   

function zerarBlocoBotoes() {

    botoesLinkSuspenco.innerHTML = "" 

}

function criarMenuSuspenco() {

    const linkImagens = ["home.svg", "sabe.svg", "informacoes.svg"]

    const botaoHome = criarBotao( "#home", "Home", linkImagens[0] )

    const botaoProdutos = criarBotao( "#1a", "Produtos", linkImagens[1] )

    const botaoInformacoes = criarBotao( "#footer", "Informacoes", linkImagens[2] )

    botoesLinkSuspenco.append( botaoHome, botaoProdutos, botaoInformacoes )
}

function criarBotao( linkEndereco, nomeBotao, linkImg ) {

    const botao = document.createElement("button")
    botao.classList.add("botao", "aberto__topicos")

    const img = document.createElement("img")
    img.src = `./src/img/${ linkImg }`
    img.alt = nomeBotao

    const link = document.createElement("a")
    link.href = linkEndereco
    link.innerText = nomeBotao

    botao.append( img, link )

    return botao
}

    //fazer botao pesquisar funcionar

const botaoPesquisa = document.getElementById("botaoPesquisa")

const barraPesquisaSuspenca = document.getElementById("barraPesquisaSuspenca")

botaoPesquisa.addEventListener("click", acionarBarraPesquisaSuspenca )

function acionarBarraPesquisaSuspenca() {

    barraPesquisaSuspenca.classList.toggle("bloco-botoesPar2__barraPesquisa")

    if( barraPesquisaSuspenca.classList.contains("bloco-botoesPar2__barraPesquisa") ){

        zerarBarraPesquisaSuspenca()

        criarBarraPesquisa()

        fecharBotaoCategorias( "bloco-botoesPart1__Botoes" )

        fecharBotaoCarrinho( "bloco-botoesPar2__carrinhoCompras" )
    }
    if( !barraPesquisaSuspenca.classList.contains("bloco-botoesPar2__barraPesquisa") ){
        
        zerarBarraPesquisaSuspenca()
    }

}

function zerarBarraPesquisaSuspenca() {

    barraPesquisaSuspenca.innerHTML = ""
}

function criarBarraPesquisa() {

    const input = criarInput()

    const botaoPesquisar = criarBotaoPesquisar()

    barraPesquisaSuspenca.append( input, botaoPesquisar )
}

function criarInput() {

    const input = document.createElement("input")
    input.classList.add("barraPesquisa__texto")
    input.type = "text"
    input.placeholder = "Pesquisar?"

    return input
}

function criarBotaoPesquisar() {
    
    const botaoPesquisar = document.createElement("button")
    botaoPesquisar.classList.add("barraPesquisa__botao")

    const img = document.createElement("img")
    img.src = "./src/img/pesquisa2.svg"
    img.alt = "Imagem de uma lupa"

    botaoPesquisar.appendChild(img)

    return botaoPesquisar
}

    //fazer botao carrinho de compras funcionar

let carrinho = []

let somaProdutosCarrinho = 0

const botaoCarrinhoCompras = document.getElementById("botaoCarrinhoCompras")

const carrinhoDeCompras = document.getElementById("carrinhoDeCompras")

botaoCarrinhoCompras.addEventListener("click", adicionarCarrinhoCompras )

function adicionarCarrinhoCompras() {

    carrinhoDeCompras.classList.toggle("bloco-botoesPar2__carrinhoCompras")

    if( carrinhoDeCompras.classList.contains("bloco-botoesPar2__carrinhoCompras" ) ){

        renderizarTudo()
    
        zerarCarrinhoCompras()

        criarCarrinhoCompras()

        renderizarProduto()

        fecharBotaoCategorias( "bloco-botoesPart1__Botoes" )

        fecharBotaoPesquisa( "bloco-botoesPar2__barraPesquisa" )

    }
    if( !carrinhoDeCompras.classList.contains("bloco-botoesPar2__carrinhoCompras" ) ){
        
        zerarCarrinhoCompras()
    }
}

function zerarCarrinhoCompras() {

    carrinhoDeCompras.innerHTML = ""
}

function criarCarrinhoCompras() {

    const sessaoProdutos = criarSessaoProdutos()

    const informacoesCarrinho = criarInformacoesCarrinho()

    const botaoFinalizar = criarBotaoFinalizar()

    carrinhoDeCompras.append( sessaoProdutos, informacoesCarrinho, botaoFinalizar )
}

function criarSessaoProdutos() {

    const sessao = document.createElement("section")
    sessao.classList.add("carrinhoCompras__produtos")
    sessao.id = "blocoCarrinho"

    return sessao
}

function criarInformacoesCarrinho() {

    const informacoes = document.createElement("div")
    informacoes.classList.add("carrinhoCompras__informacoes")

    const nomeValor = document.createElement("p")
    nomeValor.classList.add("informacoes__nome-valor")
    nomeValor.innerText = "Valor: "

    const somaTotal = document.createElement("p")
    somaTotal.classList.add("informacoes__soma-total")
    somaTotal.id = "valorCarrinho"
    somaTotal.innerText = `R$ ${ somaProdutosCarrinho.toFixed(2) }`

    informacoes.append( nomeValor, somaTotal )

    return informacoes
}

function criarBotaoFinalizar() {

    const botao = document.createElement("button")
    botao.classList.add("carrinhoCompras__finalizar-compra")
    botao.innerText = "Finalizar Compras"

    return botao
}

    // fechar menu suspenso botoes

function fecharBotaoCategorias( nomeClass ) {

    zerarBlocoBotoes()
    retirarClass( botoesLinkSuspenco, nomeClass )
}

function fecharBotaoPesquisa( nomeClass ) {
    
    zerarBarraPesquisaSuspenca()
    retirarClass( barraPesquisaSuspenca, nomeClass )
}

function fecharBotaoCarrinho( nomeClass ) {
    
    zerarCarrinhoCompras()
    retirarClass( carrinhoDeCompras, nomeClass )
}

function retirarClass( elemento , nomeClass ) {

    elemento.classList.remove(nomeClass)
}

    //adicionar produtos carrinho

const valor = document.getElementById("valorCarrinho")
    
const carrinhoQuantidade = document.querySelector(".carrinho__quantidadeProdutos")

botoesComprarAcionar()

function botoesComprarAcionar() {

    vitrine.addEventListener("click", renderizarProdutoCarrinho )
}

function renderizarProdutoCarrinho( { target:{ nodeName }, path: [, { id: idProduto } ] } ) {

    if( nodeName === "BUTTON" ){

        encontrarProdutoData( idProduto )

        somarQuantidade()

        colocarSomaTotal()

        renderizarProduto()
    }

}

function encontrarProdutoData( idProduto ) {

    const produtoEncontrado = produtos.find( ( { id } ) => id === Number( idProduto ) )

    const verificarQuantos = carrinho.filter( ( { id } ) => id === Number( idProduto ) )

    if( verificarQuantos.length == 0 ){
        carrinho.push( { ...produtoEncontrado, quantidadeCarrinho:1 } )
    }else{

        carrinho.forEach( ( { id }, indice ) => {

            if( id === Number( idProduto ) ){

                carrinho[indice].quantidadeCarrinho += 1
            }
        })


    }
}

function somarQuantidade() {

    zerarSoma()
    
    const quantidadeRealProdutos = carrinho.reduce( ( acumulador, { quantidadeCarrinho } ) => acumulador += quantidadeCarrinho ,0)

    carrinhoQuantidade.innerText = quantidadeRealProdutos

    deixarImagemCarrinhoCheio( carrinho.length )
}


function deixarImagemCarrinhoCheio( tamanhoCarrinho) {

    const carrinho__imagem = document.querySelector(".carrinho__imagem")

    if( tamanhoCarrinho == 0 ){
        carrinho__imagem.src = "./src/img/Carrinho_vazio.svg"
    }
    if( tamanhoCarrinho !== 0 ){
        carrinho__imagem.src = "./src/img/Carrinho_cheio.svg"
    }
}

function zerarSoma() {

    carrinhoQuantidade.innerText = ""
}

function colocarSomaTotal() {
    
    if( carrinhoDeCompras.classList.contains("bloco-botoesPar2__carrinhoCompras" ) ){

        renderizarTudo()
    
        zerarCarrinhoCompras()

        criarCarrinhoCompras()
    }
}

function renderizarProduto() {

    if( carrinhoDeCompras.classList.contains("bloco-botoesPar2__carrinhoCompras" ) ){

        carrinho.forEach( criarProdutoCarrinho )
    }
}

function criarProdutoCarrinho( produto ) {

        const blocoCarrinho = document.getElementById("blocoCarrinho")

        const card = criarCarProduto( produto )

        const blocoImagem = criarBlocoImagem( produto )

        const nomeBotoes = criarNomeBotoes( produto )

        card.append( blocoImagem, nomeBotoes )

        blocoCarrinho.appendChild( card )
}

function criarCarProduto( { id }) {

    const card = document.createElement("div")
    card.classList.add("produtos__produto")
    card.id = id

    return card
}

function criarBlocoImagem( { nome, img } ) {

    const blocoImagem = document.createElement("figure")
    blocoImagem.classList.add("produto__bloco-imagem")

    const imagem = document.createElement("img")
    imagem.src = img
    imagem.alt = nome

    blocoImagem.appendChild( imagem )

    return blocoImagem
}

function criarNomeBotoes( produto ) {

    const paiNomeBotoes = criarBLocoBotoes()

    const nomeELixo = criarNomeELixo( produto )

    paiNomeBotoes.appendChild(nomeELixo)

    criarCaracteristicas( produto, paiNomeBotoes )

    const valor = criarValorProdutoCarrinho( produto )

    const quantidade = criarQuantidadeAdd( produto )

    paiNomeBotoes.append( valor, quantidade )

    return paiNomeBotoes
}

function criarBLocoBotoes() {
    
    const paiNomeBotoes = document.createElement("div")
    paiNomeBotoes.classList.add("produto__nome-botoes")

    return paiNomeBotoes
}

function criarNomeELixo( { nome }) {
    
    const paiDiv = document.createElement("div")
    paiDiv.classList.add("nome-botoes__nome-lixo")

    const nomeProduto = document.createElement("p")
    nomeProduto.classList.add("nome-botoes__nomeProduto")
    nomeProduto.innerText = nome
    
    const button = document.createElement("button")
    button.classList.add("nome-botoes__lixo")

    const img = document.createElement("img")
    img.src = "./src/img/lixo.svg"
    img.alt = "lixo"

    button.appendChild( img )

    paiDiv.append( nomeProduto, button )

    return paiDiv
}

function criarCaracteristicas( produto, pai ) {

    const { id, img, imgBotao, nome, tipo, quantidade, valor, desconto, descontoAtivo, ...renderizar } = produto

    for( const chave in renderizar ){
        
        const caracteristica = document.createElement("p")
        caracteristica.classList.add("nome-botoes__caracteristicas")
        caracteristica.innerText = `${chave}: ${renderizar[chave]}`

        pai.appendChild( caracteristica )
    }

}

function criarQuantidadeAdd( { quantidadeCarrinho }) {

    const paiDiv = document.createElement("div")
    paiDiv.classList.add("nome-botoes__add-subtrair")

    const botaoSub = document.createElement("button")
    botaoSub.classList.add("add-subtrair__subtrair")

    const imgSub = document.createElement("img")
    imgSub.src = "./src/img/removerNoCarrinho.svg"
    imgSub.alt = "Subtrair"

    botaoSub.appendChild( imgSub )

    const quantidade = document.createElement("p")
    quantidade.classList.add("add-subtrair__quantidadeProduto")
    quantidade.innerText = quantidadeCarrinho

    const botaoAdd = document.createElement("button")
    botaoAdd.classList.add("add-subtrair__add")

    const imgAdd = document.createElement("img")
    imgAdd.src = "./src/img/addNoCarrinho.svg"
    imgAdd.alt = "Adicionar"

    botaoAdd.appendChild( imgAdd )

    paiDiv.append( botaoSub, quantidade, botaoAdd )

    return paiDiv
}

function criarValorProdutoCarrinho( { desconto }) {

    const valor = document.createElement("p")
    valor.classList.add("nome-botoes__valor")
    valor.innerText = `R$ ${desconto.toFixed(2)}`

    return valor
}
    //renderizar dentro do carrinho sempre que ele abre  

function renderizarTudo(){

    somarValorTotalCarrinho()
}

function somarValorTotalCarrinho() {

    const somaTotal = carrinho.reduce( ( acumulador, { desconto, quantidadeCarrinho } ) => acumulador += ( desconto * quantidadeCarrinho ) ,0)

    somaProdutosCarrinho = somaTotal
}

    // excluir todos produtos iguais

carrinhoDeCompras.addEventListener("click", pegarBotaoExcluir )

function pegarBotaoExcluir( { target:{ alt: nameAltImagem }, path:[,,,,{ id: idDoPaiCardCarrinho }]} ) {

    if( nameAltImagem === "lixo"){

        const trasformarNumero = Number( idDoPaiCardCarrinho )

        procurarCarrinhoRemover( trasformarNumero )
    }
}

function procurarCarrinhoRemover( idElemento ) {

    const arrCarrinhoAtualizado = carrinho.filter( ( { id } ) => id !== idElemento )

    carrinho = arrCarrinhoAtualizado

    somarQuantidade()

    colocarSomaTotal()

    renderizarProduto()
}

    //diminuir ao aumentar a quantidade de produtos no carrinho

carrinhoDeCompras.addEventListener("click", pegarBotaoIncrementarOuDecrementar )

carrinhoDeCompras.addEventListener("click", pegarBotaoIncrementarOuDecrementar )

function pegarBotaoIncrementarOuDecrementar( { target:{ alt: altImagem }, path:[,,,, { id: idElementoPai }] } ) {

    if( altImagem === "Adicionar" ){

        incrementarQuantidadeCarrinho( idElementoPai )

        somarQuantidade()

        colocarSomaTotal()

        renderizarProduto()
    }
    if( altImagem === "Subtrair" ){

        decrementarQuantidadeCarrinho( idElementoPai )

        somarQuantidade()

        colocarSomaTotal()

        renderizarProduto()
        
    }
}

function incrementarQuantidadeCarrinho( idElementoPai ) {

    const idPai = Number( idElementoPai )

    carrinho.forEach( ( { id }, indice ) => {

        if( id === idPai ){
            
            carrinho[indice].quantidadeCarrinho += 1
        }

    })
}

function decrementarQuantidadeCarrinho( idElementoPai ) {

    const idPai = Number( idElementoPai )

    carrinho.forEach( ( { id }, indice ) => {

        if( id === idPai ){
            
            carrinho[indice].quantidadeCarrinho -= 1
        }
        if( carrinho[indice].quantidadeCarrinho == 0 ){

            carrinho.splice( indice, 1 )
        }
    })

}

    //filtro

barraPesquisaSuspenca.addEventListener("click", pegarBotaoPesquisa )

barraPesquisaSuspenca.addEventListener("input", pegarTextoInputPesquisa )

function pegarBotaoPesquisa( { target:{ alt: nome } } ){
    
    const barraPesquisa__texto = document.querySelector(".barraPesquisa__texto")

    const { value: valorEntrada } = barraPesquisa__texto

    if( nome == "Imagem de uma lupa" ){

        pesquisarNome( valorEntrada )
    }

}

function pegarTextoInputPesquisa( { target:{ placeholder:verificarSeInputPesquisa, value:valorEntrada } } ) {

    if( verificarSeInputPesquisa == "Pesquisar?"){

        pesquisarNome( valorEntrada )
    }
}

function pesquisarNome( valorEntrada ) {
    
    const entradaTratada = tratarEntrada( valorEntrada )

    procurarProdutosRenderizar( entradaTratada )
}

function tratarEntrada( valorEntrada ) {

    const deixandoMinusculo = valorEntrada.toLowerCase()

    const retirandoEspaco = deixandoMinusculo.trim()

    return retirandoEspaco
}

function procurarProdutosRenderizar( palavraProcurar ) {

    const produtosFiltrados = produtos.filter( ( { nome, tipo } ) => 

        nome.toLowerCase().includes( palavraProcurar ) || 
        tipo.toLowerCase().includes( palavraProcurar ) ? true : false )

    zerarVitrine()

    console.log( produtosFiltrados )

    produtosFiltrados.forEach( renderizarProdutosVitrine )
}

    //