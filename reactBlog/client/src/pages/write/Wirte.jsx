
import React, { useContext, useState } from 'react'
// import TextEditor from '../../components/textEditor/TextEditor'
import { Context } from '../../context/Context'
import './write.css'
// import JoditEditor from 'jodit-react';

import axios from 'axios';



function Wirte() {

	const [ title, setTitle ] = useState("")
	const [ desc, setDesc ]   = useState("")
	const [ file, setFile ]   = useState("")

	const { user } = useContext(Context)

	// const editor = useRef(null)


	async function handleSubmit(e) {

		e.preventDefault();
		
		const newPost = {
			username: user.username,
			title,
			desc,
		};

		if (file) {
			console.log(file)
			const data = new FormData();
			const filename = Date.now() + file.name;
			data.append("name", filename);
			data.append("file", file);
			console.log(data);
			newPost.photo = filename
			console.log("filename", filename)

			try {
				await axios.post("/upload", data);
			} catch (error) {
				console.log(error);
			}
		}
		try {
			const res = axios.post("/posts", newPost);
			window.location.replace("/post"+res.data._id)
		} catch (error) {}
	};

	console.log(file)


	return (

		<div className="write">
			{file && (
		
				<img 
					className="writeImg"
					src={URL.createObjectURL(file)} 
					alt="img" 
				/>
			)}
			<form className="writeForm" onSubmit={handleSubmit}>

				<div className="writeFormGroup">
					
					<label htmlFor="fileInput">
						<i className="writeIcon fas fa-plus"></i>
					</label>

					<input 
						type="file" 
						id="fileInput" 
						style={{display: "none"}} 
						onChange={e=>setFile(e.target.files[0])}
					/>

					<input 
						type="text" 
						placeholder="Title" 
						className="writeInput" 
						autoFocus={true} 
						onChange={(e)=>setTitle(e.target.value)}
					/>

				</div>

				<div className="writeFormGroup">
				
					{/* <TextEditor /> */}
				
					<textarea 
						placeholder="Tell your story..." 
						type="text" 
						className="writeInput wirteText"
						onChange={(e)=>setDesc(e.target.value)}
					></textarea>
					
					{/* <JoditEditor
						ref={editor}
						onChange={content=>setValue(content)}
						config={config}
					/> */}
					
				</div>

				<button className="writeSubmit" type="submit">Publish</button>
				
			</form>
		</div>
	)
}

export default Wirte

