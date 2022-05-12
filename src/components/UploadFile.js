import React from 'react'

import getStorageProvider from '../lib/storageProvider'

export class UploadFile extends React.Component {
  onRef = (el) => {
    this.inputRef = el
  }

  onSubmit = async (ev) => {
    ev.preventDefault()

    const sp = await getStorageProvider()
    const uploader = await sp.getUploader()
    uploader.onSuccess = () => {
      window.alert('File uploaded.')
    }
    for (const file of this.inputRef.files) {
      await uploader.upload(file)
    }
  }

  render () {
    return (
      <form onSubmit={this.onSubmit}>
        <label htmlFor="upload-file-input">File Picker ➡</label>&nbsp;
        <input id="upload-file-input" type="file" ref={this.onRef} />
        <button type="submit">Submit</button>
      </form>
    )
  }
}
