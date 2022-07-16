import Style from './style';

const Image = () => {
  return (
    <div className="image">
      <picture className="v-img bili-video-card__cover">
        <img
          src="http://cdn-ali-img-shstaticbz.shanhutech.cn/bizhi/staticwp/202112/2d375bc72dac68e761e8825d22219862--1268598179.jpg"
          alt="韩 国 少 儿 动 画【阅片无数Ⅱ 51】"
        />
      </picture>
    </div>
  );
};

export default () => {
  return (
    <Style className="video-card">
      <Image />
      <div className="info">
        <h3 title="韩 国 少 儿 动 画【阅片无数Ⅱ 51】">
          韩 国 少 儿 动 画【阅片无数Ⅱ 51】
        </h3>
      </div>
    </Style>
  );
};
