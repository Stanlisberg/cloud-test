import RenderPage from "./component/RenderPage"
import { AppProvider } from './component/context/AppContext'

function App () {
  return(
    <div>
      <AppProvider>
        <RenderPage />
      </AppProvider >
    </div>
  )
}
export default App