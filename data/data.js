const SCHEDULE3_5 = {name: "3 - 5", data:"n,stationName,location,firstTeacher,start,stop;1,Volleyball,Gym,G,09:15,09:27;2,Obstacle Course,Gym,Shields,09:27,09:37;3,Transition,,Galbreath,09:37,09:47;4,Water balloon relay,Blacktop by STEM portables,Gomez,09:47,09:57;5,Satellite,Black top,Joyner,09:57,10:07;6,Scooter Relay,Black top,,10:07,10:17;7,Playground,,Delgado,10:17,10:27;8,Fire & Ice tag,Field,Macario,10:27,10:37;9,Soccer Pirates,Field,Parks,10:37,10:47;10,Football Challenge,Field,Molina,10:47,10:57;11,Team Tag,Field,Armstrong,10:57,11:07;Lunch,Lunch,,,11:07,12:10;12,Hockey Pirates,Field,,12:10,12:22;13,Home run Derby,Field,Ward,12:22,12:34;14,Frisbee,Field,Francois,12:34,12:46;15,Soccer,Field,Gayle,12:46,12:58;16,Golf Putting,Field,Christie,12:58,01:10;17,Memories / Chalk,Sidewalk in front of 4th grade portables,Bangura,01:10,01:22;18,Jump Ropes,Grass next to sidewalk,,01:22,01:34;19,Badminton Keep-up,Bus loop,,01:34,01:46;20,Sponge Relay,Bus loop,,01:46,01:58;21,Transition to gym,hallways,,01:58,02:10"};
const SCHEDULEK_2 = {name: "K - 2", data: "n,stationName,location,firstTeacher,start,stop;1,Oscar Grouch,Gym,Hanlon,09:15,09:25;2,Just Dance,Gym,Ramons,09:25,09:35;3,Gymnastics Course,Gym,Gadsen,09:35,09:45;4,Transition,,,09:45,09:55;5,Water Balloon Relay,Blacktop by STEM portables,Menjivar,09:55,10:05;6,Parachute,Black top,Dean,10:05,10:15;7,Ring Toss,Black top,Campbell,10:15,10:25;8,Scooter Relay,Black top,,10:25,10:35;9,Sponge Relay,Blacktop,Wang,10:35,10:45;10,Hula Hoops,Behind portables,Ordonez,10:45,10:55;11,Fire & Ice tag,Behind playground,Lo,10:55,11:05;12,Bocce,Field,Linteris,11:05,11:15;Lunch,Lunch,,,11:15,12:20;13,Team tag,Field,Castro,12:20,12:30;14,Scoops,Field,Dorfman,12:30,12:40;15,Sharks & Minnows,Field,Morales,12:40,12:50;16,Soccer Pirates,Field,Rios,12:50,01:00;17,Hockey,Field,Batson,01:00,01:10;18,Bowling,Field,Garcia,01:10,01:20;19,Lollipop Paddles,Field,Aguilar,01:20,01:30;20,Clean-up the backyard,Field,Harris,01:30,01:40;21,Jump ropes,Field,Do,01:40,01:50;22,Memories / Chalk,Sidewalk in front of 4th grade portables,Weaver,01:50,02:00;23,Transition to gym,,Wilkerson,02:00,02:10"};

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
    let teachers = [];//[{name: "Select a Teacher", schedule:[]}];
    const lunchIndex = teachers.findIndex(obj => obj.n === "Lunch");

    stations.forEach((station, index) => {
      if (station.firstTeacher !== '') {
        let schedule = [];
        for (let i = 0; i < stations.length; i++) {
          const { n, stationName, location } = stations[(i + index) % stations.length];

          //schedule.push({n, stationName, location });
          if (stations[schedule.length % stations.length].n == "Lunch") {
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

function getStationsSchedules(stations, teachers, times){
  stations.forEach(station =>{
    station.schedule = times.map(block =>{
      return {n: block.n, teacher:'', start: block.start, stop: block.stop}
    })
  });

  teachers.forEach(teacher => {
    teacher.schedule.forEach((station, index) =>{
      const teacherStation = stations.find(s => s.stationName === station.stationName );
      teacherStation.schedule[index].teacher = teacher.name;
   })
  });
}

const HEADERS = ['#f66', '#fa0', '#ff0', '#5d0', '#6db', '#6af', '#c6d', '#999'];
const ROWS =    ['#fdd', '#fea', '#ffa', '#dfb', '#dfe', '#def', '#edf', '#eee'];

const random = (min=0, max=EMOJIS.length - 1) => Math.floor(Math.random() * (max - min + 1)) + min;