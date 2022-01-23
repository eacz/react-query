import InfiniteScroll from 'react-infinite-scroller'
import { useInfiniteQuery } from 'react-query'
import { Species } from './Species'

const initialUrl = 'https://swapi.dev/api/species/'
const fetchUrl = async (url) => {
  const response = await fetch(url)
  return response.json()
}

export function InfiniteSpecies() {
  const { data, hasNextPage, fetchNextPage, isLoading, isError, error, isFetchingNextPage } =
    useInfiniteQuery('species', ({ pageParam = initialUrl }) => fetchUrl(pageParam), {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    })

  if (isLoading) return <div className='loading'>Loading...</div>
  if (isError) return <div className='error'>{error}</div>

  return (
    <>
      <InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage}>
        {data.pages.map((pageData) => {
          return pageData.results.map((specie) => (
            <Species
              averageLifespan={specie.average_lifespan}
              name={specie.name}
              key={specie.name}
              language={specie.language}
            />
          ))
        })}
      </InfiniteScroll>
      {isFetchingNextPage && <p className='loading' >Loading more...</p>}
    </>
  )
}
