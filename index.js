const cheerio = require('cheerio');
// import * as C from constants.js

( async () => {
    const BASE_URL = 'https://www.stillwhite.com/shop';
    const SIZE = '12';
    const PRICE = '0-1200';

    const FINAL_URL = `https://www.stillwhite.com/shop?size=${12}&price=${PRICE}&`

    // Search for Wtoo dresses under $1200
    const response = await fetch(FINAL_URL + "q=wtoo");
    
    const $ = cheerio.load(await response.text());
    
    const dresses = $('.item-title').toArray();
    console.log(dresses[0].text);
    // dresses.map((dress) => )

}) ();