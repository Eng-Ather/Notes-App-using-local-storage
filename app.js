var email = document.getElementById("email"); //getting email from index.html page
var password = document.getElementById("password"); //getting pasword from index.html page
var todo = document.getElementById("todo");
var login_box = document.getElementById("login_box");
var title = document.getElementById("title");

checkuserlogin(); //jub first time website search hoge yea page refresh kia jay ga to yea check kry ga or jis ke id login hoeve hoge us ke detail display krda ga



//**********************( user loginfunctin )*************************************/

function sumbit() {  //agar koe bhe pehly sa login nahe hoga to submit button pa yea function chaly ga
  
  if (!email.value || !password.value){ return alert("enter email and pasword");}
  else {
    localStorage.setItem("eml", email.value);// jub koe login hoga to yea us ke email ko localac storage ma save krva da ga
  } 
  checkuserlogin(); // jub user login ho jay ga to yea login form ko huta da ga or todo wala page show kr da ga
  displaytodolist(); //jub user login ho or pehly sa todo list ma koe data save ha to display ho jay ga
}



//**********************( user login check functin )*************************************/

//yea function check kry ga koe user login ha yea nahe agar koe login hoga to yea us ka todo wala div display kr da ga or login form huta da
function checkuserlogin() {
  var login_user = localStorage.getItem("eml");
  if (login_user) {
    todo.style.display = "block";
    title.innerText = "User : " + login_user;//display title on top
    login_box.style.display = "none";
    email.value = "";
    password.value = "";
  } 
  else {
    todo.style.display = "none";
    login_box.style.display = "block";
  }
  // if(login_user){location.href="todoPage.html";} //setting todo page link in login conditio
  //  else{ location.href="index.html" }//setting main page link in logout conditio
}

//************************( logout function )***************************************/

//logout ka function local stogae sa user ke email delete kr da ga or phr check user ka function call kry ga
//check waly funtion ko user ke mail nahe mily ge qk wo delete ho chuki ha to check user wala funtion
// login wala div display kr day or todo wala div huta da ga
// logout k function sa sirf user ke email delete hoge use k object(todo items) ab bhe local storage ma save rhy gy

function logout() {
  localStorage.removeItem("eml");
  checkuserlogin();
  title.innerText = " Simple Notes App Using Local Storage " //display title on top
}



//**********************( add_todo functin )*************************************/

// yeha function pehly user_id or todo k text sa object bnay ga phr object array bnay ga 
// or phr us array ko local storage ma save kr da ga

function add_todo() {
  var tod_text = document.getElementById("tod_text");

  if (tod_text.value) {
    var login_user = localStorage.getItem("eml"); 
    var object = { id: login_user, work: tod_text.value };

    var local_storage_array = localStorage.getItem("local_storage_array"); //geting arry from local storage

    //**************( if array is not epmty this part execute )*********************
    if (local_storage_array) {
      object_wala_array = JSON.parse(local_storage_array); //converting back value in array form
      object_wala_array .push(object); // pushing the created object in array
      localStorage.setItem("local_storage_array", JSON.stringify(object_wala_array ));
      tod_text.value = "";
    }

    //*************( if array is epmty this part execute )****************************
    else {
      object_wala_array  = [object];
      console.log(object_wala_array );
      localStorage.setItem("local_storage_array", JSON.stringify(object_wala_array ));
      tod_text.value = "";
    }
  } else {
    alert("field is empty");
  }
  displaytodolist(); //jub user todo bna la ga tub yea unko list ma display kry ga
}

function displaytodolist() {
  var todo_display_list = document.getElementById("todo_display_list");
  var arr = localStorage.getItem("local_storage_array"); //geting arry from local storage
  var login_user = localStorage.getItem("eml");

  todo_display_list.innerHTML = ""; // removing the perivous data to display current user dat

  if (arr) {
    arr = JSON.parse(arr);
    arr.forEach(function (data, index) {

      //***************( display all data b/c admin is login)*****************
      if (login_user == "admin@gmail.com") { 

        if (data.id == "admin@gmail.com") { 
          var li = `<li class="admincolor">  ${data.work} ---- ${data.id} 
          <span> <button onclick = "del(${index})"> Delete </button> </span> </li>`;
         todo_display_list.innerHTML += li;
        //  todo_display_list.style.backgroundColor = "red"
        } 
         else{
           var li = `<li> ${data.work} ---- ${data.id} </li>`;
           todo_display_list.innerHTML += li; } 
      }
      //***************(display current user data only)************************
      if (login_user === data.id && login_user != "admin@gmail.com" ) {     
        var li = `<li>  ${data.work} 
       <span> <button onclick = "del(${index})"> Delete </button> </span>   </li> `;
        todo_display_list.innerHTML += li; } 
    });
  }
  else { todo_display_list.innerHTML = "<h1> Todo is empty </h1>";  }
}


//*******************************( Delete Function )*********************************

/*yea (object delete krny ka function) function delte k button press krny pa call hoga 
yea button apny sath us specific object ka index:no as an arrgument la k ay ga jo
is function ka parameter ban jay ga next step yea function local storage sa array
get kry ga or local storage sa isko delete kr day ga ab array uthany k bad us per 
JSON.parse() ka method chla kr is ko orignial form(array form) ma convert kry ga phr is
array ma sa us specific index:no waly object ko delet kr day ga us or is updated array ko 
JSON.stringify() lga kr local storage ma update kr day ga od display wala function call krva 
kr todo ke updated lis show kr day ga*/

function del(objectIndexNo) {
  var arrayFromstorage = localStorage.getItem("local_storage_array"); //geting arry from local storage
  var  array_from_storage_parse= JSON.parse(arrayFromstorage)
  console.log(objectIndexNo);
console.log(array_from_storage_parse);

 array_from_storage_parse.splice(objectIndexNo,1,)
console.log(array_from_storage_parse);

localStorage.removeItem("local_storage_array")
localStorage.setItem("local_storage_array",JSON.stringify(array_from_storage_parse))

displaytodolist(); // yea updated array(todo list display kry ga) 
}


displaytodolist();
