const ftp = require("basic-ftp")

export class FtpUploader {
  async uploadFile(file) {
    const client = new ftp.Client()
    client.ftp.verbose = true
        await client.access({
            host: "myftpserver.com",
            user: "very",
            password: "password",
            secure: true
        })
        await client.uploadFrom(file, "README_FTP.md")
  }
}


    // try {
    // }
    // catch(err) {
    //     console.log(err)
    // }
    // client.close()
