function TeacherScheduleTable({teacher, selectedColors}){
    return [ 
        e('div', {key:'title', className:'title'}, teacher.name+ "'s Field Day Schedule"), 
        e('table', {key:teacher.name, className:"schedule"},
            e('thead', {style:{backgroundColor: selectedColors[0]}}, 
                e('tr', {key:"head", className:"head"},
                    e('td', {key: "station", colSpan: "2"}, "Station"),
                    e('td', {key: "location"}, "Location"),
                    e('td', {key: "start"}, "Start"),
                    e('td', {key: "stop"}, "Stop")
                )
            ),
            e('tbody', {style:{backgroundColor: selectedColors[1]}},
                teacher.schedule.map((station) => {
                    return e('tr', {key: station.n}, station.n == "Lunch" ?
                      e('td', {key:"lunch", className: "lunch", colSpan: "5"}, "Lunch - " + station.start + " - " + station.stop) :
                      [e('td', {key: "n", className:"n"}, station.n + '.'),
                      e('td', {key: "station", className:"station"}, station.stationName),
                      e('td', {key: "location"}, station.location),
                      e('td', {key: "start", className: "time"}, station.start),
                      e('td', {key: "stop", className: "time"}, station.stop)]
                )})
            )
        )
    ]
}
// Define a page div, background, margins, etc.
function StationScheduleTable({station, selectedColors}){
    return [ 
        e('div', {key:'title', className:'title'}, station.stationName + " Schedule"), 
        e('table', {key:station.stationName, className:"schedule"},
            e('thead', {style:{backgroundColor: selectedColors[0]}}, 
                e('tr', {key:"head", className:"head"},
                    e('td', {key: "teacher", colSpan: "2"}, "Teacher"),
                    e('td', {key: "start"}, "Start"),
                    e('td', {key: "stop"}, "Stop")
                )
            ),
            e('tbody', {style:{backgroundColor: selectedColors[1]}},
                station.schedule.map((s) => {
                    return e('tr', {key: s.n}, s.n == "Lunch" ?
                      e('td', {key:"lunch", className: "lunch", colSpan: "4"}, "Lunch - " + s.start + " - " + s.stop) :
                      [e('td', {key: "n", className:"n"}, s.n + '.'),
                      e('td', {key: "station", className:"station"}, s.teacher),
                      e('td', {key: "start", className: "time"}, s.start),
                      e('td', {key: "stop", className: "time"}, s.stop)]
                )})
            )
        )
    ]
}

function ViewFullSchedule({fieldDay, selectedColors}) {

    return e('div', {id: "displayArea", className: 'landscape page'}, 
        e('div', {className:'title'}, fieldDay.name + " Field Day 2023 - Full Schedule"),
        e('table', {key:'full', className:"full schedule"},
            e('thead', {style:{backgroundColor: selectedColors[0]}}, 
                e('tr', {key:"head", className:"head"},
                    e('td', {key: "blank"}, ""),
                    fieldDay.stations.map(station =>{
                        if (station.n != "Lunch") return e('td', {key: station.stationName}, station.stationName)
                    })
                )
            ),
            e('tbody', {style:{backgroundColor: selectedColors[1]}},
                fieldDay.times.map((s, n) => {
                    return e('tr', {key: s.n}, s.n == "Lunch" ?
                        e('td', {key:"Lunch", className: "lunch", colSpan: fieldDay.stations.length + 1}, "Lunch - " + s.start + " - " + s.stop) :
                        [e('td', {key: s.n, className: "time"}, s.start + ' ' + s.stop),
                        fieldDay.stations.map(station => { 
                            if (station.n != "Lunch") return e('td', {key:station.stationName}, station.schedule[n].teacher)
                        })]
                )})
            )
        )
    )
}