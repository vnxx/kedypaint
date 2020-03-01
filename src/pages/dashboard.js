import React from 'react'
// import Icons from "../components/icons"
// import { Link } from "gatsby"
import NewRoom from '../components/dashboard/new'
import Home from '../components/dashboard/home'

const INITIAL = [
    {
        id: 1,
        name: 'sample',
        paintneeds: 8.8,
        sizes: {
            width: 3,
            length: 3.5,
            height: 4,
        }
    },
]

export default function Dashboard() {
    const [data, setData] = React.useState(INITIAL);
    const [selectedBar, setSelectedBar] = React.useState('');

    function updateData(new_d) {
        let all_d = [
            ...data,
            {
                id: data.length + 1,
                name: new_d.name,
                paintneeds: new_d.paintneeds,
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

    function SwitchBar() {
        if (selectedBar === 'new') {
            return <NewRoom setBar={setSelectedBar} setData={updateData} />
        } else {
            return <Home data={data} setBar={setSelectedBar} />
        }
    }

    return (
        <React.Fragment>
            <SwitchBar />
        </React.Fragment>
    )
}