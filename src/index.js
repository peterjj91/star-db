
const getResource = async (url) => {
  const res = await fetch(url);

  // обработка с ошибкой
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`);
  }

  const body = await res.json();
  return body;
}

getResource('https://swapi.co/api/people/13erfd/')
  .then((body) => {
    console.log(body);
  })
  .catch((err) => { // ловим ошибки 
    console.log('Could not ', err)
  });

// тот же код, что и наверху
// fetch()
//   .then((res) => {
//     return res.json();
//   })
//   .then((body) => {
//     console.log(body)
//   });