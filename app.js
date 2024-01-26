const webcam_div = document.getElementById("webcam_div");
        const videoElement = document.createElement("video");
        let mediaStream;
        
        async function openCamera() {
            try {
                mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                });
                videoElement.srcObject = mediaStream;
                videoElement.addEventListener("loadedmetadata", () => {
                    videoElement.play();
                });
                webcam_div.appendChild(videoElement);
            } catch (error) {
                console.error("Error accessing the webcam:", error);
            }
        }


        function takePicture() {
            if (mediaStream) {
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");
                canvas.width = videoElement.videoWidth;
                canvas.height = videoElement.videoHeight;
                context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                const dataURL = canvas.toDataURL("image/png");
                const a = document.createElement("a");
                a.href = dataURL;
                a.download = "snapshot.png";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        }
 