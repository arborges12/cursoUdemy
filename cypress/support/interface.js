const buildEnv = () => {
    cy.server()
    cy.route({
      method: 'POST',
      url: 'https://barrigarest.wcaquino.me/signin',
      response: {
        id: 11824,
        nome: 'Adriano Rocha',
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTE4MjR9.yknKYYmtAzdAMl_B3VQXr55Zo0S1gsN28au6D6R8P7M',
      }
    }).as('signin')
    
    cy.route({
      method:'GET',
      url:'https://barrigarest.wcaquino.me/saldo',
      response:[{
        "conta_id":9999,
        "conta":"Carteira",
        "saldo":"100.00",
        },
        {
        "conta_id":9909,
        "conta":"Banco",
        "saldo":"1000000.00",
      },
      ]
    }).as('saldo')

    cy.route({
        method: 'GET',
        url:'https://barrigarest.wcaquino.me/contas',
        response:
          [{id:1, nome: 'Carteira', visivel: true, usuario_id: 11824},
          {id:2, nome:'Banco', visivel:true, usuario_id:11824},
          {id:4, nome:'Conta Para Movimentação', visivel:true, usuario_id:11824}
          ]
      }).as('contas')
    

}

    export default buildEnv