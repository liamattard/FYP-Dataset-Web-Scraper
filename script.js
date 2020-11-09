require('dotenv').config();
const fs = require('fs')
const request = require('request')
const puppeteer = require('puppeteer');

async function scrapeInstagram(imagecount, datasetPath, url, username, password){

    // Open Browser
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();

    // Go to the site
    await page.goto("http://www.instagram.com/accounts/login/?source=auth_switcher");
    await page.waitFor(2000);

    // Allow cookies
    await page.evaluate('document.querySelector("button.aOOlW.bIiDR").click()');

    // Log in with credentials
    await page.type("input[name='password']",password);
    await page.type("input[name='username']",username);
    await (await page.$("button[type='submit']")).click();
    await page.waitFor(5000);

    // Going to page
    await page.goto(url);
    


    var images = [];
    var totalSet = new Set(images);

    while(totalSet.size <= imagecount){
        
        var x = await addImages(page);
        await scroll(page, 800000);
        await page.waitFor(1000);
        console.log(x.length);
        images = images.concat(x);
        console.log(images.length);
        totalSet = new Set(images);

    }


    console.log("images LENGTH: " + images.length);
    console.log("SET LENGTH: " +totalSet.size);

    final = Array.from(totalSet);

    for (let index = 0; index < imagecount; index++) {
        
        if(final[index] != null){
            if(final[index].charAt(0) == 'h'){

                download(final[index],`${datasetPath}/${index}.jpeg`,()=> {console.log('Done')})
            }

        }
        
    }

}

async function addImages(page){


    var images = await page.evaluate(()=>{

        let x = [];

        document.querySelectorAll("img").forEach(img=>{

            var link = img.getAttribute("src");
            x.push(link);
            
        })

        console.log(x);
        return x;

    })

    return images;

}

const download = (url, path, callback) => {
    request.head(url, (err, res, body) => {
      request(url)
        .pipe(fs.createWriteStream(path))
        .on('close', callback)
    })
  }
  

async function scroll(page){

    var allImages = new Set();

    await page.evaluate(async () => {
      
       window.scrollBy(0, 8000);

    });
    
    return allImages;
}

scrapeInstagram(process.env.IMAGE_COUNT,process.env.DATASET_PATH,process.env.INSTAGRAM_URL,process.env.INSTAGRAM_USERNAME, process.env.INSTAGRAM_PASSWORD);
