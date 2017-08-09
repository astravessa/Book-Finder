$opinion = [];

function Book(image, title, description, linkgoogle, linkamazon) {
    this.image = image;
    this.title = title;
    this.description = description;
    this.linkgoogle = linkgoogle;
    this.linkamazon = linkamazon;
    this.like = 0;
    this.dislike = 0;

    this.render = function () { 
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
    this.books = new Queue(); 
    this.booksviewed = new Queue();
    this.atualBook = null;
    this.addBook = function (book) {
        this.books.enqueue(book); 
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

function computeAndDisplayStats() {
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

$('#buttonStart').click(function () {

    $("#startPage").hide();
    $("#mainPage").show();

});

$('#buttonLike').click(function () {
    library.like();
    if (library.nextBook() === false) {
        $('#mainPage').hide();
        $("#endPage").show();
        computeAndDisplayStats();
    }
});

$('#buttonDislike').click(function () {
    library.dislike();
    if (library.nextBook() === false) {
        $('#mainPage').hide();
        $("#endPage").show();
        computeAndDisplayStats();
    }
});
