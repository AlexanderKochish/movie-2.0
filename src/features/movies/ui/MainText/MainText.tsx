import s from './MainText.module.scss'

export const MainText = () => {
  return (
    <div className={s.container}>
      <h2 className={s.title}>
        Welcome to Movie 2.0 - an information portal with more than 500 thousand trailers!
      </h2>
      <p>
        With us you can easily and quickly find <br />
        the film you are interested in thanks to our
        <br />
        convenient search. We offer a wide selection
        <br /> of trailers of various genres and directions - from
        <br />
        classics to new releases, from dramas to action films.
        <br />
      </p>
    </div>
  )
}
