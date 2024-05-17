import React , {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import StoryForm from "../StoryForm";
import StoryList from "../StoryList";
import { Layout } from "antd";
import styles from './styles';
import { getStories } from "../../actions/stories";
const { Sider, Content } = Layout; // Destructuring Layout components

const Home = () => {
  // Redux dispatch function
  const dispatch = useDispatch();
  // State to manage selected story ID
  const [selectedId, setSelectedId] = useState(null);

  // Fetch stories when component mounts
  useEffect(() => {
    dispatch(getStories());
  }, [dispatch]);

  return (
    // Main layout for home page
    <Layout>
      {/* Sidebar for story form */}
      <Sider style={styles.sider} width={400}>
        {/* Render StoryForm component */}
        <StoryForm selectedId={selectedId} setSelectedId={setSelectedId} />
      </Sider>
      {/* Content area for story list */}
      <Content style={styles.content}>
        {/* Render StoryList component */}
        <StoryList setSelectedId={setSelectedId} />
      </Content>
    </Layout>
  );
};

export default Home;