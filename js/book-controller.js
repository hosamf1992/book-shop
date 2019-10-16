'use strict'



function onInit() {

    renderTable();

}

function readAndUpdateBook(bookId) {
    var bookPrice = +prompt(getTrans('newPrice'));

    if (bookPrice !== 0) {
        updateBook(bookId, bookPrice);
        renderTable();
        doTrans();

    }

}


function readAndAddNewBook() {
    var bookName = prompt(getTrans('newBook'));
    var price = +prompt(getTrans('price'));
    var imgUrl = prompt(getTrans('url'));
    addBook(bookName, price, imgUrl);
    renderTable();
    doTrans();


}



function onDeleteBook(bookId) {
    var isSure = confirm(getTrans('sure'))
    if (!isSure) return;

    deleteBook(bookId);
    renderTable();
    doTrans();

}


function renderTable() {

    var strHtml = '';
    var headerTbHtml = '';
    headerTbHtml = `<tr> <th data-trans="table-id">Id</th>   <th data-trans="table-title" class='cursor' onclick="onSetFilter('Name')" >Title</th> <th data-trans="table-price" class='cursor' onclick="onSetFilter('Price')"">Price</th> <th data-trans="table-img">Image</th>  <th data-trans="table-actions" colspan='3'>Actions</th> </tr>`;
    strHtml += '<tr>';

    gBook.forEach(function (book) {
        strHtml += `<td> ${book.id} </td>`;
        strHtml += `<td> ${book.name} </td>`;
        strHtml += `<td> ${book.price} </td>`;
        strHtml += `<td> <img src="${book.imgUrl}" width="40"> </td>`;
        strHtml += `<td> <button data-trans="read-btn" class='btn read-btn' onclick="onReadBook(${book.id})"> Read</button> </td>`;
        strHtml += `<td> <button data-trans="update-btn" class='btn update-btn' onclick="readAndUpdateBook(${book.id})"> Update</button> </td>`;
        strHtml += `<td> <button data-trans="delete-btn" class='btn delete-btn' onclick="onDeleteBook(${book.id})"> Delete</button> </td>`;
        strHtml += '</tr>';

    });

    var elTable = document.querySelector('.table');
    elTable.innerHTML = headerTbHtml;
    elTable.innerHTML += strHtml;
}


function onReadBook(bookId) {
    var book = getBookDetails(bookId);
    openModal(book);
}
function onChangeRate() {
    var elRate = document.querySelector('.rate-input');
    var elBookRate = document.querySelector('.book-rate');
    var rate = elRate.value;
    changeRate(gId, rate);
    elBookRate.innerText = rate;

}

function openModal(book) {
    var elModal = document.querySelector('.modal');
    elModal.classList.remove('hide');
    var elName = document.querySelector('.book-name');
    var elPrice = document.querySelector('.book-price');
    var elRate = document.querySelector('.book-rate');
    var elImg = document.querySelector('.book-img');

    elName.innerText = book.name;
    elPrice.innerText = book.price;
    elRate.innerText = book.rate;
    elImg.src = book.imgUrl;
    gId = book.id;

}

function closeModal() {
    var elModal = document.querySelector('.modal');
    elModal.classList.add('hide');
}

function onSetFilter(filterBy) {

    console.log('Setting Filter', filterBy);
    setFilter(filterBy);
    if (filterBy === 'Price') sortByPrice();
    if (filterBy === 'Name') sortByName();

    renderTable();
    doTrans();


}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') {
        document.body.classList.add('rtl')


    } else {
        document.body.classList.remove('rtl')
    }

    doTrans();

}