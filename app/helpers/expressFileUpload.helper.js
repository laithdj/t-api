const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
require('dotenv').config()

const uploadFile = async (image, directoryPath) => {
  const targetFile = image
  const extentionName = path.extname(targetFile.name)
  fs.existsSync(directoryPath) || fs.mkdirSync(directoryPath, { recursive: true })
  let uploadDir = `${directoryPath}${uuid.v4()}${targetFile.name}`
  const mimeType = ['.png', '.jpg', '.jpeg', '.gif', '.zip', '.pdf', '.docx']
  // Checking the file type
  if (!mimeType.includes(extentionName)) {
    return { status: false, message: 'Invalid Image type' }
  }
  if (targetFile.size > process.env.express_file_size) {
    return { status: false, message: 'File is too Large' }
  }
  // move file into directory
  await targetFile.mv(uploadDir, (err) => {
    if (err) {
      return { status: false, message: 'Error While moving file into folder' }
    }
  })
  uploadDir = uploadDir.replace('public/', '')
  return { status: true, message: uploadDir }
}
// delete the file from folder
const deleteFile = async (imagePath) => {
  try {
    await fs.unlinkSync(imagePath)
    return { status: true, message: 'File deleted successfully' }
  } catch (e) {
    return { status: false, message: 'Something went wrong while deleting file' }
  }
}
module.exports = {
  uploadFile,
  deleteFile
}
