// import database from '@react-native-firebase/database';
// import storage from '@react-native-firebase/storage';

// export default class Firebase  {
//     constructor(props) {
//         this.database = database();
//         this.auth = auth();
//         this.storage = storage();
//     }

//     // authetication
//     registerWithEmailAndPassword = (email, password) => {
//         return this.auth.registerWithEmailAndPassword(email, password);
//     }

//     signInWithEmailAndPassword = (email, password) => {
//         return this.auth.signInWithEmailAndPassword(email, password);
//     }
//     // storage
//     getHomes = () => {
//         return this.database.ref('homes');
//     }

//     getHomeById = (id) => { 
//         return this.database.ref(`homes/${id}`)
//     }

//     // storage
//     getImage = (imageName) => {
//         return this.storage.ref().child(imageName);
//     }

    
// }