class AgodaPage {
    visit() {
        cy.visit(Cypress.expose('agodaUrl'));
    }

    selectFlightMenu() {
        // Klik tab penerbangan / Flights
        cy.contains('p', 'Flights')
        .should('be.visible')
        .click();
    }

    fillRoute(origin, destination) {
        // Mengisi keberangkatan dari Jakarta ke Singapura[cite: 1]
        cy.get('[data-selenium="flight-origin-search-input"]').type(origin);
        cy.contains(origin).click();
        
        cy.get('[data-selenium="flight-destination-search-input"]').type(destination);
        cy.contains(destination).click();
    }

    selectTomorrowDate() {
        // Menghitung tanggal besok secara dinamis[cite: 1]
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        // Format ke YYYY-MM-DD (format standar kalender web)
        const dateString = tomorrow.toISOString().split('T')[0]; 
        
        cy.get('[data-selenium="flight-date-selector"]').click();
        cy.get(`[data-day="${dateString}"]`).click();
    }

    clickSearch() {
        cy.get('[data-component="flight-search-button"]').click();
    }

    filterMalaysiaAirlines() {
        cy.get('span[label*="Show all"]').click();
        cy.get('li[data-testid="flight-filter-item-airline"][data-element-value="MH"]').click();
    }

    filterEarliestFlight() {
        // Mengurutkan berdasarkan waktu keberangkatan (Paling Awal/Earliest)[cite: 1]
        cy.get('button[data-testid="flights-quick-sort-item-other-button"]').click();
        cy.contains('span', 'Departure time')
        .click({force: true});

        // Menyimpan data waktu dari tiket pertama untuk assertion nanti
        cy.get('div[data-testid="flightCard-flight-detail"]').first().within(() => {
            cy.get('div[data-testid="departure-time"]').invoke('text').then((t) => {
                cy.wrap(t.trim()).as('depTime');
            });
            cy.get('div[data-testid="arrival-time"]').invoke('text').then((t) => {
                cy.wrap(t.trim()).as('arrTime');
            });
        });
    }

    selectMalaysiaAirlines() {
        // Menggunakan Malaysia Airlines[cite: 1]
        // cy.contains('Airlines').click();

        // cy.get('button[data-test-id="show-all-flight-filter-item-airline"]').click();
        // cy.contains('p', 'Malaysia Airlines').click();
        cy.get('img[data-testid="airline-logo"][alt="Malaysia Airlines"]')
        .first()
        .should('be.visible')
        .click();

        //Klik button select
        cy.get('button[data-testid="flight-detail-select-button"]').click();

    }

    fillPassengerDetails({ firstName, lastName, email, phone, bornDay, bornYear,
                       passportNumber, passportExpiryDay, passportExpiryYear }) {
        // Masukkan data penumpang[cite: 1]
        cy.get('[data-testid="contact.contactFirstName"]').type(firstName);
        cy.get('[data-testid="contact.contactLastName"]').type(lastName);
        cy.get('[data-testid="contact.contactEmail"]').type(email);
        cy.get('[data-testid="contact.contactPhoneNumber-PhoneNumberDataTestId"]').type(phone);
        cy.contains('fieldset', 'Nationality').siblings('button').click();
        cy.contains('span', 'Afghanistan').click();
        cy.contains('p', 'Female').click();
        cy.get('[data-testid="flight.forms.i0.units.i0.passengerFirstName"]').type(firstName);
        cy.get('[data-testid="flight.forms.i0.units.i0.passengerLastName"]').type(lastName);
        cy.get('[data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-DateInputDataTestId"]').type(bornDay);
        cy.get('[data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-MonthInputDataTestId"]')
            .find('button').click();
        cy.contains('span', 'July').click();
        cy.get('[data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-YearInputDataTestId"]').type(bornYear);
        cy.get('[data-testid="flight.forms.i0.units.i0.passportNumber"]').type(passportNumber);
        cy.get('[data-testid="flight.forms.i0.units.i0.passportCountryOfIssue"]')
            .find('button').click();
        cy.contains('span', 'Afghanistan').click();
        cy.get('[data-testid="flight.forms.i0.units.i0.passportExpiryDate-DateInputDataTestId"]').type(passportExpiryDay);
        cy.get('[data-testid="flight.forms.i0.units.i0.passportExpiryDate-MonthInputDataTestId"]')
            .find('button').click();
        cy.contains('span', 'July').click();
        cy.get('[data-testid="flight.forms.i0.units.i0.passportExpiryDate-YearInputDataTestId"]').type(passportExpiryYear);
        cy.get('dd[data-component="mob-flight-price-total-desc"]').invoke('text').as('totalPrice');
    }

    proceedToPayment() {
        cy.get('button[data-testid="continue-to-payment-button"]').click();
        cy.get('[data-component="last-chance-decline-button"]').click();
    }

    // Halaman checkout
    // Cari container detail passenger
    getPassengerSummaryContainer() {
        return cy.get('[data-component="passenger-summary-list"]');
    }

    // Cari nama di dalam container tersebut
    getCheckoutPassengerName() {
        return this.getPassengerSummaryContainer()
        .find('[data-component="name-container-name"]');
    }

    // Cari detail paspor di dalam container tersebut
    getCheckoutPassengerDetail() {
        return this.getPassengerSummaryContainer()
        .find('[data-component="name-container-detail"]');
    }

    // Ambil container jadwal berangkat
    getFlightScheduleContainer() {
        return cy.get('[data-testid="flight-slice-item-origin-dest"]');
    }

    // Ambil spesifik jam keberangkatan
    getDepartureTimeElement() {
        // Mengambil elemen <span> anak pertama dari container
        return this.getFlightScheduleContainer()
        .should('be.visible')
        .children('span')
        .first();
    }

    // Ambil spesifik jam kedatangan
    getArrivalTimeElement() {
        // Mengambil elemen <span> anak terakhir dari container
        return this.getFlightScheduleContainer()
        .should('be.visible')
        .children('span')
        .last();
    }
}

export default new AgodaPage();