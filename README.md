To test/use this API please create a MongoDB Database called SBA319Mongo and then load the database with the JSON data stored in the three files that are contained in the data folder. Call these collections Comments, Posts, and Users.

Create a .env file which includes the following:

PORT=5005
MONGO_URI=mongodb+srv://<MONGO_USERNAME>:<MONGO_PASSWORD>@<MongoDB_DATABAS_INFO>  
Get this string from MongoDB Compass.

I've included a set of tests from Postman that should facilitate easy testing of the CRUD functionality of this API. RTT03-SBA319-MongoDB.postman_collection.json

The routes for GET, PUT and DELETE by _id will require the tester viewing the full list and copying the _id for any of the available documents in the given collection to be used for testing, but the body portion of the PUT for Users is quite verbose, so if you want to use the one I've included in Postman without having to edit, use the first record at the top of the DB.

The only field that can be edited via PUT on a User is the username.

The only field that can be edited via PUT on a Comment is the name.

The only field that can be edited via PUT on a Post is the title.

I've implemented simple email validation via regex and have a test to see if a User id exists before they are allowed to create a Post.

For http://localhost:5500/index.html

I have created and rendered a view using a view template and template engine. This allows users to easily view the usernames of all users in the DB, the title of all posts in the db and the name of all the comments in the db in one page. It's not super pretty, but could later be modified and re-used to create a drop-down for each type.


http://localhost:5005/api/post/user/ID_OF_USER

Known defects:

Have yet to implement :

Include sensible indexes for any and all fields that are queried frequently. For fields that may have a high write-to-read ratio, you may forgo indexes for performance considerations. Make comments of this where applicable.


Credits:

Free content info:
Text: Lipsum, a Lorem Ipsum text generator. https://www.lipsum.com/
JSON Data: {JSON} Placeholder, Free fake and reliable API for testing and prototyping. https://jsonplaceholder.typicode.com/
Color palette: https://coolors.co/palette/cad2c5-84a98c-52796f-354f52-2f3e46
