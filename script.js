require('dotenv').config({ path: './config.env' }); // Load environment variables from config.env
const mongoose = require('mongoose');
const Travelitems = require('./models/travelitemModel'); // Adjust the path to your model file

// Load database connection string from environment variables
const DATABASE = process.env.DATABASE;

// Connect to MongoDB
mongoose.connect(DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Function to create and upload travel items
async function createTravelItems() {
    try {
        const travelItems = new Travelitems({
            items: [
                'PASSPORT',
                'NEXUS CARD',
                'LAPTOP COMPUTER',
                'READING GLASSES',
                'PERSONAL PHONE',
                'WORK PHONE',
                'PHONE CHARGER',
                'PURPLE THING',
                'PASSWORD FOR YOUR COMPUTER',
                'CLEAN UNDERWEAR'
            ]
        });

        const result = await travelItems.save();
        console.log('Travel items uploaded:', result);
    } catch (err) {
        console.error('Error uploading travel items:', err);
    } finally {
        mongoose.connection.close();
    }
}

// Call the function
createTravelItems();