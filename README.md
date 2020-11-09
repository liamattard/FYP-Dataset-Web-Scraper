
# Dataset Web Scraper 

FYP-Dataset-Web-Scraper is a node.js library which can be used in order to download a selected amount of images from an instagram url. This can be used for dataset building by scraping images based on a hashtag. 

## Installation

This Installation requires [node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/get-npm).

Start by installing the required packages the package.json by running the following npm command. 
```bash
npm install
```

Create a .env file in the same directory using the following format.

```env
INSTAGRAM_USERNAME={Your Instagram Username}
INSTAGRAM_PASSWORD={Your Instagram Password}
INSTAGRAM_URL={The url you want to download the images from}
DATASET_PATH={The path of your dataset folder example: ../Dataset [Please note that the directory must already be created]}
IMAGES_COUNT={Number of images you want to download}

```

## Usage
To run the script simply run the following node command.
```bash
node script.js
```