

const listItems = Array.from(document.querySelectorAll('.list-item'));
var bookDisplayHeader = document.querySelector('.book-display-header-text');
const bookDisplay = document.querySelector('.book-display')
const books = Array.from(document.querySelectorAll('.book-col'));
var blurb = "<div class='col-12' id='blurb'> \
                <div class='display-4' id='title'></div> \
                <span id='author'>Author</span><img src='https://img.icons8.com/small/6/000000/filled-circle.png'><span id='publish-date'>Date</span><img src='https://img.icons8.com/small/6/000000/filled-circle.png'><span id='publisher'>Publisher</span><img src='https://img.icons8.com/small/6/000000/filled-circle.png'><span id='category'>Category</span> \
                <p id='blurb-description'> </p> \
            </div>";
var activeItem;
var prevSelected;

var url = window.location.href;
var s = 'books/'
var urlPartial = url.split(s).pop();



listItems.filter(item => {
    
    if(urlPartial === url){
        activeItem = document.querySelector('#recent');
        activeItem.classList.add('active');
        changeDisplayHeader(activeItem);
    } else if(item.innerHTML.toLowerCase() == urlPartial){
        activeItem = item;
        item.classList.add('active');
        changeDisplayHeader(activeItem);
    }
})


/// when list item is clicked, add class 'active' and change styling
// listItems.forEach((el)=>{
//     //check to see if any list-item is active; if so, store it in a variable
//     if(el.classList.contains('active'))
//         activeItem = el;
//     //once new list-item is clicked, make it active and make the old activeItem inactive
//     el.addEventListener('click', function(){  
//         if(!this.classList.contains('active')){
//             this.classList.add('active');
//             activeItem.classList.remove('active');
//         }
//         if(el.classList.contains('active')){
//             activeItem = el;
//             changeDisplayHeader(activeItem);
//         }
//         // changeBooks(el.innerHTML.toLowerCase());
//     })
// })

function changeDisplayHeader(target){
    bookDisplayHeader.classList.remove('widen');
    bookDisplayHeader.classList.add('widen');
    bookDisplayHeader.innerHTML = target.innerHTML;
}

books.forEach( book =>{
    //listen for a click on any of the book elements
    book.addEventListener('click', function(e){
        var x;
        book.classList.remove('not-selected');
        book.classList.add('selected');
        e.target.classList.contains('book-col') ? x = e.target : x = e.target.parentNode;
        unselect(x);    
        showBlurb(book.children[1]);
    })
})

//makes the non-selected books more opaque, and stand out less
function unselect(target){
    books.forEach( book => {
        if(book !== target) {
            book.classList.add('not-selected');
            book.classList.remove('selected');
        }
    })
}

//unhides the blurb-description and populates it with data that we grab from mongodb
function showBlurb(title){
    if(document.getElementById('blurb')) bookDisplay.removeChild(document.getElementById('blurb'));
    if(window.innerWidth < 525){
        books.forEach(book => {
            if(book.classList.contains('selected')){
                book.insertAdjacentHTML('afterend', blurb);
            }
        })
    } else {
        bookDisplay.insertAdjacentHTML('beforeend', blurb);
    }
    //searches mongodb and fills the blurb with the book information
    populate(title);
    //scrolls down to make the blurb visible
    document.getElementById('blurb').scrollIntoView();
}

function populate(title){
    //grab data from mongoDB and return it to the client
    fetch('/description/' + title.innerHTML)
    .then(res => {
    //turn that data into a usable/readable object
        return res.json();
    })
    .then(data => {
    //populate the blurb parameters with the returned data
        document.querySelector('#title').innerHTML = data.title;
        document.querySelector('#author').innerHTML = data.author;
        document.querySelector('#publisher').innerHTML = data.publisher;
        document.querySelector('#publish-date').innerHTML =  data.publishDate;
        document.querySelector('#category').innerHTML = data.category;
        document.querySelector('#blurb-description').innerHTML = data.description;
    })
}

// function changeBooks(li){
//     bookDisplay.innerHTML = '';
//     fetch('/books/' + li)
//     .then(res => {
//         return res.json();
//     })
//     .then(data => {
//         data.forEach(book => {
//             bookDisplay.insertAdjacentHTML('afterbegin', 
//                 `<div class='col book-col'> \
//                     <img class='book' src=${book.image}> \
//                     <h4 class='book-title'>${book.title}</h4> \
//                     <p class='book-author'>${book.author}</p> \
//                 </div>`)
//         })
//     })
// }











