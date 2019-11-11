

const listItems = Array.from(document.querySelectorAll('.list-item'));
var bookDisplayHeader = document.querySelector('.book-display-header-text');
const bookDisplay = document.querySelector('.book-display')
const books = Array.from(document.querySelectorAll('.book-col'));
const blurb = document.querySelector('.blurb');
var activeItem;
var prevSelected;

/// when list item is clicked, add class 'active' and change styling
listItems.forEach((el)=>{
    //check to see if any list-item is active; if so, store it in a variable
    if(el.classList.contains('active'))
        activeItem = el;
    //once new list-item is clicked, make it active and make the old activeItem inactive
    el.addEventListener('click', function(){  
        if(!this.classList.contains('active')){
            this.classList.add('active');
            activeItem.classList.remove('active');
        }
        if(el.classList.contains('active')){
            activeItem = el;
            changeDisplayHeader(activeItem);
        }
    })
})

function changeDisplayHeader(target){
    bookDisplayHeader.classList.toggle('widen');
    bookDisplayHeader.innerHTML = target.innerHTML;
}

books.forEach((el)=>{
    var title;
    //listen for a click on any of the book elements
    el.addEventListener('click', function(event){
        // if(prevSelected){
        //     console.log(prevSelected)
        //     prevSelected.classList.remove('selected');
        // }
        //if the click event fires on either the book cover or title, then create the book blurb
        if(event.target === this.children[0]){
            title = event.target.nextElementSibling;
        } else if(event.target === this.children[1]){
            title = event.target;
        }
        this.children[0].classList.toggle('selected');
        showBlurb(title);
        unselect(event.target);
    })
})

//makes the non-selected books more opaque, and stand out less
function unselect(target){
    if(prevSelected !== undefined){
        prevSelected.classList.remove('selected');
    } 
    prevSelected = target.parentNode.firstChild;
    for(var b = 0; b < books.length; b++){
        if(books[b].children[0] !== target && books[b].children[1] !== target){
        // selectedItem.classList.remove('selected');
        books[b].children[0].classList.add('not-selected');
        } 
    }
}

//unhides the blurb-description and populates it with data that we grab from mongodb
function showBlurb(title){
    if(blurb.style.display === 'block'){
        blurb.style.display = 'none';
    } else {
        blurb.style.display = 'block';
    }
    //searches mongodb and fills the blurb with the book information
    populate(title);
    //scrolls down to make the blurb visible
    blurb.scrollIntoView();
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











