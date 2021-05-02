import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    html, body, #root {
        height: 100vh;
        width: 100vw;
    }
    *, button, input, li {
        border: 0;
        outline: 0;
        font-family: 'Open Sans', sans-serif;
        list-style: none;
    }
`
