// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import {
  getDatabase,
  push,
  ref,
  set,
  onValue,
  remove,
  update,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBK2iD_k0E8kOW7Y2Ni5MXMxAArLwW8RdY",
  authDomain: "javascript-shapechanger.firebaseapp.com",
  databaseURL: "https://javascript-shapechanger-default-rtdb.firebaseio.com",
  projectId: "javascript-shapechanger",
  storageBucket: "javascript-shapechanger.appspot.com",
  messagingSenderId: "40866583843",
  appId: "1:40866583843:web:19e30caeb34cb3f1a2e896",
  measurementId: "G-ZKTBZN4CTS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();

var input = document.getElementById("input");
var list = document.getElementById("list");
// var tasks = [];

window.addTask = function () {
  var value = input.value;

  var obj = {
    todo: value,
  };

  var dataRef = push(ref(database, "todos/"));
  obj.id = dataRef.key;

  set(dataRef, obj);

  input.value = "";
};

function getTodos() {
  var dataRef = ref(database, "todos/");

  onValue(dataRef, function (data) {
    var dataObj = data.val();
    var dataList = Object.values(dataObj || {});
    render(dataList);
  });
}
getTodos();

window.edit = function (value) {
  var val = prompt("Enter updated value");
  var editTodo = {
    todo: val,
    id: value,
  };

  var dataRef = ref(database, `todos/${value}`);
  update(dataRef, editTodo);
};

window.del = function (key) {
  remove(ref(database, `todos/${key}`));
};

function render(dataArr) {
  list.innerHTML = "";
  for (var i = 0; i < dataArr.length; i++) {
    list.innerHTML += `<li>${dataArr[i].todo}<button onclick="edit('${dataArr[i].id}')" class="editbtn">Edit</button><button onclick="del('${dataArr[i].id}')" class="deletebtn">Delete</button></li>`;
  }
}

// var input = document.getElementById("input");
// var list = document.getElementById("list");

// one short way

// window.addTask = function () {
//   var value = input.value;

//   var obj = {
//     todo: value,
//   };

//   var userRef = push(ref(database, "todo"));
//   obj.id = userRef.key;
//   set(userRef, obj);
//   console.log(obj);
// };

// one a little longer way

// window.addTask = function () {
//   var value = input.value;

//   var idRef = ref(database, "todos/");
//   var id = push(idRef).key;

//   console.log(id);
//   var obj = {
//     todo: value,
//     id: id,
//   };

//   var dataRef = ref(database, `todos/${id}/`);
//   set(dataRef, obj);
// };

// To get the Data from the database below code

// function getTodos() {
//   var dataRef = ref(database, `todos/`);

//   //onvalue is a firebase function which is used to get the data from the database.

//   //onValue first parameter leta h woh reference ka variable jo apne data mangwane ka diya wa ho.

//   //onValue second parameter ek anon function hota h jismein first parameter diye gye variable sara data anon function mein jata h jo phr anon function ke parameter mein han get lete han.

//   onValue(dataRef, function (data) {
//     var dataObj = data.val(); // .val() is a firebase function to get the data values
//     var dataList = Object.values(dataObj);
//     renderList(dataList);
//   });
// }
// getTodos();

// function renderList(dataArr) {
//   list.innerHTML = "";
//   for(var i = 0; i < dataArr.length; i++){
//     list.innerHTML += `<li>${dataArr[i].todo}</li>`
//   }
// };
