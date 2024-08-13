const familyTree = document.getElementById('family-tree');
const svgNS = "http://www.w3.org/2000/svg";
const svg = document.createElementNS(svgNS, "svg");
svg.style.position = 'absolute';
svg.style.width = '100%';
svg.style.height = '100%';
familyTree.appendChild(svg);

let createdPersons = {};

function createPerson(person) {
    if (!createdPersons[person.id]) {
        const div = document.createElement('div');
        div.className = 'person';
        div.style.position = 'absolute';
        div.style.left = `${person.x}px`;
        div.style.top = `${person.y}px`;
        div.innerHTML = `<img src="${person.photo}" alt="${person.first_name}" style="width:50px;height:50px;"><br>${person.first_name} ${person.last_name}`;
        familyTree.appendChild(div);
        createdPersons[person.id] = div;
    }
}

function createLine(from, to) {
    const line = document.createElementNS(svgNS, 'line');
    line.setAttribute('x1', from.x + 50);
    line.setAttribute('y1', from.y + 50);
    line.setAttribute('x2', to.x + 50);
    line.setAttribute('y2', to.y + 50);
    line.classList.add('line');
    svg.appendChild(line);
}

fetch('http://127.0.0.1:8000/api/?format=json')
    .then(response => response.json())
    .then(data => {
        const people = data;
        let x = 100; 
        let y = 100; 
        const yOffset = 200;
        const xOffset = 200;

        people.forEach(person => {
            if (!createdPersons[person.id]) {
                person.x = x;
                person.y = y;
                createPerson(person);
                x += xOffset;
            }
        });

        // Отображение супругов на одной оси Y
        people.forEach(person => {
            if (person.spouse) {
                const spouse = people.find(p => p.id === person.spouse);
                if (spouse && !createdPersons[spouse.id]) {
                    spouse.x = person.x + xOffset;  // Супруги на одной оси Y
                    spouse.y = person.y; 
                    createPerson(spouse);
                    createLine(person, spouse);  // Линия между супругами
                }
            }
        });

        // Отображение детей под родителями
        people.forEach(parent => {
            if (parent.children.length > 0) {
                let childX = parent.x;  // Дети будут выравнены по X с родителями
                let childY = parent.y + yOffset;
                parent.children.forEach((childId, index) => {
                    const child = people.find(p => p.id === childId);
                    if (child) {
                        child.x = parent.x + (index * xOffset);
                        child.y = childY;
                        createPerson(child);
                        createLine(parent, child);
                    }
                });
            }
        });

        familyTree.appendChild(svg);
    })
    .catch(error => console.error('Error fetching data:', error));
