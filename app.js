function book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}
//display constructor
function Display() {

}

Display.prototype.validate = function (book) {
    if (book.name.length >= 3 && book.author.length >= 3) {
        return true;
    }
    else {
        return false;
    }
}

Display.prototype.clear = function () {
    let forml = document.getElementById("libform");
    forml.reset();
}
Display.prototype.show = function () {
    let success = document.getElementById("message");
    success.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
    <strong>SUCCESS!</strong> Your book is added successfully!!!
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
    setTimeout(function () {
        success.innerHTML = "";
    }, 3000);

}
Display.prototype.error = function () {
    let error = document.getElementById("message");
    error.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>FAILED!!!</strong> Blank record cannot be added please enter valid record.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
    setTimeout(function () {
        error.innerHTML = "";
    }, 3000);
}
//add methods to display boooks
let showall=function(){
    let tablebody = document.getElementById("tablebody");
    let books=localStorage.getItem("books");
    if(books==null){
        bookobj1=[];
        
    }
    else{
        bookobj1=JSON.parse(books);
        
    }
          let html="";
            Array.from(bookobj1).forEach(function(element,i){
            html += ` <tr>
            <td>${element.name}</td>
            <td>${element.author}</td>
            <td>${element.type}</td>
            <td><button type="button" class="btn btn-primary" onclick="delbook(${i})">Delete</button></td>
          </tr>
              `;
            })
        if(bookobj1.length!=0){
            tablebody.innerHTML=html;
        }    
        else{
        tablebody.innerHTML=`<h1>NO RECORDS FOUND</h1>`;
    }
}
showall();
let forml = document.getElementById("libform");
forml.addEventListener("submit", librarysubmit);
function librarysubmit(e) {
    e.preventDefault();
    let name = document.getElementById("bookname").value;
    let author = document.getElementById("author").value;
    let fiction = document.getElementById("fiction");
    let coding = document.getElementById("coding");
    let cooking = document.getElementById("cooking");
    let type;
    if (fiction.checked) {
        type = fiction.value;
    }
    else if (coding.checked) {
        type = coding.value;
    }
    else {
        type = cooking.value;
    }
    let booklib = new book(name, author, type);
    console.log(booklib);
    let display = new Display();
    display.validate(booklib);
    
    if (display.validate(booklib)) {
        let books=localStorage.getItem("books");
    if(books==null){
        bookobj=[];
    }
    else{
    bookobj=JSON.parse(books);
    }
    bookobj.push(booklib);
    localStorage.setItem("books",JSON.stringify(bookobj));
        showall();
        display.show();
        display.clear();
    }
    else {
        display.error();
    }
}
function delbook(index){
    let books=localStorage.getItem("books");
    if(books==null){
        bookobj=[];
    }
    else{
        bookobj=JSON.parse(books);
    }
    bookobj.splice(index,1);
    localStorage.setItem("books",JSON.stringify(bookobj));
    showall();

}