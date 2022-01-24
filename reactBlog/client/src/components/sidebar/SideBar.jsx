import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './sidebar.css'

function SideBar() {

	const [cats, setCats] = useState([]);

	useEffect(()=>{
		const getCats = async () => {
			const res = await axios('/category');
			setCats(res.data)
		}
		getCats();
	}, []);



	return (
		<div className="sideBar">

				<div className="sideBarItem">
					<span className="sideBarTitle">About Me</span>
					<img 
						className="sideImg"
						src="https://pbs.twimg.com/profile_images/1359299696464912384/yF59pRq8_400x400.jpg" 
						alt="sideBarImg" 
					/>
					<p className="sideBarText">Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
				</div>

				<div className="sideBarItem">
					<span className="sideBarTitle">CATEGORIES</span>
					<ul className="sideBarList">
						{cats.map(c => (
							<Link key={c._id} to={`/?cat=${c.name}`} className="link">
								<li className="sideBarListItem">{c.name}</li>
							</Link>
						))}
					</ul>
				</div>

				<div className="sidebarItem">
					<span className="sideBarTitle">FOLLOW US</span>
					<div className="sideBarSocial">
						<i className="sideBarIcon fab fa-facebook"></i>
						<i className="sideBarIcon fab fa-twitter"></i>
						<i className="sideBarIcon fab fa-pinterest-p"></i>
						<i className="sideBarIcon fab fa-instagram"></i>
					</div>
				</div>
		</div>
	)
}

export default SideBar
