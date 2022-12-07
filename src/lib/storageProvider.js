import { StorageProvider } from '@arcana/storage'
import { AuthProvider } from '@arcana/auth'

let auth
let storageProvider

export async function getWalletInstance () {
  if (!auth) {
    auth = new AuthProvider(process.env.REACT_APP_ARCANA_APP_ADDRESS, {
      network: 'dev',
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
      chainId: 40404,
      gateway: 'https://gateway-dev.arcana.network',
      appId: process.env.REACT_APP_ARCANA_APP_ID,
      provider
    })
  }

  return storageProvider
}
