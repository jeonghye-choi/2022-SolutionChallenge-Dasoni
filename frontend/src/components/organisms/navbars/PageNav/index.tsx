import * as React from "react";
import { useState, useCallback } from "react";
import { Link } from "react-router-dom";

import { PageNavWrap } from "./styles";

export interface NavPages {
  currentPage: "Diary" | "Statistics" | "Feed" | string;
}

function PageNav(props: NavPages) {
  const [clickedPage, setClickedPage] = useState(props.currentPage);

  const onNavItemClicked = useCallback(
    (page: string) => {
      setClickedPage(page);
    },
    [clickedPage]
  );

  return (
    <PageNavWrap>
      <Link to="/">
        <div
          className={clickedPage === "Diary" ? "nav-item current" : "nav-item"}
          onClick={() => onNavItemClicked("Diary")}
        >
          Diary
        </div>
      </Link>

      <Link to="/statistics">
        <div
          className={
            clickedPage === "Statistics" ? "nav-item current" : "nav-item"
          }
          onClick={() => onNavItemClicked("Statistics")}
        >
          Statistics
        </div>
      </Link>

      <Link to="/feed">
        <div
          className={clickedPage === "Feed" ? "nav-item current" : "nav-item"}
          onClick={() => onNavItemClicked("Feed")}
        >
          Feed
        </div>
      </Link>
    </PageNavWrap>
  );
}

export default PageNav;
