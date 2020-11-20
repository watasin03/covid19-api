const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())

app.get('/all',(req,res)=>{
    axios.default.get('https://disease.sh/v3/covid-19/countries?yesterday=false&twoDaysAgo=false&sort=cases&allowNull=false')
    .then((result)=>{
        let newData = []
        let country = ""
        result.data.forEach((item)=>{ 
            newData.push(item.countryInfo.iso3)
        });
        country = newData.join(',');
        axios.default.get(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=30`)
        .then((results)=>{
            let newObj = {
                country:"",
                result:{
                    date:"",
                    cases:0
                }
            }
            let dataArr = results.data.filter(item=> item.country);
            let date = Object.keys(dataArr.timeline.cases);
            
        })
        .catch((err)=>{

        })
    })
    .catch((err)=>{

    })
})

app.listen(3012,(err)=> err ? console.log('Error'+err):console.log('Start at 3012'))