const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const url = 'https://www.dnathan.com/gaman/browse.php?GR=Y&YR=Y&YY=Y&fl=all&view=full&submit=Yananga#'

const controller = new AbortController();

const content = []

axios.get(url)
    .then((res) => {
        const $ = cheerio.load(res.data);

        console.log("HTML content accessed - " + `${new Date().toLocaleString()}`)

        const box = $('#box1 > div');

        box.each(function() {
            const src = $(this).attr("id")
            
            const id = src.trim();
            const indigenous = $(`#${src} .hw`).text().trim();
            const english = $(`#${src} .gl`).text().trim();
            const partsofspeech = $(`#${src} .ps`).text().trim();
            const language = $(`#${src} .lg`).text().trim();

            // add content to json
            const contentJSON = {
                id: id.trim(),
                english: english.trim(),
                indigenous: indigenous.trim(),
                partsofspeech: partsofspeech.trim(),
                language: language.trim()
            };

            content.push(contentJSON);
            console.log(`${src}` + " successfully scraped - " + `${new Date().toLocaleString()}`)
        });
        
        console.log("Creating JSON file - " + `${new Date().toLocaleString()}}`)
        const dictionaryJSONFile = JSON.stringify(content);
        const filename = "dictionary" + ".json";

        console.log("Loading contents onto JSON file - " + `${new Date().toLocaleString()}`)
        fs.writeFileSync(filename, dictionaryJSONFile);
        console.log("done" + `${new Date().toLocaleString()}}`)
    controller.abort()
}).catch(err => console.log(err));