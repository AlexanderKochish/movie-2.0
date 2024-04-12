import Head from 'next/head'
type Props = {
  content?: string
  name?: string
}
export const Meta = ({ content, name }: Props) => {
  return (
    <Head>
      <title>Create Next App</title>
      <meta content={content} name={name} />
      <meta content={'width=device-width, initial-scale=1'} name={'viewport'} />
      <link href={'/favicon.ico'} rel={'icon'} />
    </Head>
  )
}
