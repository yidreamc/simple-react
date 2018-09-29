import React from './react/index'
import ReactDOM from './react-dom/index'

setInterval(() => {
    const elment = (
        <div>
            <h1>Hello world</h1>
            <h2>time  {new Date().toLocaleTimeString()}</h2>
        </div>
    )
    ReactDOM.render(
        elment,
        document.getElementById('root')
    )
}, 100);