import * as facejs from "face-api.js"


export async function check_face(face,testFace) {

    const img = await facejs.fetchImage(face)
    const detectedFace = await facejs.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()


    if (!detectedFace) {
        throw new Error(`no faces detected for ${this}`)
        }

    const results = testFace.findBestMatch(detectedFace.descriptor)

    if (results._distance >= 0.6) {
        return false 
    }
    return true

}