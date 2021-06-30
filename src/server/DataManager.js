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

    getUserInfoWithID: function (uid) {
        const db = firebase.firestore()
        return db
          .collection("users")
          .doc(uid)
          .get();
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

        db
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .update({
            posts: firebase.firestore.FieldValue.arrayUnion(post)
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
                    sender: firebase.auth().currentUser.uid,
                    senderName: firebase.auth().currentUser.displayName,
                    message,
                    timeSent: Date.now()
                }),
                //sentConnectRequestsIDs: firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.uid)
        })
        db
        .collection('users')
        .doc(recipient)
        .update({
            connectRequests: firebase.firestore.FieldValue.arrayUnion({
                recipient,
                recipientName,
                sender: firebase.auth().currentUser.uid,
                senderName: firebase.auth().currentUser.displayName,
                message,
                timeSent: Date.now()
            }),
            //connectRequestIDs: firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.uid)
        })
    },

    handleContactRequest: async function(action, sender, content){
        
        const db = firebase.firestore()
        if(action === 'accept'){
            db
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .update({
                connectRequests: firebase.firestore.FieldValue.arrayRemove(content),
                contacts: firebase.firestore.FieldValue.arrayUnion({
                    contactID: sender
                })
            })

            db
            .collection('users')
            .doc(sender)
            .update({
                sentConnectRequests: firebase.firestore.FieldValue.arrayRemove(content),
                contacts: firebase.firestore.FieldValue.arrayUnion({
                    contactID: firebase.auth().currentUser.uid
                })
            })

        }else{
            db
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .update({
                connectRequests: firebase.firestore.FieldValue.arrayRemove(content),
            })

            db
            .collection('users')
            .doc(sender)
            .update({
                sentConnectRequests: firebase.firestore.FieldValue.arrayRemove(content),
            })
        }
    },

    createChatRoom: async function(users){
        var userJSON = {}
        await users.forEach(user =>{
            DataManager.getUserInfoWithID(user).then(result => {
                userJSON[result.data().user_name] = user
                let res = firebase.database().ref('/chatrooms/').push({
                    userJSON,
                    timeStamp: Date.now(),
                    messages: [{
                        _id: 1,
                        text: 'My message',
                        createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
                        user: {
                            _id: 2,
                            name: 'React Native',
                            avatar: 'https://facebook.github.io/react/img/logo_og.png',
                        },
                        
                        sent: true,
                        // Mark the message as received, using two tick
                        received: true,
                        // Mark the message as pending with a clock loader
                        pending: true,
                        // Any additional custom parameters are passed through
                        system: false,
                    },
        
                    {
                        _id: -1,
                        text: 'First Message',
                        createdAt: Date.now(),
                        system: true,
                        // Any additional custom parameters are passed through
                    }],
                    lastMessage: 'This is a new message'
                })

                firebase.database().ref('/chatrooms/' + res.key).update({
                    chatroomID: res.key
                })
        
                const db = firebase.firestore()
                db
                .collection('chatrooms')
                .doc(res.key)
                .set({
                    users,
                    timeStamp: Date.now(),
                    lastMessage: 'This is a new message'
                })
        
                users.forEach(user => {
                    db
                    .collection('users')
                    .doc(user)
                    .update({
                        chatrooms: firebase.firestore.FieldValue.arrayUnion(res.key)
                    })
                })
                
                return res
            })
        })
        
    },

    getChatRoom: async function(id){
        return firebase
        .database()
        .ref('/chatrooms/' + id)
        .once('value')
        .then(snapshot => {
            return snapshot
        })
    },

    sendMessage: async function(chatroom, content){
        firebase
        .database()
        .ref('/chatrooms/' + chatroom)
        .update({
            messages: content
        })
    }
}

export default DataManager  