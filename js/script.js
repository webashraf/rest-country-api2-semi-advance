const loadCountry = async() =>{
    const url = `https://restcountries.com/v3.1/all`;
    try{
        const res = await fetch(`https://restcountries.com/v3.1/all`);
        const data = await res.json();
        // console.log(data[0]);
        showCountries(data);
        // regionDataUpdate(data)
    }
    catch(error){
        console.log(error);
    }
}
loadCountry()
const countrySection = document.getElementById('all-country');


// ! Region drop menu script
const regionDataUpdate = data => {
  const regionMenu = document.getElementById('select-region');
  regionMenu.addEventListener('click', event =>{
    event.target.value.length > 2 ? countrySection.innerHTML = '' : console.log('Okay');
    const url = `https://restcountries.com/v3.1/region/${event.target.value.length > 2 ? event.target.value : 'europe'}`
    // countrySection.innerHTML = '';
    fetch(url)
    .then(res => res.json())
    .then(data => data.forEach(element => loadDataDynamic(element)))
  })

}
 // !
regionDataUpdate()



// ! Country shows scripts..
const showCountries = data =>{
  const primaryData = data.slice(0, 12);
    primaryData.forEach(element => loadDataDynamic(element) );
      // ! show more button scripts
      document.getElementById('show-more-button').addEventListener('click', () =>{
       countrySection.innerHTML = '';
        data.forEach(element => {
          loadDataDynamic(element)
        });
      })
    }
// !------------------------------------


// ! Dynamic load..
const loadDataDynamic = data =>{
  const {name, flags, capital, region, timezones, languages, coatOfArms, cca2, area
  } = data;
  const div = document.createElement('div');
  div.innerHTML = `
  <div class="card w-full h-96 bg-base-100 shadow-xl">
  <figure>
  <img src="${flags.svg}" alt="flag" />
  </figure>
  <div class="card-body">
  <h2 class="card-title">${name.common}</h2>
  <p>Capital: ${capital}</p>
  <p>Region: ${region}</p>
  <p>Area: ${area}</p>
  <div class="card-actions justify-end">
  
  <!-- Modals -->
  <!-- The button to open modal -->
  <label onclick="modalDataLoad('${name.common}')" for="my-modal-6" class="btn">open modal</label>

  </div>
  </div>
  </div>
  `
  // console.log(name.common);
  countrySection.appendChild(div)
}
// !------------------------------



// ! Modal Scripts
    const modalDataLoad = data =>{
      // console.log(data);
      fetch(`https://restcountries.com/v3.1/name/${data}`)
      .then(res => res.json())
      .then(datas => singleData(datas))
    }
   // ? -------------------------------
    const singleData = datas =>{
      const languagess = Object.keys(datas[0].languages);
      // console.log(languagess[0], lang);
      const modalPerent = document.getElementById('modal-perent-card');
      modalPerent.innerHTML = `
      <figure>
      <img class"w-full" src="${datas[0].coatOfArms.svg}" alt="flag" />
      </figure>
      <h3 class="font-bold text-md underline text-teal-700">Details</h3>
      <h3 class="font-bold text-lg">${datas[0].name.common},</h3>
      <p class="py-1">Capital: ${datas[0].capital},</p>
      <p class="py-1">Region: ${datas[0].region},</p>
      <p class="py-1">Time zone: ${datas[0].timezones},</p>
      <p class="py-1">Area: ${datas[0].area}</p>
      <p class="py-1">Currencies name: ${datas[0].currencies[Object.keys(datas[0].currencies)[0]].name}</p>
      <p class="py-1">Language: ${Object.keys(datas[0].languages).length > 1 ? datas[0].languages[Object.keys(datas[0].languages)[1]]: datas[0].languages[Object.keys(datas[0].languages)[0]]}</p>

      <span class="py-4"></span>
      <div class="modal-action">
        <label for="my-modal-6" class="btn">Yay!</label>
      </div>
      `

//       // 
//  /*    const currenciesss = datas[0].currencies;
//       Object.keys(currenciesss).map(curcie =>{
//         console.log(currenciesss[curcie]);
//         console.log(currenciesss[curcie].symbol);
//       })
//       console.log(Object.keys(datas[0].languages).length);
//       console.log(datas[0].languages[Object.keys(datas[0].languages)]);
//       console.log(datas[0].currencies.currenciesss[0]);
//       console.log(languagess.forEach((v, i, arr) =>{v}));
//       const langu = datas[0].languages;
//       Object.keys(langu).map(lang =>{
//         console.log(langu[lang]);
//       }) */

//       // 
      
    }
//! --------------------------------