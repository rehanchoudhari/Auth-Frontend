import CryptoJS from "crypto-js";


export const encryptData = (data) => {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), process.env.CRYPTOJS_SECRET_KEY).toString();
    return ciphertext;
};

export const decryptData = (data) => {
    if (!data){
        return null;
    }
    try {
        const bytes = CryptoJS.AES.decrypt(data, process.env.CRYPTOJS_SECRET_KEY);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
    }
    catch(error){
        console.log('Error During Decrypting Data', error);
        return null;
    }
};