const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;

//const apiKey = '213f5aa69d289ee0ed6502ebb9f145d0';
const generateScraperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Amazon Scraper API!')
});

// GET Product Details
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try{
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.de/dp/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

// GET Product Reviews
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try{
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.de/product-reviews/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

// GET Product Offers
app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try{
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.de/gp/offer-listing/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

// GET Search Results
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    const { api_key } = req.query;

    try{
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.de/s?k=${searchQuery}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));