import React from "react";
import { Row, Col, Spin } from "antd";
import Story from "../Story";
import { useSelector } from "react-redux";

function StoryList({ setSelectedId }) {
  // Selecting stories from Redux state
  const stories = useSelector((state) => state.stories);

  // Conditional rendering based on whether stories are available
  return !stories.length ? (
    // Display loading spinner if stories are not available yet
    <div style={{ textAlign: "center" }}>
      <Spin size="large" />
    </div>
  ) : (
    // Render the list of stories if available
    <Row gutter={[48, 32]}>
      {/* Mapping over stories array to render each story */}
      {stories.map((story) => {
        return (
          <Col key={story._id} lg={24} xl={12} xxl={8}>
            {/* Rendering Story component for each story */}
            <Story setSelectedId={setSelectedId} story={story} />
          </Col>
        );
      })}
    </Row>
  );
}

export default StoryList;