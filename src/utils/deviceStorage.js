import { AsyncStorage } from 'react-native';

export default deviceStorage = {
    async saveItem (value) {
        try {
            await AsyncStorage.setItem('id_token', value);
        } catch (error) {
            console.log("Error: " + error.message);
        }
    },

    async loadJWT (key) {
        try {
            const value = await AsyncStorage.getItem(key);

            return value;
        } catch (error) {
            console.log("Error: " + error.message);
            return "";
        }
    },

    async deleteJWT (key) {
        try {
            await AsyncStorage.removeItem(key)
        } catch (error) {
            console.log("Error: " + error.message);
        } 
    }
}