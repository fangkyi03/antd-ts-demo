
export const menusList = [
  {
    icon: "dashboard",
    link: "home",
    title: "首页",
    sub:[
      {
        link:'test',
        title:'测试',
        sub:[
          {
            title:'st',
            link:'t1'
          }
        ]
      }
    ]
  },
];

export const formatter = (data, parentPath = "") => {
  return data.map(item => {
    let { link } = item;
    if (link) {
      link = `${parentPath}/${item.link}`;
    }
    const result = {
      ...item,
      link
    };
    if (item.sub) {
      result.sub = formatter(item.sub, link);
    }
    return result;
  });
};
