import React, { useState } from "react";
import Link from "next/link";
import {useRouter} from "next/router";

const Header = () => {
	const Router = useRouter();
	const [open, setOpen] = useState(false);

	const onOpenSearch = () => {
		setOpen(!open);
	};

	return (
		<header>
			<nav>
				<ul>
					<li className={Router.pathname === "/" ? "current" : ""}>
						<Link href="/"><a>노드버드</a></Link>
					</li>
					<li className={Router.pathname === "/profile" ? "current" : ""}>
						<Link href="/profile"><a>프로필</a></Link>
					</li>
					<li className="search">
						<button className="open_search" onClick={onOpenSearch}>검색창열기</button>
						<div className={open? "is-opened" : ""}>
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
