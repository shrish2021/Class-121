function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet", modelLoaded);
}

function modelLoaded()
{
  console.log("Model Loaded!");
}

function draw()
{
  image(video, 0, 0, 300, 300);
  classifier.classify(video, gotResult);
}

previousResult = "";

function gotResult(error, results)
{
    if(error)
    {
      console.error(error);
    }
    else
    {
      console.log(results);
      previousResult = results[0].label;
      var synth = window.speechSynthesis;
      speak_data = "Object Detected is " + results[0].label;
      var utterThis = new SpeechSynthesisUtterance(speak_data);
      synth.speak(utterThis);

        document.getElementById("object").innerHTML = results[0].label;
        document.getElementById("accuracy").innerHTML = results[0].confidence.toFixed(3);
      }
}



