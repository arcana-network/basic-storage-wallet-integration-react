import React from 'react'

import { HelloWorld } from './components/HelloWorld'
import getStorageProvider from './lib/storageProvider'

import './App.css'

class App extends React.Component {
  state = {
    loggedIn: false
  }

  async componentDidMount () {
    const sp = await getStorageProvider()
    await sp.login()
    this.setState({
      loggedIn: true
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
