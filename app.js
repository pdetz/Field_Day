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

    const [fieldDay, setFieldDay] = React.useState(fieldDays[0]);
    //const [scaleFactor, setScaleFactor] = React.useState([1, "auto"]);
    const [schedule, setSchedule] = React.useState();
    const [selectedColors, setSelectedColors] = React.useState([HEADERS[5], ROWS[5]]);


    return [
        e('div', {key: 'topbar', className: 'topbar'}, 
            e('button', {key: 'k2', className: 'nav k2' + (fieldDay.name == 'K - 2' ? " sel":""),
                onClick: () => setFieldDay(fieldDays[0])}, 'K - 2'),
            e('button', {key: 't5', className: 'nav t5' + (fieldDay.name == '3 - 5' ? " sel":""),
                onClick: () => setFieldDay(fieldDays[1])}, '3 - 5'),
            e(Dropdown, {key: 'dropdown', text: 'Schedules', dropdown: 'test'}
            ),
            e('button', {key: 'print', className: 'nav print', onClick: () => window.print()}, "🖨️ Print"),
        ),
        e('div', {className: 'container'}, 
            e(ViewFullSchedule, {fieldDay, selectedColors})
        )
    ]
}

const Dropdown = ({ text, fieldDay, setSchedule }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    //const fullSchedule = e("button", )

    return e("div", { className: "dropdown" }, 
        e("button", { className: "nav", onClick: () =>  setIsOpen(!isOpen) }, text),
        isOpen && dropdown
    );
};

const DropdownList = ({fieldDay, handleButtonClick}) => {
    return e("div", { className: "dropdown-menu" }, options.map((option) => {
        return e("button", { key: option, className: "option-button" + (selectedOption == option ? " sel":""),
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