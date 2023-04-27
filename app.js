const e = React.createElement;

function App(){
    const stations = csvStringToArrayOfObjects(SCHEDULE3_5);
    const teachers = getTeacherSchedules(stations);
    console.log(teachers);
    
    const [selectedColors, setSelectedColors] = React.useState([HEADERS[random(0, 7)], ROWS[random(0, 7)]]);
    const [scaleFactor, setScaleFactor] = React.useState([1, "auto"]);
    const [selectedTeacher, setSelectedTeacher] = React.useState(teachers[0]);

    const handleTeacherChange = (event) => {
        const name = event.target.value;
        const selected = teachers.find((teacher) => teacher.name === name);
        setSelectedTeacher(selected);
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
        e(TeacherDropdown, {teachers, selectedTeacher, handleTeacherChange}),
        e(Div, {key: "resize", css:"resize", style:{height: scaleFactor[1]}},                
            e(Div, {key: "displayArea", css:"#displayArea"}, 
                e(ScheduleTable, {key:selectedTeacher.name, teacher: selectedTeacher, selectedColors})
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