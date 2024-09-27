"use client"
import { useState } from "react";
import YouTube from "react-youtube";
import { tasks, Task } from "../data/learn";
import { AiFillYoutube } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import NavBar from "../components/NavBar";

const Learn: React.FC = () => {
	const [youtubePlayer, setYoutubePlayer] = useState({
		isOpen: false,
		videoId: "",
	});
	const closeModal = () => {
		setYoutubePlayer({ isOpen: false, videoId: "" })
	};
	return ( 
		<div className="p-5">
		<NavBar />
		<div className="mt-5">
		<table className='text-sm text-left sm:w-7/12 w-full max-w mx-auto'>
		<thead className='text-xs text-gray-700 uppercase border-b '>
            <tr>
              <th scope='col' className='px-6 py-3 w-0 font-medium'>
                Title
              </th>
              <th scope='col' className='px-6 py-3 w-0 font-medium'>
                Complexity
              </th>
              <th scope='col' className='px-6 py-3 w-0 font-medium'>
                Technology
              </th>
              <th scope='col' className='px-6 py-3 w-0 font-medium'>
                How
              </th>
            </tr>
        </thead>			
		<tbody>
		{tasks.map((task : Task, idx : number) => {
            const complexityColor = task.complexity === "low" ? "text-green-400" : task.complexity === "medium" ? "text-yellow-400" : "text-red-400";
			return (<tr className={`${idx % 2 == 1 ? "bg-zinc-100" : ""}`} key={task.id}>				<td className='px-6 py-4'>
					{task.title}
				</td>
				<td className={`px-6 py-4 ${complexityColor}`}>{task.complexity}</td>
				<td className={"px-6 py-4"}>{task.technology}</td>
				<td className={"px-6 py-4"}>
					{task.videoId ? (
						<AiFillYoutube
							fontSize={"28"}
							className='cursor-pointer hover:text-red-600'
							onClick={() =>
								setYoutubePlayer({ isOpen: true, videoId: task.videoId as string })
							}
						/>
					) : (
						<p>Coming soon</p>
					)}
				</td>
			</tr>)})}
		</tbody>
		</table>
		</div>
		{youtubePlayer.isOpen && (
			<div className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center'>
				<div
					className='bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute'
					onClick={closeModal}
				></div>
				<div className='w-full z-50 h-full px-6 relative max-w-4xl'>
					<div className='w-full h-full flex items-center justify-center relative'>
						<div className='w-full relative'>
							<IoClose
								fontSize={"35"}
								className='cursor-pointer absolute -top-16 right-0'
								onClick={closeModal}
							/>
							<YouTube
								videoId={youtubePlayer.videoId}
								loading='lazy'
								iframeClassName='w-full min-h-[500px]'
							/>
						</div>
					</div>
				</div>
			</div>
		)}		
		</div>
	);
};
export default Learn;
