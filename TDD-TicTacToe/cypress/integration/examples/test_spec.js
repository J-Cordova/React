/* eslint-disable no-undef */
describe('The Game App', function () {

    it('alerts win for X player', () => {
        cy.visit('http://localhost:3000');

        cy.get('.square').eq(0).click()
        cy.get('.square').eq(4).click()

        cy.get('.square').eq(3).click()
        cy.get('.square').eq(5).click()

        cy.get('.square').eq(6).click()
        cy.get('.square').eq(1).click()
   
        cy.get('#statusBox').invoke('text').should(status => {
            expect(status).to.equal('The winner is: X');
        });
    });

    it('alerts win for O player', () => {
        cy.visit('http://localhost:3000');

        cy.get('.square').eq(1).click();
        cy.get('.square').eq(0).click()

        cy.get('.square').eq(2).click()
        cy.get('.square').eq(3).click()

        cy.get('.square').eq(5).click();
        cy.get('.square').eq(6).click();

        cy.get('#statusBox').invoke('text').should(status => {
            expect(status).to.equal('The winner is: O');
        });


    });

    it('alerts for full board no winner', () => {

        cy.visit('http://localhost:3000');
        cy.get('.square').eq(0).click();
        cy.get('.square').eq(1).click();

        cy.get('.square').eq(3).click();
        cy.get('.square').eq(4).click();

        cy.get('.square').eq(7).click();
        cy.get('.square').eq(5).click();

        cy.get('.square').eq(8).click();
        cy.get('.square').eq(6).click();

        cy.get('.square').eq(2).click();

        cy.get('#statusBox').invoke('text').should(status => {
            expect(status).to.equal('There is no winner');
        });
    });

})