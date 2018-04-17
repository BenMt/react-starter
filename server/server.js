import express from 'express'
import path from 'path'

const app = express()
app.use(express.static('dist'))
app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/../dist/index.html'))
})

app.listen(8080, err => {
  if (err) {
    console.log('Server error')
  }
  console.log('Server is running')
})
