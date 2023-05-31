const e = React.createElement;

function App(){

    const fieldDays = [SCHEDULEK_2, SCHEDULE3_5].map(fd => {
        const schedule = csvStringToArrayOfObjects(fd.data);
        const currentStations = []; const currentTimes = [];

        schedule.map(({ n, name, location, start, stop, firstTeacher }) => {
            currentStations.push({ n, name, location, firstTeacher, schedule:[] });
            currentTimes.push({ n, start, stop });
        });

        const currentTeachers = getTeacherSchedules(currentStations, currentTimes);
        getStationsSchedules(currentStations, currentTeachers, currentTimes);
        currentTeachers.sort((a, b) => a.name > b.name ? 1 : -1);
        
        return {name: fd.name, stations: currentStations, times: currentTimes, teachers: currentTeachers};
    });

    const [fieldDay, setFieldDay] = React.useState(fieldDays[0]);
    //const [scaleFactor, setScaleFactor] = React.useState([1, "auto"]);
    const [schedule, setSchedule] = React.useState('');
    const [selectedColors, setSelectedColors] = React.useState([HEADERS[5], ROWS[5]]);


    return [
        e('div', {key: 'topbar', className: 'topbar'}, 
            e('button', {key: 'k2', className: 'nav k2' + (fieldDay.name == 'K - 2' ? " sel":""),
                onClick: () => setFieldDay(fieldDays[0])}, 'K - 2'),
            e('button', {key: 't5', className: 'nav t5' + (fieldDay.name == '3 - 5' ? " sel":""),
                onClick: () => setFieldDay(fieldDays[1])}, '3 - 5'),
            e(Dropdown, {key: 'dropdown', text: 'Schedules', fieldDay, schedule, setSchedule}
            ),
            e('button', {key: 'print', className: 'nav print', onClick: () => window.print()}, "🖨️ Print"),
        ),
        e('div', {className: 'container'}, 
            e(DisplaySchedule, {fieldDay, schedule, selectedColors})
        )
    ]
}

const DisplaySchedule = ({ fieldDay, schedule, selectedColors }) => {
    const teacherMatch = fieldDay.teachers.find(teacher => teacher.name === schedule);
    const stationMatch = fieldDay.stations.find(station => station.name === schedule);
  
    if (teacherMatch) {
      return e(TeacherScheduleTable, { teacher: teacherMatch, selectedColors });
    }
  
    if (stationMatch) {
      return e(StationScheduleTable, { station: stationMatch, selectedColors });
    }

    if (schedule == 'All') {

        return [
            e(ViewFullSchedule, {fieldDay, selectedColors}),
            fieldDay.teachers.map(teacher => e(TeacherScheduleTable, {key:teacher.name, teacher, selectedColors})),
            fieldDay.stations.map(station => e(StationScheduleTable, {key:station.name, station, selectedColors}))
        ]
    }
  
    return null; // If there is no match
};
  
  

const Dropdown = ({ text, fieldDay, schedule, setSchedule }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    //const fullSchedule = e("button", )
    console.log(fieldDay);

    return e("div", { className: "dropdown nav" }, 
        e("button", { className: "schedule" + (isOpen ? ' sel':''), onClick: () =>  setIsOpen(!isOpen) }, text),
        isOpen &&
            e('div', {key: 'menu', className: 'dropdown-menu column'},
                e('div', {key:'columns', className: 'row'},
                    e(DropdownList, {key: 'teachers', css: 'teachers column', 
                        options: fieldDay.teachers.map(t=>t.name), 
                        selectedOption: schedule,
                        handleButtonClick: (option) => {
                            setSchedule(option);
                            setIsOpen(false);
                        }
                    }),
                    e(DropdownList, {key: 'stations', css: 'stations column test', 
                        options: fieldDay.stations.map(t=>t.name), 
                        selectedOption: schedule,
                        handleButtonClick: (option) => {
                            setSchedule(option);
                            setIsOpen(false);
                        }
                    })
                ),
                e('button', {key: 'allbutton', className: 'option' + (schedule == 'All' ? ' sel':''),
                    onClick: () => {
                        setSchedule('All');
                        setIsOpen(false);
                    }}, 
                    'View All ' + fieldDay.name + ' Field Day Schedules'
                )
            )
    );
};

const DropdownList = ({options, css, selectedOption, handleButtonClick}) => {

    console.log(selectedOption);

    return e("div", { className: css }, options.map((option) => {
        return e("button", { key: option, className: "option" + (selectedOption == option ? " sel":""),
            onClick: () => handleButtonClick(option)}, option)
        })
        )
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(e(App));

    /*React.useEffect(() => {
        function handleResize() {
            const width = window.innerWidth;
            const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            const newScaleFactor = width / fontSize <= 50 ?
                (width - 2 * fontSize) / (48 * fontSize) : 
                    width / fontSize < 73 ?
                        (width - 25 * fontSize) / (48 * fontSize) : 1;
            const newHeight = document.querySelector('#displayArea').clientHeight * newScaleFactor + fontSize + "px";
            setScaleFactor([newScaleFactor, newHeight]);
        }
    
        window.addEventListener("resize", handleResize);
        handleResize(); // Call the function once to set the initial scale factor
    
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);
*/