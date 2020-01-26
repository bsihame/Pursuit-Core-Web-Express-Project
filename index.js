document.addEventListener("DOMContentLoaded", ()=>{

  let displayButton = document.querySelector("#displayBtn");
  let allClassesDiv = document.querySelector("#allClassesDiv");
  let classNameInput = document.querySelector("#className");
  let teacherInput =document.querySelector("#teacher");
  let addClassForm = document.querySelector("#addClass");
  let studentForm = document.querySelector("#studentForm");
  let className = document.querySelector("#studentClass");
 

  displayButton.addEventListener("click", async()=>{
    try {
      let res = await axios.get("http://localhost:3000/class")
      let p = document.createElement("p")
      p.innerText = JSON.stringify(res.data.allClasses)
      allClassesDiv.appendChild(p)

    } catch(err){
      console.log(err);
      
    }
  })

  let p = document.querySelector("#pClass")
  addClassForm.appendChild(p)

  addClassForm.addEventListener("submit",async(e)=>{
    e.preventDefault();
    let className = classNameInput.value;
    let teacher = teacherInput.value;
    if(!className || !teacher){
      p.innerText ="Please fill out all the information"
      
    } else {
      try {
        let res = await axios.post("http://localhost:3000/class", {name: className, teacher: teacher })
        
        if(res.data.newClass){
          p.innerText = JSON.stringify(res.data.newClass)
        }else{
          p.innerText = res.data.error
        }
      } catch(err){
        p.innerText = `Please fill out all the information or Class already exists `
        
      }
    }
    classNameInput.value = "";
    teacherInput.value = "";
    
  });

  const populateSelect = async()=> {
    try {
      let res = await axios.get("http://localhost:3000/class")
      // debugger
      let data =res.data.allClasses
      for(let key in data){
        let option = document.createElement("option");
        option.innerText = key
        className.appendChild(option)
      }
      // o.innerText = JSON.stringify(res.data.allClasses)
      // allClassesDiv.appendChild(p)

    } catch(err){
      console.log(err);
      
    }
  }
  populateSelect()
  
 
  studentForm.addEventListener("submit", async(e) =>{
    e.preventDefault();
    
    let studentName = document.querySelector("#studentName");
    let studentAge= document.querySelector("#studentAge");
    let studentCity = document.querySelector("#studentCity");
    let studentGrade = document.querySelector("#studentGrade");
    let displayStudent = document.querySelector("#pStudent")
    
    let classNameInput = className.value;
    let studentNameInput = studentName.value;
    let studentAgeInput = studentAge.value;
    let studentCityInput = studentCity.value;
    let studentGradeInput = studentGrade.value;

    try{
      
      let res = await axios.post(`http://localhost:3000/class/${classNameInput}`, {name: studentNameInput, age: studentAgeInput, city: studentCityInput, grade: studentGradeInput})
    // let studentObj = {name: res.data.enrollStudent.name, age: res.data.enrollStudent.age, city: res.data.enrollStudent.city, grade: res.data.enrollStudent.grade}
  
      displayStudent.innerText = JSON.stringify(res.data.className, res.data.enrolledStudent)
      // displayStudent.innerText = JSON.stringify(`${studentObj}enrolled in: ${res.data.className}`)
      debugger
      
    }catch(err){
      displayStudent.innerText = `Please fill out all the information or the class doesn't exist.`;
    }
  })

  

})
