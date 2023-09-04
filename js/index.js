
let sort = [];



const categoryButton = async () => {
  const category = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
  const categorydata = await category.json();
  const categoryCointainer = document.getElementById("categoryButtonCointainer");
  categorydata.data.forEach(categoryField => {

    const buttonDiv = document.createElement("div");
    buttonDiv.innerHTML = `
    <button onclick = "categoryVideos('${categoryField?.category_id ? categoryField?.category_id : noContent()}')"  class="bg-[#25252533] mb-4 btn btn-neutral
     text-[#0e0d0d] hover:bg-[#FF1F3D] hover:text-[#fff] px-6 py-1 
     rounded-sm"
     >
    ${categoryField.category}
  </button> 
  `
    categoryCointainer.appendChild(buttonDiv)

    // console.log(categoryField.category_id)
  })
}


// Drowings button for category 

const noContent = () => {
  const findFild = document.getElementById("categoryButtonCointainer");
  const div = document.createElement("div");
  div.innerHTML = `<div class="w-3/4 bg-slate-500 flex justify-center items-center">
  <img src="../icon/Logo.png"/>
  <h3>Oops!! Sorry, There is no content here</h3>
  </div>`;
  findFild.appendChild(div);
};

const categoryVideos = async (categories_Id) => {
  // console.log(id)
  try {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categories_Id}`);
    const data = await res.json();
    const categories = data.data;

    // no-content container show thear 
    const noContainer = document.getElementById("no-content");
    noContainer.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="card w-96 bg-white mx-auto bg-base-100 shadow-xl">
             <figure class="px-10 pt-10">
                <img src="../icon/Icon.png" alt="Shoes" class="rounded-xl" />
             </figure>
             <div class="card-body items-center text-[#171717] font-bold text-center">
                <p>Oops!! Sorry, There is no content here</p>
             </div>
         </div>
               `;
    noContainer.appendChild(div);

    if (data.data.length === 0) {
      noContainer.classList.remove('hidden');
    }
    else {
      noContainer.classList.add('hidden');
    }


    const cardCointainer = document.getElementById("mainBody");
    cardCointainer.innerHTML = "";
    categories.forEach(element => {
      // console.log()
      const sec = element?.others?.posted_date / 1000
      const min = sec / 60;
      const hou = min / 60;
      const seconds = Math.ceil(sec % 60);
      const minutes = Math.ceil(min % 60);
      const hours = Math.ceil(hou % 24);
      const time = `${hours} hrs ${minutes} min`
      // console.log(element)
      const card = document.createElement("div");
      card.innerHTML = `
      <div>
        <img class = "h-[150px] w-[300px] rounded-lg " src="${element.thumbnail}" alt="" srcset="" />
        <div class = "absolute  mt-[-50px] lg:ml-[150px] md:ml-[190px] ml-[180px] rounded-sm 
         bg-[#1e1c1cc7] text-center  text-white">${hours === 0 && minutes === 0 ? '' : time}</div>
        <div class="flex gap-3 py-2">
          <img class="w-10 h-10 rounded-[50%]" src="${element.authors[0].profile_picture}" alt="" srcset="" />
          <div>
            <h3 class="text-[#171717] font-bold text-base">
              ${element.title}
            </h3> 
          <div class= "flex mt-2 justify-between">
             <p class="text-[#171717B3] text-sm">${element.authors[0].profile_name.slice(0, 10)}</p> 
             <p>${element?.authors[0]?.verified ? '<img class="w-6 h-6" alt="#" src="../icon/verify.png" />' : ""}</p>
          </div>
             <p class="text-[#171717B3] text-sm">${element.others.views} views</p>
          </div>
          </div>
          </div>
          `
      cardCointainer.appendChild(card)

      const viewsNumber = parseInt(element.others.views);

      viewNumber(viewsNumber, cardCointainer);
    });
  }
  catch (err) {
    console.log("This is error in fetched data from API:", err);
  }
}

const viewNumber = (number) => {
  document.getElementById("shorting_section");
  sort.push(number);
  sort.sort(function (a, b) {
    return b - a;
  });
  console.log("soter_numbers", sort);
};




categoryButton();
categoryVideos(1000);