import React from 'react'

import { HelloWorld } from './components/HelloWorld'
import getStorageProvider, { getWalletInstance } from './lib/storageProvider'

import './App.css'

class App extends React.Component {
  state = {
    loggedIn: false
  }

  async componentDidMount () {
    const provider = await getWalletInstance()
    provider.on('connect', async () => {
      const sp = await getStorageProvider(provider)
      await sp.login()
      this.setState({
        loggedIn: true
      })
    })
  }

  render () {
    if (!this.state.loggedIn) {
      return <p>Loading.</p>
    }

    return <HelloWorld />
  }
}

export default App
