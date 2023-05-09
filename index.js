const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
)
app.get('/', (request, response) => {
	response.json({
		info: "Express API running!"
	})
})
app.listen(port, () => {
	console.log("app runing on port %d", port)
})