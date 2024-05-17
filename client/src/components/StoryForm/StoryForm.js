import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Input, Typography, Button } from "antd";
import FileBase64 from "react-file-base64";
import styles from "./styles";
import { Link } from "react-router-dom";

import { createStory, updateStory } from "../../actions/stories";

const { Title } = Typography;

export default function StoryForm({ selectedId, setSelectedId }) {
  // Redux state selectors
  const story = useSelector((state) =>
    selectedId ? state.stories.find((story) => story._id === selectedId) : null
  );
  const dispatch = useDispatch(); // Redux dispatch function
  const [form] = Form.useForm(); // Form instance

  // Retrieve user information from local storage
  const user = JSON.parse(localStorage.getItem("profile"));
  const username = user?.result?.username; // User's username

  // Form submission handler
  const onSubmit = (formValues) => {
    // Dispatch createStory or updateStory action based on selectedId
    selectedId
      ? dispatch(updateStory(selectedId, { ...formValues, username }))
      : dispatch(createStory({ ...formValues, username }));

    reset(); // Reset form after submission
  };

  // Effect to set form fields value if story exists
  useEffect(() => {
    if (story) {
      form.setFieldsValue(story);
    }
  }, [form, story]);

  // Reset form fields and selectedId state
  const reset = () => {
    form.resetFields();
    setSelectedId(null);
  };

  // Render message for non-authenticated users
  if (!user) {
    return (
      <Card styles={styles.formCard}>
        <Title level={4}>
          <span style={styles.formTitle}>Welcome to Instaverse!</span>
          <br />
          Please <Link to="/authform">Login</Link> or{" "}
          <Link to="/authform">register</Link> for sharing moments or ideas.
        </Title>
      </Card>
    );
  }

  // Render form for authenticated users
  return (
    <Card
      style={styles.formCard}
      title={
        <Title level={4} style={styles.formTitle}>
          {selectedId ? "Editing" : "Share"} a Story
        </Title>
      }
    >
      {/* Story form */}
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        size="middle"
        onFinish={onSubmit}
      >
        {/* Caption field */}
        <Form.Item name="caption" label="Caption" rules={[{ required: true }]}>
          <Input.TextArea allowClear autoSize={{ minRows: 2, maxRows: 6 }} />
        </Form.Item>

        {/* Tags field */}
        <Form.Item name="tags" label="Tags">
          <Input.TextArea allowClear autoSize={{ minRows: 2, maxRows: 6 }} />
        </Form.Item>

        {/* Image upload field */}
        <Form.Item name="image" label="Images" rules={[{ required: true }]}>
          <FileBase64
            type="file"
            multiple={false}
            onDone={({ base64 }) => {
              form.setFieldsValue({
                image: base64,
              });
            }}
          />
        </Form.Item>

        {/* Share button */}
        <Form.Item
          wrapperCol={{
            span: 16,
            offset: 6,
          }}
        >
          <Button type="primary" block htmlType="submit">
            Share
          </Button>
        </Form.Item>

        {/* Discard button (for editing mode) */}
        {!selectedId ? null : (
          <Form.Item
            wrapperCol={{
              span: 16,
              offset: 6,
            }}
          >
            <Button
              type="primary"
              block
              htmlType="button"
              danger
              onClick={reset}
            >
              Discard
            </Button>
          </Form.Item>
        )}
      </Form>
    </Card>
  );
}
