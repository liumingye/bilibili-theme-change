export const config = {
  currentSite: 0,
  site: [
    {
      sort: 0,
      name: 'MyFreeMP4',
      home: 'http://lab.liumingye.cn/',
      version: 1,
      pretreatment: 'html js预处理',
      cate: {
        site: 'http://lab.liumingye.cn/vodshow/%(id)s--------%(page)s---.html',
        info: [
          {
            name: '电影',
            id: '1',
            sub: {
              name: '按类型',
              info: [
                {
                  name: '动作片',
                  id: '6',
                },
                {
                  name: '喜剧片',
                  id: '7',
                },
                {
                  name: '爱情片',
                  id: '8',
                },
                {
                  name: '科幻片',
                  id: '9',
                },
              ],
            },
          },
          {
            name: '连续剧',
            id: '2',
          },
          {
            name: '综艺',
            id: '3',
          },
          {
            name: '动漫',
            id: '4',
          },
        ],
      },
      match: {
        list: {
          outer: {
            rule: /<li class="col-md-7 col-sm-4 col-xs-3">(.*?)<\/li>/g,
          },
          id: {
            rule: /"\/voddetail\/(\d+).html"/,
            index: 1,
          },
          cover: {
            rule: /data-original="(.*?)"/,
            index: 1,
          },
          label: {
            rule: /<span class="pic-text text-right">(.*)<\/span>/,
            index: 1,
          },
          title: {
            rule: /<h4 class="title text-overflow"><a href="(.*)" title="(.*)">(.*)<\/a><\/h4>/,
            index: 3,
          },
          desc: {
            rule: /<p class="text text-overflow text-muted hidden-xs">(.*)<\/p>/,
            index: 1,
          },
          rating: null,
        },
        page: {
          current: {
            rule: /<span class="num">(\d+)\/(\d+)<\/span>/,
            index: 1,
          },
          max: {
            rule: /<span class="num">(\d+)\/(\d+)<\/span>/,
            index: 2,
          },
        },
      },
    },
  ],
};

export const getCurrentSite = () => {
  return config.site[config.currentSite];
};

export default config;
