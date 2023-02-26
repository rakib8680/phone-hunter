

const loadData = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const phones = await res.json();
    displayData(phones.data, dataLimit);
};

const displayData = (phones, dataLimit) => {
    const cardsContainer = document.getElementById('main-container');
    cardsContainer.innerText = '';

    const showAllButton = document.getElementById('show-all');
    // display 10 phones 
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 12);
        showAllButton.classList.remove('d-none');
    }
    else {
        showAllButton.classList.add('d-none');
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
        // console.log(phone)
        const div = document.createElement('div');
        div.classList.add('phoneDiv');
        div.innerHTML = `
        <div class="col border border-warning rounded-2 shadow-sm">
            <div class="card p-3">
                <img src="${phone.image}" class="card-img-top w-75 mx-auto p-4" >
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural
                        lead-in
                        to additional content. This content is a little bit longer.</p>
                        <button onClick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>

                </div>
            </div>
       </div>
        `
        cardsContainer.appendChild(div);
    });
    // stop spinner 
    toggleSpinner(false);
};



const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchText = document.getElementById('search-field').value;
    loadData(searchText, dataLimit);
}



// search eventlistener 
document.getElementById('search-btn').addEventListener('click', function () {
    // start loader
    processSearch(12);
});


// search enter key event handler 
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(12);
    }
})



// activate spinner 
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
};


// not the best way to Show All 
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
});


// load Phone details 
const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const details = await res.json();
    displayPhoneDetails(details.data);
};

// display phone details 
const displayPhoneDetails = phone => {
    console.log(phone)
    const modalTitle = document.getElementById('phoneDetailsModalLabel');
    modalTitle.innerText = phone.name
    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML =`
    <img src="${phone.image}">
    `
}

loadData('samsung')
