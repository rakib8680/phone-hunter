

const loadData = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const phones = await res.json();
    displayData(phones.data);
};

const displayData = phones => {
    const cardsContainer = document.getElementById('main-container');
    cardsContainer.innerText = '';

    const showAllButton = document.getElementById('show-all');
    // display 10 phones 
    if (phones.length > 10) {
        phones = phones.slice(0, 12);

    }

    // display no phones found 
    const noPhone = document.getElementById('no-phone-warning');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    }
    else {
        noPhone.classList.add('d-none');
    }

    // display all phones 
    phones.forEach(phone => {
        console.log(phone)
        const div = document.createElement('div');
        div.classList.add('phoneDiv');
        div.innerHTML = `
        <div class="col">
            <div class="card p-3">
                <img src="${phone.image}" class="card-img-top w-75 mx-auto p-4" >
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural
                        lead-in
                        to additional content. This content is a little bit longer.</p>
                </div>
            </div>
       </div>
        `
        cardsContainer.appendChild(div);
    });
    // stop spinner 
    toggleSpinner(false);
};


// search eventlistener 
document.getElementById('search-btn').addEventListener('click', function () {
    // start loader
    toggleSpinner(true);
    const searchText = document.getElementById('search-field').value;
    loadData(searchText);
});

// activate spinner 
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

// loadData()
