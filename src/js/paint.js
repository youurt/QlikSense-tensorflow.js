import * as tf from '@tensorflow/tfjs';
import iris from "./iris.json"
import irisTesting from "./iris-testing.json"
//import * as dl from "./dataLoad"
//import * as loader from './dataLoad' 
import {loadMatrix, measureLabels} from './dataLoad';
let painted = false



export const paint = ($element, layout) => {
  if (!painted) {
    
    const myLoad = loadMatrix(layout);
    const myMeasures = measureLabels(layout);
    console.log(myLoad);
    console.log(myMeasures);




    // conver/setup data
    const trainingData = tf.tensor2d(iris.map(item => [
      item.sepal_length, item.sepal_width, item.petal_length, item.petal_width,
    ]));
    const outputData = tf.tensor2d(iris.map(item => [
      item.species === 'setosa' ? 1 : 0,
      item.species === 'virginica' ? 1 : 0,
      item.species === 'versicolor' ? 1 : 0,
    ]));
    const testingData = tf.tensor2d(irisTesting.map(item => [
      item.sepal_length, item.sepal_width, item.petal_length, item.petal_width,
    ]));

    // build neural network
    const model = tf.sequential();

    model.add(tf.layers.dense({
      inputShape: [4],
      activation: "sigmoid",
      units: 5,
    }));
    model.add(tf.layers.dense({
      inputShape: [5],
      activation: "sigmoid",
      units: 3,
    }));
    model.add(tf.layers.dense({
      activation: "sigmoid",
      units: 3,
    }));
    model.compile({
      loss: "meanSquaredError",
      optimizer: tf.train.adam(.06),
    });

    // train/fit network
    const startTime = Date.now();
    model.fit(trainingData, outputData, { epochs: 100 })
      .then((history) => {
        console.log(history);
        const result = model.predict(testingData).toString();
        console.log(result);
        const endTime = Date.now();
        console.log((endTime - startTime) / 1000);
        $element.html("tensorflow result: " + result.toString()).append("<div>Test</div>");
      })

  }

  painted = true
}
