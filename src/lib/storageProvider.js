import { StorageProvider } from '@arcana/storage'
import { AuthProvider, AppMode } from '@arcana/auth'

let storageProvider

export async function getWalletInstance () {
  const wallet = new AuthProvider(process.env.REACT_APP_ARCANA_APP_ID)
  await wallet.init({ appMode: AppMode.Full, position: 'right' })
  return wallet.provider
}

export default async function getStorageProvider (provider) {
  if (!storageProvider) {
    storageProvider = new StorageProvider({
      appId: process.env.REACT_APP_ARCANA_APP_ID,
      // gateway: 'https://gateway-dev.arcana.network/api/v1/',
      provider
    })
  }

  return storageProvider
}
