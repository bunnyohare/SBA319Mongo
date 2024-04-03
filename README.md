## Setup

To test/use this API do the following:

- Please create a MongoDB Database called SBA319Mongo.
- Load the database with the JSON data stored in the three files that are contained in the data folder. 
- Call these collections Comments, Posts, and Users.  
- Run npm install to get the node_modules.
- Create a .env file which includes the following:
    ```
    PORT=5005
    MONGO_URI=mongodb+srv://<MONGO_USERNAME>:<MONGO_PASSWORD>@<MONGO_DATABASE_INFO_URL>/SBA319Mongo
    ```
Change `<MONGO_USERNAME>` to your username where you are storing the database.  Change `<MONGO_PASSWORD>` to your password where you are storing the database. And change `<MONGO_DATABASE_INFO_URL>` to the location of your database in the format: `<DATABASE_DEPLOYMENT>.<STRING>.mongodb.net`. If you deploy on https://MongoDB.com this info should be available via the `Connect` button.  Please do not use their boiler-plate driver connection as adding the `?retryWrites=true&w=majority&appName=` url parameters will cause issues with mongoose.

- Run `nodemon start` to start the server. 

## Notes

I've included a set of tests from Postman that should facilitate easy testing of the CRUD functionality of this API. These tests are in the `RTT03-SBA319-MongoDB.postman_collection.json` file.

I've implemented simple email validation via regex and have a test to see if a User id exists before they are allowed to create a Post.

## Rendered View

The rendered view is available at: http://localhost:5005/

I have created and rendered a view using a view template and template engine. This allows users to easily view the id and username of all users in the DB, the id and title of all posts in the db and the id and name of all the comments in the db in one page. It's not super pretty, but could later be modified and re-used to create a drop-down for each type.

## Credits:

JSON Data: {JSON} Placeholder, Free fake and reliable API for testing and prototyping. https://jsonplaceholder.typicode.com/
