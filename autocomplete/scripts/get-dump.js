const http = require('http')
const fs = require('fs/promises')

const doQuery = async (url) => {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = ''

      res.on('data', (chunk) => {
        data += chunk
      })

      res.on('error', () => {
        reject()
      })

      res.on('end', () => {
        resolve(JSON.parse(data))
      })
    })
  })
}

const main = async () => {
  const dump = await doQuery('http://localhost:8000/api/jobs')
  const data = dump.map((job) => JSON.stringify(job)).join('\n')
  await fs.writeFile('data/dump.json', data)
}

main()
