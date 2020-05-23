import React from 'react'
import Layout from "../layout"
import { useSpring, animated, config } from 'react-spring'
import { InputText } from '../input'
import { paint_calculate, multiLang } from '../helper'

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

export default function EditRoom({ edit, setBar, data, deleteData }) {
    const [typeData, setTypeData] = React.useState({
        name: data.name,
        width: data.sizes.width,
        height: data.sizes.height,
        length: data.sizes.length,
    })
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
                edit(data.id, paint_calculate(typeData))
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
                    <div className="w-11/12 mt-1 sm:w-container m-auto pt-5 pb-10">
                        <animated.div style={body} className="w-5/6 sm:w-1/2 m-auto mt-3 relative bg-white p-5 block box-border rounded-lg text-secondary">
                            <InputText label={multiLang("Room Name")} error={errors.name} placeholder="kamar" name="name" change={handleChange} value={typeData.name} />
                            <InputText label={multiLang("Room Length") + " (m)"} placeholder="3.5" name="length" type="number" value={typeData.length} change={handleChange} />
                            <InputText label={multiLang("Room Width") + " (m)"} placeholder="3" name="width" type="number" value={typeData.width} change={handleChange} />
                            <InputText label={multiLang("Room Height") + "(m)"} placeholder="4" name="height" type="number" value={typeData.height} change={handleChange} />
                            <div className="flex w-full mb-5 justify-center items-center">
                                <button onClick={() => deleteData(data.id)} className="py-3 w-full outline-none shadow-sec text-sm px-10 rounded-full text-white inline-block font-bold bg-danger">{multiLang("Delete")}</button>
                            </div>
                            <div className="flex w-full mb-1 justify-center items-center">
                                <button onClick={() => submit()} className="py-3 w-full outline-none shadow-sec text-sm px-10 rounded-full text-secondary inline-block font-bold bg-white">{multiLang("Update")}</button>
                            </div>
                        </animated.div>
                    </div>
                </Layout>
            </animated.div>
        </React.Fragment>
    )
}