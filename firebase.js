import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, Timestamp, setDoc, addDoc, } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);



// check the authentication of user
onAuthStateChanged(auth, (user) => {
  if (user) {
    const email = user.email


    const titleInput = document.getElementById('title');
    const nameInput = document.getElementById('name');
    const contentInput = document.getElementById('content');
    var imageInput = document.getElementById('image-input');
    var documentInput = document.getElementById("document-input");

    const saved = document.getElementById("save-button");



    // document.getElementById("save-button") 
    saved.addEventListener("click", function () {
      const title = titleInput.value;
      const name = nameInput.value;
      const content = contentInput.value;
      const email = user.email;
      const userId = user.uid;
      const postImage = imageInput.files[0];
      var document = documentInput.files[0];


      // create a reference to the Firestore collection
      const postsCollection = collection(db, "posts");

      // create a new document in the collection
      addDoc(postsCollection, {
        name: name,
        title: title,
        email: email,
        content: content,
        userId: userId,
        postedAt: Timestamp.fromDate(new Date())
      }).then((newPostRef) => {
        // update the document with additional data
        if (postImage) {
          const storageRef = ref(storage, `postImage/${userId}/${newPostRef.id}`);
          uploadBytes(storageRef, postImage).then(() => {
            getDownloadURL(storageRef).then((downloadURL) => {
              setDoc(newPostRef, {
                name: name,
                title: title,
                email: email,
                content: content,
                userId: userId,
                postedAt: Timestamp.fromDate(new Date()),
                postImageUrl: downloadURL
              }, { merge: true }).then(() => {


                window.location = "/";
                // redirect to home page after a delay
                setTimeout(() => {
                  window.location = "/";
                }, 2000);
              }).catch((error) => {
                console.error("Error updating document: ", error);
              });
            }).catch((error) => {
              console.error("Error getting download URL: ", error);
            });
          }).catch((error) => {
            console.error("Error uploading image: ", error);
          });
        }

        if (document) {
          const storageRef = ref(storage, `postDocuments/${userId}/${newPostRef.id}`);
          uploadBytes(storageRef, document).then(() => {
            getDownloadURL(storageRef).then((documentURL) => {
              setDoc(newPostRef, {
                name: name,
                title: title,
                email: email,
                content: content,
                userId: userId,
                postedAt: Timestamp.fromDate(new Date()),
                documentUrl: documentURL
              }, { merge: true }).catch((error) => {
                console.error("Error updating document: ", error);
              });
            }).catch((error) => {
              console.error("Error getting download URL: ", error);
            });
          }).catch((error) => {
            console.error("Error uploading document: ", error);
          });
        }
      }).catch((error) => {
        console.error("Error adding document: ", error);
      });


      saved.innerText = 'Saved'
      saved.style.backgroundColor = 'red'








    });




  } else {
    window.location = "/sign-in";
  }
});