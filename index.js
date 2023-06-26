// console.log("connected");

var input = document.getElementById('text-box-task');
const listHead = document.getElementById('list-head');
var listItem = document.getElementsByClassName('list-item');
var listText = document.getElementsByClassName('list-text');

input.addEventListener("keypress", function(event){
    if(event.key==="Enter"){
        var val=input.value.trim(); 
        if(val=="" || val.match(' ')){
            alert("You must enter some value");
        }else{
            event.preventDefault();
            let temp = document.createElement('li');
            temp.setAttribute('class','list-item')

            let newSpan = document.createElement('span');
            newSpan.setAttribute('class','list-text');
            temp.appendChild(newSpan);
            
            let newText = val;
            newSpan.appendChild(document.createTextNode(newText));

            let span2 = document.createElement('span');
            span2.setAttribute('class','list-icons');

            let icon1 = document.createElement('i');
            icon1.setAttribute('class','emptySquare fa-sharp fa-regular fa-square');
            icon1.setAttribute('onclick','taskDone(event)');

            let icon2 = document.createElement('i');
            icon2.setAttribute('class','pen fa-sharp fa-solid fa-pencil');
            icon2.setAttribute('onclick','editText(event)');

            let icon3 = document.createElement('i');
            icon3.setAttribute('class','crossIcon fa-regular fa-x');
            icon3.setAttribute('onclick','removeTask(event)');

            span2.appendChild(icon1);
            span2.appendChild(icon2);
            span2.appendChild(icon3);

            temp.appendChild(span2);
            
            listHead.appendChild(temp);            
        }

        input.value="";
        saveData();
    }
});

function taskDone(event){
    let addBox = document.createElement('i');
    addBox.setAttribute('class','checkedSquare fa-regular fa-square-check');
    addBox.setAttribute('onclick','taskUndone(event)');

    let parentEle = document.getElementsByClassName('list-icons');
    let textLineThru = document.getElementsByClassName('list-text');

    for(var i=0;i<parentEle.length;i++){
        let firstChild = parentEle[i].firstChild;
        if(firstChild==event.target){
            parentEle[i].insertBefore(addBox,firstChild);
            textLineThru[i].style.textDecoration = "line-through";
            break;
        }
    }
    

    event.target.remove();
    saveData();
}

function taskUndone(event){
    let addBox = document.createElement('i');
    addBox.setAttribute('class','emptySquare fa-sharp fa-regular fa-square');
    addBox.setAttribute('onclick','taskDone(event)');


    let parentEle = document.getElementsByClassName('list-icons');
    let textLineThru = document.getElementsByClassName('list-text')

    for(var i=0;i<parentEle.length;i++){
        let firstChild = parentEle[i].firstChild;
        if(firstChild==event.target){
            parentEle[i].insertBefore(addBox,firstChild);
            textLineThru[i].style.textDecoration = "none";
            break;
        }
    }
    
    event.target.remove();
    saveData();
}

function editText(event){
    var editInput = window.prompt();
    let iconPen = document.getElementsByClassName('pen');
    for(var i=0;i<iconPen.length;i++){
        if(event.target == iconPen[i]){
            listText[i].innerHTML = editInput;
        }
    }
    saveData();
}

function removeTask(event){
    let child = event.target;
    child.parentElement.parentElement.remove();
    saveData();
}

function saveData(){
    localStorage.setItem("testdata",listHead.innerHTML);
}

function showTask(){
    listHead.innerHTML = localStorage.getItem("testdata");
}
showTask();



/* TO DO
edit pencil option from input box
*/