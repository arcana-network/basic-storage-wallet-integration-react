import React from 'react'

import getStorageProvider from '../lib/storageProvider'

export class FileList extends React.Component {
  state = {
    files: [],
    downloader: null,
    access: null
  }

  async loadFiles () {
    const sp = await getStorageProvider()

    const downloader = await sp.getDownloader()
    const access = await sp.getAccess()
    const files = await sp.myFiles()

    this.setState({
      downloader,
      access,
      files: files.map(f => {
        f.download = () => {
          downloader.download(f.did).catch(e => window.alert(e))
        }
        f.delete = () => {
          access.deleteFile(f.did).catch(e => window.alert(e))
        }
        f.share = () => {
          const addr = window.prompt('Enter an address:')
          access.share(['0x' + f.did], [addr]).catch(e => window.alert(e))
        }
        return f
      })
    })
  }

  componentDidMount () {
    this.loadFiles().catch(e => console.error(e))
  }

  render () {
    return (
      <table>
        <thead>
        <tr>
          <th>DID</th>
          <th>Uploaded On</th>
          <th>Size</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {this.state.files.map(file => (
          <tr key={file.did}>
            <td>
              {file.did}
            </td>
            <td>
              {file.uploaded_on}
            </td>
            <td>
              {file.size} bytes
            </td>
            <td className="button-container">
              <button onClick={file.download}>Download</button>
              <button onClick={file.delete}>Delete</button>
              <button onClick={file.share}>Share</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    )
  }
}
