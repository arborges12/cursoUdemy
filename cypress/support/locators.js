const locators = {
LOGIN:{
    USER: '[data-test=email]',
    PASSWORD:'[data-test=passwd]',
    BTN_LOGIN: '.btn'
},
MENU:{
    HOME:'[data-test=menu-home]',
    SETTINGS: '[data-test=menu-settings]',
    CONTAS:'[href="/contas"]',
    RESET: '[href="/reset"]',
    MOVIMENTACAO: '[data-test=menu-movimentacao]',
    EXTRATO: '[data-test=menu-extrato]'
},
CONTAS: {
    NOME: '[data-test=nome]',
    BTN_SALVAR: '.btn',
    XP_BTN_ALTERA: "//table//td[contains(., 'Conta Para Alteração')]/..//i[@class='far fa-edit']"
},
MOVIMENTACAO: {
    DESCRICAO: '[data-test=descricao]',
    VALOR: '[data-test=valor]',
    INTERESSADO: '[data-test=envolvido]',
    ESC_CONTA:'[data-test=conta]',
    STATUS: '[data-test=status]',
    BTN_SALVAR: '.btn-primary'
    
},
EXTRATO:{
    LINHAS: '.list-group > li',
    XP_BUSCA_ELEMENTO: "//span[contains(.,'Ajuste de Movimentação')]/following-sibling::small[contains(.,'300')]",
    XP_REMOVER_ELEMENTO: "//span[contains(., 'Conta Para Movimentação')]/../../..//i[@class='far fa-trash-alt']",
    XP_ELEMENTO_LINHA: desc => `//span[contains(.,'${desc}')]/../../../..`

},
SALDO:{
    XP_NOME_CONTA: "//tbody//td[contains(.,'Conta 1 Alterada')]",
    XP_SALDO_CONTA: "//tbody//td[contains(.,'Conta 1 Alterada')]/..//td[contains(.,'300,00')]" //Xpath dimamico

},
MENSAGEM: {
    MESSAGE:'.toast-message',
    MESSAGE_1: '.toast-success > .toast-message'
}

 

}
export default locators