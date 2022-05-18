const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const port = 3000;
const methodOverride = require('method-override')

const route = require('./routes');
const db = require('./config/db')

const SortMiddleware = require('./app/middlewares/SortMiddleware')
//Connect db
db.connect()
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(morgan('combined'));
app.use(methodOverride('_method'))

// Custom middleware
app.use(SortMiddleware)

app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers:{
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';
                
                const icons = {
                    default: 'oi oi-elevator',
                    desc: 'oi oi-sort-descending',
                    asc: 'oi oi-sort-ascending'
                };
                
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc'
                }
                const icon = icons[sortType];
                const type = types[sortType];

                return `<a href="?_sort&column=${field}&type=${type}">
                <span class="${icon}"></span>
              </a>`;
            },
        }
    }),
);
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'resources', 'views'));

// route init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
