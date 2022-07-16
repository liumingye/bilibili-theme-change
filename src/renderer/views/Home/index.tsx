import { Col, Row } from 'antd';
import VideoItem from '../../component/VideoItem';
import Style from './style';
import { getVideoList } from '../../api/videoList';

export default () => {
  getVideoList({ id: 1, page: 1 });
  return (
    <Style>
      <Row gutter={24}>
        <Col span={6} xl={4}>
          <VideoItem />
        </Col>
        <Col span={6} xl={4}>
          <VideoItem />
        </Col>
        <Col span={6} xl={4}>
          <VideoItem />
        </Col>
        <Col span={6} xl={4}>
          <VideoItem />
        </Col>
        <Col span={6} xl={4}>
          <VideoItem />
        </Col>
        <Col span={6} xl={4}>
          <VideoItem />
        </Col>
        <Col span={6} xl={4}>
          <VideoItem />
        </Col>
        <Col span={6} xl={4}>
          <VideoItem />
        </Col>
        <Col span={6} xl={4}>
          <VideoItem />
        </Col>
        <Col span={6} xl={4}>
          <VideoItem />
        </Col>
        <Col span={6} xl={4}>
          <VideoItem />
        </Col>
        <Col span={6} xl={4}>
          <VideoItem />
        </Col>
        <Col span={6} xl={4}>
          <VideoItem />
        </Col>
        <Col span={6} xl={4}>
          <VideoItem />
        </Col>
        <Col span={6} xl={4}>
          <VideoItem />
        </Col>
        <Col span={6} xl={4}>
          <VideoItem />
        </Col>
        <Col span={6} xl={4}>
          <VideoItem />
        </Col>
        <Col span={6} xl={4}>
          <VideoItem />
        </Col>
        <Col span={6} xl={4}>
          <VideoItem />
        </Col>
        <Col span={6} xl={4}>
          <VideoItem />
        </Col>
        <Col span={6} xl={4}>
          <VideoItem />
        </Col>
        <Col span={6} xl={4}>
          <VideoItem />
        </Col>
      </Row>
    </Style>
  );
};
