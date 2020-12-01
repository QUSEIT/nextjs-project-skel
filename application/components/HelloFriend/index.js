import React from 'react';
import markdown from './README.md';
const HelloFriend = () => (
  <div className="hello">
    	<div dangerouslySetInnerHTML={{ __html: markdown}}></div>
  </div>
);

export default HelloFriend;
