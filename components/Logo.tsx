import React from 'react'

const Logo: React.FC = () => {
    return (
		<img
			src="src\lumina-logo.svg"
			alt=""
			className="w-8 fill-current text-logo"
		/>
		// <div className="w-10 h-10 bg-logo rounded-xl flex items-center justify-center shadow-lg shadow-primary-900/20">
		// </div>
	);
}

export default Logo;
