import fs from 'fs'
import path from 'path'

import uploadConfi from '@config/upload'

import IStorageProvider from "../models/IStorageProvider";

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string):Promise<string>{

    await fs.promises.rename(
      path.resolve(uploadConfi.tmpFolder, file),
      path.resolve(uploadConfi.uploadsFolder, file),

    );
    return file

  }


  public async deleteFile(file: string):Promise<void>{
      const filePath = path.resolve(uploadConfi.uploadsFolder, file)

      try{
        await fs.promises.stat(filePath)
      }catch{
        return
      }

      await fs.promises.unlink(filePath)


  }
}

export default DiskStorageProvider
