import { useMemo } from 'react'
import { Skeleton } from 'antd'
import './index.less'

interface CardProps {
  title?: React.ReactNode
  children?: React.ReactNode
  className?: string
  loading?: boolean
}

export default (props: CardProps) => {
  const { title, children, className, loading } = props
  const classNames = useMemo(
    () => [className, 'my-card'].join(' '),
    [className]
  )
  return (
    <div className={classNames}>
      {title && <header className="title">{title}</header>}
      <div className="content">{loading ? <Skeleton /> : children}</div>
    </div>
  )
}
