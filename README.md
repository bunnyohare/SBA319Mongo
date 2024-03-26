Copied over previous RESTful API and have added MongoDB connection. 


fFree content info: 
Text: Lipsum, a Lorem Ipsum text generator. https://www.lipsum.com/
JSON Data: {JSON} Placeholder, Free fake and reliable API for testing and prototyping. https://jsonplaceholder.typicode.com/
Color palette: https://coolors.co/palette/cad2c5-84a98c-52796f-354f52-2f3e46


On my mac when I open index in live server:

http://localhost:5500/index.html


A post can be displayed to the user if the user inputs a postId number in the dropdown. 


http://localhost:5005/api/user/ 

Testing of .post for a new user can be done using a body in this format:

{"name": "Morris",
"username": "TheCatMorris",
"email": "cat@feline.com"}


http://localhost:5005/api/post/

Testing of .post for a new post can be done using a body in this format:

{"userId": "3",
"title": "Bowties are cool!",
"content": "It's bigger on the inside."}

http://localhost:5005/api/comment/

Testing of .post for a new comment can be done using a body in this format:

{"postId": "3",
"name": "BuffyBot was so creepy.",
"email": "dawn@sunnydale.com",
"body": "That'll put marzipan in your pie plate, bingo! Really? "}

Testing of filtering posts by user can be done via:

http://localhost:5005/api/post/user/ID_OF_USER


Known defects:

The code doesn't test to see if a user exists before they leave a comment, nor does it test to see if a post exists before it creates a comment with a given postId.

As per class discussion, our cohort were not required to accomplish either of the following steps:

"Create PATCH or PUT routes for data, as appropriate. At least one data category should allow for client manipulation via a PATCH or PUT request."

"Create and render at least one view using a view template and template engine. This can be a custom template engine or a third-party engine.
If you are stuck on how to approach this, think about ways you could render the current state of your API's data for easy viewing."