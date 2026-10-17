import YoutubePage from '../pages/YoutubePages';

describe('Task 3: Flow Pencarian YouTube Gaming', () => {
  it.only('Memilih video trending no.3 dan memvalidasi title serta channelnya', () => {
    cy.viewport(1280, 720);
    // a. Buka URL YouTube
    // YoutubePage.blockVideoStream();
    YoutubePage.visit();

    YoutubePage.clickGuideButton();

    // b. Klik Tampilkan lebih banyak
    YoutubePage.getShowMoreButton();

    YoutubePage.clickShowMore();

    // c. Pilih menu gaming pada sidebar[cite: 1]
    YoutubePage.clickGamingMenu();

    // d. Masuk ke halaman video trending dengan klik 'View All'[cite: 1]
    YoutubePage.clickViewAllTrending();

    // e. Pilih video trending no.3
    YoutubePage.getTrendingVideo(2).within(() => {
        // Simpan title dan channel name dari halaman trending sebelum diklik
        cy.get('#video-title').invoke('text').then((t) => cy.wrap(t.trim()).as('savedTitle'));
        cy.get('#text > a').first().invoke('text').then((t) => cy.wrap(t.trim()).as('savedChannel'));
        
        // Klik judul video untuk memutarnya
        cy.get('#video-title').click();
    });

    // f. Di halaman video, expect title dan youtube channel sama seperti page trending[cite: 1]
    cy.get('@savedTitle').then((titleText) => {
        cy.get('@savedChannel').then((channelText) => {
            // Kita gunakan .trim() untuk membuang spasi kosong/enter tambahan yang sering ada di teks YouTube
            YoutubePage.verifyVideoDetails(titleText.trim(), channelText.trim());
        });
    });
  });
});