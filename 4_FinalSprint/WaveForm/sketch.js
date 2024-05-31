let sound;
let waveForm;
let peaks = [];

function preload() {
    // Load a sound file
    sound = loadSound('Supernova.mp3');
}

function setup() {
    createCanvas(800, 400);
    noFill();

    // Get the waveform data
    waveForm = sound.getPeaks(width); // Get peaks scaled to the canvas width

    // Apply dynamic range compression
    let compressedWaveform = applyCompression(waveForm, 0.5); // Adjust compression factor as needed

    // Apply smoothing
    let smoothedWaveform = applyLowPassFilter(compressedWaveform, 0.1); // Adjust smoothing factor as needed

    // Find the 5 biggest peaks in the smoothed waveform
    peaks = getTop5NumbersWithIndices(smoothedWaveform);

    console.log(peaks);

    background(200);

    // Draw the smoothed waveform
    stroke(0);
    strokeWeight(2);
    beginShape();
    for (let i = 0; i < smoothedWaveform.length; i++) {
        let x = map(i, 0, smoothedWaveform.length, 0, width);
        let y = map(smoothedWaveform[i], -1, 1, height/4, 0) + height/2;
        vertex(x, y);
    }
    endShape();

    // Highlight the peaks
    stroke(255, 0, 0);
    fill(255,0,0);
    strokeWeight(4);
    for (let i = 0; i < peaks.length; i++) {
        let peakIndex = peaks[i].index;
        let x = map(peakIndex, 0, smoothedWaveform.length, 0, width);
        let y = map(peaks[i].number, -1, 1, height, 0);
        square(x, y, 10);
    }
}

function draw() {

}

function mousePressed() {
    // Play or pause the sound on mouse press
    if (sound.isPlaying()) {
        sound.pause();
    } else {
        sound.play();
    }
}

function getTop5NumbersWithIndices(arr) {
    let peaks = [];

    // Iterate over the array to find peaks
    for (let i = 1; i < arr.length - 1; i++) {
        if (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) {
            peaks.push({ number: arr[i], index: i });
        }
    }

    // Sort the peaks array in descending order of numbers
    peaks.sort((a, b) => b.number - a.number);

    // Extract the top 5 peaks
    return peaks.slice(0, 5);
}

function applyCompression(waveform, compressionFactor) {
    let compressedWaveform = [];
    for (let i = 0; i < waveform.length; i++) {
        // Apply compression using the specified compression factor
        let compressedValue = Math.sign(waveform[i]) * Math.pow(Math.abs(waveform[i]), compressionFactor);
        compressedWaveform.push(compressedValue);
    }
    return compressedWaveform;
}

function applyLowPassFilter(waveform, smoothingFactor) {
    let smoothedWaveform = [];
    let prevSmoothedValue = 0;
    for (let i = 0; i < waveform.length; i++) {
        // Apply low-pass filter (simple averaging)
        let smoothedValue = prevSmoothedValue + smoothingFactor * (waveform[i] - prevSmoothedValue);
        smoothedWaveform.push(smoothedValue);
        prevSmoothedValue = smoothedValue;
    }
    return smoothedWaveform;
}
