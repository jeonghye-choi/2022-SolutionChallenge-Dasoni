import * as React from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import useSWR from "swr";
import { Link } from "react-router-dom";

import { DASONI_BACKEND_API } from "secret";
import { diariesAtom, DiaryTypes } from "recoil/Diary";
import useDiaryActions from "hooks/useDiaryActions";

import DailyCalendar from "components/molecules/calendars/DailyCalendar";
import DiaryContentBox from "components/molecules/boxes/DiaryContentBox";
import ToggleSwitchButton from "components/atoms/buttons/ToggleSwitchButton";
import ShadowBox from "components/molecules/boxes/ShadowBox";
import WriteButton from "components/atoms/buttons/WriteButton";

import {
  DiaryArticle,
  QuoteArticle,
  Quote,
  RecentMoodLink,
  WeeklyMoodArticle,
  Notification,
} from "./styles";

import arrow_right from "assets/icons/arrow-right.png";
import very_sad from "assets/emotionIcons/very_sad.svg";
import sad from "assets/emotionIcons/sad.svg";
import normal from "assets/emotionIcons/normal.svg";
import happy from "assets/emotionIcons/happy.svg";
import very_happy from "assets/emotionIcons/very_happy.svg";
import Nav from "components/organisms/Nav";

function Diary() {
  const [diaries, setDiaries] = useRecoilState<DiaryTypes[]>(diariesAtom);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [day, setDay] = useState(new Date().getDate());
  const diaryActions = useDiaryActions();

  useSWR(`${DASONI_BACKEND_API}/diaries`, (url) =>
    diaryActions.getDiaries(url, { year, month })
  );

  return (
    <>
      <Nav />
      <QuoteArticle>
        <ShadowBox>
          <Quote>
            <div className="date">
              {day} {month}, {year}
            </div>
            <div className="quote">
              Whether you think you can or you think you can't, you're right.
            </div>
            <div className="author">Anne Frank</div>
          </Quote>
        </ShadowBox>
      </QuoteArticle>

      <RecentMoodLink>
        <span>Your recent mood</span>
        <Link to="/weekly">
          <img src={arrow_right} />
        </Link>
      </RecentMoodLink>

      <WeeklyMoodArticle>
        <Link to="/weekly">
          <ShadowBox align="center">
            <div className="date">
              {month}.{day - 7} - {month}.{day}
            </div>
            <div className="emotion-icon">
              <img src={very_sad} />
            </div>
            <div className="suggestion">
              Mommy, you look Very Sad recently. Why don’t you share yours
              stories?
            </div>
          </ShadowBox>
        </Link>
      </WeeklyMoodArticle>

      <DiaryArticle>
        <DailyCalendar>Jan 2022</DailyCalendar>
        <Notification>
          <span>Notification</span>
          <ToggleSwitchButton />
        </Notification>
        <section>
          {diaries &&
            diaries.map((diary) => (
              <DiaryContentBox
                key={diary.diaryId}
                created_date={diary.date}
                title={diary.title}
                content={diary.content}
              />
            ))}
        </section>
      </DiaryArticle>

      <WriteButton />
    </>
  );
}

export default Diary;
