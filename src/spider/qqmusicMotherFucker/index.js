/**
 *
 *          ┌─┐       ┌─┐
 *       ┌──┘ ┴───────┘ ┴──┐
 *       │                 │
 *       │       ───       │
 *       │  ─┬┘       └┬─  │
 *       │                 │
 *       │       ─┴─       │
 *       │                 │
 *       └───┐         ┌───┘
 *           │         │
 *           │         │
 *           │         │
 *           │         └──────────────┐
 *           │                        │
 *           │                        ├─┐
 *           │                        ┌─┘
 *           │                        │
 *           └─┐  ┐  ┌───────┬──┐  ┌──┘
 *             │ ─┤ ─┤       │ ─┤ ─┤
 *             └──┴──┘       └──┴──┘
 * qqmusic 的api 混杂各种写法 我做错了什么为什么要给我看这种api 啊啊啊啊啊啊啊啊啊
 * 凭什么这群写了 混杂了 驼峰(java) 下划线(Python) 首字母大写(fucker) 杂乱不堪的 api 的人能进腾讯, 我却怀才不遇
 */
import Singer from '../../object/singer'

export const singerListParse = ({list, total_page}) => ({
  totalPage: total_page,
  list: list.map(({Fsinger_name, Fsinger_mid, Fother_name}) => new Singer(Fsinger_name, Fsinger_mid, Fother_name))
})
