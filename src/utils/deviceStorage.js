import AsyncStorage from '@react-native-async-storage/async-storage';

export default deviceStorage = {
    async saveItem (id, value) {
        try {
            await AsyncStorage.setItem(id, value);
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
    },

    async loadUser(key) {
        try {
            const value = await AsyncStorage.getItem(key);

            return value;
        } catch (error) {
            console.log("Error: " + error.message);
            return "";
        }
    }
}