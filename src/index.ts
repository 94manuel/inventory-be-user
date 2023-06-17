import express from 'express';
import mongo from './admin';
import init from './routes';


const app = express();
app.use(express.json());
mongo.connect();

app.use(init.app);

app.listen(3003, () => {
    console.log('Server listening on port: ' + 3003);
});