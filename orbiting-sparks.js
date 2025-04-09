
function createSpark() {
    const spark = document.createElement("div");
    spark.classList.add("spark");
    const form = document.querySelector(".rental-form");
    form.appendChild(spark);

    const edge = Math.floor(Math.random() * 4);
    const offset = Math.random() * 15 + 5;
    const speed = Math.random() * 2 + 1;
    let animationName;

    switch (edge) {
        case 0: spark.style.left = "0"; spark.style.top = -offset + "px"; animationName = "moveTop"; break;
        case 1: spark.style.left = (form.clientWidth + offset) + "px"; spark.style.top = "0"; animationName = "moveRight"; break;
        case 2: spark.style.left = form.clientWidth + "px"; spark.style.top = (form.clientHeight + offset) + "px"; animationName = "moveBottom"; break;
        case 3: spark.style.left = -offset + "px"; spark.style.top = form.clientHeight + "px"; animationName = "moveLeft"; break;
    }

    spark.style.animation = `${animationName} ${speed}s linear forwards`;
    spark.style.opacity = Math.random() * 0.5 + 0.5;

    const sparks = form.querySelectorAll(".spark");
    if (sparks.length > 300) sparks[0].remove();
    setTimeout(() => spark.remove(), speed * 1000);
}

const colors = ["#ffca28", "#ff7f00", "#62b0bc", "#ffffff", "#ff66cc", "#66ff66", "#ff3333"];
function changeSparkColors() {
    const sparks = document.querySelectorAll(".spark");
    sparks.forEach(spark => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        spark.style.backgroundColor = randomColor;
        spark.style.boxShadow = `0 0 6px ${randomColor}`;
    });
}

setInterval(createSpark, 10);
setInterval(changeSparkColors, 1000);
