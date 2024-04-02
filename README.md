Create a MongoDB Database called SBA319Mongo load the database with the JSON data stored in the three files that are contained in thte data folder. Call these collections Comments, Posts, and Users.

Create a .env file which includes the following:

PORT=5005
MONGO_URI=mongodb+srv://<MONGO_USERNAME>:<MONGO_PASSWORD>@<MongoDB_DATABAS_INFO>

Copied over previous RESTful API and have added MongoDB connection.

Free content info:
Text: Lipsum, a Lorem Ipsum text generator. https://www.lipsum.com/
JSON Data: {JSON} Placeholder, Free fake and reliable API for testing and prototyping. https://jsonplaceholder.typicode.com/
Color palette: https://coolors.co/palette/cad2c5-84a98c-52796f-354f52-2f3e46

On my mac when I open index in live server:

http://localhost:5500/index.html

Created and rendered at a view using a view template and template engine. This allows users to easily view the usernames of all users in the DB, the title of all posts in the db and the name of all the comments in the db in one page. It's not super pretty, but could later be modified and re-used to create a drop-down for each type.

I've included a set of tests from Postman that should facilitate easy testing of the CRUD functionality of this API.

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

Have yet to implement :

Include sensible indexes for any and all fields that are queried frequently. For fields that may have a high write-to-read ratio, you may forgo indexes for performance considerations. Make comments of this where applicable.
