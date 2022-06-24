const GetInfo = (country) => {
  axios({
    method: 'GET',
    url: `https://restcountries.com/v2/name/${country}`,
  }).then((responseFromAxios) => {
    const TheCountryFromTheApi = responseFromAxios.data[0];

    const countryName = document.querySelector('#country-name');
    countryName.innerText = `The name of the country: ${TheCountryFromTheApi.name}`;

    const countryCapital = document.querySelector('#country-capital');
    countryCapital.innerText = `The Capital of the country: ${TheCountryFromTheApi.capital}`;

    const countryImage = document.querySelector('#country-flag');
    countryImage.src = TheCountryFromTheApi.flag;
  });
};

document.querySelector('#get-country-btn').onclick = () => {
  const input = document.querySelector('#country-name-input');
  GetInfo(input.value);
};
