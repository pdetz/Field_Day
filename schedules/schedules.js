function ScheduleTable({teacher, selectedColors}){
    return e('div', null, 
        e('div', {className:'title'}, teacher.name+ "'s Field Day Schedule"), 
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
    )
}

const Dropdown = ({ options, selectedOption, handleOptionChange }) => {
    const [isOpen, setIsOpen] = React.useState(false);
  
    const handleButtonClick = (option) => {
      handleOptionChange(option);
      setIsOpen(false);
    };
    
    return e("div", { className: "dropdown" }, 
        e("button", { className: "dropdown-button btn", onClick: () =>  setIsOpen(!isOpen) }, selectedOption),
        isOpen && 
            e("div", { className: "dropdown-menu" }, options.map((option) =>
                e("button", { key: option, className: "option-button btn" + (selectedOption == option ? " sel":""),
                onClick: () => handleButtonClick(option)}, option))
            )
    );
};

const TeacherDropdown = ({ teachers, selectedTeacher, handleTeacherChange }) => {
  return e('select', { id: 'teacher-dropdown', value: selectedTeacher?.id, onChange: handleTeacherChange },
      teachers.map((teacher) => e('option', { key: teacher.name, value: teacher.name }, teacher.name)
    ),
  );
};
