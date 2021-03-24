import loc from '../../support/locators'
import '../../support/commandsContas'

describe ('Udemy_Exercicio_Pratico', function () {
  beforeEach ('Realizar Login', function () {
    cy.visit('/')
    cy.get(loc.LOGIN.USER).type('arborges.12@gmail.com').should('have.value','arborges.12@gmail.com')
    cy.get(loc.LOGIN.PASSWORD).type(12111986).should('have.value','12111986')
    cy.get(loc.LOGIN.BTN_LOGIN).click()
    cy.get(loc.MENSAGEM.MESSAGE).should('exist')
    cy.get(loc.MENSAGEM.MESSAGE).contains('Bem vindo, Adriano Rocha!')
     
  })
  it ('Reset de Banco', function (){
    
    cy.resetApp()
    
  }) 

  it ('Inserir Conta', function (){
    cy.acessarMenuConta() //metodo para acessar menu conta
    cy.inserirConta('Conta 1') //metodo para inclusão de conta
    cy.get(loc.MENU.CONTAS).should('have.text','Contas')
    cy.get(loc.MENSAGEM.MESSAGE).should('exist')
    cy.get(loc.MENSAGEM.MESSAGE_1).should('have.text','Conta inserida com sucesso!')
    
  }) 
  it ('Alterar Conta', function (){
    cy.acessarMenuConta() //metodo para acessar menu conta
    cy.inserirConta('Conta Para Alteração') //metodo para inclusão de conta
    cy.acessarMenuConta()
    cy.xpath(loc.CONTAS.XP_BTN_ALTERA).click()
    cy.get(loc.CONTAS.NOME)
    .clear()
    .type('Conta Alterada')
    cy.get(loc.CONTAS.BTN_SALVAR).click()
    cy.wait(2000)
    cy.get(loc.MENSAGEM.MESSAGE).should('exist')
    cy.get(loc.MENSAGEM.MESSAGE_1).should('have.text','Conta atualizada com sucesso!')
    cy.resetApp()
  }) 

  it ('Conta Duplicada', function (){
    cy.acessarMenuConta()
    cy.inserirConta('Conta Duplicada')
    cy.inserirConta('Conta Duplicada')
    cy.get(loc.MENSAGEM.MESSAGE).should('contain','code 401')
    cy.screenshot() 
    cy.resetApp() 
  }) 

  it ('Criar Movimentação', function (){
    cy.acessarMenuConta()
    cy.inserirConta('Conta Para Movimentação')
    cy.inserirMovimentacao()
    cy.get(loc.EXTRATO.LINHAS).should('have.length',7)
    cy.xpath(loc.EXTRATO.XP_BUSCA_ELEMENTO).should('exist')
    cy.resetApp() 
    
  })
  
  it ('Verificar Saldo', function (){
    cy.acessarMenuConta()
    cy.inserirConta('Conta Para Saldo')
    cy.get(loc.MENU.HOME).click()
    cy.xpath(loc.SALDO.XP_NOME_CONTA).should('exist')
    cy.xpath(loc.SALDO.XP_SALDO_CONTA).should('exist')
      
  }) 
  it ('Remover Movimentação', function (){
    cy.get(loc.MENU.EXTRATO).click()
    cy.xpath(loc.EXTRATO.XP_REMOVER_ELEMENTO).click()
    cy.get(loc.MENSAGEM.MESSAGE_1).should('have.text','Movimentação removida com sucesso!')
          
  }) 

 
})