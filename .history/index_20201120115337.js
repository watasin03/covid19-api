const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));
app.use(cors())

app.get('/all',(req,res)=>{
    console.log('all')
    axios.default.get('https://disease.sh/v3/covid-19/countries?yesterday=false&twoDaysAgo=false&sort=cases&allowNull=false')
    .then((result)=>{
        let newData = []
        let country = ""
        result.data.forEach((item)=>{ 
            newData.push(item.countryInfo.iso3)
        });
        country = newData.join(',');
        console.log(country)
        axios.default.get(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=30`)
        .then((results)=>{
            console.log(results.data)
            let obj = {
                country:"",
                cases:[]
            }
            let newArrdata = []
            let dataArr = results.data.filter(item=> item.country);
            dataArr.forEach((item,i)=>{
                let date = Object.keys(item.timeline.cases);
                obj.country = item.country;
                date.forEach((dataItem,index)=>{
                    obj.cases.push({
                        date:dataItem,
                        total:item.timeline.cases[dataItem]
                    })
                })

                newArrdata.push(obj)
            })
            console.log(newArrdata)
            res.status(200).json({
                result:newArrdata
            })
        })
        .catch((err)=>{
            res.status(200).json({
                result:err
            })
        })
    })
    .catch((err)=>{
        res.status(200).json({
            result:err
        })
    })
})

app.listen(3012,(err)=> err ? console.log('Error'+err):console.log('Start at 3012'))