import React from 'react'
import Layout from "../layout"
import { useSpring, animated, config } from 'react-spring'
import { InputText } from '../input'

const init = {
    name: 'kevin',
    width: 3,
    length: 3.5,
    height: 4,
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

    function calculate(val) {
        // console.log(val)

        // formula https://www.pratamabangunan.com/id/tips-and-trick/panduan-penghitungan-kebutuhan-cat

        // Hitung luas permukaan bidang dinding atau tembok yang akan dicat.
        // Tinggi x Lebar x Jumlah dinding | contoh Dinding: 4m x 5m x 4 dinding = 80m2

        const wall_num = 4
        const wall_calc = val.length * val.width * wall_num
        // console.log('wall calc: ' + wall_calc)

        // Hitung luas bidang permukaan plafon.
        // Panjang x Lebar | contoh Plafon: 3m x 4m = 12m2
        const plafon_calc = val.length * val.width
        // console.log('plafon calc: ' + plafon_calc)

        // jumlahkan total luas bidang tersebut.
        // Total luas dinding + Total luas plafon | contoh 80m2 + 12m2 = 92m2
        let surface_area = wall_calc + plafon_calc
        // console.log('surface area:' + surface_area)

        // Hitung luas bidang yang dicat dengan cara kurangi luas pintu dan jendela (jika ada).
        // Total luas dinding & plafon – Luas pintu & jendela | Contoh Luas pintu: 2m x 0.5m = 1m2 -> 92m2 – 1 m2 = 91m2
        // i'll skip this one

        // Luas bidang yang akan dicat dibagi dengan daya sebar cat per liter. 
        // Satu galon memiliki daya sebar teoritis 12m2 dengan 2 lapis pengecatan, 
        // maka jumlah yang dibutuhkan secara teoritis sebagai berikut.
        // (Total luas bidang : Daya sebar teoritis) x Jumlah lapisan pengecatan | contoh (91m2 : 12) x 2 = 15,2 liter
        const scattering = 12
        const layers = 2
        const total = (surface_area / scattering) * layers //Liter

        return {
            name: val.name,
            width: val.width,
            length: val.length,
            height: val.height,
            paintneeds: total.toFixed(1)
        }
    }

    React.useEffect(() => {
        if (submited) {
            if (Object.keys(errors).length === 0) {
                setData(calculate(typeData))
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
                    <div className="w-11/12 mt-1 sm:w-container -mt-20 flex justify-center items-center min-h-screen">
                        <animated.div style={body} className="w-5/6 sm:w-1/2 relative bg-white p-5 block box-border rounded-lg text-secondary">
                            <InputText label="Room Name" error={errors.name} placeholder="kamar" name="name" change={handleChange} value={typeData.name} />
                            <InputText label="Room Length" error={errors.length} name="length" type="number" value={typeData.length} change={handleChange} />
                            <InputText label="Room Width" error={errors.width} name="width" type="number" value={typeData.width} change={handleChange} />
                            <InputText label="Room Height" error={errors.height} name="height" type="number" value={typeData.height} change={handleChange} />
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