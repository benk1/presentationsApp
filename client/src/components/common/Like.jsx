import React from 'react';
import Presenter from '../Presenter';
//Input: liked: boolean
//Output: onClick
const Like = ({ liked, onHandleToggle }) => {
	// const rst = liked ? count++ : count--;
	// console.log('LIKEEE', liked);
	let classes = 'fa fa-heart';
	//const rst = classes ? count++ : null;
	// if (!liked) classes += '-o';
	if (!liked) {
		classes += '-o';
		//count--;
	}
	return (
		<>
			<i
				className='like'
				style={{ cursor: 'pointer' }}
				onClick={onHandleToggle}
				className={classes}
				aria-hidden='true'
			/>
		</>
	);
};

export default Like;