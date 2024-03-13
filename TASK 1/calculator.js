let inputtext = document.getElementById("inputtext");

let HistoryList = [
    
];

function His(){
    let totalHistory = 0;
    let items = localStorage.getItem("inputvalue");
    let parsedItems = JSON.parse(items);
    for(let i of parsedItems){
        totalHistory += i.hist+" ;  ";
    }
    inputtext.value = totalHistory;
}

function display(num){
    inputtext.value += num ;
}

function calculate(){
    valuebeforecal = inputtext.value;
    try{
        inputtext.value = eval(inputtext.value);
    }
    catch(error){
        alert("Invalid type");
    }
    let histval = valuebeforecal+"="+inputtext.value;
    let newHistory = {
        hist: histval
    }
    HistoryList.push(newHistory);
    localStorage.setItem("inputvalue",JSON.stringify(HistoryList));
}

function Clear(){
    inputtext.value = "";
}

function del(){
    inputtext.value = inputtext.value.slice(0,-1);
}