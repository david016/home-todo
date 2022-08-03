const express = require('express');
const app = express();

app.use('/api/todos', (req, res, next) => {
    const todos = [
        {
            id: 'snkfkjkf',
            title: 'First server-side post',
            content: 'This is comming from the server'
        },
        {
            id: 'gyrrshjhk',
            title: 'Second server-side post',
            content: 'This is commiing from the server'
        },
        {
            id: 'mhsetghj',
            title: 'Third server-side post',
            content: 'This is comming from the server'
        },
        {
            id: 'mhsetghj',
            title: 'Third server-side post',
            content: 'This is comming from the server5'
        }
    ];
    res.status(200).json({
        message: "Todos Fetched Successfully",
        todos: todos
    });
});

module.exports = app