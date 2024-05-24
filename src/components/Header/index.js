import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <>
      <nav className="nav-header">
        <div className="nav-content">
          <div className="nav-bar-mobile-container">
            <Link to="/">
              <img
                src="https://th.bing.com/th/id/R.240f34355ff6a18800af9581f6b5eeab?rik=5HHG75UX2kjcBA&riu=http%3a%2f%2fbrand.opportunity.org%2fimages%2fmark3_2.png&ehk=i4aqQT2nMo9g66YxQUEoahQFMm7IIEvb7dDgNx91LA4%3d&risl=&pid=ImgRaw&r=0"
                className="website-logo"
                alt="website logo"
              />
            </Link>
            <ul className="nav-bar-mobile-icons-container">
              <li>
                <Link to="/">
                  <AiFillHome className="nav-item-mobile-link" />
                </Link>
              </li>
              <li>
                <Link to="/jobs">
                  <BsFillBriefcaseFill className="nav-item-mobile-link" />
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  aria-label="Mute volume"
                  className="nav-mobile-btn"
                  onClick={onClickLogout}
                >
                  <FiLogOut />
                </button>
              </li>
            </ul>
          </div>

          <div className="nav-bar-large-container">
            <Link to="/">
              <img
                className="website-logo"
                src="https://th.bing.com/th/id/R.240f34355ff6a18800af9581f6b5eeab?rik=5HHG75UX2kjcBA&riu=http%3a%2f%2fbrand.opportunity.org%2fimages%2fmark3_2.png&ehk=i4aqQT2nMo9g66YxQUEoahQFMm7IIEvb7dDgNx91LA4%3d&risl=&pid=ImgRaw&r=0"
                alt="website logo"
              />
            </Link>
            <ul className="nav-menu">
              <li className="nav-menu-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>

              <li className="nav-menu-item">
                <Link to="/jobs" className="nav-link">
                  Jobs
                </Link>
              </li>
            </ul>
            <div className="large-device-button-container">
              <button
                type="button"
                className="logout-desktop-btn"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default withRouter(Header)
