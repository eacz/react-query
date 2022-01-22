import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import './App.css'
import { InfinitePeople } from './people/InfinitePeople'
import { InfiniteSpecies } from './species/InfiniteSpecies'

const queryProvider = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryProvider}>
      <div className='App'>
        <h1>Infinite SWAPI</h1>
        <InfinitePeople />
        {/* <InfiniteSpecies /> */}
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
