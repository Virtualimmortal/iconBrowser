import logo from '../react-logo.svg';
import packageJson from '../../package.json'

const Loader = () => {
  return (
    <div id="loadingOverlay" className="App-loader">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {packageJson.name} v{packageJson.version}
        </p>
      </div>
  )
}

export default Loader