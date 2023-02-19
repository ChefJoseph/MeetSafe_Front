import * as facejs from "face-api.js"

//Need to get user img to compare
import testface from "../Assets/face_imgs/WIN_20220706_17_10_23_Pro.jpg"

export async function load_models() {
    const MODEL_URL = "/models"
    const displaySize = {width: window.innerWidth,height: window.innerHeight}
    console.log(displaySize, "load_models")

    await facejs.loadSsdMobilenetv1Model(MODEL_URL)
    await facejs.loadFaceLandmarkModel(MODEL_URL)
    await facejs.loadFaceRecognitionModel(MODEL_URL)
    const img = await facejs.fetchImage(testface)


    let fullFaceDescription = await facejs.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
    const fullFaceDescriptionResized = facejs.resizeResults(fullFaceDescription,displaySize)

    // const faceDescriptors = fullFaceDescriptionResized.desc
    
    const descriptors = new facejs.LabeledFaceDescriptors(testface, [fullFaceDescriptionResized.descriptor])
    const faceMatcher = new facejs.FaceMatcher(descriptors,0.6)

    return faceMatcher
}
