
/*******************************************************************************************************************************
 *
 * WOSHAPP PRE-INTERVIEW PROJECT A
 *
 *******************************************************************************************************************************/

/*******************************************************************************************************************************
 *
 * Dependencies and env variables
 *
 *******************************************************************************************************************************/
// Get the express framework
const express       = require('express')
// Instantiate the app using express
const app           = express()
// Get body-parser in order to parse data more easily on API requests
const bodyParser    = require('body-parser')
// Get the mongoose dependency for our mongoDB database
const mongoose      = require('mongoose')
// Set a ref to mongoose Schema since we will need to use it a few times
const Schema        = mongoose.Schema 
// Set an env variable for your DB
const DB_URL = process.env.DB_URL || "mongodb+srv://dbUser:dbPassword@cluster0-qsr3w.gcp.mongodb.net/test?retryWrites=true&w=majority"
// Set a port to connect to
app.set('port', process.env.PORT || 5000)     
var methodOverride = require('method-override')
/*******************************************************************************************************************************
 *
 * Tell server to use Body Parser
 *
 *******************************************************************************************************************************/
// Parse url encoded data
app.use(bodyParser.urlencoded({ extended: true }))
// Parse JSON data
app.use(bodyParser.json())

//Use method override
app.use(methodOverride('_method'));
/*******************************************************************************************************************************
 *
 * DB Connection and Models
 *
 *******************************************************************************************************************************/

// Connect to your DB
mongoose.connect(DB_URL).then((conn) => {
    console.log('\n', new Date().toUTCString(), ': conn.name:\n', conn.connection.name)
}).catch((err) => {
    console.log('\n', new Date().toUTCString(), ': err:\n', err)
})

/**
 * Create a schema that defines how the
 * Todo model will work and behave
 */
let todoSchema = new Schema({
    description: String,
})
/**
 * Use the schema defined above and set a name for it
 * Also save it in a variable so that we can quickly
 * reference it when we want to use it in order to
 * work with our db model and the database
 */ 
let Todo = mongoose.model('Todo', todoSchema)


//==================================================== ROUTES ====================================================//


/*******************************************************************************************************************************
 *
 * SERVE WEBSITE
 *
 *******************************************************************************************************************************/

/**
 * 
 * Example of route that serves website
 * 
 * .get() defines the type of method to accept on the API/URL route
 * 
 * The callback passed will always contain:
 * req - which is the request data that comes from the frontend
 * res - which is the response that you handle and eventually end
 * in order to complete the API request-response cycle
 * next - is there in case you want to proceed to another
 * function, but that is outside the scope of this task
 */
app.get('/', (req, res, next) => {
    /**
     * If you are new to Node, feel free to send some
     * requests through postman or the browser to see 
     * what the req object contains
     * try 127.0.0.1:5000?data=stuff for example
     */
    console.log('\n', new Date().toUTCString(), ': req.body:\n', req.body) // For URL body - { body: {insideBody: 'stuff'} }
    console.log('\n', new Date().toUTCString(), ': req.query:\n', req.query) // For URL query params - /url?queryParams=stuff
    console.log('\n', new Date().toUTCString(), ': req.params:\n', req.params) // For URI params url/:uriParams
    /**
     * res has many different methods like
     * .send() to send anything
     * .sendFile() to send files
     * .json() to send response as JSON
     * .status(number) to set a status before completing a response
     * .end() - another way to end a response
     * 
     * For this task, we recommend using json() 
     * for the API as: 
     * 
     * res.status(200).json(successData)
     * or
     * res.status(422).json(errorData)
     */
    return res.sendFile(__dirname + '/web/index.html')
})


/*******************************************************************************************************************************
 *
 * GET TODOS
 *
 *******************************************************************************************************************************/

/**
 * Example route for getting todo data


app.get('/api/todos', async (req, res) => {
    try {
      const todos = await Todo.find()
      res.status(200).json(todos)
      console.log('\n', new Date().toUTCString(), ': foundTodos:\n', todos)
    } catch (err) {
      console.log('\n', new Date().toUTCString(), ': err foundTodos :\n', err)
      res.status(422).json({ message: err.message })
    }
  })


app.post('/api/todos', (req, res) => {
    const todo = new Todo({
      description: req.body.name
    })
  
    try {
      const newTodo = await todo.save()
      res.status(200).json(newTodo)
    } catch (err) {
      res.status(422).json({ message: err.message })
    }
  })  
 */
 app.get('/api/todos', (req, res, next) => {
    /**
     * Call the DB class we defined earlier
     * and use the find() method to find data
     */
    Todo.find(
        {}
    )
    /**
     * The callback will always come back
     * with an error first
     * We then need to check if we 
     * have an error and handle it accordingly
     * If we don't have an error we can proceed with 
     * sending the data to the frontend
     */
    .exec(function(err, foundTodos){
        if(err){
            console.log('\n', new Date().toUTCString(), ': err foundTodos :\n', err)
            // Use 422 for errors in this project
            return res.status(422).json(err)
        }
        console.log('\n', new Date().toUTCString(), ': foundTodos:\n', foundTodos)
        // Use 200 for success
        return res.status(200).json(foundTodos)
    })
})


/**
 * Seems like some stuff below is missing! :)
 */


app.post('/api/todos', (req, res, next) => {
    try {
      Todo.create(req.body)
      //res.status(200).json({ message: "Todo created"})
      res.redirect("/")
    } catch (err) {
      res.status(422).json({ message: err.message })
    }
    
  }
  )  

/*******************************************************************************************************************************
 *
 * DELETE TODO
 *
 *******************************************************************************************************************************/



app.delete('/api/todos/:id' , (req, res, next)  => {
    var tdId = req.params.id;
    Todo.findByIdAndRemove(tdId )
    .exec(function(err, delTodo){
        if(err){
            console.log('\n', new Date().toUTCString(), ': err delTodo :\n', err)
            // Use 422 for errors in this project
            return res.status(422).json(err)
        }
        console.log('\n', new Date().toUTCString(), ': delTodo:\n', delTodo)
        // Use 200 for success
        //return res.status(200).json(delTodo)
        res.redirect("/")
    })
});  


/*******************************************************************************************************************************
 *
 * UPDATE TODO
 *
 *******************************************************************************************************************************/


app.put('/api/todos/:id' , (req, res, next)  => {
    Todo.findByIdAndUpdate({ _id: req.params.id } , req.body )
    .exec(function(err, upTodo){
        if(err){
            console.log('\n', new Date().toUTCString(), ': err upTodo :\n', err)
            // Use 422 for errors in this project
            return res.status(422).json(err)
        }
        console.log('\n', new Date().toUTCString(), ': upTodo:\n', upTodo)
        // Use 200 for success
        //return res.status(200).json(upTodo)
        res.redirect("/")
    })
});  

/*******************************************************************************************************************************
 *
 * Start Server
 *
 *******************************************************************************************************************************/
app.listen(app.get('port'), () => {
    console.log('\n', new Date().toUTCString(), ': Server is running on port:\n', app.get('port'))
})

/*******************************************************************************************************************************
 *
 * We've helped you with the basics
 * Now you're on your own
 * 
 * GOOD LUCK! :D
 *
 *******************************************************************************************************************************/
