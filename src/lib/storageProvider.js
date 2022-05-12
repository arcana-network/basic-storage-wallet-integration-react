import { StorageProvider } from '@arcana/storage'

let storageProvider

export default async function getStorageProvider () {
  if (!storageProvider) {
    storageProvider = new StorageProvider({
      appId: process.env.REACT_APP_ARCANA_APP_ID,
      gateway: 'https://gateway-dev.arcana.network/api/v1/',
      provider: window.ethereum
    })
  }

  return storageProvider
}
