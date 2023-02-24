import React from "react";

function Notifications({ postAuthor, postText }) {
  return (
    <div>
      <p className="mb-3">Today</p>
      <div className="bg-deepBlue w-full rounded-tr-xl rounded-tl-xl text-white py-4 mb-[1px] px-12">
        {postAuthor} commented on your post
        <div>{postText}</div>
      </div>
    </div>
  );
}

export default Notifications;
