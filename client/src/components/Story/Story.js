import React, { useState } from "react";
import { Card, Tooltip, Typography, Image } from "antd";
import styles from "./styles";
import { EditOutlined, DeleteTwoTone, HeartTwoTone } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import moment from "moment";
import { deleteStory, likeStory } from "../../actions/stories";

const { Meta } = Card;
const { Link, Paragraph, Text } = Typography;

function Story({ story, setSelectedId }) {
  // Redux dispatch function
  const dispatch = useDispatch();
  // State to manage expanded view of story content
  const [expand, setExpand] = useState(true);
  // Retrieve user information from local storage
  const user = JSON.parse(localStorage.getItem("profile"));
  const handleDelete = () => {
    // Dispatch deleteStory action
    dispatch(deleteStory(story._id));
    // Remove the story from the UI immediately
    // This assumes that the stories are stored in a Redux store
    // and the state is updated accordingly when the delete action is dispatched
    // If not, you may need to manage the state locally in this component
    // and update it accordingly
    // For example, you could have a local state array of stories and remove the deleted story from it
  };

  // Actions to be displayed on the story card
  const cardActions = [
    // Like action
    <div style={styles.actions}>
      <Tooltip
        placement="top"
        title="Like"
        color="magenta"
        onClick={() => {
          dispatch(likeStory(story._id)); // Dispatch likeStory action
        }}
      >
        <HeartTwoTone twoToneColor="magenta" />
        &nbsp; {story.likes.length} &nbsp;
      </Tooltip>
    </div>,
    // Edit action
    <Tooltip placement="top" title="Edit">
      <EditOutlined
        onClick={() => {
          setSelectedId(story._id); // Set selected story ID for editing
        }}
      />
    </Tooltip>,
    // Delete action
    <Tooltip placement="top" title="Delete" color="red">
      <DeleteTwoTone twoToneColor="red" onClick={handleDelete} />
    </Tooltip>,
  ];

  return (
    // Card component displaying the story
    <Card
      style={styles.card}
      cover={<Image src={story.image} />} // Story image as cover
      actions={
        // Conditionally render card actions based on user's ownership of the story
        user?.result?._id === story?.userId
          ? cardActions // Display all actions if user owns the story
          : user?.result
          ? cardActions.slice(0, 1) // Display only like action if user doesn't own the story
          : null
      }
    >
      {/* Metadata section */}
      <Meta title={story.username} />
      {/* Story caption */}
      <Paragraph
        style={{ margin: 0 }}
        // Ellipsis configuration for long captions
        ellipsis={{
          rows: 2,
          expandable: true,
          symbol: "more",
          onExpand: () => {
            setExpand(true);
          },
          onEllipsis: () => {
            setExpand(false);
          },
        }}
      >
        {story.caption}
      </Paragraph>
      {/* Render tags if story content is expanded */}
      {expand ? (
        <Link href="#">{story.tags.split(" ").map((tag) => `#${tag}`)}</Link>
      ) : null}
      <br />
      {/* Display relative post date */}
      <Text type="secondary">{moment(story.postDate).fromNow()}</Text>
    </Card>
  );
}

export default Story;
