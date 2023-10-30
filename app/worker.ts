addEventListener("fetch", event => {
    // return await processRandomSign()
    event.respondWith(handleRequest(event.request))
  });
  
  async function handleRequest(req) {
    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    /////////// picks a random el arroyo sign from the KV Namespace
    const min = 2;
    const max = 7;
    const randomInteger = Math.floor(Math.random() * (max - min + 1)) + min;
    // default
    const value = "If you don’t pay your exorcist, do you get repossessed"
    
    // Step 4 -
    // const value = await KV_NAMESPACE_BINDING.get(randomInteger.toString());
  
    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    /////////// creates the marquee sign
    const size = value.length > 35 ? "32" : "64"
    const imageUrl = "https%3A%2F%2Fi.imgur.com%2FCypWQYk.jpg"
    let urlMarquee = "https://textoverimage.moesif.com/image?image_url=" +
      imageUrl + "&text=" + encodeURIComponent(value) +
      "&text_color=050505ff&text_size=" + size +
      "&margin=37&y_align=middle&x_align=bottom"
  
    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    /////////// creates the AI image
    let url = "https://vertexai-imagen-manual-cccogvg2ya-uc.a.run.app/generate"
    const requestBody = {
      "instances": [ { "prompt": value } ],
      "parameters": {
        "sampleCount": 1,
        "sampleImageStyle": "pop_art",
        "negativePrompt": "text offensive adult content",
        // "seed": 1
      }
    };
    // Define the fetch options, including method and headers
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Indicates that the body is in JSON format
      },
      body: JSON.stringify(requestBody), // Serialize the object to a JSON string
    };
    const response = await fetch(url, fetchOptions);
    const data = await response.json();
    const bg = "data:image/png;base64," + data.predictions[0].bytesBase64Encoded;
  
    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    /////////// does the HTML response 
    let html = `<!DOCTYPE html>
    <html>
      <head>
        <title>  Trick Or Treat </title>
        <style>
          body {
              text-align: center; /* Center align the text and inline elements */
            }
            .image-container {
                position: relative;
              margin: 0 auto; 
              width: 1024px; /* Set your desired container width */
              height: 1024px; /* Set your desired container height */
          }
          .overlay-image {
              position: absolute;
              width: 50%;
              top: 50%; /* Centered from the top */
              left: 50%; /* Centered from the left */
              transform: translate(-50%, -50%); /* Center the image */
              z-index: 1; /* This image will be on top */
          }
          .base-image {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              z-index: 0; /* This image will be behind the overlay image */
          }
        </style>
      </head>
      <body>
        <h1>  Austin, Texas P.U.G. </h1>
        <div class="image-container">
          <img  class="overlay-image" src="${urlMarquee}" alt="Marguee Sign">
          <img  class="base-image" src="${bg}" alt="AI Image">
        </div>
      </body>
    </html>`;
  
    return new Response(html, {
      status: 200,
      headers: {
        "content-type": "text/html;charset=UTF-8",
        "Cache-Control": "s-maxage=0",
      },
    });
  };