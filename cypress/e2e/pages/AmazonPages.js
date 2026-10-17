class AmazonPage {
    visit() {
        cy.visit(Cypress.expose('amazonUrl'));
    }

    searchItem(itemName) {
        // b. Search item 'chair'[cite: 1]
        cy.get('#twotabsearchtextbox').type(`${itemName}`);
        cy.get('#nav-search-submit-button').click();
    }

    sortHighestPrice() {
        // c. urutkan berdasarkan Harga termahal[cite: 1]
        cy.get('#s-result-sort-select').select('price-desc-rank', { force: true });
        // Tunggu loading list baru selesai
        cy.get('.s-result-list').should('be.visible');
    }

    filterFreeShipping() {
        cy.get('#p_n_is_free_shipping\\/10236242011').click();
    }

    selectRightMostNonAdItem() {
        // d. pilih item paling kanan dari barisan pertama yang bukan iklan[cite: 1]
        // Asumsi grid Amazon berisi 4 item per baris. Cari item yang TIDAK memiliki label "Sponsored"
        cy.get('[data-component-type="s-search-result"]')
          .not(':contains("Sponsored")') // Hindari elemen iklan
          .eq(4) // Item ke-4 (index 3) = paling kanan di baris pertama
          .within(() => {
              // Simpan nama barang dan harga untuk diekspektasikan di detail page
              cy.get('[data-cy="title-recipe"] h2').invoke('text').then((text) => {
                  cy.wrap(text.trim()).as('searchedItemName');
              });

              // Simpan harga (hanya angka satuan, tanpa sen)[cite: 1]
              cy.get('[data-cy="price-recipe"] .a-price .a-offscreen').invoke('text').then((text) => {
                  // Membuang koma/titik ribuan jika perlu, tapi kita simpan mentahnya dulu
                  cy.wrap(text).as('searchedItemPrice');
              });
              
              // Klik judul produk
              cy.get('[data-cy="title-recipe"] a').click();
          });
    }
}

export default new AmazonPage();