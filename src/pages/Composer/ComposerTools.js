import React, { Component } from 'react'

class ComposerTools extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const { data, functions } = this.props
        let className = data.visible ? "floating-tools tools-visible" : "floating-tools"
        return <div className={className}>
            <div className="tools-row">
                <div>
                    Scroll to the left / right to select the columns
                </div>
                <button onClick={functions.toggleTools}>
                    Close
                </button>
            </div>
            <div className="tools-buttons-wrapper">
                <div className='tools-half'>
                    <button
                        disabled={data.copiedColumns.length !== 0}
                        onClick={(e) => { 
                            e.currentTarget.blur()
                            functions.copyColumns('all')
                        }}
                        className={data.copiedColumns.length !== 0 ? "tools-button-highlighted" : ""}
                    >
                        Copy
                    </button>
                    <button
                        disabled={data.copiedColumns.length !== 0}
                        onClick={(e) => { 
                            e.currentTarget.blur()
                            functions.copyColumns(data.layer)
                        }}
                        className={data.copiedColumns.length !== 0 ? "tools-button-highlighted" : ""}
                    >
                        Copy layer {data.layer}
                    </button>
                </div>
                <div className='tools-half'>
                    <button
                        disabled={data.copiedColumns.length === 0}
                        onClick={(e) => { 
                            e.currentTarget.blur()
                            functions.pasteColumns(false)
                        }}
                    >
                        Paste
                </button>
                    <button
                        disabled={data.copiedColumns.length === 0}
                        onClick={(e) => { 
                            e.currentTarget.blur()
                            functions.pasteColumns(true)
                        }}
                    >
                        Insert
                </button>
                </div>
                <div className='tools-half'>
                    <button
                        disabled={data.copiedColumns.length !== 0}
                        onClick={(e) => { 
                            e.currentTarget.blur()
                            functions.eraseColumns('all')
                        }}
                    >
                        Erase
                    </button>
                    <button
                        disabled={data.copiedColumns.length !== 0}
                        onClick={(e) => { 
                            e.currentTarget.blur()
                            functions.eraseColumns(data.layer)
                        }}
                    >
                        Erase layer {data.layer}
                    </button>
                </div>

                <button
                    disabled={data.copiedColumns.length !== 0}
                    onClick={functions.deleteColumns}
                >
                    Delete
                </button>
            </div>
        </div>
    }
}



export default ComposerTools