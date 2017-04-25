const lgCard = {
  coverSrc: 'https://www.smashingmagazine.com/wp-content/uploads/images/space-photography/space-photography-134.jpg',
  title: '微型迷你投影機家庭劇院神器迷你投影機',
  description: '希望有Professional版，並能當場面交並能當場面交並...',
  lastDayCount: 3,
  ownBy: {
    avatarSrc: 'http://r.fod4.com/c=sq/s=w1000,pd1/o=80/http://p.fod4.com/p/channels/qpztk/profile/ToJNnsiRhmm405cz7CPX_charlize-theron-head-shot.jpg',
    username: 'ZoeShih0312',
  },
};
const mdCard = Object.assign({}, lgCard, { description: null });
const smCard = Object.assign({}, lgCard, { coverSrc: null });
const xsCard = Object.assign({}, lgCard, { coverSrc: null, description: null });
const samples = [
  lgCard, lgCard, lgCard,
  mdCard, mdCard, mdCard, mdCard, mdCard, mdCard, mdCard,
  smCard, smCard, smCard, smCard,
  xsCard, xsCard,
];
const cards = [...Array(30).keys()].map(() => (
  samples[Math.floor(Math.random() * samples.length)]
));
export default cards;
