import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Icons from './icons'

const Header = ({ siteTitle, action }) => (
  <header className="flex items-center justify-center block relative py-4 text-white z-20">
    <div className="w-11/12 mt-1 sm:w-container flex items-center">
      <span onClick={() => action()}>
        <Icons name="back" className="fill-current mr-3 cursor-pointer" />
      </span>
      <h1>{siteTitle || null}</h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
