describe('Checking Profile', () => {
    beforeEach(() =>{
        //cy.loginViaApi("max@test.test","password")
        cy.loginViaVisual("max@test.test","password")
    })
    it('trys to validate data being displayed on profile', () =>{

        cy.get("input[id='username']")
        .should('have.value', 'test_user')
        cy.get("input[id='email']")
        .should('have.value', "max@test.test")
    })
    it('trys to change profilename INVALID', () =>{

        cy.contains("Bearbeiten")
        .click()

        //username
        cy.get("input[id='username']")
        .clear()
        .type("test_user1")

        cy.get("input[id='current_password']")
        .clear()
        .type("passwort") //invalid

        cy.intercept("POST", /.*api\/users.*/).as("user")
        cy.contains("Änderungen speichern")
        .click()
        cy.wait("@user")
        .its("response")
        .should('include',{
            statusCode: 400
          })

        cy.get('div [class="feedback text-success"]')
        .should('not.be.visible')
        cy.reload();
        cy.get("input[id='username']")
        .should("test_user")

        //REVERT BACK to original
        cy.get("input[id='username']")
        .clear()
        .type("test_user")
        cy.get("input[id='current_password']")
        .clear()
        .type("password") 
        cy.contains("Änderungen speichern")
        .click()

    })
    it('trys to change emailadress INVALID', () =>{
        cy.contains("Bearbeiten")
        .click()

        cy.get("input[id='email']")
        .clear()
        .type("maxtest.test") //invalid

        cy.get("input[id='current_password']")
        .clear()
        .type("password") //valid

        cy.intercept("POST", /.*api\/users.*/).as("user")
        cy.contains("Änderungen speichern")
        .click()
        cy.wait("@user")
        .its("response")
        .should('include',{
            statusCode: 400
          })

        cy.get('div [class="feedback text-success"]')
        .should('not.be.visible')

        cy.reload();
        cy.get("input[id='email']")
        .should("max@test.test")

        //REVERT BACK to original
        cy.get("input[id='email']")
        .clear()
        .type("max@test.test")
        cy.get("input[id='current_password']")
        .clear()
        .type("password") 
        cy.contains("Änderungen speichern")
        .click()


    })
    it('trys to change emailadress INVALID 2', () =>{

        cy.contains("Bearbeiten")
        .click()

        cy.get("input[id='email']")
        .clear()
        .type("max@test.test")

        cy.get("input[id='current_password']")
        .clear()
        .type("passwort")

        cy.intercept("POST", /.*api\/users.*/).as("user")
        cy.contains("Änderungen speichern")
        .click()
        cy.wait("@user")
        .its("response")
        .should('include',{
            statusCode: 400
          })

        cy.get('div [class="feedback text-success"]')
        .should('not.be.visible')

        cy.reload();
        cy.get("input[id='email']")
        .should("max@test.test")
        
        
        //REVERT BACK to original
        cy.get("input[id='email']")
        .clear()
        .type("max@test.test")
        cy.get("input[id='current_password']")
        .clear()
        .type("password") 
        cy.contains("Änderungen speichern")
        .click()

    })
    it('trys to change profilename', () =>{

        cy.contains("Bearbeiten")
        .click()

        cy.get("input[id='username']")
        .clear()
        .type("TEST_USER1")

        cy.get("input[id='current_password']")
        .type("password")

        cy.intercept("POST", /.*api\/users.*/).as("user")
        cy.contains("Änderungen speichern")
        .click()
        cy.wait("@user")
        .its("response")
        .should('include',{
            statusCode: 200
          })

        cy.get("input[id='username']")
        .should('have.value', 'TEST_USER1')

        //Rückgängig machen
        cy.get("input[id='username']")
        .clear()
        .type("test_user")

        cy.get("input[id='current_password']")
        .clear()
        .type("password")

        cy.contains("Änderungen speichern")
        .click()

        cy.get("input[id='username']")
        .should('have.value', 'test_user')
    })
    it('trys to change emailadress', () =>{
        
        cy.contains("Bearbeiten")
        .click()
        
        cy.get("input[id='email']")
        .clear()
        .type("max1@test.test")

        cy.get("input[id='current_password']")
        .clear()
        .type("password")

        cy.intercept("POST", /.*api\/users.*/).as("user")
        cy.contains("Änderungen speichern")
        .click()
        cy.wait("@user")
        .its("response")
        .should('include',{
            statusCode: 200
          })

        cy.get("input[id='email']")
        .should('have.value', 'max1@test.test')

        //Rückgängig machen
        cy.get("input[id='email']")
        .clear()
        .type("max@test.test")

        cy.get("input[id='current_password']")
        .clear()
        .type("password")

        cy.contains("Änderungen speichern")
        .click()

        cy.get("input[id='email']")
        .should('have.value', 'max@test.test')
    })



})