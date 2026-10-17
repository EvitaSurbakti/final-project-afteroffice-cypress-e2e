
class YoutubePage {
    // blockVideoStream() {
    //     // Cegah stream video & iklan dimuat. Memutar video 1080p + recording
    //     // Cypress membuat renderer browser kehabisan memori dan crash.
    //     cy.intercept({ hostname: /(googlevideo\.com|doubleclick\.net)$/ }, { statusCode: 204, body: '' });
    //     cy.intercept('**/youtubei/v1/player*', { statusCode: 204, body: '' });
    // }

    visit() {
        // Menggunakan Cypress.expose() sesuai versi Cypress 16 kamu
        cy.visit(Cypress.expose('youtubeUrl'), {
            headers: {
                'Accept-Language': 'id-ID,id'
            }
        });
    }

    getGuideButton() {
        return cy.get('button[aria-label="Panduan"]');
    }

    clickGuideButton() {
        this.getGuideButton()
            .should('be.visible')
            .click();
    }

    getShowMoreButton() {
        // Disarankan: Menggunakan kombinasi tag dan teks agar lebih stabil
        return cy.contains('yt-formatted-string', 'Tampilkan lebih banyak');
    }

    clickShowMore() {
        // Memanggil elemen di atas lalu mengkliknya
        this.getShowMoreButton()
        .should('be.visible')
        .click({ force: true });
    }

    getShowLessButton() {
        return cy.contains('yt-formatted-string', 'Lebih sedikit');
    }

    clickShowLess() {
        // Memanggil elemen di atas lalu mengkliknya
        this.getShowLessButton()
        .should('be.visible')
        .click({ force: true });
    }

    clickGamingMenu() {
        // Mengklik menu gaming di sidebar
        cy.get('a[title="Game"]').first()
        .should('be.visible')
        .click({ force: true });
    }

    clickViewAllTrending() {
        // Mencari section Trending videos dan mengklik tombol View All
        cy.contains('Video trending').parents('#dismissible').find('a[aria-label*="Lihat semua"]')
        .should('be.visible')
        .click({ force: true });
    }

    getTrendingVideo(index) {
        // Mengambil elemen video berdasarkan urutannya (indeks)
        return cy.get('ytd-grid-video-renderer').eq(index);
    }

    verifyVideoDetails(expectedTitle, expectedChannel) {
        // Assertion untuk mencocokkan title di halaman video
        cy.get('#title > h1 > yt-formatted-string')
          .should('contain.text', expectedTitle);
        
        // Assertion untuk mencocokkan nama channel di halaman video
        cy.get('#owner-name > a')
          .should('contain.text', expectedChannel);
    }
}

export default new YoutubePage();