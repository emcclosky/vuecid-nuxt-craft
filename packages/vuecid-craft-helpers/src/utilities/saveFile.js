import fs from 'fs'

export default function saveFile({
  data,
  bundleName,
  savePath,
  compressJSON,
  lang,
} = {}) {
  const json = JSON.stringify(data, null, compressJSON ? null : 2)
  const jsonSizeKB =
    Math.round((Buffer.byteLength(json, 'utf8') / 1024) * 100) / 100
  const fileName = `${bundleName}${lang ? `.${lang}` : ''}.json`

  // eslint-disable-next-line
  console.info(
    `Writing ${fileName} (Length: ${json.length}, Size: ${jsonSizeKB}kB)`
  )

  if (!fs.existsSync(savePath)) {
    fs.mkdirSync(savePath)
  }

  return fs.writeFile(`${savePath}/${fileName}`, json, 'utf-8', function (err) {
    if (err) {
      throw err
    } else {
      console.log(`✅💾 Wrote to ${savePath}/${fileName} successfully!`) // eslint-disable-line
    }
  })
}
