import { container } from 'tsyringe'

import IStorageProvider from './StorageProvider/models/IStorageProvider'
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvide'


container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorageProvider)
