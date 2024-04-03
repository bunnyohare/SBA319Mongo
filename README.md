To test/use this API please create a MongoDB Database called SBA319Mongo

Load the database with the JSON data stored in the three files that are contained in the data folder. 

Call these collections Comments, Posts, and Users.  

Run npm install to get the node_modules.

Run nodemon start to start the server. 

Create a .env file which includes the following:

```PORT=5005
mongodb+srv://<MONGO_USERNAME>:<MONGO_PASSWORD>@rtt-03.xa9pn2b.mongodb.net/SBA319Mongo```


I've included a set of tests from Postman that should facilitate easy testing of the CRUD functionality of this API. RTT03-SBA319-MongoDB.postman_collection.json


I've implemented simple email validation via regex and have a test to see if a User id exists before they are allowed to create a Post.

For http://localhost:5005/

I have created and rendered a view using a view template and template engine. This allows users to easily view the id and username of all users in the DB, the id and title of all posts in the db and the id and name of all the comments in the db in one page. It's not super pretty, but could later be modified and re-used to create a drop-down for each type.


Credits:

Free content info:
Text: Lipsum, a Lorem Ipsum text generator. https://www.lipsum.com/
JSON Data: {JSON} Placeholder, Free fake and reliable API for testing and prototyping. https://jsonplaceholder.typicode.com/
Color palette: https://coolors.co/palette/cad2c5-84a98c-52796f-354f52-2f3e46
