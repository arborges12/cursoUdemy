import loc from '../../support/locators'
import '../../support/commandsContas'
import buildEnv from '../../support/interface'

describe ('Udemy_Interface', () => {
after(() => {
  cy.clearLocalStorage()
})
  beforeEach('Realizar Login',  () => {
    buildEnv()
    cy.login('arborges.12@gmail.com','senha errada')       
  })

  it('Testar Responsividade', () => {
    cy.get('[data-test=menu-home]').should('exist').and('be.visible')
    cy.viewport(500,700)
    cy.get('[data-test=menu-home]').should('exist').and('be.not.visible')
  })

  it ('Inserir Conta', () => {
    
    cy.route ({
      method: 'POST',
      url: 'https://barrigarest.wcaquino.me/contas',
      response:{id:3, nome: 'Conta de Teste', visivel: true, usuario_id: 11824}
    })
      cy.acessarMenuConta() //metodo para acessar menu conta

    cy.route({
      method: 'GET',
      url:'https://barrigarest.wcaquino.me/contas',
      response:
        [{id:1, nome: 'Carteira', visivel: true, usuario_id: 11824},
        {id:2, nome:'Banco', visivel:true, usuario_id:11824},
        {id:3, nome:'Conta de Teste', visivel:true, usuario_id:11824}
        ]
    }).as('contasSave')
    cy.inserirConta('Conta de Teste') //metodo para inclusão de conta   
  }) 
  
  it ('Alterar Conta', () => {
    cy.route({
      method: 'GET',
      url:'https://barrigarest.wcaquino.me/contas',
      response:
        [{id:1, nome: 'Conta Para Alteração', visivel: true, usuario_id: 11824},
        {id:2, nome:'Banco', visivel:true, usuario_id:11824},
        ]
    }).as('contas')
    
    cy.acessarMenuConta() //metodo para acessar menu conta

    cy.xpath(loc.CONTAS.XP_BTN_ALTERA).click()

    cy.route({
      method: 'PUT',
      url:'https://barrigarest.wcaquino.me/contas/1',
      response:
        [{id:1, nome: 'Conta Alterada', visivel: true, usuario_id: 11824},
        ]
    }).as('contasSave')
    cy.acessarMenuConta()

    cy.get(loc.CONTAS.NOME)
    .clear()
    .type('Conta Alterada')
    cy.get(loc.CONTAS.BTN_SALVAR).click()
    cy.wait(2000)
    cy.get(loc.MENSAGEM.MESSAGE).should('exist')
    cy.get(loc.MENSAGEM.MESSAGE_1).should('have.text','Conta atualizada com sucesso!')
  })
  
  it ('Conta Duplicada', function (){
    cy.route ({
      method: 'POST',
      url: 'https://barrigarest.wcaquino.me/contas',
      response:{"error":"Já existe uma conta com esse nome!"},
      status: 400
    }).as('saveContaMesmoNome')
    cy.acessarMenuConta()
    cy.inserirConta('Conta Duplicada')
    cy.inserirConta('Conta Duplicada')
    cy.get(loc.MENSAGEM.MESSAGE).should('contain','code 400')
    cy.resetApp() 
  }) 

  it ('Criar Movimentação', function (){
    cy.route ({
      method: 'POST',
      url: 'https://barrigarest.wcaquino.me/transacoes',
      response:{"id":287268,"descricao":"cdsf","envolvido":"dfdsf","observacao":null,"tipo":"REC","data_transacao":"2020-11-03T03:00:00.000Z","data_pagamento":"2020-11-03T03:00:00.000Z","valor":"55.00","status":true,"conta_id":316606,"usuario_id":11824,"transferencia_id":null,"parcelamento_id":null}
    })    
    cy.route({
      method: 'GET',
      url:'https://barrigarest.wcaquino.me/extrato/**',
      response:
        [{"conta":"Conta para movimentacoes","id":287262,"descricao":"Movimentacao para exclusao","envolvido":"AAA","observacao":null,"tipo":"DESP","data_transacao":"2020-11-03T03:00:00.000Z","data_pagamento":"2020-11-03T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":316606,"usuario_id":11824,"transferencia_id":null,"parcelamento_id":null},
        {"conta":"Conta com movimentacao","id":287263,"descricao":"Movimentacao de conta","envolvido":"BBB","observacao":null,"tipo":"DESP","data_transacao":"2020-11-03T03:00:00.000Z","data_pagamento":"2020-11-03T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":316607,"usuario_id":11824,"transferencia_id":null,"parcelamento_id":null},
        {"conta":"Conta para saldo","id":287264,"descricao":"Movimentacao 1, calculo saldo","envolvido":"CCC","observacao":null,"tipo":"REC","data_transacao":"2020-11-03T03:00:00.000Z","data_pagamento":"2020-11-03T03:00:00.000Z","valor":"3500.00","status":false,"conta_id":316608,"usuario_id":11824,"transferencia_id":null,"parcelamento_id":null},
        {"conta":"Conta para saldo","id":287265,"descricao":"Movimentacao 2, calculo saldo","envolvido":"DDD","observacao":null,"tipo":"DESP","data_transacao":"2020-11-03T03:00:00.000Z","data_pagamento":"2020-11-03T03:00:00.000Z","valor":"-1000.00","status":true,"conta_id":316608,"usuario_id":11824,"transferencia_id":null,"parcelamento_id":null},
        {"conta":"Conta para saldo","id":287266,"descricao":"Movimentacao 3, calculo saldo","envolvido":"EEE","observacao":null,"tipo":"REC","data_transacao":"2020-11-03T03:00:00.000Z","data_pagamento":"2020-11-03T03:00:00.000Z","valor":"1534.00","status":true,"conta_id":316608,"usuario_id":11824,"transferencia_id":null,"parcelamento_id":null},
        {"conta":"Conta para extrato","id":287267,"descricao":"Movimentacao para extrato","envolvido":"FFF","observacao":null,"tipo":"DESP","data_transacao":"2020-11-03T03:00:00.000Z","data_pagamento":"2020-11-03T03:00:00.000Z","valor":"-220.00","status":true,"conta_id":316609,"usuario_id":11824,"transferencia_id":null,"parcelamento_id":null},
        {"conta":"Conta para movimentacoes","id":287268,"descricao":"Ajuste de Movimentação","envolvido":"Ajuste de Movimentação","observacao":null,"tipo":"REC","data_transacao":"2020-11-03T03:00:00.000Z","data_pagamento":"2020-11-03T03:00:00.000Z","valor":"300.00","status":true,"conta_id":316606,"usuario_id":11824,"transferencia_id":null,"parcelamento_id":null}]
      })  
    cy.acessarMenuConta()
    cy.inserirConta('Conta Para Movimentação')
    cy.inserirMovimentacao()
    cy.get(loc.EXTRATO.LINHAS).should('have.length',7)
    cy.xpath(loc.EXTRATO.XP_BUSCA_ELEMENTO).should('exist')
     
  })

  it ('Verificar Saldo', function (){
    cy.acessarMenuConta()
    cy.inserirConta('Conta Para Saldo')
    cy.route({
      method:'GET',
      url:'https://barrigarest.wcaquino.me/saldo',
      response:[{
        "conta_id":9999,
        "conta":"Conta 1 Alteradaa",
        "saldo":"300.00",
        },
        {
        "conta_id":9909,
        "conta":"Banco",
        "saldo":"1000000.00",
      },
      ]
    }).as('saldo')
    cy.get(loc.MENU.HOME).click()
    cy.xpath(loc.SALDO.XP_NOME_CONTA).should('exist')
    cy.xpath(loc.SALDO.XP_SALDO_CONTA).should('exist')      
  })

  it ('Remover Movimentação', function (){
    cy.route({
      method:'GET',
      url:'https://barrigarest.wcaquino.me/extrato/**',
      response:[{"conta":"Conta com movimentacao","id":287270,"descricao":"Movimentacao de conta","envolvido":"BBB","observacao":null,"tipo":"DESP","data_transacao":"2020-11-03T03:00:00.000Z","data_pagamento":"2020-11-03T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":316614,"usuario_id":11824,"transferencia_id":null,"parcelamento_id":null},
      {"conta":"Conta para saldo","id":287271,"descricao":"Movimentacao 1, calculo saldo","envolvido":"CCC","observacao":null,"tipo":"REC","data_transacao":"2020-11-03T03:00:00.000Z","data_pagamento":"2020-11-03T03:00:00.000Z","valor":"3500.00","status":false,"conta_id":316615,"usuario_id":11824,"transferencia_id":null,"parcelamento_id":null},
      {"conta":"Conta para saldo","id":287272,"descricao":"Movimentacao 2, calculo saldo","envolvido":"DDD","observacao":null,"tipo":"DESP","data_transacao":"2020-11-03T03:00:00.000Z","data_pagamento":"2020-11-03T03:00:00.000Z","valor":"-1000.00","status":true,"conta_id":316615,"usuario_id":11824,"transferencia_id":null,"parcelamento_id":null},
      {"conta":"Conta para saldo","id":287273,"descricao":"Movimentacao 3, calculo saldo","envolvido":"EEE","observacao":null,"tipo":"REC","data_transacao":"2020-11-03T03:00:00.000Z","data_pagamento":"2020-11-03T03:00:00.000Z","valor":"1534.00","status":true,"conta_id":316615,"usuario_id":11824,"transferencia_id":null,"parcelamento_id":null},
      {"conta":"Conta para extrato","id":287274,"descricao":"Movimentacao para extrato","envolvido":"FFF","observacao":null,"tipo":"DESP","data_transacao":"2020-11-03T03:00:00.000Z","data_pagamento":"2020-11-03T03:00:00.000Z","valor":"-220.00","status":true,"conta_id":316616,"usuario_id":11824,"transferencia_id":null,"parcelamento_id":null},
      {"conta":"Conta para movimentacoes","id":287268,"descricao":"Conta Para Movimentação","envolvido":"Ajuste de Movimentação","observacao":null,"tipo":"REC","data_transacao":"2020-11-03T03:00:00.000Z","data_pagamento":"2020-11-03T03:00:00.000Z","valor":"300.00","status":true,"conta_id":316606,"usuario_id":11824,"transferencia_id":null,"parcelamento_id":null}]
      })      
    cy.route({
      method: 'DELETE',
      url:'https://barrigarest.wcaquino.me/transacoes/**',
      response: {},
      status: 204
    }).as('del')  
    cy.get(loc.MENU.EXTRATO).click()
    cy.xpath(loc.EXTRATO.XP_REMOVER_ELEMENTO).click()
    cy.get(loc.MENSAGEM.MESSAGE_1).should('have.text','Movimentação removida com sucesso!')
          
  })
  it ('Verificar cores', function (){
    cy.route({
      method:'GET',
      url:'https://barrigarest.wcaquino.me/extrato/**',
      response:[
      {"conta":"Conta com movimentacao","id":287270,"descricao":"Receita Paga","envolvido":"BBB","observacao":null,"tipo":"REC","data_transacao":"2020-11-03T03:00:00.000Z","data_pagamento":"2020-11-03T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":316614,"usuario_id":11824,"transferencia_id":null,"parcelamento_id":null},
      {"conta":"Conta para saldo","id":287271,"descricao":"Receita Pendente, calculo saldo","envolvido":"CCC","observacao":null,"tipo":"REC","data_transacao":"2020-11-03T03:00:00.000Z","data_pagamento":"2020-11-03T03:00:00.000Z","valor":"3500.00","status":false,"conta_id":316615,"usuario_id":11824,"transferencia_id":null,"parcelamento_id":null},
      {"conta":"Conta para saldo","id":287272,"descricao":"Despesa Paga, calculo saldo","envolvido":"DDD","observacao":null,"tipo":"DESP","data_transacao":"2020-11-03T03:00:00.000Z","data_pagamento":"2020-11-03T03:00:00.000Z","valor":"-1000.00","status":true,"conta_id":316615,"usuario_id":11824,"transferencia_id":null,"parcelamento_id":null},
      {"conta":"Conta para saldo","id":287273,"descricao":"Despesa Pendente, calculo saldo","envolvido":"EEE","observacao":null,"tipo":"DESC","data_transacao":"2020-11-03T03:00:00.000Z","data_pagamento":"2020-11-03T03:00:00.000Z","valor":"1534.00","status":false,"conta_id":316615,"usuario_id":11824,"transferencia_id":null,"parcelamento_id":null},
      ]
    })
    cy.get(loc.MENU.EXTRATO).click()
    cy.xpath(loc.EXTRATO.XP_ELEMENTO_LINHA('Receita Paga')).should('have.class','receitaPaga')
    cy.xpath(loc.EXTRATO.XP_ELEMENTO_LINHA('Receita Pendente')).should('have.class','receitaPendente')
    cy.xpath(loc.EXTRATO.XP_ELEMENTO_LINHA('Despesa Paga')).should('have.class','despesaPaga')
    cy.xpath(loc.EXTRATO.XP_ELEMENTO_LINHA('Despesa Pendente')).should('have.class','despesaPendente')
  })  

  

})