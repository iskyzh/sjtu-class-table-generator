module.exports = {
    "ZOOM" : {
        // course keyword : [Meeting ID, Meeting Password]
        // If course name includes course keyword, a Zoom URL will be attached to the event
        // For example, the following config will attach Zoom URL to 
        // "操作系统 (A类)", "操作系统 (B类)", etc.
        // By the way, the one before has higher priority.
        // For example, "操作系统课程设计" will be matched first with
        // Meeting ID 1111
        "操作系统课程设计": ["1111", "0000"],
        "操作系统" : ["0000", "0000"],
        "编译原理" : ["0000", "0000"]
    },
    "NAME": "Alex Chi", // Your name when joining the meeting

    // Which zoom URL to fill in in URL field,
    // If set to "PC", then the URL field will have PC zoom URL.
    // If set to "Mobile", the field will be mobile ZOOM URL.
    // If set to "Redirect", we'll use "https://skyzh.github.io/zoom-url-generator/"
    // as a redirect url, you may select which target you want to use
    // upon opening that URL. This option will be saved on the device.
    "URL_FIELD_MODE": "PC"
}
