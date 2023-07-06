document.addEventListener("DOMContentLoaded", function () {
    const carModelSelect = document.getElementById("model-select");
  
    function populateCarCategories(carData) {
      const carCategories = [...new Set(carData.map((car) => car.category))];
  
      carCategories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        carModelSelect.appendChild(option);
      });
    }
  
    function generateCarCards(carData) {
      const carList = document.getElementById("car-list");
      carList.innerHTML = "";
  
      carData.forEach((car) => {
        const carCard = document.createElement("div");
        carCard.classList.add("car-card");
  
        const carImage = document.createElement("img");
        carImage.src = car.image;
        carImage.alt = car.company;
  
        const carModel = document.createElement("h3");
        carModel.textContent = `${car.company} ${car.specs}`;
  
        const carSpecs = document.createElement("p");
        carSpecs.textContent = car.category;
  
        const carButton = document.createElement("button");
        carButton.textContent = "More Info";
  
        carCard.appendChild(carImage);
        carCard.appendChild(carModel);
        carCard.appendChild(carSpecs);
        carCard.appendChild(carButton);
  
        carList.appendChild(carCard);
      });
    }
  
    function handleSubmitForm(event) {
      event.preventDefault();
  
      const selectedCarCategory = carModelSelect.value;
      const selectedCarPrice = document.getElementById("price-range").value;
  
      fetch("http://localhost:3000/car")
        .then((response) => response.json())
        .then((data) => {
          const filteredCars = data.filter((car) => {
            return (
              (selectedCarCategory === "" || car.category === selectedCarCategory) &&
              car.price <= selectedCarPrice
            );
          });
  
          generateCarCards(filteredCars);
        })
        .catch((error) => {
          console.error("Error fetching car data:", error);
        });
    }
  
    const filterForm = document.getElementById("filter-form");
    filterForm.addEventListener("submit", handleSubmitForm);
  
    fetch("http://localhost:3000/car")
      .then((response) => response.json())
      .then((data) => {
        populateCarCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching car data:", error);
      });
  });
  