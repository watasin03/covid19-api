const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())

app.get('/all',(req,res)=>{
    axios.default.get('https://disease.sh/v3/covid-19/countries?yesterday=false&twoDaysAgo=false&sort=cases&allowNull=false')
    .then((result)=>{
        let newData = result.data.filter((item)=> item.countryInfo.iso3).join(',');
        axios.default.get()
        .then((results)=>{

        })
        .catch((err)=>{

        })
    })
    .catch((err)=>{

    })
})

app.listen(3012,(err)=> err ? console.log('Error'+err):console.log('Start at 3012'))