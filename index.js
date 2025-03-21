const cheerio = require('cheerio');
// import * as C from constants.js

( async () => {
    const BASE_URL = 'https://www.stillwhite.com/shop';
    const SIZE = '12';
    const PRICE = '0-1200';

    const FINAL_URL = `https://www.stillwhite.com/shop?size=${12}&price=${PRICE}&`

    // Function to parse dress info from the HTML class element
    const parseHtmlDress = (dress) => {
        // $ at the end of a variable indicates a cheerio object
        const dressInfo = dress.split('\n');
        //console.log(dressInfo);
        dressName = normalizeWhitespace(dressInfo[1]);
        dressPrice = normalizeWhitespace(dressInfo[dressInfo.length-2]); 
        return {
            dressName, dressPrice
        }
    }

    // Trims all trailing spaces symbols from the string
    const normalizeWhitespace = (text) => {
        //Performs a safe trim on the string
        text == null ? '' : text.trim(); 
        let newStr;
        if(text !== null && text !== undefined){
            newStr = text.replace(
                /\s+/g,
                ' ',
            )
        }
        return newStr;
    }

    // Search for Wtoo dresses under $1200
    const response = await fetch(FINAL_URL + "q=wtoo");
    
    const $ = cheerio.load(await response.text());
    
    const dressesText = $('.item-title').toArray().map((e) => $(e).text());
    const dresses = dressesText.map((dress) => (
        parseHtmlDress(dress)
    ));

    dresses.map((dress) => console.log(dress));



}) ();