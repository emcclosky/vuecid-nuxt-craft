import fs from 'fs'

export default function saveFile(data, fileName, config, additionalNaming) {
  console.log('save file')
  // additionalNaming can for example be a number or a slug
  const json = JSON.stringify(data, null, config.compressJSON ? null : 2)
  const jsonSizeKB =
    Math.round((Buffer.byteLength(json, 'utf8') / 1024) * 100) / 100

  // eslint-disable-next-line
  console.info(
    `Writing ${fileName} (Length: ${json.length}, Size: ${jsonSizeKB}kB)`
  )

  return fs.writeFile(`${config.savePath}/${fileName}`, json, 'utf-8', function(
    err
  ) {
    if (err) {
      throw err
    } else {
      console.log(`Wrote to ${config.savePath}/${fileName} successfully!`) // eslint-disable-line
    }
  })
}
