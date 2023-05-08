const e = React.createElement;

function App(){

    const fieldDays = [SCHEDULEK_2, SCHEDULE3_5].map(fd => {
        const schedule = csvStringToArrayOfObjects(fd.data);
        const currentStations = []; const currentTimes = [];

        schedule.map(({ n, stationName, location, start, stop, firstTeacher }) => {
            currentStations.push({ n, stationName, location, firstTeacher, schedule:[] });
            currentTimes.push({ n, start, stop });
        });

        const currentTeachers = getTeacherSchedules(currentStations, currentTimes);
        getStationsSchedules(currentStations, currentTeachers, currentTimes);
        currentTeachers.sort((a, b) => a.name > b.name ? 1 : -1);
        
        return {name: fd.name, stations: currentStations, times: currentTimes, teachers: currentTeachers};
    });

    const [fieldDay, setFieldDay] = React.useState({name:'', teachers:[], stations:[]});
    const [scheduleType, setScheduleType] = React.useState('');
    //const [scaleFactor, setScaleFactor] = React.useState([1, "auto"]);
    const [selectedTeacher, setSelectedTeacher] = React.useState({name:'', schedule:[]});
    const [selectedStation, setselectedStation] = React.useState({stationName:'', schedule:[]});
    const [slidePosition, setSlidePosition] = React.useState('');
    const [slides, setSlides] = React.useState([]);
    const [backButton, setBackButton] = React.useState('');
    const [list, setList] = React.useState({options:[], selectedOption:'', handleButtonClick:null});
    const [schedule, setSchedule] = React.useState();
    const [selectedColors, setSelectedColors] = React.useState([HEADERS[5], ROWS[5]]);

    const updateView = () => {
        console.log(slidePosition);
        if (scheduleType == 'teach'){
            setList({options: fieldDay.teachers.map(t=>t.name), selectedOption: selectedTeacher.name,
                handleButtonClick: (name) => {
                    setSelectedTeacher(fieldDay.teachers.find((teacher) => teacher.name === name));
                    setSlidePosition(' sched');
                    setBackButton(e(BackButton, {setSlidePosition, position: ' list'}));
                }});
            if (selectedTeacher != '') {
                setSchedule(e(TeacherScheduleTable, {teacher: selectedTeacher, selectedColors}));
            }
        }
        else if (scheduleType == 'lead'){
            let stationList = fieldDay.stations.map(t=>t.stationName);
            setList({options: stationList, selectedOption: selectedStation.stationName,
                handleButtonClick: (stationName) => {
                    setselectedStation(fieldDay.stations.find((station) => station.stationName === stationName));
                    setSlidePosition(' sched');
                    setBackButton(e(BackButton, {setSlidePosition, position: ' list'}));
                }});
            if (selectedStation != '') {
                setSchedule(e(StationScheduleTable, {station: selectedStation, selectedColors}));
            }
        }
        if (fieldDay.name != '' && slidePosition != ' sched' && (scheduleType == 'lead' || scheduleType == 'teach' )) {
            setSlidePosition(' list');
            setBackButton(e(BackButton, {setSlidePosition, position: ''}));
        }
    }

    React.useEffect(() => {
        updateView();
      }, [scheduleType, fieldDay, selectedTeacher, selectedStation]);      
    //setSlides([e(NavScreen, {key:'nav', fieldDay, fieldDays, handleFieldDayChange, scheduleType, handleScheduleTypeChange})]);

    return [e('div', {key:'back', className: 'back'}, backButton),
        e(Div, {key: "documentView", css:"#documentView slider"},
            e('div', {key:'slider', className: 'slides' + slidePosition},
                e('div', {key:'nav', className: 'slide'},
                    e(NavScreen, {key:'nav', fieldDay, fieldDays, setFieldDay, scheduleType, setScheduleType})
                ),
                e('div', {key:'list', className: 'slide'},
                    e(DropdownList, list)
                ),
                e('div', {key:'schedule', className: 'slide'},
                    e('div', {className: 'schedule portrait'}, schedule)
                )
            )
        ),
        e('div', {key:'forward', className: 'back'})
    ]
}

function BackButton({setSlidePosition, position}){
    return e('button', {className: 'back',
        onClick: () => {
            console.log(position);
            setSlidePosition(position);
        }
    }, 'Back');
}

function NavScreen({fieldDay, fieldDays, setFieldDay, scheduleType, setScheduleType}){
    return e('div', {id:'nav', className: 'nav'}, "Welcome to the 2023 Sargent Shriver Field Day!",
            e('div', {key:'fd', className: 'navsub'}, "Choose your Field Day:"),
            e('button', {key: 'k2', className: 'nav-button k2' + (fieldDay.name == 'K - 2' ? " sel":""),
                onClick: () => setFieldDay(fieldDays[0])}, 'K - 2 Field Day'),
            e('button', {key: 't5', className: 'nav-button t5' + (fieldDay.name == '3 - 5' ? " sel":""),
                onClick: () => setFieldDay(fieldDays[1])}, '3 - 5 Field Day'),
            e('div', {key: 'sch', className: 'navsub'}, "And your schedule type:"),
            e('button', {key: 'teach', className: 'nav-button teach' + (scheduleType == 'teach' ? " sel":""),
                onClick: () => setScheduleType('teach')}, 'Classroom Teacher'),
            e('button', {key: 'lead', className: 'nav-button lead' + (scheduleType == 'lead' ? " sel":""),
                onClick: () => setScheduleType('lead')}, 'Station Leader'),
            e('button', {key: 'full', className: 'nav-button full' + (scheduleType == 'full' ? " sel":""),
                onClick: () => setScheduleType('full')}, 'Full Schedule')
    )
}

function ViewStationSchedules({stations, selectedStation, handleStationChange, selectedColors}) {
    return [e(Div, {key: "topbar", css: "topbar"},
        e(Dropdown, {options: stations.map(station => station.stationName), 
            selectedOption: selectedStation.stationName, handleOptionChange: handleStationChange}),
        ),
        e(Div, {key: "resize", css:"resize", style:{height: scaleFactor[1]}},
            e(Div, {key: "displayArea", css:"#displayArea"}, 
                e(StationScheduleTable, {key:"station", station: selectedStation, selectedColors})
            )
        )
    ]
}

function ViewTeacherSchedules({teachers, selectedTeacher, handleTeacherChange, selectedColors}) {
    return [e(Div, {key: "topbar", css: "topbar"},
        e(Dropdown, {options: teachers.map(teacher => teacher.name), 
                selectedOption: selectedTeacher.name, handleOptionChange: handleTeacherChange}),
        ),
        e(Div, {key: "resize", css:"resize", style:{height: scaleFactor[1]}},
            e(Div, {key: "displayArea", css:"#displayArea"}, 
                e(TeacherScheduleTable, {key:selectedTeacher.name, teacher: selectedTeacher, selectedColors})
            )   
        )
    ]
}

function Div({css='', ...props}) {
    let idClassName = {};
    css.split(" ").forEach(c => {
        if (c.charAt(0) == "#") idClassName.id = c.substring(1);
        else idClassName.className = idClassName.className ? idClassName.className + " " + c : c;
    });
    return e('div', {...props, ...idClassName});
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