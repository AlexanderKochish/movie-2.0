import { useGetGenresQuery } from '@/features/movies/api/movie-api'
import { GenerateSelectArgs, GenresArgs } from '@/features/movies/types/movies.types'
import { useRouter } from 'next/router'
type Props = {
  genreType: string
}
export const useFilterGenerete = ({ genreType }: Props) => {
  const { data: genre } = useGetGenresQuery({ name: genreType }, { skip: !genreType })
  const router = useRouter()

  const genObj = genre?.genres.find(genre => genre.name == router.query.genre)
  const date = new Date()
  const genreList = genre?.genres.map((gen: GenresArgs, i) => ({
    label: i === 0 ? 'Genres' : gen.name,
    name: 'genre',
    value: String(gen.id),
  }))

  const generateArr = ({ defaultName, length, name, opts }: GenerateSelectArgs) => {
    return Array.from({ length }, (_, i) => ({
      label: i === 0 ? defaultName : String(opts ? opts + i + 1 : i + 1),
      name,
      value: String(opts ? opts + i + 1 : i + 1),
    })).reverse()
  }

  const years = generateArr({
    defaultName: 'All',
    length: date.getFullYear() - 1950,
    name: 'year',
    opts: 1950,
  })
  const rating = generateArr({ defaultName: 'All', length: 10, name: 'rating' })

  return {
    genId: genObj?.id,
    genreList,
    rating,
    years,
  }
}
