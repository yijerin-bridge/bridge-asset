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
    id: "xurf1AGvsH8",
    title: "투자자 입장에서 본 단기납 종신보험, 논란 종결",
    topic: "보험",
  },
  {
    id: "PMEBiMONfZY",
    title: "비트코인 ETF로 자산배분하기",
    topic: "자산배분",
  },
];
