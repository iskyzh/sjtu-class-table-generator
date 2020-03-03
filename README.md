# SJTU Class Importer

This is a semi-automated program for automatically export class table into calendar events.

This script requires you to grab data yourself.

## Grab Classtable Data

1. Visit https://i.sjtu.edu.cn
2. 信息查询 - 学生课表查询
3. In Developer Tools, find request with URL like `https://i.sjtu.edu.cn/kbcx/xskbcx_cxXsKb.html`.
4. Paste all data to `data.json`. It should be like:

```json
{
  "kblx": 7,
  "xqbzxxszList": [],
  "xsxx": {
      ......
  },
  "sjkList": [],
  "xkkg": true,
  "xqjmcMap": {
    "1": "星期一",
    "2": "星期二",
    "3": "星期三",
    "4": "星期四",
    "5": "星期五",
    "6": "星期六",
    "7": "星期日"
  },
  "xskbsfxstkzt": "0",
  "kbList": [
    {
      ......
      "kcmc": "算法与复杂性",
```

## Add Config

We've provided an example in `config.example.js`. Create the config file at `config.js` in repo root.

## Run Program

Install Node.js, and run the program.

```bash
npm i
DEBUG=* node index.js
```

You may review the generated events in console. Events before current time won't be generated.
We'll generate event for every single time period. For example, if a course takes place from
week 1 to week 16 in Monday, there'll be 16 events respectively in each week.

```
  generator 18 courses loaded, generating calendar... +0ms
  generator CS214 算法与复杂性 +1ms
  generator Zoom URL: balabala +1ms
  generator   ??? ??? 3.0 学分 | 无 +0ms
  generator   第 2 周 Mon Mar 09 2020 10:00:00 GMT+0800~Mon Mar 09 2020 11:40:00 GMT+0800 +3ms
```

## Import to Calendar

Drag and drop `result.ics` into your calendar app. Here I recommend you to create
a new calendar for all these events. If you want to re-import, just delete all
events in that separate calendar, and import again.
