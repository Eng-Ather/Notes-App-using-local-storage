var email = document.getElementById("email"); //getting email from index.html page
var password = document.getElementById("password"); //getting pasword from index.html page
var todo = document.getElementById("todo");
var login_box = document.getElementById("login_box");
var title = document.getElementById("title");

function sumbit() {
  //calling function from index.html onclick of submit button
  if (!email.value || !password.value) return alert("enter email and pasword");
  else {
    localStorage.setItem("eml", email.value);
  } //storing email in local storage
  checkuserlogin(); // checking either user is login or not
  displaytodolist();
}

function checkuserlogin() {
  var check_login = localStorage.getItem("eml");
  if (check_login) {
    todo.style.display = "block";
    title.innerText = "User : " + check_login;//display title on top
    login_box.style.display = "none";
  } //setting todo page link in login conditio
  else {
    todo.style.display = "none";
    login_box.style.display = "block";
  }

  email.value = "";
  password.value = "";

  // if(check_login){location.href="todoPage.html";} //setting todo page link in login conditio
  //  else{ location.href="index.html" }//setting main page link in logout conditio
}

checkuserlogin(); // checking either user is login or not

function logout() {
  localStorage.removeItem("eml");
  checkuserlogin();
  title.innerText = " Simple Notes App Using Local Storage " //display title on top

}

function add_todo() {
  var tod_text = document.getElementById("tod_text");

  if (tod_text.value) {
    var check_login = localStorage.getItem("eml");
    var object = { id: check_login, work: tod_text.value };

    var arr = localStorage.getItem("arr"); //geting arry from local storage

    //**************( if array is not epmty this part execute )*********************
    if (arr) {
      arr = JSON.parse(arr); //converting back value in array form
      arr.push(object); // pushing the created object in array
      localStorage.setItem("arr", JSON.stringify(arr));
      tod_text.value = "";
    }

    //*************( if array is epmty this part execute )****************************
    else {
      arr = [object];
      console.log(arr);
      localStorage.setItem("arr", JSON.stringify(arr));
      tod_text.value = "";
    }
  } else {
    alert("field is empty");
  }
  displaytodolist(); //display todo list item
}

function displaytodolist() {
  var todo_display_list = document.getElementById("todo_display_list");
  var arr = localStorage.getItem("arr"); //geting arry from local storage
  var check_login = localStorage.getItem("eml");

  todo_display_list.innerHTML = ""; // removing the perivous data to display current user dat

  if (arr) {
    arr = JSON.parse(arr);
    arr.forEach(function (data, index) {

      //***************( display all data b/c admin is login)*****************
      if (check_login == "admin@gmail.com") { 
        var li = `<li> ${data.work} ---- ${data.id} </li>`;
         todo_display_list.innerHTML += li; } 

      //***************(display current user data only)************************
      if (check_login === data.id && check_login != "admin@gmail.com" ) {     
        var li = `<li>  ${data.work} </li>`;
        todo_display_list.innerHTML += li; } 
    });
  }
  else { todo_display_list.innerHTML = "<h1> Todo is empty </h1>";  }
}
displaytodolist();
