console.log("augment js connected");
let augmenter = {

  doLoad: function() {
    this.video = document.getElementById('video');
    this.c1 = document.getElementById("c1");
    this.ctx1 = this.c1.getContext("2d");
    this.c2 = document.getElementById('c2');
    this.ctx2 = this.c2.getContext('2d');
    this.status = "default";
    this.img = new Image();   // Create new img element for tasks page
    this.img.src = "img/tasks.png";

    let self = this;
    this.video.addEventListener('play', function() {
      console.log(self.video.videoWidth);
      console.log(self.video.videoHeight);
      self.width = self.video.videoWidth;
      self.height = self.video.videoHeight;
        self.timerCallback();
      }, false);
  },

  timerCallback: function() {
    if (this.video.paused || this.video.ended) {
      return;
    }

    if (this.status === "default") {
      this.computeFrame();
    } else if(this.status === "tasks") {
      this.computeTasks();
    } else if (this.status === "triangle") {
      this.computeTriangle();
    } else if(this.status === "grayscale") {
      this.computeGrayScale();
    }
    
    let self = this;
    setTimeout(function() {
        self.timerCallback();
      }, 0); //  In the real world, you would probably schedule this 
                 //to be done based on knowledge of the video's frame rate.
  },

  computeFrame: function() {
    this.ctx1.drawImage(this.video, 0, 0, this.width, this.height); // draw image onto canvas
    let frame = this.ctx1.getImageData(0, 0, this.width, this.height); // get data from canvas
    this.ctx2.putImageData(frame, 0, 0);
    return;
  }, 

  computeTriangle: function() {
    this.ctx1.drawImage(this.video, 0, 0, this.width, this.height); // draw image onto canvas
    // draw a triangle
    this.ctx1.beginPath();
    this.ctx1.moveTo(125, 125);
    this.ctx1.lineTo(125, 45);
    this.ctx1.lineTo(45, 125);
    this.ctx1.closePath();
    this.ctx1.stroke(); 


    //this.ctx1.putImageData(external, 0, 0);

    let frame = this.ctx1.getImageData(0, 0, this.width, this.height); // get data from canvas
  

    this.ctx2.putImageData(frame, 0, 0);

    return;
  },

  computeTasks: function() {
    this.ctx1.drawImage(this.video, 0, 0, this.width, this.height); // draw image onto canvas
    // draw a triangle
    // this.ctx1.beginPath();
    // this.ctx1.moveTo(125, 125);
    // this.ctx1.lineTo(125, 45);
    // this.ctx1.lineTo(45, 125);
    // this.ctx1.closePath();
    // this.ctx1.stroke(); 
    this.ctx1.drawImage(this.img, 0, 0, 500, 480);

    let frame = this.ctx1.getImageData(0, 0, this.width, this.height); // get data from canvas
    this.ctx2.putImageData(frame, 0, 0);
    return;
  },


  computeGrayScale: function() {
    this.ctx1.drawImage(this.video, 0, 0, this.width, this.height); // draw image onto canvas
    let frame = this.ctx1.getImageData(0, 0, this.width, this.height); // get data from canvas
    let l = frame.data.length / 4;
    for (let i = 0; i < l; i++) { // converts to grayscale image
      let r = frame.data[i * 4 + 0];
      let g = frame.data[i * 4 + 1];
      let b = frame.data[i * 4 + 2];
      var brightness = (3*r+4*g+b)>>>3;
      frame.data[i * 4 + 0] = brightness;
      frame.data[i * 4 + 1] = brightness;
      frame.data[i * 4 + 2] = brightness;
    }
    this.ctx2.putImageData(frame, 0, 0);
    return;
  }, 

};


document.addEventListener("DOMContentLoaded", () => {
augmenter.doLoad();

});


button2.addEventListener('click', event => {
  if (select2.value === "triangle") {
    augmenter.status = "triangle";
  } else if (select2.value === "grayscale") {
    augmenter.status = "grayscale";
  } else if (select2.value === "default") {
    augmenter.status = "default";
  } else if(select2.value === "tasks") {
    augmenter.status = "tasks";
  }

});