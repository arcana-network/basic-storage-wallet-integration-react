import { StorageProvider } from '@arcana/storage'
import { WalletProvider, AppMode } from '@arcana/wallet'

let storageProvider

export async function getWalletInstance () {
  const wallet = new WalletProvider({
    appId: process.env.REACT_APP_ARCANA_APP_ID,
    inpageProvider: false /* sets window.arcana.provider and tries to set window.ethereum to the provider */
  })
  await wallet.init({ appMode: AppMode.Full, position: 'right' })
  return wallet.getProvider()
}

export default async function getStorageProvider (provider) {
  if (!storageProvider) {
    storageProvider = new StorageProvider({
      appId: process.env.REACT_APP_ARCANA_APP_ID,
      gateway: 'https://gateway-dev.arcana.network/api/v1/',
      provider
    })
  }

  return storageProvider
}
