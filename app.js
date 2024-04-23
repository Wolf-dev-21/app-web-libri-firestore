// Listagem livros e autores
const livroList = document.querySelector('#book-list');

function renderBook(doc){

//criação elementos HTML
let li = document.createElement('li');
let titulo = document.createElement('span');
let autor = document.createElement('span');
let excluir = document.createElement('div');

excluir.textContent = 'X'

//carrega dados no elemento HTMl
li.setAttribute('data-id', doc.id);
titulo.textContent = doc.data().titulo;
autor.textContent = doc.data().autor;

//add dados de autor e titulo em LI
li.appendChild(titulo);
li.appendChild(autor);
li.appendChild(excluir);

/* trata a ação do clique no X paa exluir o arquivo */
excluir.addEventListener('click', (event)=>{
    event.stopPropagation();

    let id = event.target.parentElement.getAttribute('data-id');
    //alert(id);
    db.collection('libri-firestore').doc(id).delete()
    .then(()=>{window.location.reload()})

});

//add o LI em UL
livroList.appendChild(li);

}


db.collection('libri-firestore')
    .get()
    .then(
        (snapshot)=>{
            // console.log(snapshot.docs)
            snapshot.docs.forEach(doc => {
                renderBook(doc)
                console.log(doc.data());

            });
        }
    )

//inserção de livro e autor

const form = document.querySelector('#add-book-form');

form.addEventListener('submit', (event)=> {

    event.preventDefault();

    // console.log(form.autor.value);

    db.collection('libri-firestore').add({
        autor: form.autor.value,
        titulo: form.titulo.value
    }).then(()=>{
        form.autor.value= '';
        form.titulo.value= '';
        window.location.reload();
    });
});