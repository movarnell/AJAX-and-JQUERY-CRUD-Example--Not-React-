// REVIEW : Below features how to use JQUERY and AJAX to make a call to the server and get the data back using the GET method as well as other CRUD operations.
// Define the URL endpoint for the API
const URL_ENDPOINT = 'http://localhost:3000/users';

// Function to get posts from the API
function getPosts() {
    // Use jQuery's get method to send a GET request to the API
    $.get(URL_ENDPOINT, (posts) => {
        // Log the posts to the console
        console.log(posts);
        // Call the showPosts function to display the posts
        showPosts(posts);
    });
}

// Function to display posts in a table
function showPosts(posts){
    // Use the map method to iterate over each post
    posts.map((post) => {
      // Get the table element
      let table = document.getElementById('showData');
      // Insert a new row in the table
      let row = table.insertRow();
      // Insert new cells in the row
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
      // Set the innerHTML of the cells to the post's name and email
      cell1.innerHTML = post.name;
      cell2.innerHTML = post.email;
      let button = document.createElement('button');
        button.innerHTML = 'Delete';
        button.className = 'btn btn-danger';
        button.onclick = function(){
            deletePost(post.id);
        }
        cell3.appendChild(button);
    });
}

// Add an event listener to the submit button
document.getElementById('submit').addEventListener('click', (e) => {    
    // Prevent the form from submitting normally
    e.preventDefault();
    // Get the name and email from the input fields
    let name = document.getElementById('fullName').value;
    let email = document.getElementById('email').value;
    // Create a new post object
    let post = {
        "name": name,
        "email": email,
    };
    // Call the addPost function to send the post to the API
    addPost(post);
});

// Function to add a post to the API
function addPost(){
    // Get the name and email from the input fields
    let name = document.getElementById('fullName').value;
    let email = document.getElementById('email').value;
    // Create a new post object
    let post = {
        "name": name, 
        "email": email
    };
    // Use jQuery's post method to send a POST request to the API
    $.post(URL_ENDPOINT, post, (data) => {
        // Log the response data to the console
        console.log(data);
        // Call the getPosts function to refresh the posts
        getPosts();
        // Clear the name and email fields
        name = '';
        email = '';
    });
}

function deletePost(id){
    $.ajax({
        url: URL_ENDPOINT + '/' + id,
        type: 'DELETE',
        success: function(result) {
            console.log(result);
            getPosts();
        }
    });
}

// Call the getPosts function when the script loads
getPosts();

