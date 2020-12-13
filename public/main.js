let quotes = document.getElementsByClassName('quotesBox');

let form = document.forms.form;
let nameInput = form.elements.name;
let quoteInput = form.elements.quote;
let idInput = form.elements.id;
let index = 0 ;

function quoteBoxHandler(quoteNumber) {
    document.getElementById('submit').style.visibility = 'hidden';
    document.getElementById('update').style.visibility = 'visible';
    document.getElementById('delete').style.visibility = 'visible';
    console.log(quotes[quoteNumber].children);
    nameInput.value = quotes[quoteNumber].children[2].innerHTML;
    quoteInput.value = quotes[quoteNumber].children[1].innerHTML;
    idInput.value = quotes[quoteNumber].children[0].innerHTML;
    // console.log(quotes[quoteNumber].children[0].innerHTML);
    index = quoteNumber;
}

function updateHandler(){
    fetch('/quotes', {
        method: 'put',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: nameInput.value,
            quote: quoteInput.value,
            index: index+1
        })
    })
    .then(res => {
        if(res.ok) return res.json()
    })
    .then(response => {
        window.location.reload();
    })
}

function deleteHandler(){
    fetch('/quotes', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: index+1
        })
    })
    .then(res => {
        if(res.ok) return res.json()
    })
    .then(response => {
        window.location.reload();
    })
}