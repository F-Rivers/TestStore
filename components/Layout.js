import React from "react";
import Nav from "./Nav";

// the app is a child of the Layout
function Layout({ children }) {
	return (
		// makes sure the layout takes up the whole screen
		<div className='flex flex-col justify-between min-h-screen'>
			<Nav />
			<main>{children}</main>
			<footer>Footer</footer>
		</div>
	);
}

export default Layout;
