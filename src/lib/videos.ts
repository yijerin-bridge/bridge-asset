// 홈에 노출할 유튜브 영상 목록.
// id는 영상 주소(youtube.com/watch?v=OOO)의 v= 뒤 11자리입니다.
// 순서대로 표시되며, 이 배열만 고치면 홈 화면이 바뀝니다.
export type Video = { id: string; title: string; topic: string };

export const videos: Video[] = [
  {
    id: "u75n31Ye1mc",
    title: "세금과 인플레이션으로부터 내 자산을 지키는 노아의 방주",
    topic: "자산관리 강의",
  },
  {
    id: "BkqVkhhHniY",
    title: "경기침체기에 설립된 유니콘기업",
    topic: "스타트업 투자",
  },
  {
    id: "PMEBiMONfZY",
    title: "비트코인 ETF로 자산배분하기",
    topic: "자산배분",
  },
];
