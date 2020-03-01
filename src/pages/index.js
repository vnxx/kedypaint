import React from "react"
import { Link } from "gatsby"
import SEO from "../components/seo"
import Icons from "../components/icons"

import '../components/layout.css'

const IndexPage = () => (
  <React.Fragment>
    <SEO />
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-11/12 sm:w-container text-center text-white">
        <div className="w-full m-auto sm:w-3/5 mb-3">
          <h1 className="text-white text-4xl sm:text-5xl text-center font-bold">Estimasi Kebutuhan Cat</h1>
        </div>
        <div className="flex mb-5 justify-center items-center">
          <Link to="/dashboard" className="py-3 shadow-main px-10 rounded-full text-1xl sm:text-2xl text-secondary inline-block font-bold bg-white">Let’s Get Started</Link>
        </div>
        <div className="flex mb-1 justify-center items-center text-sm">
          <a className="flex" href="#" target="_blank" rel="noopener noreferrer"><Icons name='github' className='mr-2' /> github/vnxx/kedypaint</a>
        </div>
        <a href="https://bykevin.work"><p className="text-sm ">App by @keevnx</p></a>
      </div>
    </div>
  </React.Fragment>
)

export default IndexPage
