import { diskStorage, Options } from 'multer'
import { extname } from 'path'
import fs from 'fs'
import Logging from 'library/Logging'
import { FileInterceptor } from '@nestjs/platform-express'
import { CallHandler, ExecutionContext, NestInterceptor, mixin } from '@nestjs/common'

import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'

const ensureDirectoryExists = (directory: string) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true })
  }
}

const imageExtensions = ['png', 'jpg', 'jpeg', 'gif']
const fileExtensions = ['mp4', 'mp3', 'wav', 'pdf', 'obj', 'blend', 'fbx', 'gltf']

export const saveImageToStorage = (folder: 'avatars' | 'images' | 'thumbnails'): Options => {
  const destinationPath = `./files/${folder}`
  ensureDirectoryExists(destinationPath)

  return {
    storage: diskStorage({
      destination: destinationPath,
      filename(req, file, callback) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        const ext = extname(file.originalname)
        const filename = `${uniqueSuffix}${ext}`
        callback(null, filename)
      },
    }),
    fileFilter(req, file, callback) {
      const fileExt = extname(file.originalname).replace('.', '').toLowerCase()
      if (imageExtensions.includes(fileExt)) {
        callback(null, true)
      } else {
        console.log('file tipe')
        callback(null, false)
      }
    },
  }
}

const allowedFileExtensions = ['png', 'jpg', 'jpeg', 'gif', 'mp4', 'mp3', 'wav', 'pdf', 'obj', 'blend', 'fbx', 'gltf']

const destinationPath = './files/artwork_files'
ensureDirectoryExists(destinationPath)

export const saveFileToStorage: Options = {
  storage: diskStorage({
    destination: destinationPath,
    filename(req, file, callback) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      const ext = extname(file.originalname)
      const filename = `${uniqueSuffix}${ext}`
      callback(null, filename)
    },
  }),
  fileFilter(req, file, callback) {
    const fileExt = extname(file.originalname).replace('.', '').toLowerCase()
    if (allowedFileExtensions.includes(fileExt)) {
      callback(null, true)
    } else {
      console.log(`Invalid file type: ${fileExt}`)
      callback(null, false)
    }
  },
}

export const removeFile = (fullFilePath: string): void => {
  try {
    if (fs.existsSync(fullFilePath)) {
      fs.unlinkSync(fullFilePath)
    } else {
      Logging.warn(`File not found: ${fullFilePath}`)
    }
  } catch (error) {
    Logging.error(`Failed to delete file: ${error.message}`)
  }
}
