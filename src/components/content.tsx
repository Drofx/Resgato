import React from 'react'
import useSelector from '../utils/hooks/use-selector'

interface ContentContainerProps {
    className?: string
    children?: React.ReactNode
}

function ContentContainer(props:ContentContainerProps) {
  return (
    <div {...props}/>
  )
}

const ContentVariations = {
    default: (props: ContentContainerProps) =>
        <ContentContainer
            {...props}
            className='min-h-screen flex-col gap-6 items-center justify-center flex text-black py-16'
        />
}

const Content = useSelector<keyof typeof ContentVariations, ContentContainerProps>(ContentVariations)

export default Content