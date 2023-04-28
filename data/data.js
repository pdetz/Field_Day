const SCHEDULE3_5 = "n,stationName,location,firstTeacher,start,stop;1,Volleyball,Gym,G,09:15,09:27;2,Obstacle Course,Gym,Shields,09:27,09:37;3,Transition,,Galbreath,09:37,09:47;4,Water balloon relay,Blacktop by STEM portables,Gomez,09:47,09:57;5,Satellite,Black top,Joyner,09:57,10:07;6,Scooter Relay,Black top,,10:07,10:17;7,Playground,,Delgado,10:17,10:27;8,Fire & Ice tag,Field,Macario,10:27,10:37;9,Soccer Pirates,Field,Parks,10:37,10:47;10,Football Challenge,Field,Molina,10:47,10:57;11,Team Tag,Field,Armstrong,10:57,11:07;Lunch,Lunch,,,11:07,12:10;12,Hockey Pirates,Field,,12:10,12:22;13,Home run Derby,Field,Ward,12:22,12:34;14,Frisbee,Field,Francois,12:34,12:46;15,Soccer,Field,Gayle,12:46,12:58;16,Golf Putting,Field,Christie,12:58,01:10;17,Memories/Chalk,Sidewalk in front of 4th grade portables,Bangura,01:10,01:22;18,Jump Ropes,Grass next to sidewalk,,01:22,01:34;19,Badminton Keep-up,Bus loop,,01:34,01:46;20,Sponge Relay,Bus loop,,01:46,01:58;21,Transition to gym,hallways,,01:58,02:10";

function csvStringToArrayOfObjects(csvString) {
    const lines = csvString.split(';');
    const headers = lines.shift().split(',');
  
    return lines.map(line => {
      const values = line.split(',');
      return headers.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
    });
  }
  
function getTeacherSchedules(stations, times) {
    let teachers = [{name: "Select a Teacher", schedule:[]}];

    stations.forEach((station, index) => {
      if (station.firstTeacher !== '') {
        let schedule = [];
        for (let i = 0; i < stations.length; i++) {
          const { n, stationName, location } = stations[(i + index) % stations.length];
          if (stations[schedule.length].n == "Lunch") {
            schedule.push({n:"Lunch", stationName:"Lunch", location:'' });
          }
          if (n != "Lunch") {
            schedule.push({n, stationName, location });
          } 
        }
        
        const updatedSchedule = schedule.reduce((acc, curr, i) => {
          acc.push({...curr, start: times[i].start, stop: times[i].stop });
          return acc;
        }, []);
        
        teachers.push({name: station.firstTeacher, schedule: updatedSchedule});
      }
    });
    return teachers;
}

const HEADERS = ['#f66', '#fa0', '#ff0', '#5d0', '#6db', '#6af', '#c6d', '#999'];
const ROWS =    ['#fdd', '#fea', '#ffa', '#dfb', '#dfe', '#def', '#edf', '#eee'];

const random = (min=0, max=EMOJIS.length - 1) => Math.floor(Math.random() * (max - min + 1)) + min;