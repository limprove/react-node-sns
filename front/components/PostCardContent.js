import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const PostCardContent = ({ postData }) => (
  <div>
    {postData.split(/(#[^\s#]+)/g).map((v) => {
      if (v.match(/(#[^\s#]+)/)) {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Link key={v} href={`/hashtag/${v.slice(1)}`}>
            <a>{v}</a>
          </Link>
        );
      }
      return v;
    })}
  </div>
);

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};
export default PostCardContent;
