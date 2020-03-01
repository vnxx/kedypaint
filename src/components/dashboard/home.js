import React from 'react'
import Layout from "../layout"
import { useSpring, animated, config } from 'react-spring'

export default function Dashboard({ data, setBar }) {

    const animate = useSpring({
        opacity: 1,
        marginTop: 0,
        from: {
            opacity: 0,
            marginTop: 500
        },
        config: config.slow
    })

    const ButtonAnimate = useSpring({
        opacity: 1,
        bottom: 0,
        from: {
            opacity: 0,
            bottom: -200,
        },
        config: config.slow,
        delay: 300
    })

    return (
        <React.Fragment>
            <Layout isnav={false}>
                <div className="w-11/12 pb-40 mt-40 sm:w-container">
                    <div className="flex flex-wrap -mx-2">
                        {data.map((item, i) => (
                            <animated.div className="p-2 w-full sm:w-1/3 relative" key={i} style={animate}>
                                <div className="bg-white cursor-pointer hover:shadow-main rounded-md text-secondary p-3 ">
                                    <p className="font-bold">{item.name}</p>
                                    <p className="font-light text-xs">{item.sizes.width}x{item.sizes.length}x{item.sizes.height} | {item.paintneeds} liter</p>
                                </div>
                            </animated.div>
                        ))}
                    </div>
                </div>
            </Layout>
            <div className="w-full flex justify-center">
                <animated.div onClick={() => setBar('new')} style={ButtonAnimate} className="bg-white cursor-pointer fixed bottom-0 mb-16 sm:mb-56 text-secondary text-sm px-10 font-bold rounded-full shadow-main py-3">Add New One</animated.div>
            </div>
        </React.Fragment>
    )
}