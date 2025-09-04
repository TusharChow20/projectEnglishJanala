const loadData = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(json => displayLesson(json.data))
}

const loadWord =(wordnum)=>{
    loadSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${wordnum}`
    fetch(url).then(res => res.json()).then(json => {
        removeActiveBtn();
        const btnClicked = document.getElementById(`btn-lesson-${wordnum}`)
        btnClicked.classList.add('activeCls')
        displayWord(json.data)
    })
}


const removeActiveBtn=()=>{
    const lessonButton = document.querySelectorAll(".btnLessonCls")
    // console.log(lessonButton)
    lessonButton.forEach((btn) => btn.classList.remove('activeCls'))
}

const displayWord = (words)=>{
    // console.log(words)
    const allWord = document.getElementById('all-words');
    allWord.innerHTML = '';
    if (words.length==0){
            allWord.innerHTML = `
                <div class="text-center col-span-full flex flex-col justify-center items-center p-10 space-y-5">
                    <img src="./assets/alert-error.png" alt="">
                    <p class="opacity-75 text-[20px] fontBangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                    <p class="text-5xl fontBangla">নেক্সট Lesson এ যান</p>
                </div>
            `
            loadSpinner(false);
            return
        }

    words.forEach(element => {
        // console.log(element)
        const cardection = document.createElement('div');
        
        cardection.innerHTML=`
        <div class="bg-white rounded-md shadow-sm text-center py-14 px-13 space-y-5 mt-auto h-full">
        <h1 class="text-[30px] font-bold">${element.word ? element.word:"Word Not found"}</h1>
        <p class="text-[22px] font-semibold">Meaning/ Pronounciation</p>
        <div class="text-[35px] ">
          "${element.meaning? element.meaning:"meaning not found"} / ${element.pronunciation}"
        </div>
        <div class="flex justify-between items-center">
          <button onclick="displayModal(${element.id})" class="btn bg-[#1A91FF2A]"><i class="fa-solid fa-circle-info"></i></button>
          
          <button class="btn bg-[#1A91FF2A]"><i class="fa-solid fa-volume-high "></i></button>
        </div>
      </div>
        `
        allWord.append(cardection)
    });
    loadSpinner(false)
}

const displayModal = async(getId)=>{
    const url = `https://openapi.programming-hero.com/api/word/${getId}`;
    const res = await fetch(url);
    const details = await res.json()
    displayWordDeails(details.data)
    // console.log(url)
    // document.getElementById('wordDetails').showModal();
    // .showModal();
    
}

const loadSpinner=(status)=>{
     if(status==true){
        document.getElementById('load-Spinner').classList.remove('hidden');
        document.getElementById('all-words').classList.add('hidden');
     }
     else{
        document.getElementById('all-words').classList.remove('hidden');
        document.getElementById('load-Spinner').classList.add('hidden');
     }
     
}

const arrayHandle = (arr)=>{
    const elements = arr.map(elem => `<span class="btn">${elem}</span>`)
    return elements.join(" ")
};

const displayWordDeails = (data)=>{
    console.log(data)
    const myModal = document.getElementById("my_modal_5");
    myModal.innerHTML = '';
    document.getElementById("my_modal_5").showModal()
    myModal.innerHTML=`
    <div class="modal-box">
        <h3 class="text-lg font-bold">${data.word} (<i class="fa-solid fa-microphone"></i>: ${data.pronunciation})</h3>
        <!-- <p class="py-4">Press ESC key or click the button below to close</p> -->
         <p>Meaning</p>
         <p>${data.meaning}</p>
         <p>Example</p>
         <p>${data.sentence}</p>
         <p>সমার্থক শব্দ গুলো</p>
         <p>
            <div>
                ${arrayHandle(data.synonyms)}
            </div>
         </p>
        <div class="modal-action">
          <form method="dialog"> 
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Complete Learning</button>
          </form>
        </div>
      </div>
    `
}

const displayLesson = (lessons)=>{
    const lessonContainer = document.getElementById("lesson-container");
    lessonContainer.innerHTML = '';
    for(let lesson of lessons){
        // console.log(lesson)
        const newElem = document.createElement('div');
        newElem.innerHTML=`
        <button id="btn-lesson-${lesson.level_no}" onclick="loadWord(${lesson.level_no})" class="btn btn-outline btn-primary text-[22px] px-10 py-10 btnLessonCls"> <img src="./assets/fa-book-open.png" alt="">Lesson-       ${lesson.level_no}</button>
        `
        lessonContainer.append(newElem)
    }
}
loadData()

document.getElementById('btn-search').addEventListener('click',function(e){
    removeActiveBtn()
    const inputSearch= document.getElementById('input-search');
    const searchValue= inputSearch.value.trim().toLowerCase();
    fetch('https://openapi.programming-hero.com/api/words/all').then(res=> res.json()).then(data=>{
        const allWord = data.data;
        const filterWord = allWord.filter(word=>word.word.toLowerCase().includes(searchValue));
        displayWord(filterWord)
    })
})