import { sprintf } from 'sprintf-js';
import request from '../utils/request';
import { getCurrentSite } from '../core/site/config';
import Video from '../models/video';
import VideoList from '../models/videoList';

const site = getCurrentSite();

const matchRule = (html: string, attr: keyof Video) => {
  const match = site.match.list[attr];
  if (match) {
    const res = html.match(match.rule);
    if (res && res.length >= match.index) {
      return res[match.index];
    }
  }
  return '';
};

export async function getVideoList({
  id,
  page,
}: {
  id: number | string;
  page: number;
}) {
  const url = sprintf(site.cate.site, { id, page });
  const videoList = new VideoList();
  try {
    const response = await request.get<string>(url);
    const outerHtml = response.match(site.match.list.outer.rule);

    if (!outerHtml) {
      return videoList;
    }

    outerHtml.forEach((html) => {
      const video = new Video();

      video.id = matchRule(html, 'id');
      video.cover = matchRule(html, 'cover');
      video.label = matchRule(html, 'label');
      video.title = matchRule(html, 'title');
      video.desc = matchRule(html, 'desc');
      video.rating = matchRule(html, 'rating');

      videoList.list.push(video);
    });

    // window.console.log(outerHtml);
    // return '';
  } catch (error) {
    window.console.error(error);
  }

  window.console.log(videoList);
  return videoList;
}

export default { getVideoList };
