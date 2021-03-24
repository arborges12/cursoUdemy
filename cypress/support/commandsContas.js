import { cyan } from 'color-name'
import loc from './locators'

Cypress.Commands.add('acessarMenuConta', function () {
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.CONTAS).click()
})
Cypress.Commands.add('inserirConta', function (conta) {
    cy.get(loc.CONTAS.NOME).type(conta)
    cy.get(loc.CONTAS.BTN_SALVAR).click()
})

Cypress.Commands.add('inserirMovimentacao', function () {
    cy.get(loc.MENU.MOVIMENTACAO).click()
    cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Ajuste de Movimentação')
    cy.get(loc.MOVIMENTACAO.VALOR).type('300')
    cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Teste')
    cy.get(loc.MOVIMENTACAO.ESC_CONTA).select('Conta Para Movimentação')
    cy.get(loc.MOVIMENTACAO.STATUS).click()
    cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
    cy.get(loc.MENSAGEM.MESSAGE).should('contain','sucesso')
})