const textToType = `Hey there, creative mind! Ready to bring your ideas to life? Dive into the world of comics with Dashtoon Cartoon Generator! Your imagination is the only limit. Type in your story, describe the scenes, and watch as Dashtoon transforms your words into vibrant, hilarious, or action-packed comic panels. Whether it's a superhero saga, a whimsical adventure, or a slice-of-life moment, let your creativity flow. So, what are you waiting for? Type away, visualize your narrative, and let Dashtoon weave it into a fantastic comic strip. Your unique stories await their artistic expression!`;
  
    let i = 0;
    const typingEffect = document.getElementById('typing-effect');
    
    function typeWriter() {
      if (i < textToType.length) {
        typingEffect.innerHTML += textToType.charAt(i);
        i++;
        setTimeout(typeWriter, 30); // Adjust the typing speed (in milliseconds)
      }
    }
  
    window.onload = typeWriter;

async function query(data) {
	const response = await fetch(
		"https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
		{
			headers: { 
				"Accept": "image/png",
				"Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM", 
				"Content-Type": "application/json" 
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
	return result;
}

let btn = document.getElementById('btn');


btn.addEventListener('click',()=>{
    for(let j=1;j<=10;j++){
        if(document.getElementById(`div${j}`).value==''){
            alert("fill all the input fields");
            return;
        }
    }
    for(let i=1;i<=10;i++){
    let val = document.getElementById(`div${i}`).value;
    console.log(val);
    try {
        
    
    query({"inputs": val}).then((response) => {
        // Use image
        
        let imgURL = URL.createObjectURL(response);
        let div=document.createElement('div');
        div.className='pic';
        let head=document.createElement('h1');
        head.innerText=`COMIC-${i}`;
        let img=document.createElement('img');
        img.style.height='180px';
        img.style.width='180px';
        img.src=imgURL;
        div.style.display='flex';
        div.style.flexDirection='column';
        div.style.marginBottom='3rem';
        div.appendChild(head);
        div.appendChild(img);
        document.querySelector(`#box-${i}`).appendChild(div);
        
        document.querySelector('.gallery').style.display='flex';
        document.querySelector(`#box-${i}`).style.display='block';
    
    });
} catch (error) {
        alert("INTERNAL SERVER ERROR");
}
    }
    
});