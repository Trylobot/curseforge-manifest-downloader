const path = require('path')
const fs = require('fs')
const request = require('request')

const manifest_path = process.argv[2]
const manifest_json = JSON.parse(fs.readFileSync(manifest_path))
const dest = `${path.dirname(manifest_path)}/mods/`
manifest_json.files.forEach( function( file ) {
  const url = `http://minecraft.curseforge.com/projects/${file.projectID}/files/latest`
  // const url = `http://minecraft.curseforge.com/projects/${file.projectID}/files/${file.fileID}/download`
  request({ url, encoding:null }, function( error, response, body ) {
    if (!error && response.statusCode == 200 && body) {
      const filename = decodeURIComponent(path.basename(response.request.href))
      console.info(filename)
      fs.writeFile(`${dest}${filename}`, body, function(fs_error) {
        if (fs_error)
          console.error(fs_error)
      })
    }
  })
})

