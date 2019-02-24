//Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//save Bookmark
function saveBookmark(e){
  
//Get form value
var siteName=document.getElementById('siteName').value;
var siteUrl=document.getElementById('siteUrl').value;

 if(!validateForm(siteName, siteUrl)){
return false;
 }

var bookmark = {
  name: siteName,
  Url:  siteUrl
}

//Test if bookmark is null
if(localStorage.getItem('bookmarks')=== null) {
  //init array
  var bookmarks = [];
   //add to array
 
   bookmarks.push(bookmark);
 
   //set to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    //Get bookmark from local Storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  
    //add Bookmark to array
   bookmarks.push(bookmark);
   
    //re-set back to localsStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  
  //clear form
  document.getElementById('myForm').reset();
  
  fetchBookmarks();

  // prevent form from submitting
e.preventDefault();
}

//DeleteBook bookmark
function deleteBookmark(url){
  //Get Bookmarks from LocalStorage 
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); 
  //Loop through Bookmarks

  for(var i =0; i < bookmarks.lenght;i++){
   if(bookmarks[i].url == url){
     //remove from array
     bookmarks.splice(i, 1);
   }
  }
    //re-set back to localStorage 
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // re-fetch bookmarks
  fetchBookmarks();
}

//fetch bookmark

function fetchBookmarks(){
 
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); 

  // Get output id

  var bookmarksResults = document.getElementById('bookmarksResults');

  //build outpout
  bookmarksResults.innerHTML = '';
 
  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;
  
    bookmarksResults.innerHTML += '<div class="well">'+
                                  '<h3>'+name+
                                  '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                  '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                  '</h3>'+
                                  '</div>';

    
  }

}
// validate form
function validateForm(siteName, siteURl){
  if(!siteName || !siteUrl){
    alert('Please fill in the form');
    return false;
  }
 
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);
 
   if(!siteUrl.match(regex)){
 alert('Please use a Valid URl');
 return false;
   }
return true;
  }