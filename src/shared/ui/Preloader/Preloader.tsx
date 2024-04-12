import clsx from 'clsx'

import s from './Preloader.module.scss'

type Props = {
  className?: string
  height?: string
  width?: string
}
export const Preloader = ({ className, height = '150', width = '150' }: Props) => {
  return (
    <div className={clsx(s.wrapper, className && s[className])}>
      <svg
        height={height}
        preserveAspectRatio={'xMidYMid'}
        style={{ background: 'inherit', display: 'block', shapeRendering: 'auto' }}
        viewBox={'0 0 100 100'}
        width={width}
        xmlns={'http://www.w3.org/2000/svg'}
        xmlnsXlink={'http://www.w3.org/1999/xlink'}
      >
        <g>
          <circle
            cx={'50'}
            cy={'50'}
            fill={'none'}
            r={'35'}
            stroke={'#4babf8'}
            strokeDasharray={'164.93361431346415 56.97787143782138'}
            strokeWidth={'10'}
          >
            <animateTransform
              attributeName={'transform'}
              dur={'1s'}
              keyTimes={'0;1'}
              repeatCount={'indefinite'}
              type={'rotate'}
              values={'0 50 50;360 50 50'}
            ></animateTransform>
          </circle>
          <g></g>
        </g>
      </svg>
    </div>
  )
}
