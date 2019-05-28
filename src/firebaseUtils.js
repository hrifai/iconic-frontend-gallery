const firebase = require('firebase');

var app = firebase.initializeApp({
  apiKey: "AIzaSyBjjYsUpmUhzR3n_5w6kxhmocYUF3iCAWg",
  authDomain: "isdm-89bdb.firebaseapp.com",
  databaseURL: "https://isdm-89bdb.firebaseio.com",
  projectId: "isdm-89bdb",
  storageBucket: "isdm-89bdb.appspot.com",
  messagingSenderId: "782049199168",
  appId: "1:782049199168:web:8b7fa869b022b79f"
});

var SG = {};

SG.db = app.database();

SG.newMenuItem = (name,price,descr,src) => {
  var item = {
    name: name,
    price: price,
    desc: descr,
    src: src
  };
  SG.db.ref('Menu').push(item)
};

SG.newBooking = (name,time,ppl,notes) => {
  var booking = {
    name: name,
    time: time,
    ppl: ppl,
    notes: notes
  };
  SG.db.ref('Bookings').push(booking)
};

SG.newOrder = (tableNum,foods,paid,active) =>{
  var order = {
    tableNum: tableNum,
    time: new Date().toTimeString(),
    foods: foods,
    paid: paid,
    active:active
  };
  SG.db.ref('Orders').push(order)
};

SG.newCustomer = (name) => {
  var customer = {
    name:name
  };
  SG.db.ref('Orders').push(customer)
};

SG.newStaff = () =>{

};

export default SG;
