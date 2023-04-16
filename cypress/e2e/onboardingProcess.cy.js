import 'cypress-v10-preserve-cookie'
const ConfigObj = require('../fixtures/config.json');
describe('Study_Drive', () => {




        it('onboarding_Process', () => {
            
            cy.visit(ConfigObj.env.baseUrl)
            cy.wait(1000)
            cy.get('.mx-5').click()
            cy.get('[type="email"]').type(ConfigObj.env.user_email)
             cy.get('[type="password"]').type(ConfigObj.env.password) 
            cy.get('button .leading-6').click()
            cy.get("#menu-button").click()
            cy.get("#the-sidebar > div > div").within(()=>{
                cy.get("button").contains("Upload document").click()
            })
            cy.get(".menu-dropdown.rounded ").contains("Upload document").click()
            cy.get(".vs__selected-options input ").click()
            cy.wait(1000)
              cy.get("#vs1__listbox").contains('Testkurs').click()

              cy.fixture('report.pdf').then((fileContent) => {
                cy.get('input[type="file"]').then(($input) => {
                  const file = new File([fileContent], 'report.pdf', { type: 'application/pdf' })
                  const dataTransfer = new DataTransfer()
                    dataTransfer.items.add(file)
                    cy.fixture('report.pdf', 'binary').then(fileContent => {                        
                        const fileSizeInBytes = fileContent.length;                     
                        
                        const fileSizeInMB = (fileSizeInBytes / (1024 * 1024));
                      
                        cy.wrap(fileSizeInMB).should('be.lessThan', 100); // Expected file size less than 100 MB
                      });
                  
                  $input[0].files = dataTransfer.files
                  cy.wrap($input).trigger('change', { force: true })
                })
             })

             cy.get('[placeholder="Add description"]').type('dummyData')
             cy.get("#vs2__combobox").click().then(()=>{
                cy.get("#vs2__listbox").contains("2023").click().then(()=>{
                cy.get('[placeholder="Add description"]').click()
                 })
             })        
           
                 cy.get('[placeholder="Select document type"]').click().then(()=>{
                 cy.get("#vs3__listbox").contains("Exams").click().then(()=>{
                 cy.get('[placeholder="Add description"]').click()
                     })
                 })        
               cy.get('#finish-upload').click()
               cy.get('div.ml-3').contains('Upload completed', {timeout: 10000, log: false}).invoke('text').then((text) => {
               expect(text).to.contain('Upload completed');
               })

            

        })
    })