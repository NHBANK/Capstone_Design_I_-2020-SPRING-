const express=require('express') //express 모듈 사용
const url=require('url') // url 요청 받아오는 변수
const queryString=require('querystring') // querystring 모듈 사용
const app=express() // express 모듈을 get/post방식으로 받기 위한 변수 
const port=8000 // 포트 번호

app.use(express.json()) // post방식에서 자동으로 bodyparsing

app.get('/get', (req, res)=>{ 
    const test=url.parse(req.url) // url을 parsing
    const test2 = queryString.parse(test.query) // parsing된 url 뒤의 query들을 다시 parsing
    let result=test2
    result.stuno='20151548'
    result.email='imbrian618@gmail.com'
    result.time=new Date().toLocaleString({timeZone:'Asia/Seoul'})
    if(req.ip.substr(0,7)==='::ffff:')
        result.ip=req.ip.substr(7)
    else
        result.ip=req.ip

    res.json(result) // 결과값을 json 형태로 반환
})

app.post('/', (req, res)=>{
    const data=req.body // 위의 app.use에서 parsing된 body를 이용
    let result = data
    result.stuno='20151548'
    result.email='imbrian618@gmail.com'
    result.time=new Date().toLocaleString({timeZone:'Asia/Seoul'})
    if(req.ip.substr(0,7)==='::ffff:')
        result.ip=req.ip.substr(7)
    else
        result.ip=req.ip

    res.json(result)
})

app.listen(port, ()=>{
    console.log(`App listeing to port ${port}`)
})