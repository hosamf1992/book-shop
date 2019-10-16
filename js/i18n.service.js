'use strict'



var gTrans = {
    'main-title': {
        en: 'Welcome to my bookshop',

        he: 'ברוכים הבאים לחנות ספרים שלי'
    },
    'filter-msg': {
        en: '  Click the Title or Price to sort',

        he: 'סנן את הטבלה לפי כותרת או מחיר '
    },

    'add-btn': {
        en: 'Add new book',

        he: 'הוסף ספר חדש',
    }, 'table-id': {
        en: 'Id',

        he: ' מספר',
    },

    'table-title': {
        en: 'Title',
        he: 'שם ספר',
    },

    'table-price': {
        en: 'Price',

        he: 'מחיר',
    },
    'table-img': {
        en: 'Image',

        he: 'תמונה',
    },
    'table-actions': {
        en: 'Actions',

        he: 'פעולות',
    },
    'read-btn': {
        en: 'Read',
        he: 'פתח',
    }, 'update-btn': {
        en: 'Update',

        he: 'עדכן',
    }, 'delete-btn': {
        en: 'Delete',

        he: 'מחק',
    },
    'modal-title': {
        en: 'Title',
        he: 'שם ספר'
    },
    'modal-price': {
        en: 'Price',
        he: ' מחיר'
    },
    'modal-rate': {
        en: 'Rate',
        he: ' דירוג'
    },
    'modal-change': {
        en: 'Change-rate',
        he: ' ערוך דירוג'
    },
    'modal-btn': {
        en: 'Submit',
        he: ' ערוך '
    },
    'modal-btn': {
        en: 'Submit',
        he: ' ערוך '
    },
    sure: {
        en: 'Are you sure?',
        he: 'האם אתה בטוח?',
    },

    newPrice: {
        en: 'Enter new price!',
        he: 'הזן מחיר חדש!',
    },
    newBook: {
        en: 'Enter book name!',
        he: 'הזן שם ספר!',
    },
    price: {
        en: 'Enter the price!',
        he: 'הזן מחיר!',
    },
    url: {
        en: 'Enter image url',
        he: 'הזן קישור לתמונה'
    }



}

var gCurrLang = 'en';


function doTrans() {
    var els = document.querySelectorAll('[data-trans]');

    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        var transKey = el.dataset.trans;

        var txt = getTrans(transKey);
        el.innerText = txt;

    }


}

function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';

    var txt = keyTrans[gCurrLang];

    // If not found - use english
    if (!txt) txt = keyTrans['en'];

    return txt;
}

function setLang(lang) {
    gCurrLang = lang;
}

function formatCurrency(num) {
    var currency = '';
    if (gCurrLang === "en") {
        currency = 'USD';
    } else {
        currency = 'ILS'
        num *= 3.5;
    }

    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: currency }).format(num);


}