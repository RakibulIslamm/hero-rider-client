import NavBar from "./Components/NavBar"
import useListenAuth from "./Hooks/useListenAuth"
import Layout from "./Layout/Layout"

function App() {

  const authChecked = useListenAuth();

  return (
    <>
      {!authChecked ?
        <div className="w-full h-screen flex justify-center items-center">
          <h2 className="text-4xl font-bold text-gray-400">Loading....</h2>
        </div>
        : <div className="bg-gradient-to-bl from-[#ffe9f0] to-[#B5FFFC] min-h-screen">
          <Layout />
        </div>}
    </>
  )
}

export default App
