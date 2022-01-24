import './header.css'

function Header() {
	return (
		<div className="header">
			<div className="headerTitles">
				<span className="headerTitleSm"><i>React & Node</i></span>
				<span className="headerTitleLg"><i>Blog</i></span>
			</div>
			<img 
				className="headerImg"
				src="https://cdn.allthings.how/wp-content/uploads/2020/10/allthings.how-how-to-change-your-profile-picture-on-google-meet-profile-photo.png" 
				alt="headerImg" 
			/>
		</div>
	)
}

export default Header
