const data = require('./data.json')
const debug = require('debug')('generator')
const _ = require('lodash')
const ics = require('ics')
const moment = require('moment')
const fs = require('fs')

const courses = data.kbList.filter(course => !course.ignore).map(course => ({
    name: course.kcmc.replace("（", "(").replace("）", ")"),
    teacher: course.xm,
    score: course.xf,
    id: course.kch_id,
    location: course.cdmc,
    time: course.jcor,
    day: course.xqj,
    date: course.zcd,
    note: course.xkbz
}))

debug(`${courses.length} courses loaded, generating calendar...`)

// Edit course start time here
const time_at = ["8:00", "8:55", "10:00", "10:55", "12:00", "12:55", "14:00", "14:55", "16:00", "16:55", "18:00", "18:55", "19:35", "20:55"]

// Edit the beginning week of this semester here
const week_begin_at = "2020/03/02"

const parse_week_string = str => {
    let res = str.match(/^(.*)-(.*)周$/)
    if (res) {
        return _.range(parseInt(res[1]), parseInt(res[2]) + 1)
    } else {
        return str.split(',').map(d => parseInt(_.dropRight(d, 1).join("")))
    }
}

const events = []

const ZOOM = require('./config.js').ZOOM
const ZOOM_NAME = require('./config.js').NAME

function zoom_url(name) {
    for (let key in ZOOM) {
        if (name.includes(key)) {
            return `zoommtg://zoom.us/join?confno=${ZOOM[key][0]}&pwd=${ZOOM[key][1]}&uname=${encodeURIComponent(ZOOM_NAME)}`
        }
    }
    return ""
}

courses.forEach(course => {
    debug(`${course.id} ${course.name}`)
    let _weeks = parse_week_string(course.date)
    let _time = course.time.match(/^(.*)-(.*)$/)
    let day = parseInt(course.day)
    let time_start = parseInt(_time[1])
    let time_end = parseInt(_time[2])
    let message = `  ${course.location} ${course.teacher} ${course.score} 学分 | ${course.note}`
    let z_url = zoom_url(course.name);
    if (z_url != "") debug(`Zoom URL: ${z_url}`)
    debug(message)
    _weeks.forEach(week => {
        let datetime_begin = moment(`${week_begin_at} ${time_at[time_start - 1]}`, "YYYY/MM/DD HH:mm:ss").add(week - 1, 'week').add(day - 1, 'day')
        let datetime_end = moment(`${week_begin_at} ${time_at[time_end - 1]}`, "YYYY/MM/DD HH:mm:ss").add(week - 1, 'week').add(day - 1, 'day').add(45, 'minute')
        if (!datetime_begin.isAfter(new Date)) return
        debug(`  第 ${week} 周 ${datetime_begin}~${datetime_end}`)
        const event = {
            title: `${course.id} ${course.name}`,
            start: datetime_begin.format('YYYY-M-D-HH-mm').split("-").map(d => parseInt(d)),
            end: datetime_end.format('YYYY-M-D-HH-mm').split("-").map(d => parseInt(d)),
            location: course.location,
            description: `${course.id} ${course.name} 第${week}周 ${course.score}学分 ${course.teacher}`,
            url: z_url
        }
        events.push(event)
    })
})

ics.createEvents(events, (err, res) => {
    if (err) console.error(err);
    fs.writeFileSync('result.ics', res);
    debug("success")
});
