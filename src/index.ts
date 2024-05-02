import axios from 'axios';

const API_KEY = 'your_crossmint_api_key';
const BASE_URL = 'https://www.crossmint.com/api';

async function createNFTCollection() {
    const url = `${BASE_URL}/2022-06-09/collections/`;
    const body = {
        chain: "optimism",
        metadata: {
            name: "Sample NFT Collection",
            imageUrl: "https://www.crossmint.com/assets/crossmint/logo.png",
            description: "This is a sample NFT collection",
            symbol: "XMINT"
        },
        fungibility: "non-fungible",
        reuploadLinkedFiles: true
    };

    try {
        const response = await axios.post(url, body, {
            headers: {
                'X-API-KEY': API_KEY,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating NFT collection:', error);
        return null;
    }
}

async function mintNFT(collectionId: string) {
    const url = `${BASE_URL}/2022-06-09/collections/${collectionId}/nfts`;
    const body = {
        recipient: "email:testy@crossmint.io:optimism",
        metadata: {
            name: "Crossmint Example NFT",
            image: "https://www.crossmint.com/assets/crossmint/logo.png",
            description: "My NFT created via the mint API!"
        },
        reuploadLinkedFiles: true
    };

    try {
        const response = await axios.post(url, body, {
            headers: {
                'X-API-KEY': API_KEY,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error minting NFT:', error);
        return null;
    }
}

async function main() {
    console.log('Creating NFT Collection on Optimism...');
    const collection = await createNFTCollection();
    if (collection) {
        console.log('NFT Collection created:', collection);
        const collectionId = collection.id;
        console.log('Minting NFT in the collection...');
        const mintedNFT = await mintNFT(collectionId);
        if (mintedNFT) {
            console.log('NFT minted successfully:', mintedNFT);
        }
    }
}

main();
