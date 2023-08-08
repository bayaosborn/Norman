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

const section = document.getElementById('section')
//const message = document.getElementById('message')
//const date = document.getElementById('date')

section.innerHTML = "";


db.collection("blackoutInfo").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data().email);

        const heading = doc.data().heading;
        const message = doc.data().message;
        const date = doc.data().date;

        // Create a new paragraph element for each email and append it to the container
        const headings = document.createElement("h3");
        const messages = document.createElement("p");
        const dates = document.createElement("span")

        headings.textContent = heading;
        messages.textContent = message
        dates.textContent= `Expected date ${date}`

        section.appendChild(headings);
        section.appendChild(messages);
        section.appendChild(dates);




    });
});


const deleteButton = document.getElementById('delete')

db.collection("cities").delete().then(() => {
    console.log("Document successfully deleted!");
}).catch((error) => {
    console.error("Error removing document: ", error);
});