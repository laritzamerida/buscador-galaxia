// script.js
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('inputBuscar');
    const searchButton = document.getElementById('btnBuscar');
    const resultsDiv = document.getElementById('contenedor');
  
    searchButton.addEventListener('click', function() {
      const query = searchInput.value.trim();
      if (query !== '') {
        // Construir la URL de la API de la NASA con el parámetro de búsqueda
        const apiUrl = `https://images-api.nasa.gov/search?q=${query}`;
  
        // Realizar la solicitud HTTP a la API
        fetch(apiUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error('No se pudo obtener la respuesta de la NASA API');
            }
            return response.json();
          })
          .then(data => {
            // Limpiar los resultados anteriores
            resultsDiv.innerHTML = '';
  
            // Acceder a la lista de resultados de la búsqueda
            const items = data.collection.items;
  
            // Mostrar la información de cada resultado
            items.forEach(item => {
              const imageLink = item.links[0].href; // Enlace de la imagen
              const title = item.data[0].title; // Título
              const description = item.data[0].description; // Descripción
              const dateCreated = item.data[0].date_created; // Fecha de creación
  
              // Crear elementos HTML para mostrar los resultados
              const resultElement = document.createElement('div');
              resultElement.classList.add("contenedorcito")
              resultElement.innerHTML = `

                <img src="${imageLink}" alt="${title}">
                <h2>${title}</h2>
                <p id="description">${description}</p>
                <p id="date">Fecha de Creación: ${dateCreated}</p>
              `;

  
              // Agregar el resultado al contenedor de resultados
              resultsDiv.appendChild(resultElement);
            });
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    });
  });
  