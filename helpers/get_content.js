import fs from 'fs'
import path from 'path'
import { createClient } from 'contentful'
require('dotenv').config()


const SPACE = process.env.CONTENTFUL_SPACE || ''
const TOKEN = process.env.CONTENTFUL_TOKEN || ''

console.log('Has Space:', (SPACE.length > 0))
console.log(SPACE)

console.log('Has Token:', (TOKEN.length > 0))
console.log(TOKEN)

const client = createClient({
    space: SPACE,
    accessToken: TOKEN
})

const types = [
    'homePage',
    'website',
    'social',
    'work'
]

async function getContent() {
  console.log('> Starting Import...')
  for(const type of types) {
    console.log('working type: ', type)
  
    const entries = await client.getEntries({
      content_type: type,
      include: 3
    })
    
    console.log('Has entries? :', entries.total >= 1)

    if (entries.total >= 1) {
      const { fields } = entries.items[0]

      let allFields = []

      for (let t = 0; t < entries.total; t++) {
        allFields.push(entries.items[t].fields)
      }

      fs.writeFileSync(
        path.join(__dirname, './../', 'data', `${type}.json`),
        JSON.stringify(allFields)
      )

      console.log('> Content received for ', type)
    } else {
      console.log('!!!!!! No content for: !!!!', type)
    }
}
return true
}

if (process.argv[2] === 'install') {
  getContent()
}
