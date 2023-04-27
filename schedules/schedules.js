function ScheduleTable({teacher, selectedColors}){
    return e(Div, null, teacher.name, 
        e('table', {key:teacher.name, className:"schedule"},
            e('thead', {style:{backgroundColor: selectedColors[0]}}, 
                e('tr', {key:"head", className:"head"},
                    e('td', {key: "n"}, ""),
                    e('td', {key: "station"}, "Station"),
                    e('td', {key: "location"}, "Location"),
                    e('td', {key: "start"}, "Start"),
                    e('td', {key: "stop"}, "Stop"),
                )
            ),
            e('tbody', {style:{backgroundColor: selectedColors[1]}},
                teacher.schedule.map(station => {
                    return e('tr', {key: station.n}, station.n == "Lunch" ?
                        e('td', {key:"lunch", className: "lunch", colSpan: "5"}, "Lunch - 1 Hour") :
                        Object.keys(station).map(prop => {
                            return e('td', {key: prop}, station[prop]);
                        }))
                })
            )
        )
    )
}


const TeacherDropdown = ({ teachers, selectedTeacher, handleTeacherChange }) => {

  const teacherOptions = [
    ...teachers.map((teacher) =>
      e('option', { key: teacher.name, value: teacher.name }, teacher.name)
    ),
  ];


  return e('div', null,
    e('select', { id: 'teacher-dropdown', value: selectedTeacher?.id, onChange: handleTeacherChange }, teacherOptions),
  );
};
