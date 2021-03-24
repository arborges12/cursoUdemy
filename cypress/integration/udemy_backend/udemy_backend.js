
describe ('Udemy_Exercicio_Pratico', () => {
    let token

  beforeEach('Validar Token', () => {
    cy.getToken('arborges.12@gmail.com', '12111986')
        .then(tkn => {
          token = tkn
        })
    cy.resetRest()
    })

  it('Inserir Conta', () => {
    cy.request({
      url: 'https://barrigarest.wcaquino.me/contas',
      method: 'POST',
      headers: { Authorization: `JWT ${token}` },
      body: {
      nome: 'Teste API'
      }
  }).as('response')
    
  cy.get('@response').then(res => {
      expect(res.status).to.be.equal(201)
      expect(res.body).to.have.property('id')
      expect(res.body).to.have.property('nome', 'Teste API')
    })
  })

  it('Alterar Conta', () => {
    cy.inserirContaRest()
      cy.request({
        method: 'GET',
        url: 'https://barrigarest.wcaquino.me/contas',
        headers: { Authorization: `JWT ${token}` },
        qs: {
        nome: 'Teste API Movimentação'
      }
    }).then(res => {
  cy.request({
      url: `https://barrigarest.wcaquino.me/contas/${res.body[0].id}`,
      method: 'PUT',
      headers: { Authorization: `JWT ${token}` },
      body: {
      nome: 'Teste API Alterada'
    }
  }).as('response')  
    cy.get('@response').its('status').should('be.equal',200)
    
    })   
  })

 it ('Inserir Conta Repetida', () => {
  cy.request({
    url: 'https://barrigarest.wcaquino.me/contas',
    method: 'POST',
    headers: { Authorization: `JWT ${token}` },
    body: {
      nome: 'Conta mesmo nome'
    },
    failOnStatusCode: false
  }).as('response')

cy.get('@response').then(res => {
  console.log(res);
  expect(res.status).to.be.equal(400)
  expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
    })
 })

 it ('Inserir Movimentação', () => {
  cy.inserirContaRest()
    cy.getContarest('Teste API Movimentação')
      .then(contaId  => {
       cy.request({
        method: 'POST',
        url: 'https://barrigarest.wcaquino.me/transacoes',
        headers: { Authorization: `JWT ${token}` },
        body: {
          conta_id: contaId,
          data_pagamento: Cypress.moment().add({days: 1}).format('DD/MM/YYYY'),
          data_transacao: Cypress.moment().format('DD/MM/YYYY'),
          descricao: "Teste_Movimentação",
          envolvido: "Todos",
          status: true,
          tipo: "REC",
          valor: "1000"
        }
      }).as('response')
    })
  cy.get('@response').its('status').should('be.equal', 201)
  })

  it ('Verificar Saldo', () => {
    cy.inserirContaRest()
    cy.getContarest('Teste API Movimentação')
        .then(contaId  => {
    cy.inserirMovirest(contaId)
    cy.getSaldorest()
      }).then( res => {
        let saldoConta = null
        res.body.forEach(c => {
          if(c.conta === 'Teste API Movimentação') saldoConta = c.saldo
        })
        expect(saldoConta).to.be.equal('2555.00')
      }) 
    }) 
    
    
  it.only ('Excluir Conta', () => {
    cy.inserirContaRest()
      cy.getExcluiContarest('Teste API Movimentação')
          .then( res => {
            cy.request({
              url: `https://barrigarest.wcaquino.me/transacoes/${res.body[0].id}`,
              method: 'DELETE',
              headers: { Authorization: `JWT ${token}` }
            }).its('status').should('be.equal', 204)
        })
    })        
})