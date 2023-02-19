import * as facejs from "face-api.js"

//Need to get user img to compare

async function load_models(testface) {
    const MODEL_URL = "/models"
    const displaySize = {width: window.innerWidth,height: window.innerHeight}

    await facejs.loadSsdMobilenetv1Model(MODEL_URL)
    await facejs.loadFaceLandmarkModel(MODEL_URL)
    await facejs.loadFaceRecognitionModel(MODEL_URL)

    console.log(testface)
    const img = await facejs.fetchImage(testface)


    let fullFaceDescription = await facejs.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
    const fullFaceDescriptionResized = facejs.resizeResults(fullFaceDescription,displaySize)

    
    const descriptors = new facejs.LabeledFaceDescriptors(testface, [fullFaceDescriptionResized.descriptor])
    const faceMatcher = new facejs.FaceMatcher(descriptors,0.6)
    
    console.log("ran")

    return faceMatcher
}


export default load_models