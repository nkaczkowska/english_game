const express = require('express'); //Express
const mysql = require('mysql2'); //mysql12
const bodyParser = require('body-parser'); //body-parser
const cors = require('cors'); //cors

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'pl()A55+d7&', //password censored
    database: 'english_learning_game' //database name 
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to database');
    }
});

// default API
app.get('/', (req, res) => {
    console.log('Root route has been accessed');
    res.send('<h1>Welcome to the backend: the games API<h1>');
});

// API to fetch categories
app.get('/categories', (req, res) => {
    db.query('SELECT * FROM categories', (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
});

//API to fetch a category_id based on its name
app.get('/categories/id', async (req, res) => {
    const { name } = req.query;

    if (!name) {
        return res.status(400).json({ error: 'Category name is required' });
    }

    try {
        const [rows] = await db.promise().query('SELECT id FROM categories WHERE name = ?', [name]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }

        res.status(200).json(rows[0].id);

    } catch (err) {
        console.error('Error fetching category ID:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//API to fetch a category_name based on its id
app.get('/categories/name', async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Category id is required' });
    }

    try {
        const [rows] = await db.promise().query('SELECT name FROM categories WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }

        res.status(200).json(rows[0].name);

    } catch (err) {
        console.error('Error fetching category name:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//API to fetch a category_totalNumOfTries based on its id
app.get('/categories/totalNumOfTries', async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Category id is required' });
    }

    try {
        const [rows] = await db.promise().query('SELECT totalNumOfTries FROM categories WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }

        res.status(200).json(rows[0].totalNumOfTries);

    } catch (err) {
        console.error('Error fetching category totalNumOfTries:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//API to increment a category.totalNumOftries by 1 based on its id
app.post('/categories/totalNumOfTries/increment', async (req, res) => {
    const { id } = req.body; 

    if (!id) {
        return res.status(400).json({ error: 'Category id is required' });
    }

    try {
        //check if the category exists
        const [rows] = await db.promise().query('SELECT totalNumOfTries FROM categories WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }

        //increment
        const currentTotalNumOfTries = rows[0].totalNumOfTries;
        const newTotalNumOfTries = currentTotalNumOfTries + 1;

        //update the database
        await db.promise().query('UPDATE categories SET totalNumOfTries = ? WHERE id = ?', [newTotalNumOfTries, id]);

        res.status(200).json({
            message: 'Category totalNumOfTries incremented successfully',
            id: id,
            previousTotalNumOfTries:  currentTotalNumOfTries,
            newTotalNumOfTries: newTotalNumOfTries
        });

    } catch (err) {
        console.error('Error incrementing category  totalNumOfTries:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//API to fetch the total number of tries for all categories
app.get('/categories/totalNumOfTriesForAll', async (req, res) => {
    try {
      const [rows] = await db.promise().query('SELECT SUM(totalNumOfTries) AS totalNumOfTriesForAll FROM categories');
  
      if (rows.length === 0) {
        return res.status(404).json({ error: 'No categories found.' });
      }
  
      res.status(200).json({ totalNumOfTriesForAll: rows[0].totalNumOfTriesForAll || 0 });
    } catch (err) {
      console.error('Error fetching total number of tries for all categories:', err);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });



//API to switch the isWon field of a category to 1 (true) based on its id
app.post('/categories/isWon/switch', async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'Category id is required' });
    }

    try {
        //checking if the category exists
        const [rows] = await db.promise().query('SELECT isWon FROM categories WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }

        //fetch the current value of isWon
        const currentIsWon = rows[0].isWon;

        //update isWon to 1
        await db.promise().query('UPDATE categories SET isWon = ? WHERE id = ?', [1, id]);

        res.status(200).json({
            message: 'Category isWon updated successfully',
            id: id,
            previousIsWon: currentIsWon,
            newIsWon: 1
        });

    } catch (err) {
        console.error('Error updating category isWon:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



//API to add a category
app.post('/categories', async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error:'Category name is required'});
    }

    try{
        /*verifying if the category already exists*/
        const [rows] = await db.promise().query('SELECT * FROM categories WHERE name = ?', [name]);
        
        if (rows.length > 0){
            return res.status(409).json({ error: 'The category already exists' }); /*409 is an error type*/
        }

        const [result] = await db.promise().query('INSERT INTO categories (name) VALUES (?)', [name]);
        res.status(201).json({ message: 'Category added', categoryId: result.insertId });

    } catch (err) {
        console.error('Error adding category:', err);
        res.status(500).json({ error: 'Internal server error'});
    };
});

//API to delete a category by ID
app.delete('/categories/:id', async (req, res) => {
    const categoryId = req.params.id;

    try {
        const [result] = await db.promise().query('DELETE FROM categories WHERE id = ?', [categoryId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (err) {
        console.error('Error deleting category:', err);        
        res.status(500).json({ error: 'Internal server error' });
    }
});




//API to fetch questions with optional filtering by category_id
app.get('/questions', async (req, res) => {
    const { category_id } = req.query;

    try {
        let query = 'SELECT * FROM questions';
        const parameters = []; //identify specific parameters of the question being imported (eg. category_id)

        if (category_id){
            query += ' WHERE category_id = ?';
            parameters.push(category_id); //add the parameters to the array
        }

        const [rows] = await db.promise().query(query, parameters); //sent the full query with parameters
        res.status(200).json(rows);
    } catch (err){
        console.error('Error fetching questions:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
   
    });




// API to add a question
app.post('/questions', async (req, res) => {
    const { contents, category_id, question_type } = req.body;

    //checking if all the required fields are filled out
    if (!contents || category_id == null || question_type == null) {
        return res.status(400).json({ error:'Required fields are missing'});
    }

    try{
        /*verifying if the question already exists*/

        /*inseriting a new question*/
        const [result] = await db.promise().query(
            'INSERT INTO questions (contents, category_id, question_type) VALUES (?, ?, ?)', 
            [contents, category_id, question_type]);
        res.status(201).json({ message: 'Question added', questionId: result.insertId });

    } catch (err) {
        console.error('Error adding question:', err);
        res.status(500).json({ error: 'Internal server error'});
    };
});


// API to fetch the question type by question ID
app.get('/questions/type', async (req, res) => {
    const { id } = req.query;
    if (!id) {
        return res.status(400).json({ error: 'Question ID is required' });
    }

    try {
        const [rows] = await db.promise().query('SELECT question_type FROM questions WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Question not found' });
        }
        res.status(200).json(rows[0].question_type);
    } catch (err) {
        console.error('Error fetching question type:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//API to fetch answers
app.get('/answers', async (req, res) => {
    const { question_id } = req.query;


    try{
        let query = 'SELECT * FROM answers '; //if there is no question_id provided in the query, than we fetch all the answers
        const parameters = [];
        
        if(question_id){ //if there is a question_id provided in the query, than we serach for answers with this specivic value in the question_id field
            query += ' WHERE question_id = ?';
            parameters.push(question_id);
        }

        const[rows] = await db.promise().query(query, parameters);
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching answers:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



//API to add an answer
app.post('/answers', async (req, res) => {
    console.log('Request Body:', req.body); 
    const { question_id, answer_text, is_correct, pair_id, order_position } = req.body;

    console.log('Received payload for answers:', req.body); 


    //checking if all the required fields are filled out
    if(!question_id || !answer_text) {
        console.error('Missing fields:', { question_id, answer_text}); 
        return res.status(400).json({ error: 'Required fields are missing'});
    }

    try{
        console.log('Attempting to insert answer into the database...');

        /*inseriting a new answer*/
        const [result] = await db.promise().query(
            'INSERT INTO answers (question_id, answer_text, is_correct, pair_id, order_position) VALUES (?,?,?,?,?)',
            [question_id, answer_text, is_correct, pair_id, order_position]
        );

        console.log('Insert successful:', result); 
        res.status(201).json({ message: 'Answer added', answerId: result.insertId });
    
    } catch (err) {
        console.error('Error adding answer:', err);
        res.status(500).json({ error: 'Internal server error' });
    }


});




const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

