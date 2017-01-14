var data = {
    "cpp":"3+ years of experience building desktop applications and games with C++. <br> Completed the National Taiwan Universitys' data structure and advanced C++ programming course.",
    "python":"Experience building small scale scripts to solve problems. <br> Completed Univeristy of Toronto CSC148, Introduction to computer science",
    "js":"Experience building several small web applications that use external APIs to communicate with servers. <br> Currently working through the FreeCodeCamp web development Curriculum.",
    "css3":"Experience building several small websites with a variety of CSS frameworks.",
    "git":"Familiar with command line tools and the Git development workflow.",
    "php":"Experience building small scripts that serve as back ends for different applications."
}

function changeText(key){
    document.getElementById("change-target").innerHTML = data[key];
}
