import AgodaPage from '../pages/AgodaPages.js';

describe('Task 1: Booking Flight Agoda', () => {
    it.only('Pesan tiket pesawat paling awal Jakarta-Singapura', () => {
      cy.fixture('passenger').then((p) => {
        AgodaPage.visit();
        AgodaPage.selectFlightMenu();
        
        // a. Penerbangan dari Jakarta ke singapura[cite: 1]
        AgodaPage.fillRoute('Jakarta', 'Singapore');
        
        // b. Pilih penerbangan paling awal untuk besok[cite: 1]
        AgodaPage.selectTomorrowDate();
        AgodaPage.clickSearch();
        
        // Pilih Malaysia Airlines[cite: 1]
        AgodaPage.filterMalaysiaAirlines();
        AgodaPage.filterEarliestFlight();
        AgodaPage.selectMalaysiaAirlines();
        
        // c. Masukkan data penumpang[cite: 1]
        AgodaPage.fillPassengerDetails(p);

        // klik button continue to payment
        AgodaPage.proceedToPayment();
        
        // ASSERTIONS di Halaman Pembayaran (f. Expect datanya dilakukan di page memilih pembayaran)[cite: 1]
        
        // // d. Expect total price & data passenger sama seperti di halaman passenger detail[cite: 1]
        cy.get('@totalPrice').then((price) => {
            cy.get('dd[data-component="mob-flight-price-total-desc"]').should('contain.text', price.trim());
        });
        
        AgodaPage.getCheckoutPassengerName().should('have.text', p.firstName + ' ' + p.lastName);

        AgodaPage.getCheckoutPassengerDetail().should('contain.text', p.passportNumber);

        // e. Expect departure time dan arrival time sama seperti yang dipilih saat memilih penerbangan[cite: 1]
        cy.get('@depTime').then((depTime) => {
            AgodaPage.getDepartureTimeElement().should('contain.text', depTime.trim());
        });
        cy.get('@arrTime').then((arrTime) => {
            AgodaPage.getArrivalTimeElement().should('contain.text', arrTime.trim());
        });
      });   
    });
});