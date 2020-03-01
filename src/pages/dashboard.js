import React from 'react'
// import Icons from "../components/icons"
// import { Link } from "gatsby"
import EditRoom from '../components/dashboard/update'
import NewRoom from '../components/dashboard/new'
import Home from '../components/dashboard/home'

const INITIAL = [
    {
        id: 1,
        name: 'sample',
        paintneeds: 8.8,
        options: {
            layers: 2,
            wall_num: 4,
            plafon: true
        },
        sizes: {
            width: 3,
            length: 3.5,
            height: 4,
        }
    },
]

export default function Dashboard() {
    const [data, setData] = React.useState(JSON.parse(localStorage.getItem('myrooms')) || INITIAL);
    const [selectedBar, setSelectedBar] = React.useState('');
    const [dataEdit, setDataEdit] = React.useState({});

    function setNewData(new_d) {
        let all_d = [
            ...data,
            {
                id: data.length + 1,
                name: new_d.name,
                paintneeds: new_d.paintneeds,
                options: {
                    layers: 2,
                    wall_num: 4,
                    plafon: true
                },
                sizes: {
                    width: new_d.width,
                    length: new_d.length,
                    height: new_d.height,
                }
            }
        ]

        for (var i = 0; i < all_d.length; i++) {
            for (var j = 0; j < all_d.length; j++) {
                if (all_d[i].id > all_d[j].id) {
                    let temp = all_d[j]
                    all_d[j] = all_d[i]
                    all_d[i] = temp
                }
            }
        }

        setData(all_d)
    }

    function editData(id, edited) {
        setData(data.map(item => item.id === id ? {
            ...item,
            name: edited.name,
            paintneeds: edited.paintneeds,
            options: {
                layers: 2,
                wall_num: 4,
                plafon: true
            },
            sizes: {
                width: edited.width,
                length: edited.length,
                height: edited.height,
            }
        } : item))
    }

    function deleteData(id) {
        let old = [...data]
        const index = old.findIndex(x => x.id === id)
        old.splice(index, 1)
        setData(old)
        setSelectedBar('home')
    }

    React.useEffect(() => {
        if (Object.keys(dataEdit).length !== 0) {
            setSelectedBar('edit')
        }
    }, [dataEdit])

    React.useEffect(() => {
        if (selectedBar === 'home') {
            setDataEdit({})
        }
    }, [selectedBar])

    React.useEffect(() => {
        localStorage.setItem('myrooms', JSON.stringify(data))
    }, [data])

    return (
        <React.Fragment>
            <SwitchBar
                setSelectedBar={setSelectedBar}
                selectedBar={selectedBar}
                editData={editData}
                setNewData={setNewData}
                dataEdit={dataEdit}
                data={data}
                setDataEdit={setDataEdit}
                deleteData={deleteData}
            />
        </React.Fragment>
    )
}

function SwitchBar({ setSelectedBar, selectedBar, editData, setNewData, deleteData, dataEdit, data, setDataEdit }) {
    if (selectedBar === 'new') {
        return <NewRoom setBar={setSelectedBar} setData={setNewData} />
    } else if (selectedBar === 'edit') {
        return <EditRoom deleteData={deleteData} setBar={setSelectedBar} data={dataEdit} edit={editData} />
    } else {
        return <Home setDataEdit={setDataEdit} data={data} setBar={setSelectedBar} />
    }
}