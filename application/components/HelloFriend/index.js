import markdown from '../../../README.md';

const HelloFriend = () => (
  <div className="hello">
    <div dangerouslySetInnerHTML={{ __html: markdown }} />
  </div>
);

export default HelloFriend;
