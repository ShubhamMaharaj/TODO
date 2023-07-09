function loginfuncCall(){

    var value1 = document.getElementById('input1').value;
    var value2 = document.getElementById('input2').value;
  fetch('https://todo-api.aavaz.biz/login', {
  method: 'POST',  
  headers: {
    "Content-Type": "application/json ",
    "Accept": "*/*"
  },
  body: JSON.stringify({ 
    email: value1,
    password: value2
  })
}) .then(response => {

    if (response.headers.has('Authorization')) {
      alert("Login Sucesssfully");
      var bearerToken = response.headers.get('Authorization');
      localStorage.setItem('token', bearerToken);
      window.open('main.html', '_self');
     
      console.log(localStorage.token)
    } else {
      console.log('Bearer Token not found in response header');
    }

   
    
  })
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error('Error:', error);
  });
  var username = document.getElementById('input1')
  username.value='';
  var password = document.getElementById('input2')
  password.value='';
   

}
function CreateTodo(){
  var Title = document.getElementById('title').value;
  var desc = document.getElementById('desc').value;
  var receivedData = localStorage.getItem('token');
 console.log("receevw",receivedData);
  fetch('http://todo-api.aavaz.biz/todos', {
  method: 'POST',  
  headers: {
    "Content-Type": "application/json ",
    "Accept": "*/*",
    "Authorization": receivedData
  },
  body: JSON.stringify({ 
    description: desc,
    done: true,
    labelColour:'BLUE',
    title:Title
  })
}) .then(response => {
console.log(response)
GetTodoFunc(receivedData);

   
    
  })
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error('Error:', error);
  });

 

}
function ItemfuncCall(todoId){
  console.log(todoId)
  localStorage.setItem('todoId',todoId)

  window.open('mainitem.html', '_self');


}
function GetTodoFunc(token){
  var clearTit = document.getElementById('title');
  clearTit.value='';
  var ClearDes = document.getElementById('desc');
  ClearDes.value = '';

  fetch('http://todo-api.aavaz.biz/todos', {
  method: 'GET',  
  headers: {
    "Content-Type": "application/json ",
  
    "Authorization": token
  }}) .then(response => {
    
    response.json().then(function(data) {
      var contentArray =[];
      contentArray = data.content;
      var listContainer = document.getElementById('row1');
      listContainer.innerHTML = '';
  
  contentArray.forEach(function(item) {
    var colDiv = document.createElement('div');
    colDiv.className = 'col-lg-4 col-md-6';

    var ul = document.createElement('ul');

    var listItem = document.createElement('li'); // Create an LI element
    listItem.className = 'listSec'; // Set the class name for the LI element

    var titleElement = document.createElement('h4'); // Create an H4 element
    titleElement.innerHTML = '<b>' + item.title + '</b>'; // Set the title within the H4 element

    var descriptionElement = document.createElement('p'); // Create a P element
    descriptionElement.textContent = item.description; // Set the description within the P element

    var spanElement = document.createElement('span'); // Create a SPAN element
    spanElement.style.position = 'absolute';
    spanElement.style.top = '23px';
    spanElement.style.right = '25px';
    spanElement.innerHTML = '<i style="font-size: 30px;" onclick="ItemfuncCall('+item.todoId+')" class="fa-solid fa-plus"></i><i style="font-size: 30px;margin-left: 1rem;" onclick="deleteTodo('+item.todoId+')" class="fa-solid fa-trash"></i>'; // Set the content within the SPAN element

    listItem.appendChild(titleElement); // Append the H4 element to the LI element
    listItem.appendChild(descriptionElement); // Append the P element to the LI element
    listItem.appendChild(spanElement); // Append the SPAN element to the LI element
    ul.appendChild(listItem);

    colDiv.appendChild(ul);

    listContainer.appendChild(colDiv); 
  });
})




   
    
  })
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error('Error:', error);
  });

}
function deleteTodo(todoId){
  
  var token = localStorage.getItem('token');
  console.log(todoId)

  fetch('http://todo-api.aavaz.biz/todos/'+todoId+'', {
   method: 'DELETE', 
    headers: {
      "Accept": "*/*",
      "Authorization": token
    }}).then(response=>{
      console.log(response)
      CreateTodo();
      
      })

    

}

// ----------- create toto item ------------

function createTodoItem(){

  var TodoId = localStorage.getItem('todoId');
  console.log(TodoId);
  var receivedData = localStorage.getItem('token');

  var ItemText = document.getElementById('ItemText').value;

 console.log("receevw",receivedData);
  fetch('http://todo-api.aavaz.biz/todos/'+TodoId+'/items', {
  method: 'POST',  
  headers: {
    "Content-Type": "application/json ",
    "Accept": "*/*",
    "Authorization": receivedData
  },
  body: JSON.stringify({ 
    itemText:ItemText
  })
}) .then(response => {
console.log(response)
GetTodoItemFunc(receivedData);

   
    
  })
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error('Error:', error);
  });

 

}
function GetTodoItemFunc(token){

  var TodoId = localStorage.getItem('todoId');
  var ItemText = document.getElementById('ItemText');
  ItemText.value='';

  fetch('http://todo-api.aavaz.biz/todos/'+TodoId+'/items', {
    method: 'GET',  
    headers: {
      "Content-Type": "application/json ",
      "Accept": "*/*",
      "Authorization": token
    }}).then(response=>{
      response.json().then(function(data) {
        var itemArr = data.content;
        var ItemContainer = document.getElementById('itemList');
        ItemContainer.innerHTML = '';
        itemArr.forEach((itm,index)=>{
          var listItem = document.createElement('li');
          listItem.className = 'listSec';
       
          listItem.textContent = index+1+  ':-' +  itm.itemText;
          var spanElement = document.createElement('span'); // Create a SPAN element
          spanElement.style.position = 'absolute';
          spanElement.style.top = '10px';
          spanElement.style.right = '10px';
          spanElement.innerHTML = '<i class="fa-solid fa-pen-to-square"  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setItemId('+itm.itemId+')"></i><i style="margin-left:0.5rem"; class="fa-solid fa-trash" onclick="deleteItmFunc('+itm.itemId+')" ></i>'
          listItem.appendChild(spanElement);
          ItemContainer.appendChild(listItem);
          
        })
      })

    })

}

function LogOut(){
 
  var receivedData = localStorage.getItem('token');
  fetch('http://todo-api.aavaz.biz/log-out', {
    method: 'POST',  
    headers: {
      
      "Accept": "*/*",
      "Accept":" application/json",
      "Authorization": receivedData
    }
  }).then(resp=>{
    window.location.href='index.html'
   

  })
  var username = document.getElementById('input1')
  username.value='';
  var password = document.getElementById('input2')
  password.value='';

}


