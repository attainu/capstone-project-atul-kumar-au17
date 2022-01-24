import './topbar.css'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'

function TopBar() {

	const { user, dispatch } = useContext( Context )

	const handleLogout = () => {
		dispatch({ type: "LOGOUT"})
	}


	return (
		<div className='top'>

			<div className="topLeft">
				<i className="topIcon fab fa-facebook"></i>
				<i className="topIcon fab fa-twitter"></i>
				<i className="topIcon fab fa-pinterest-p"></i>
				<i className="topIcon fab fa-instagram"></i>
			</div>
			
			<div className="topCenter">
				<ul className="topList">
					<li className="topListItem">
						<Link className="link" to="/">HOME</Link>
					</li>
					<li className="topListItem">
						<Link className="link" to="/about">ABOUT</Link>
					</li>
					<li className="topListItem">
						<Link className="link" to="/contact">CONTACT</Link>
					</li>
					<li className="topListItem">
						<Link className="link" to="/write">WRITE</Link>
					</li>
					<li className="topListItem" onClick={handleLogout}>
						{ user && "LOGOUT" }
					</li>
				</ul>
			</div>
			
			<div className="topRight">

					{/* <img src={user.profilePic} alt="profilePic" className="topImage" /> */}
				
				{ user ? (
					<Link to="/settings">
						<img 
							className='topImage'
							src={user.profilePic} 
							alt="profile_img"
						/>
					</Link>
				) : <ul className="topList">
						<li className="topListItem">
							<Link className="link" to="/login">LOGIN</Link>
						</li> / 
						<li className="topListItem">
							<Link className="link" to="/register">REGISTER</Link>
						</li>
					</ul>
			}
				<i className='topSearchIcon fas fa-search'></i>
			</div>
			
		</div>
	)
}

export default TopBar
