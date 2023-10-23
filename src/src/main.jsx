import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import RPCEditor from './RPCEditor.jsx'
import './index.css'
import { RPCDataSetContext } from './RPCDataSetContext'
import axios from 'axios'

axios.defaults.baseURL = 'https://localhost:7080'

const rpcEditorInstance = document.getElementById("rpcEditor");


const dataMap = {
	FormName: rpcEditorInstance?.dataset.formname,
	RPCId: rpcEditorInstance?.dataset.rpcid,
	DataMode: rpcEditorInstance?.dataset.viewmode,
}

ReactDOM.createRoot(document.getElementById('rpcEditor')).render(
  <React.StrictMode>
    <RPCEditor {...dataMap} />
  </React.StrictMode>,
)


