import './App.css'
import FormBox from './components/FormBox'

const App = () => {
  return (
    <div className='w-full h-screen relative'>
      {/* Background with blur */}
      <div className='absolute inset-0 w-full h-full bg-[url(./assets/DarkSky.png)] blur-xs bg-no-repeat bg-cover'></div>
      
      {/* FormBox without blur */}
      <div className='relative z-10 w-full h-screen'>
        <FormBox />
      </div>
    </div>
  )
}

export default App