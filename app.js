const express =require('express')
const cors =require('cors')
const bodyParser=require('body-parser')
const UserRouter=require('./routes/user')
const db = require('./config/connection');
const PORT = process.env.PORT || 3001;


const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

db.connect((err)=>{
    if(err){
      console.log(err);
    }else{
   
    }
  })

app.use('/api',UserRouter);
app.listen(PORT, (err) => {
    if(!err) console.log(`Server listening on ${PORT}`)
    else console.log('hiiii');
   
  });