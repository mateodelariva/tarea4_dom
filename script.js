fetch('students.json?nocache=' + Date.now())
  .then(res => res.json())
  .then(students => {
    const container = document.getElementById('student-list');
    students.forEach(s => {
      const card = document.createElement('article');
      card.className = 'student-card';
      card.innerHTML = `
        <a href="${s.url}">
          <img src="${s.avatar ? s.avatar : 'default-avatar.png'}" alt="Avatar de ${s.name}">
          <h2>${s.name}</h2>
          <p>${s.description}</p>
        </a>
      `;
      container.appendChild(card);
    });
  })
  .catch(console.error);
