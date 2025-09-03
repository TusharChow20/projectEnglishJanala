const loadData = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(json => displayLesson(json.data))
}

const displayLesson = (lessons)=>{
    const lessonContainer = document.getElementById("lesson-container");
    lessonContainer.innerHTML = '';
    for(let lesson of lessons){
        console.log(lesson)
        const newElem = document.createElement('div');
        newElem.innerHTML=`
        <button class="btn btn-outline btn-primary text-[22px] px-10 py-10"> <img src="./assets/fa-book-open.png" alt="">Lesson-       ${lesson.level_no}</button>
        `
        lessonContainer.append(newElem)
    }
}
loadData()