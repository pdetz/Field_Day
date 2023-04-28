const e = React.createElement;

function App(){
    const stations = []; const times = [];
    const schedule = csvStringToArrayOfObjects(SCHEDULE3_5);

    schedule.map(({ n, stationName, location, start, stop, firstTeacher }) => {
        stations.push({ n, stationName, location, firstTeacher, schedule:[] });
        times.push({ n, start, stop });
    });

    const teachers = getTeacherSchedules(stations, times);
    getStationsSchedules(stations, teachers, times);

    console.log(stations);
    
    const [selectedColors, setSelectedColors] = React.useState([HEADERS[5], ROWS[5]]);
    const [scaleFactor, setScaleFactor] = React.useState([1, "auto"]);
    const [selectedTeacher, setSelectedTeacher] = React.useState(teachers[1]);
    const [selectedStation, setselectedStation] = React.useState(stations[1]);

    const handleTeacherChange = (name) => {
        setSelectedTeacher(teachers.find((teacher) => teacher.name === name));
      };
      const handleStationChange = (stationName) => {
        setselectedStation(stations.find((station) => station.stationName === stationName));
      };

    React.useEffect(() => {
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

    return e(Div, {key: "documentView", css:"#documentView"},
        e(Div, {key: "topbar", css: "topbar"},
            e(Dropdown, {options: teachers.map(teacher => teacher.name), 
                selectedOption: selectedTeacher.name, handleOptionChange: handleTeacherChange}),
            e(Dropdown, {options: stations.map(station => station.stationName), 
                selectedOption: selectedStation.stationName, handleOptionChange: handleStationChange}),
        ),
        e(Div, {key: "resize", css:"resize", style:{height: scaleFactor[1]}},                
            e(Div, {key: "displayArea", css:"#displayArea"}, 
                e(StationScheduleTable, {key:"station", station: selectedStation, selectedColors}),
                e(TeacherScheduleTable, {key:selectedTeacher.name, teacher: selectedTeacher, selectedColors})
            )
        )
    )
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