import InfiniteScroll from 'react-infinite-scroller'
import { useInfiniteQuery } from 'react-query'
import { Person } from './Person'

const initialUrl = 'https://swapi.dev/api/people/'
const fetchUrl = async (url) => {
  const response = await fetch(url)
  return response.json()
}

export function InfinitePeople() {
  //data : the data that return the fetching function
  //fetchNextPage : function that will fetch the next page when is called  
  //hasNextPage :   indicates if exists a next page to fetch
  //isLoading :  indicates if the first fetch was made
  //isFetchingNextPage : indicates if the next page if being fetched
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage, isError, error } = useInfiniteQuery(
    //query key
    'people',
    // function that fetch the data, pageParam is undefined the first time, so its necessary to declare a default value
    //the next time it will take what getNextPageParam returns
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      //function that returns the next page URL to fetch
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  )

  if (isLoading) return <h2 className='loading' >Loading...</h2>
  if (isError) return <h2 className='loading' >{error}</h2>
  

  return (
    <>
      <InfiniteScroll data={data.pages.results} loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((pageData) => {
          return pageData.results.map((person) => (
            <Person
              name={person.name}
              key={person.name}
              eyeColor={person.eye_color}
              hairColor={person.hair_color}
            />
          ))
        })}
      </InfiniteScroll>
      {isFetchingNextPage && <p className='loading'>Loading more...</p>}
    </>
  )
}
