Video = ""
Status = ""
Objects = []

function preload() {
    Video = createVideo("Video.mp4")
    Video.hide()
}

function setup() {
   Canvas = createCanvas(640, 360)
   Canvas.center()
}

function draw() {
    image(Video, 0, 0, 640, 360)
    if (Status != "") {
        ObjectDetector.detect(Video, GetResults)
        for (i = 0; i < Objects.length; i++) {
            document.getElementById("Status").innerHTML = "Status: Objects Detected"
            document.getElementById("Objects").innerHTML = "Number of Objects Detected: " + Objects.length
            fill("#FF0000")
            Percent = floor(Objects[i].confidence * 100)
            text(Objects[i].label + " " + Percent + "%", Objects[i].x + 15, Objects[i].y + 15)
            noFill()
            stroke("#FF0000")
            rect(Objects[i].x, Objects[i].y, Objects[i].width, Objects[i].height)
        }
    }
}

function Start() {
    ObjectDetector = ml5.objectDetector("cocossd", ModelLoaded)
    document.getElementById("Status").innerHTML = "Status: Detecting Objects"
}

function ModelLoaded() {
    console.log("Model Loaded")
    Status = true
    Video.loop()
    Video.speed(1)
    Video.volume(1)
}

function GetResults(Error, Results) {
    if (Error) {
        console.log(Error)
    }
    console.log(Results)
    Objects = Results
}