import AmazonPage from '../pages/AmazonPages.js';

describe('Task 2: Search Item Amazon', () => {
    // a. Gunakan viewport 1920x1080[cite: 1]
    beforeEach(() => {
        cy.viewport(1920, 1080);
    });

    it('Mencari kursi termahal dan memvalidasi detailnya', () => {
        AmazonPage.visit();
        
        // b. Search item 'chair'[cite: 1]
        AmazonPage.searchItem('chair');
        
        // // c. urutkan berdasarkan Harga termahal[cite: 1]
        AmazonPage.sortHighestPrice();

        AmazonPage.filterFreeShipping();
        
        // // d. pilih item paling kanan dari barisan pertama yang bukan iklan[cite: 1]
        AmazonPage.selectRightMostNonAdItem();
        
        // // e. expect nama barang dan harga sama seperti yang muncul di search page[cite: 1]
        cy.get('@searchedItemName').then((expectedName) => {
            cy.get('#titleSection').should('contain.text', expectedName.trim());
        });
        
        cy.get('@searchedItemPrice').then((expectedPrice) => {
            // Validasi harga sampai digit satuan saja, abaikan pecahan sen (misal $100.xx menjadi 100)[cite: 1]
            cy.get('#apex-pricetopay-accessibility-label').first().should('contain.text', expectedPrice.trim());
        });
    });
});