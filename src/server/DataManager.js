import firebase from "firebase";

const DataManager = {

    getUserInfo: function () {
        const db = firebase.firestore()
        var user = firebase.auth().currentUser;
        var uid = user.uid;
        return db
          .collection("users")
          .doc(uid)
          .get();
    },

    getUserID: function () {
        return firebase.auth().currentUser.uid
    },

    registerUser: async function(){

        const usersRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
        usersRef.get()
        .then((docSnapshot) => {
            if (docSnapshot.exists) {
            usersRef.onSnapshot((doc) => {
                // do stuff with the data
            });
            } else {
            usersRef.set({
                email: firebase.auth().currentUser.email,
                user_name: firebase.auth().currentUser.displayName,
                created_at: Date.now()
            }) // create the document
            }
        });
       
    },

    createPost: async function(post){
        const db = firebase.firestore()
        const uid = firebase.auth().currentUser.uid
        var newImages = post.images
        newImages.shift()
        db
        .collection("posts")
        .add(post)
        .then((result)=>{
            newImages.forEach((uri,index) =>{
                fetch(uri).then(response => {
                    response.blob().then(blob =>{
                        var ref = firebase.storage().ref(uid + "/" + result.id + "/").child(result.id+"_img_"+index);
                        ref.put(blob)
                    });
                    
                }).catch(err => console.log(err))
            })
            db.collection("posts").doc(result.id).update({postID: result.id})
        })

    },

    retrievePosts: async function(){
        const db = firebase.firestore()
        return db
        .collection("posts")
        .get()
    },

    getDownloadLink: async function(postID, index){
        const uid = firebase.auth().currentUser.uid
        return firebase.storage().ref(uid + "/" + postID + "/").child(postID+"_img_"+index).getDownloadURL()
    }
}

export default DataManager  