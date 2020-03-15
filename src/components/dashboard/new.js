import React from 'react'
import Layout from "../layout"
import { useSpring, animated, config } from 'react-spring'
import { InputText } from '../input'
import { paint_calculate } from '../helper'

const init = {
    name: '',
    width: '',
    length: '',
    height: '',
}

function validate(val) {
    let errors = {}
    if (val.name === "") {
        errors.name = true
    }
    if (val.width === 0 || val.width === "" || isNaN(val.width)) {
        errors.width = true
    }
    if (val.length === 0 || val.length === "" || isNaN(val.length)) {
        errors.length = true
    }
    if (val.height === 0 || val.height === "" || isNaN(val.height)) {
        errors.height = true
    }

    return errors
}

export default function NewRoom({ setData, setBar }) {
    const [typeData, setTypeData] = React.useState(init)
    const [errors, setErrors] = React.useState({});
    const [submited, setSubmited] = React.useState(false);

    const animate = useSpring({
        top: 0,
        from: {
            top: 1000,
        },
        config: config.slow
    })

    const body = useSpring({
        top: 0,
        from: {
            top: 1000,
        },
        config: config.slow,
        delay: 200
    })

    React.useEffect(() => {
        if (submited) {
            if (Object.keys(errors).length === 0) {
                setData(paint_calculate(typeData))
                setBar('home')
            } else {
                setSubmited(false)
            }
        }
    }, [errors, submited])

    function handleChange(e) {
        setTypeData({
            ...typeData,
            [e.target.name]: e.target.value
        })
    }

    function submit() {
        setErrors(validate(typeData))
        setSubmited(true)
    }

    return (
        <React.Fragment>
            <animated.div style={animate} className="absolute min-h-screen overflow-x-hidden w-full z-10 bg-primary">
                <Layout action={() => setBar('home')} isback={true}>
                    <div className="w-11/12 pt-5 pb-10 mt-1 sm:w-container m-auto">
                        <animated.div style={body} className="w-5/6 sm:w-1/2 m-auto relative bg-white p-5 block box-border rounded-lg text-secondary">
                            <InputText label="Room Name" error={errors.name} placeholder="kamar" name="name" change={handleChange} value={typeData.name} />
                            <InputText label="Room Length" error={errors.length} placeholder="3.5" name="length" type="number" value={typeData.length} change={handleChange} />
                            <InputText label="Room Width" error={errors.width} placeholder="3" name="width" type="number" value={typeData.width} change={handleChange} />
                            <InputText label="Room Height" error={errors.height} placeholder="4" name="height" type="number" value={typeData.height} change={handleChange} />
                            <div className="flex w-full mb-1 justify-center items-center">
                                <button onClick={() => submit()} className="py-3 outline-none shadow-sec text-sm px-10 rounded-full text-secondary inline-block font-bold bg-white">Calculate</button>
                            </div>
                        </animated.div>
                    </div>
                </Layout>
            </animated.div>
        </React.Fragment>
    )
}