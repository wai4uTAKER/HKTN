const form = document.getElementById('myForm');
const fileInput = document.getElementById('myFile');
const downloadLinks = document.getElementById('downloadLinks');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    fetch('/', {
        method: 'POST',
        body: formData
    })
    .then(response => Promise.all([
        response.blob(),
        response.text(),
        response.text()
    ]))
    .then(([imageBlob, text1, text2]) => {
        const imageUrl = URL.createObjectURL(imageBlob);
        const list = document.createElement('li');
        const img = document.createElement('img');
        img.src = imageUrl;
        list.appendChild(img);
        const link1 = document.createElement('a');
        link1.href = URL.createObjectURL(new Blob([text1]));
        link1.download = 'output1.txt';
        link1.textContent = 'Download Output 1';
        list.appendChild(link1);
        const link2 = document.createElement('a');
        link2.href = URL.createObjectURL(new Blob([text2]));
        link2.download = 'output2.txt';
        link2.textContent = 'Download Output 2';
        list.appendChild(link2);
        downloadLinks.appendChild(list);
    });
});