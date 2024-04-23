// Listagem livros e autores
const livroList = document.querySelector('#book-list');

function renderBook(doc){

//criação elementos HTML
let li = document.createElement('li');
let titulo = document.createElement('span');
let autor = document.createElement('span');

//carrega dados no elemento HTMl
li.setAttribute('data-id', doc.id);
titulo.textContent = doc.data().titulo;
autor.textContent = doc.data().autor;

//add dados de autor e titulo em LI
li.appendChild(titulo);
li.appendChild(titulo);

//add o LI em UL
livroList.appendChild(li);

}


db.collection('libri-firestore')
    .get()
    .then(
        (snapshot)=>{
            // console.log(snapshot.docs)
            snapshot.docs.forEach(doc => {
                console.log(doc.data());

            });
        }
    )

//inserção de livro e autor

const form = document.querySelector('#add-book-form');

form.addEventListener('submit', (event)=> {

    event.preventDefault();

    console.log(form.autor.value);

    db.collection('libri-firestore').add({
        autor: form.autor.value,
        titulo: form.titulo.value
    }).then(()=>{
        form.autor.value= '';
        form.titulo.value= '';
        window.location.reload( );
    });
});