import { useMemo } from 'react'
import './index.less'

interface CardProps {
  title?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

export default (props: CardProps) => {
  const { title, children, className } = props
  const classNames = useMemo(
    () => [className, 'my-card'].join(' '),
    [className]
  )
  return (
    <div className={classNames}>
      {title && <header className="title">{title}</header>}
      <div className="content">{children}</div>
    </div>
  )
}
