var Todo = require('./models/todo');

module.exports = function(app) {

    app.get('/api/todos', function(req, res) {
        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });

    app.post('/api/todos', function(req, res) {
        Todo.create({
            title : req.body.title,
            completed : false
        }, function(err, todo) {
            if (err)
                res.send(err);

            res.json(todo);
        });

    });

    app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            res.send(200);
        });
    });

    app.put('/api/todos/:todo_id', function (req, res) {
        Todo.update({
            _id: req.params.todo_id
        }, req.body, function (err, todo) {
            if (err)
                res.send(err)

            res.json(todo);
        })
    });

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });
};