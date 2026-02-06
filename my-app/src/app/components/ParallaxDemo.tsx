import { useRef } from 'react';
import { Parallax, ParallaxLayer, type IParallax } from '@react-spring/parallax';

// We'll use inline styles or standard class names since we added the CSS to index.css
// If you prefer modules, we can refactor, but for simplicity with the provided CSS:

interface PageProps {
    offset: number
    gradient: string
    onClick: () => void
}

const Page = ({ offset, gradient, onClick }: PageProps) => (
    <>
        <ParallaxLayer offset={offset} speed={0.2} onClick={onClick}>
            <div className="slopeBegin" />
        </ParallaxLayer>

        <ParallaxLayer offset={offset} speed={0.6} onClick={onClick}>
            <div className={`slopeEnd ${gradient}`} />
        </ParallaxLayer>

        <ParallaxLayer className="text number" offset={offset} speed={0.3}>
            <span>0{offset + 1}</span>
        </ParallaxLayer>
    </>
)

export function ParallaxDemo() {
    const parallax = useRef<IParallax>(null)

    const scroll = (to: number) => {
        if (parallax.current) {
            parallax.current.scrollTo(to)
        }
    }

    return (
        <div style={{ background: '#dfdfdf', height: '80vh', width: '100%' }}>
            <Parallax className="container" ref={parallax} pages={5} horizontal>
                <Page offset={0} gradient="pink" onClick={() => scroll(1)} />
                <Page offset={1} gradient="teal" onClick={() => scroll(2)} />
                <Page offset={2} gradient="tomato" onClick={() => scroll(3)} />
                <Page offset={3} gradient="purple" onClick={() => scroll(4)} />
                <Page offset={4} gradient="orange" onClick={() => scroll(0)} />
            </Parallax>
        </div>
    )
}
