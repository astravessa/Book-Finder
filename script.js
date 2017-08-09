$opinion = [];

$('#buttonStart').click(function () {

    $("#startPage").hide();
    $("#mainPage").show();

});

$('#buttonLike').click(function () {
    library.like();
    if (library.nextBook() === false) {
        $('#mainPage').hide();
        $("#endPage").show();
        ComputeAndDisplayStats();
    }
});

$('#buttonDislike').click(function () {
    library.dislike();
    if (library.nextBook() === false) {
        $('#mainPage').hide();
        $("#endPage").show();
        ComputeAndDisplayStats();
    }
});

function Book(image, title, description, linkgoogle, linkamazon) { //construtor
    this.image = image; // para inicializar os atributos
    this.title = title;
    this.description = description;
    this.linkgoogle = linkgoogle;
    this.linkamazon = linkamazon;
    this.like = 0;
    this.dislike = 0;

    this.render = function () { // método chamado render dentro da nossa classe
        $("#image").attr("src", this.image);
        $("#title").html(this.title);
        $("#description").text(this.description);
        $("#linkgoogle").attr("href", this.linkgoogle);
        $("#linkamazon").attr("href", this.linkamazon);
    }
};

function Queue() {
    this.data = [];
    this.enqueue = function (element) {
        this.data.push(element);
    }
    this.dequeue = function () {
        var result = this.data[0];
        this.data.shift();
        return result;
    }
};

function Library() {
    this.books = new Queue();  //[]; //estamos a inicializar a nossa biblioteca, books é a variavel - this. é uma variável
    this.booksviewed = new Queue();
    this.atualBook = null;
    this.addBook = function (book) { //depois vamos iniciar o método, como adicionar um livro a biblioteca
        this.books.enqueue(book); //buscar do arrays
    }
    this.nextBook = function () {
        this.atualBook = this.books.dequeue();
        if (this.atualBook === undefined)
            return false;
        this.atualBook.render();
        this.booksviewed.enqueue(this.atualBook);
    }
    this.like = function () {
        this.atualBook.like++;
    }
    this.dislike = function () {
        this.atualBook.dislike++;
    }
}

var book1 = new Book("https://s-media-cache-ak0.pinimg.com/736x/14/48/2d/14482d1a8a817be7298eb6b65da0258b--marvel-comic-books-marvel-comics.jpg", "Captain Marvel", "Shazam, conhecido como Capitão Marvel até 2011, é um super-herói fictício de histórias em quadrinhos, inicialmente publicado pela editora Fawcett Comics e posteriormente adquirido pela DC Comics.", "https://www.google.com", "https://www.amazon.com");
var book2 = new Book("https://s-media-cache-ak0.pinimg.com/736x/13/ff/2d/13ff2d56ada599fcf9539857599ccc1a.jpg", "Batman and Batgirl", "Batman é um personagem fictício, um super-herói da banda desenhada americana publicada pela DC Comics", "https://www.google.com", "https://www.amazon.com");
var book3 = new Book("https://s-media-cache-ak0.pinimg.com/736x/d3/fd/90/d3fd90e602410ba4624597167e02244e--spiderman-comic-amazing-spiderman.jpg", "Spider-Man", "O Homem-Aranha alter-ego de Peter Parker, é um personagem fictício, um super-herói que aparece nas revistas em quadrinhos (banda desenhada em Portugal) americanas publicadas pela Marvel Comics, existindo no seu universo partilhado.", "https://www.google.com", "https://www.amazon.com");


var library = new Library();

library.addBook(book1);
library.addBook(book2);
library.addBook(book3);

library.nextBook();

function ComputeAndDisplayStats() {
    var totalLikes = 0;
    var totalDislikes = 0;

    var book;
    while ((book = library.booksviewed.dequeue()) !== undefined) {
        totalLikes += book.like;
        totalDislikes += book.dislike;

        var html = "<tr>";
        html += "<td>";
        html += book.title;
        html += "</td>";
        html += "<td>";
        html += book.like;
        html += "</td>";
        html += "<td>";
        html += book.dislike;
        html += "</td>";
        html += "</tr>";
        $('#tbody').append(html);
    }

    $("#contador1").text(totalLikes);
    $("#contador2").text(totalDislikes);
}

/*
this.counter = function () {
        var total = 0;
        for (var i = 0; i < this.books.length; i++) {
            total += this.books[i].like;
        }
        return total
    }
*/

//$('#likes').text(like);
//$('#dislikes').text(dislike);

/*        if (this.index <=2) {
            this.index++;
            book.render();
        }

        else if (this.index >=2) {
            $("#mainPage").hide();
            $("#endPage").show();
            var likes = library.counter();
        }
 */

/* $currentBook = $(".book.active");
 $nextBook = $currentBook.next(".book");
 var index = $(".book").index($currentBook);
 library[index].opinion = $(this).attr("data-Opinion");
 
 if ($nextBook.length > 0) {
     $currentBook.removeClass("active");
     $nextBook.addClass("active");
 }
 else {
     loadTable();
     likesCounter();
     $("#mainPage").hide();
     $("#endPage").show();
 }*/


/*
function loadData() {
    var HTMLtoInsert = `
    <div class="book col-sm-offset-4 col-sm-4">
				<img>
				<h1></h1>
				<p class="text-justify"></p>
				<br>
				<div>
					<a class ="linkgoogle"><i style="font-size:24px" class="fa">&#xf270;</i></a>
                    <a class ="linkamazon"><i style="font-size:24px" class="fa">&#xf1a0;</i></a>
				</div>
	
            </div>`;


    $.each(library, function (index, book) {

        $("#bookContainer").append(HTMLtoInsert);
        $lastInserted = $(".book:last-child");
        $("h1", $lastInserted).text(book.title);
        $("p", $lastInserted).html(book.description);
        $("img", $lastInserted).attr("src", book.image);
        $(".linkGoogle", $lastInserted).attr("href", book.links.linkGoogle);
        $(".linkAmazon", $lastInserted).attr("href", book.links.linkAmazon);


    });

    $(".book:first-child").addClass("active");

loadData();

*/

// function loadTable() {

//     $.each(library, function (index, book) {
//         var html = `
//     <tr>
//     <td> `+ book.title + `
//     </td>
//     <td> `+ book.opinion + `
//     </td>
//     </tr>`;


//         $("#tableResults tbody").append(html);

//     });
// }


// function likesCounter() {

//     var likes = 0;
//     var dislikes = 0;

//     $.each(library, function (index, book) {

//         if (book.opinion == "Gosto") {
//             likes++;
//         }
//         else {
//             dislikes++;

//         }

//         $('#likes').text(likes);
//         $('#dislikes').text(dislikes);
//     });
// }


/*
function ShowNext($button) {
    $book = $button.parents(".book");
    $nextBook = $book.next(".book");
    if($nextBook.length){
        $book.removeClass("active");
        $nextBook.addClass("active");
    }
    else{
        $("#bookContainer").hide();
        $("#endPage").show();
    }

}
*/

/*
function addlike(){
 likes++;
 document.getElementById("likes").innerHTML = likes;
//Encontra a label e altera o texto para a variavel likes
 }

function removelike(){
     likes--;
document.getElementById("likes").innerHTML = likes;
}
*/

/*
$('.gosto').click(function(){
    likes++;
    jQuery('#teste').text(likes)
})


$('.naogosto').click(function(){
    likes--;
    jQuery('#teste').text(likes)
})


$(".gosto").click(function(){
$book=$(this).parents(".book");
$book.removeClass("active");
$nextBook = $book.next();
$nextBook.addClass("active");
})
*/


/*
$(".gosto").click(function(){
    $currentBook = $(".book.active");
    var index = $(".book").index($currentBook);
    library[index].opinion="Like";
});


$(".naogosto").click(function(){
    $currentBook = $(".book.active");
    var index = $(".book").index($currentBook);
    library[index].opinion="Dislike";
});
/*

/* var a = [1,2,3,4,5];
for(var i = 0; < a.length; i++){
    console.log(a[i] * 3);
}

/* var a = [1,2,3,4,5];
for(var i = 0; i < 3 i++){
    console.log(a[i]);
} 


var erro= false;
var contador=5;
while (!erro) {
    if (contador ==0) {
 erro=true;
 break;
    }
     console.log(contador--);  
}

var index = 20;

switch (index){
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    console.log(index);
    break;
}
    */

/*
$(".gosto").click(function(){
    $opinion.push(".gosto");

});


$('.naogosto').click(function(){
    $opinion.push(".naogosto");
});
*/

/*

function Person (){
    this.age=24;
    this.name = "André";
    this.birthday = function(){
        return 2017 - this.age;
    }
}

var person1 = new Person();

*/


/*
var html= 

<tr>
    <td>' + book.name '</td>
    <td>' + book.opinion '</td>

</tr>

$("#tbResults tbody").append(html)
*/