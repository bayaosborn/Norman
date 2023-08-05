// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBM_3brfuZeGxa2ESW7peV1L5arpErRcP0",
    authDomain: "norman-b1fa4.firebaseapp.com",
    projectId: "norman-b1fa4",
    storageBucket: "norman-b1fa4.appspot.com",
    messagingSenderId: "554557044751",
    appId: "1:554557044751:web:2e4acb2576eee924974b7a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();


//Add document to frontend. 
const heading = document.getElementById('heading')
const message = document.getElementById('message')
const date = document.getElementById('date')
const submit = document.getElementById('submit')





submit.addEventListener('click', function () {

    const messageVal = message.value
    const headingVal = heading.value
    const dateVal = date.value
    const success = document.getElementById('success')


    // Add a new document in collection "cities"
    db.collection("blackoutInfo").add({
        message: messageVal,
        heading: headingVal,
        date: dateVal
    })
        .then(() => {

                success.style.display = 'block'
            
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });


})






