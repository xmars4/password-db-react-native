const bcrypt = require("react-native-bcrypt");
const CryptoJS = require("crypto-js");

// default secret key
const SECRET_KEY = 'xmars';

const encrypt_content = (content) => {
    ciphertext = CryptoJS.AES.encrypt(content, SECRET_KEY).toString();
    return ciphertext;
};

const decrypt_content = (content) => {
    let bytes = CryptoJS.AES.decrypt(content, SECRET_KEY);
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
};

const hash_password = (password) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
};

const compare_password = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

// DB cllection functions
// ______________________
const connect_to_db = async (db_connection_url) => {
    try{
        const mongoose = require("mongoose");
        await mongoose.connect(db_connection_url);
        return mongoose;
    } catch(err){
        return false;
    }
    
};

const insert_one = async (SecretInfoModel, data) => {
    try {
        let new_data = await SecretInfoModel.create(data);
        return new_data;
    } catch (err) {
        console.log(err);
        return [];
    }
};

const insert_many = async (SecretInfoModel, data_list) => {
    try {
        let new_data = await SecretInfoModel.insertMany(data_list);
        return new_data;
    } catch (err) {
        console.log(err);
        return [];
    }
};

const get_data = async (SecretInfoModel, query = {}) => {
    try {
        const data = await SecretInfoModel.find(query);
        return data;
    } catch (err) {
        console.log(err);
        return [];
    }
};

const delete_data = async (SecretInfoModel, query = {}) => {
    try {
        await SecretInfoModel.deleteMany(query);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

module.exports = {
    encrypt_content,
    decrypt_content,
    hash_password,
    compare_password,
    connect_to_db,
    insert_one,
    insert_many,
    get_data,
    delete_data,
};
