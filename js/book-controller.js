'use strict'



function onInit() {

    renderTable();

}

function readAndUpdateBook(bookId) {
    var bookPrice = +prompt('Enter new price!');

    if (bookPrice !== 0) {
        updateBook(bookId, bookPrice);
        renderTable();
    }

}


function readAndAddNewBook() {
    var bookName = prompt('Enter book name!');
    var price = +prompt('Enter the price');
    var imgUrl = prompt('Enter image url');
    addBook(bookName, price, imgUrl);
    renderTable();

}



function onDeleteBook(bookId) {
    var isSure = confirm('Are you sure?')
    if (!isSure) return;

    deleteBook(bookId);
    renderTable();
}


function renderTable() {

    var strHtml = '';
    var headerTbHtml = '';
    headerTbHtml = `<tr> <th>Id</th>  <th class='cursor' onclick="onSetFilter('Name')" >Title</th> <th class='cursor' onclick="onSetFilter('Price')"">Price</th> <th>Image</th>  <th colspan='3'>Actions</th> </tr>`;
    strHtml += '<tr>';

    gBook.forEach(function (book) {
        strHtml += `<td> ${book.id} </td>`;
        strHtml += `<td> ${book.name} </td>`;
        strHtml += `<td> ${book.price} </td>`;
        strHtml += `<td> <img src="${book.imgUrl}" width="40"> </td>`;
        strHtml += `<td> <button class='btn read-btn' onclick="onReadBook(${book.id})"> Read</button> </td>`;
        strHtml += `<td> <button class='btn update-btn' onclick="readAndUpdateBook(${book.id})"> Update</button> </td>`;
        strHtml += `<td> <button class='btn delete-btn' onclick="onDeleteBook(${book.id})"> Delete</button> </td>`;
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



}