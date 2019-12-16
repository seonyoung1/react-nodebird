import React from "react";
import Link from "next/link";

const Header = () => {
	return (
		<header>
			<nav>
				<ul>
					<li>
						<Link href="/"><a>노드버드</a></Link>
					</li>
					<li>
						<Link href="/profile"><a>프로필</a></Link>
					</li>
					<li>
						<div className="search">
							<input type="text" />
							<button type="button">Search</button>
						</div>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
