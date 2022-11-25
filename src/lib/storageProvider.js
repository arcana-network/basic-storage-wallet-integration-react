import { StorageProvider } from '@arcana/storage'
import { AuthProvider } from '@arcana/auth'

let auth
let storageProvider

export async function getWalletInstance () {
  if (!auth) {
    auth = new AuthProvider(process.env.REACT_APP_ARCANA_APP_ADDRESS, {
      alwaysVisible: true,
      theme: 'light',
      position: 'right'
    })
    await auth.init()
    await auth.connect()
  }
  return auth.provider
}

export default async function getStorageProvider (provider) {
  if (!storageProvider) {
    storageProvider = await StorageProvider.init({
      appId: process.env.REACT_APP_ARCANA_APP_ID,
      // gateway: 'https://gateway-dev.arcana.network/api/v1/',
      provider
    })
  }

  return storageProvider
}
