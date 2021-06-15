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

    getDownloadLink: async function(postID, index, postOwnerID){
        return firebase.storage().ref(postOwnerID + "/" + postID + "/").child(postID+"_img_"+index).getDownloadURL()
    },

    likePost: async function(postID){
        const db = firebase.firestore()
        db
        .collection('posts')
        .doc(postID)
        .update({
            numLikes: firebase.firestore.FieldValue.increment(1),
            numActivities: firebase.firestore.FieldValue.increment(1),
        })
    },

    comment: async function(postID, comment){
        const db = firebase.firestore()
        db
        .collection('posts')
        .doc(postID)
        .update({
            numActivities: firebase.firestore.FieldValue.increment(1),
            activities: firebase.firestore.FieldValue.arrayUnion({
                type: 'comment',
                content: comment,
                owner: firebase.auth().currentUser.uid,
                ownerName: firebase.auth().currentUser.displayName,
                timePosted: Date.now()
            })
        })
    },

    connect: async function(postID, message, recipient, recipientName){
        const db = firebase.firestore()
        db
        .collection('posts')
        .doc(postID)
        .update({
            numActivities: firebase.firestore.FieldValue.increment(1),
            activities: firebase.firestore.FieldValue.arrayUnion({
                type: 'connect',
                content: message,
                owner: firebase.auth().currentUser.uid,
                ownerName: firebase.auth().currentUser.displayName,
                timePosted: Date.now()
            })
        })
        db
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .update({
                sentConnectRequests: firebase.firestore.FieldValue.arrayUnion({
                    recipient,
                    recipientName,
                    message,
                    timeSent: Date.now()
                })
        })
        db
        .collection('users')
        .doc(recipient)
        .update({
            connectRequests: firebase.firestore.FieldValue.arrayUnion({
                sender: firebase.auth().currentUser.uid,
                senderName: firebase.auth().currentUser.displayName,
                message,
                timeSent: Date.now()
            })
        })
    }
}

export default DataManager  