import { cyan } from 'color-name'
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import loc from './locators'

Cypress.Commands.add('resetApp', function () {
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.RESET).click()

})

Cypress.Commands.add('login', (user, password) => {
  cy.visit('https://barrigareact.wcaquino.me/')
  cy.get(loc.LOGIN.USER).type(user)
  cy.get(loc.LOGIN.PASSWORD).type(password)
  cy.get(loc.LOGIN.BTN_LOGIN).click()
  cy.get(loc.MENSAGEM.MESSAGE).should('contain','Bem vindo')

})

//Api Rest

Cypress.Commands.add('getToken',  (user, password) => {
  cy.request({
        method: 'POST',
        url:'https://barrigarest.wcaquino.me/signin',
        body: {
          email:user,
          redirecionar: false,
          senha: password
        }
      }).its('body.token').should('not.be.empty')
      .then(token => {
          return token
  })
})

Cypress.Commands.add('resetRest', () => {
  cy.getToken('arborges.12@gmail.com', '12111986').then(token => {
    cy.request({
      method: 'GET',
      url:'https://barrigarest.wcaquino.me/reset',
      headers: { Authorization: `JWT ${token}` }
     }).its('status').should('be.equal',200)     
  })
})

Cypress.Commands.add('inserirContaRest', () => {
  cy.getToken('arborges.12@gmail.com', '12111986').then(token => {
    cy.request({
      url: 'https://barrigarest.wcaquino.me/contas',
      method: 'POST',
      headers: { Authorization: `JWT ${token}` },
      body: {
        nome: 'Teste API Movimentação'
      }
    })
  })
})

Cypress.Commands.add('getContarest', nome => {
  cy.getToken('arborges.12@gmail.com', '12111986').then(token => {
  cy.request({
      method: 'GET',
      url: 'https://barrigarest.wcaquino.me/contas',
      headers: { Authorization: `JWT ${token}` },
      qs: {
        nome: nome
      }
    }).then(res => {
      return res.body[0].id
    })
  })
})

Cypress.Commands.add('inserirMovirest', contaId => {
  cy.getToken('arborges.12@gmail.com', '12111986').then(token => {
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
        valor: "2555"
      }
    })
  })
})

Cypress.Commands.add('getSaldorest', () => {
  cy.getToken('arborges.12@gmail.com', '12111986').then(token => {
  cy.request({
      method: 'GET',
      url: 'https://barrigarest.wcaquino.me/saldo',
      headers: { Authorization: `JWT ${token}` },
    })
  })
})

Cypress.Commands.add('getExcluiContarest', nome => {
  cy.getToken('arborges.12@gmail.com', '12111986').then(token => {
  cy.request({
      method: 'GET',
      url: 'https://barrigarest.wcaquino.me/transacoes',
      headers: { Authorization: `JWT ${token}` },
      nome: nome
    })
  })
})
